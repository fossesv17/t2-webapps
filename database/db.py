import pymysql
import json

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('database/queries.json', 'r') as queries:
    QUERY_DICT = json.load(queries)

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn

def get_donation_by_id(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_donation_by_id"], (id,))
    donation = cursor.fetchone()
    return donation

def create_donation(comuna_id, calle_numero,
                    tipo, cantidad, fecha_disponibilidad,
                    descripcion, condiciones_retirar,
                    nombre, email, celular):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT['create_donation'], (comuna_id, calle_numero, tipo,
                                                   cantidad, fecha_disponibilidad,
                                                   descripcion, condiciones_retirar,
                                                   nombre, email, celular))
    conn.commit()

def get_order_by_id(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_order_by_id"], (id,))
    order = cursor.fetchone()
    return order

def create_order(comuna_id, tipo, descripcion,
                cantidad, nombre_solicitante,
                email_solicitante, celular_solicitante):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT['create_order'], (comuna_id, tipo, descripcion,
                                                   cantidad, nombre_solicitante,
                                                   email_solicitante, celular_solicitante))
    conn.commit()

def get_photo_by_id(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_photo_by_id"], (id,))
    photo = cursor.fetchone()
    return photo

def get_photo_by_donation_id(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_photo_by_id"], (id,))
    photo = cursor.fetchone()
    return photo

def get_first_5_donations():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_first_5_donations"])
    donations = cursor.fetchall()
    return donations

def get_next_5_donations():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_next_5_donations"])
    donations = cursor.fetchall()
    return donations

def get_first_5_orders():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_first_5_orders"])
    orders = cursor.fetchall()
    return orders

def get_next_5_orders():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_next_5_orders"])
    orders = cursor.fetchall()
    return orders