from flask import Flask, request, jsonify
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding
from flask_sqlalchemy import SQLAlchemy
import os
import base64

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'http://localhost/phpmyadmin/index.php?route=/database/structure&db=kriptografi'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    key = db.Column(db.String(256), nullable=False)
    iv = db.Column(db.String(256), nullable=False)

    def __init__(self, username, password, key, iv):
        self.username = username
        self.password = password
        self.key = key
        self.iv = iv

# Padding functions
def add_padding(data):
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(data) + padder.finalize()
    return padded_data

def remove_padding(padded_data):
    unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
    data = unpadder.update(padded_data) + unpadder.finalize()
    return data

# Encrypt function using CBC mode
def encrypt_cbc(key, plaintext, iv):
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    padded_plaintext = add_padding(plaintext)
    ciphertext = encryptor.update(padded_plaintext) + encryptor.finalize()
    return base64.b64encode(ciphertext).decode('utf-8')

# Decrypt function using CBC mode
def decrypt_cbc(key, ciphertext, iv):
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    padded_plaintext = decryptor.update(base64.b64decode(ciphertext)) + decryptor.finalize()
    plaintext = remove_padding(padded_plaintext)
    return plaintext.decode('utf-8')

# Endpoint for encryption and saving to database
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    plaintext_password = data['password'].encode('utf-8')
    key = os.urandom(32)  # AES-256
    iv = os.urandom(16)
    ciphertext_password = encrypt_cbc(key, plaintext_password, iv)

    user = User(username, ciphertext_password, base64.b64encode(key).decode('utf-8'), base64.b64encode(iv).decode('utf-8'))
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})

# Endpoint for decryption (optional)
@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.json
    ciphertext = data['ciphertext']
    key = base64.b64decode(data['key'])
    iv = base64.b64decode(data['iv'])
    plaintext = decrypt_cbc(key, ciphertext, iv)
    return jsonify({'plaintext': plaintext})

if __name__ == '__main__':
    db.create_all()  # Create database tables
    app.run(debug=True)
