"""
CSV result import service.

Expected CSV format (header row required):
    position, nickname, best_lap_ms, total_time_ms, fastest_lap, dnf, notes

- position      : integer (1-based)
- nickname      : driver's nickname (case-insensitive lookup)
- best_lap_ms   : integer milliseconds, e.g. 54321  (optional)
- total_time_ms : integer milliseconds              (optional)
- fastest_lap   : true / false / 1 / 0             (optional, default false)
- dnf           : true / false / 1 / 0             (optional, default false)
- notes         : any string                        (optional)
"""
import csv
import io

from users.models import DriverProfile


REQUIRED_COLUMNS = {'position', 'nickname'}
TRUTHY = {'true', '1', 'yes'}


def parse_bool(value: str) -> bool:
    return str(value).strip().lower() in TRUTHY


def parse_optional_int(value: str):
    v = str(value).strip()
    if not v:
        return None
    try:
        return int(v)
    except ValueError:
        return None


def parse_csv_results(file_obj) -> tuple[list[dict], list[str]]:
    """
    Parse a CSV file (binary or text) into a list of result dicts
    compatible with points_service.submit_race_results().

    Returns (results, errors).
    errors is empty on full success.
    """
    if hasattr(file_obj, 'read'):
        raw = file_obj.read()
        if isinstance(raw, bytes):
            raw = raw.decode('utf-8-sig')  # handle BOM from Excel
        reader = csv.DictReader(io.StringIO(raw))
    else:
        reader = csv.DictReader(file_obj)

    # Normalise header names to lowercase stripped
    reader.fieldnames = [f.strip().lower() for f in (reader.fieldnames or [])]

    missing = REQUIRED_COLUMNS - set(reader.fieldnames)
    if missing:
        return [], [f"CSV is missing required columns: {missing}"]

    results = []
    errors  = []

    for row_num, row in enumerate(reader, start=2):  # row 1 = header
        nickname = row.get('nickname', '').strip()
        if not nickname:
            errors.append(f'Row {row_num}: nickname is empty.')
            continue

        try:
            driver = DriverProfile.objects.get(nickname__iexact=nickname)
        except DriverProfile.DoesNotExist:
            errors.append(f'Row {row_num}: no driver found with nickname "{nickname}".')
            continue

        raw_pos = row.get('position', '').strip()
        try:
            position = int(raw_pos)
            if position < 1:
                raise ValueError
        except (ValueError, TypeError):
            errors.append(f'Row {row_num}: invalid position "{raw_pos}".')
            continue

        results.append({
            'driver_id':    driver.pk,
            'position':     position,
            'best_lap_ms':  parse_optional_int(row.get('best_lap_ms', '')),
            'total_time_ms': parse_optional_int(row.get('total_time_ms', '')),
            'fastest_lap':  parse_bool(row.get('fastest_lap', 'false')),
            'dnf':          parse_bool(row.get('dnf', 'false')),
            'notes':        row.get('notes', '').strip(),
        })

    return results, errors
