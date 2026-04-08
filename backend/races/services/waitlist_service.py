"""
Waitlist promotion service.
Called whenever a confirmed booking is cancelled — fully atomic.
"""
from typing import Optional
from django.db import transaction

from races.models import Race, Booking, RaceWaitlist
from users.email_utils import send_waitlist_promoted_email


def add_to_waitlist(driver, race) -> RaceWaitlist:
    """
    Add a driver to the race waitlist.
    Position is assigned as last in queue.
    Raises ValueError if already on waitlist or already booked.
    """
    if Booking.objects.filter(driver=driver, race=race, status=Booking.STATUS_CONFIRMED).exists():
        raise ValueError('Driver already has a confirmed booking for this race.')

    if RaceWaitlist.objects.filter(driver=driver, race=race, status=RaceWaitlist.STATUS_WAITING).exists():
        raise ValueError('Driver is already on the waitlist for this race.')

    last_position = (
        RaceWaitlist.objects.filter(race=race, status=RaceWaitlist.STATUS_WAITING)
        .order_by('-position')
        .values_list('position', flat=True)
        .first()
    ) or 0

    entry = RaceWaitlist.objects.create(
        driver=driver,
        race=race,
        position=last_position + 1,
    )
    return entry


@transaction.atomic
def promote_next_from_waitlist(race: Race) -> Optional[Booking]:
    """
    Promote the first waiting driver on the waitlist into a confirmed booking.
    Called after any booking cancellation that frees a slot.
    Returns the new Booking or None if waitlist is empty.
    """
    next_entry = (
        RaceWaitlist.objects.select_for_update()
        .filter(race=race, status=RaceWaitlist.STATUS_WAITING)
        .order_by('position')
        .first()
    )

    if not next_entry:
        return None

    # Create confirmed booking
    booking = Booking.objects.create(
        driver=next_entry.driver,
        race=race,
        status=Booking.STATUS_CONFIRMED,
        amount_paid=race.price,
    )

    # Mark waitlist entry as promoted
    next_entry.status = RaceWaitlist.STATUS_PROMOTED
    next_entry.save(update_fields=['status'])

    # Compact queue positions for remaining entries
    remaining = RaceWaitlist.objects.filter(
        race=race, status=RaceWaitlist.STATUS_WAITING
    ).order_by('position')
    for i, entry in enumerate(remaining, start=1):
        if entry.position != i:
            entry.position = i
            entry.save(update_fields=['position'])

    # Mark race open again if it was full (new booking may re-fill it)
    if race.status == Race.STATUS_FULL and not race.is_full:
        race.status = Race.STATUS_OPEN
        race.save(update_fields=['status'])

    # Email + in-app notification
    send_waitlist_promoted_email(next_entry.driver, race)
    from notifications.services.notification_service import notify_waitlist_promoted
    notify_waitlist_promoted(next_entry.driver, race.title)

    return booking


def cancel_waitlist(driver, race) -> bool:
    """Remove a driver from the waitlist. Returns True if found and cancelled."""
    entry = RaceWaitlist.objects.filter(
        driver=driver, race=race, status=RaceWaitlist.STATUS_WAITING
    ).first()

    if not entry:
        return False

    entry.status = RaceWaitlist.STATUS_CANCELLED
    entry.save(update_fields=['status'])

    # Compact remaining positions
    remaining = RaceWaitlist.objects.filter(
        race=race, status=RaceWaitlist.STATUS_WAITING
    ).order_by('position')
    for i, e in enumerate(remaining, start=1):
        if e.position != i:
            e.position = i
            e.save(update_fields=['position'])

    return True
