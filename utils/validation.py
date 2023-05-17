import re
import filetype
import hashlib
import filetype
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename


def gen_rnd_hashes_for_photos(photos):
    hashes = {}

    for photo in photos:
        _filename = hashlib.sha256(
            secure_filename(photo.filename).encode("utf-8")
        ).hexdigest()
        _extension = filetype.guess(photo).extension  # type: ignore
        img_filename = f"{_filename}.{_extension}"

        # we add it to the dictw
        hashes[img_filename] = photo

    return hashes

def validate_name(name):
    length_valid = len(name) <= 80 and len(name) >= 3
    rgex = r"[a-zA-Z ]+"

    return bool(re.search(rgex, name)) and length_valid

def validate_email(email):
    length_valid = len(email) > 5 and len(email) <= 30
    email_rgex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    return bool(re.search(email_rgex, email)) and length_valid

def validate_cellnum(num):
    length_valid = len(num) >= 8 and len(num) <= 15
    cel_rgex = r"^[0-9]+$"

    return bool(re.search(cel_rgex, num)) and length_valid

def validate_date(av_date):
    format_valid = False
    date_rgex = r"^(\d{4})-(0[1-9]|1[0-2])-([0-2]\d|3[01])$"
    current_date = datetime.now()

    if (re.search(date_rgex, av_date)):
        format_valid = True
        av_date_datetime = datetime.strptime(av_date, "%Y-%m-%d")
        valid_date = (av_date_datetime - current_date).seconds > 0

    return format_valid and valid_date

def validate_quantity(quantity):
    length_valid = len(quantity) > 0 and len(quantity) <= 10
    qnt_rgex = r"^[a-zA-Z0-9]+$"

    return bool(re.search(qnt_rgex, quantity)) and length_valid

def validate_type(tipo):
    valid_type = tipo == "fruta" or tipo == "verdura" or tipo == "otro"
    return valid_type and len(tipo) > 0

def validate_order_desc(desc):
    length_valid = len(desc) > 0 and len(desc) <= 250
    desc_rgex = r"[a-zA-Z0-9 ]+"

    return bool(re.search(desc_rgex, desc)) and length_valid

def validate_donation_desc(desc):
    length_valid = len(desc) > 0 and len(desc) <= 80
    desc_rgex = r"[a-zA-Z0-9 ]+"

    return bool(re.search(desc_rgex, desc)) and length_valid

def validate_region(region):
    return region and len(region) > 0

def validate_comuna(comuna):
    return comuna and len(comuna) > 0

def validate_address(addr):
    length_valid = len(addr) > 0 and len(addr) <= 80
    addr_rgex = r"^[a-zA-Z0-9 ]+"

    return bool(re.search(addr_rgex, addr)) and length_valid

def validate_conditions(conds):
    length_valid = len(conds) > 0 and len(conds) <= 80
    conds_rgex = r"[a-zA-Z0-9 ]+"

    return bool(re.search(conds_rgex, conds)) and length_valid

def validate_photo(photo):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

    # check if a file was submitted
    if photo is None:
        return False

    # check if the browser submitted an empty file
    if photo.filename == "":
        return False

    # check file extension
    ftype_guess = filetype.guess(photo)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    # check mimetype
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False

    if photo.content_length > MAX_FILE_SIZE:  # attribute content_length of the file
        return False
    return True

def validate_donation(region, comuna, address, donation_type,
                      quantity, avail_date, desc, conditions,
                      donor_name, email, cellnum, photos):
    
    valid_photos = True

    for photo in photos:
        if photo.filename != '':
            valid_photos = valid_photos and validate_photo(photo)

    print(
        f"region {validate_region(region)}",
        f"comuna {validate_comuna(comuna)}",
        f"calle {validate_address(address)}",
        f"tipo {validate_type(donation_type)}",
        f"cantidad {validate_quantity(quantity)}",
        f"fecha {validate_date(avail_date)}",
        f"desc {validate_donation_desc(desc)}",
        f"conds {validate_conditions(conditions)}",
        f"nombre {validate_name(donor_name)}",
        f"mail {validate_email(email)}",
        f"numero {validate_cellnum(cellnum)}",
        f"fotos {valid_photos}",
    )

    return (
        validate_region(region)
        and validate_comuna(comuna)
        and validate_address(address)
        and validate_type(donation_type)
        and validate_quantity(quantity)
        and validate_date(avail_date)
        and validate_donation_desc(desc)
        and validate_conditions(conditions)
        and validate_name(donor_name)
        and validate_email(email)
        and validate_cellnum(cellnum)
        and valid_photos
    )
