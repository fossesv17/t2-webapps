from flask import Flask, request, render_template, redirect, url_for, session

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

@app.route('/')
def home():
    return render_template('inicio.html')

if __name__ == "__main__":
    app.run(debug=True)
