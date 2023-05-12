from flask import Flask, request, render_template, redirect, url_for, session

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

@app.route('/')
def home():
    return render_template('inicio.html')

@app.route('/agregar-donacion')
def add_donation():
    return render_template('agregar-donacion.html')

@app.route('/agregar-pedido')
def add_order():
    return render_template('agregar-pedido.html')

@app.route('/ver-donaciones')
def check_donations():
    return render_template('ver-donaciones.html')

@app.route('/ver-pedidos')
def check_orders():
    return render_template('ver-pedidos.html')

@app.route('/informacion-donacion')
def donation_info():
    return render_template('informacion-donacion.html')

@app.route('/informacion-pedido')
def order_info():
    return render_template('informacion-pedido.html')


if __name__ == "__main__":
    app.run(debug=True)
