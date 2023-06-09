from flask import Flask, request, render_template, redirect, url_for, jsonify
from utils.regiones_comunas import REGIONES_COMUNAS
import json
from database import db
from utils.validation import validate_donation, validate_order

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

@app.route('/')
def home():
    return render_template('inicio.html')

@app.route('/regiones_comunas', methods=['GET'])
def pass_data():
    data = json.loads(REGIONES_COMUNAS)
    return jsonify(data)

@app.route('/agregar-donacion', methods=["GET", "POST"])
def add_donation():
    if request.method == "POST":
        region_id = request.form.get('region')
        comuna_id = request.form.get('comuna')
        calle_num = request.form.get('calle-numero')
        tipo_donacion = request.form.get('tipo')
        cantidad = request.form.get('cantidad')
        fecha_disp = request.form.get('fecha-disponibilidad')
        desc = request.form.get('descripcion')
        condiciones = request.form.get('condiciones')
        fotos = []
        for i in range(1,4):
            fotos.append(request.files.get('foto-'+str(i)))
        donante = request.form.get('nombre')
        email = request.form.get('email')
        num = request.form.get('celular')

        if validate_donation(region_id, comuna_id, calle_num, tipo_donacion, cantidad, fecha_disp, desc, condiciones, donante, email, num, fotos):
            status, msg = db.create_donation(comuna_id, calle_num, tipo_donacion, cantidad, fecha_disp, desc, condiciones, donante, email, num)

            if status:
                return redirect(url_for('home'))
        else:
            print('error de campo')

        return render_template('agregar-donacion.html')

    elif request.method == "GET":
        return render_template('agregar-donacion.html')

@app.route('/agregar-pedido', methods=["GET", "POST"])
def add_order():
    if request.method == "POST":
        region_id = request.form.get('region')
        comuna_id = request.form.get('comuna')
        tipo_pedido = request.form.get('tipo')
        desc = request.form.get('descripcion')
        cantidad = request.form.get('cantidad')
        nombre = request.form.get('nombre')
        email = request.form.get('email')
        num = request.form.get('celular')
        if validate_order(region_id, comuna_id, tipo_pedido, cantidad, desc, nombre, email, num):
            status, msg = db.create_order(comuna_id, tipo_pedido, desc, cantidad, nombre, email, num)

            if status:
                return redirect(url_for('home'))
        else:
            print('error de campo')

        return render_template('agregar-pedido.html')

    elif request.method == "GET":
        return render_template('agregar-pedido.html')

@app.route('/ver-donaciones', methods=["GET"])
def check_donations():
    if request.method == "GET":
        first_5_donations = db.get_first_5_donations()
        next_5_donations = db.get_next_5_donations()
        return render_template('ver-donaciones.html', first_donations=first_5_donations, next_donations=next_5_donations)

    return render_template('ver-donaciones.html')

@app.route('/ver-pedidos', methods=["GET"])
def check_orders():
    if request.method == "GET":
        first_5_orders = db.get_first_5_orders()
        next_5_orders = db.get_next_5_orders()
        return render_template('ver-donaciones.html', first_orders=first_5_orders, next_orders=next_5_orders)

    return render_template('ver-pedidos.html')

@app.route('/informacion-donacion')
def donation_info():
    return render_template('informacion-donacion.html')

@app.route('/informacion-pedido')
def order_info():
    return render_template('informacion-pedido.html')


if __name__ == "__main__":
    app.run(debug=True)
