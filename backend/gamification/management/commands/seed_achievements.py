from django.core.management.base import BaseCommand
from gamification.models import Achievement


ACHIEVEMENTS = [
    dict(code='first_race',    name='First Chequered Flag', description='Complete your very first race.',          category='Race',      icon='flag',      points_bonus=5),
    dict(code='first_win',     name='Race Winner',          description='Win your first race.',                    category='Race',      icon='trophy',    points_bonus=10),
    dict(code='first_podium',  name='On The Podium',        description='Finish in the top 3.',                    category='Race',      icon='medal',     points_bonus=5),
    dict(code='fastest_lap',   name='Fastest Lap',          description='Set the fastest lap in a race.',          category='Skill',     icon='bolt',      points_bonus=5),
    dict(code='10_races',      name='Veteran Driver',       description='Complete 10 races.',                      category='Milestone', icon='car',       points_bonus=10),
    dict(code='50_races',      name='Seasoned Racer',       description='Complete 50 races.',                      category='Milestone', icon='star',      points_bonus=25),
    dict(code='100_points',    name='Century Club',         description='Accumulate 100 championship points.',     category='Milestone', icon='hundred',   points_bonus=0),
    dict(code='500_points',    name='Points Machine',       description='Accumulate 500 championship points.',     category='Milestone', icon='fire',      points_bonus=0),
    dict(code='silver_tier',   name='Silver Driver',        description='Reach Silver tier.',                      category='Skill',     icon='shield',    points_bonus=0),
    dict(code='gold_tier',     name='Gold Driver',          description='Reach Gold tier.',                        category='Skill',     icon='crown',     points_bonus=0),
    dict(code='elite_tier',    name='Elite Driver',         description='Reach Elite tier — the pinnacle.',        category='Skill',     icon='lightning', points_bonus=50),
]


class Command(BaseCommand):
    help = 'Seed the database with default achievements'

    def handle(self, *args, **options):
        created = 0
        for data in ACHIEVEMENTS:
            _, new = Achievement.objects.get_or_create(code=data['code'], defaults=data)
            if new:
                created += 1
        self.stdout.write(self.style.SUCCESS(f'Seeded {created} new achievements ({len(ACHIEVEMENTS)} total).'))
