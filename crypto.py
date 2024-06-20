import sys
import json
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding
from base64 import b64encode, b64decode
import os

def encrypt_password(password):
    # Generate a random 16-byte key
    key = os.urandom(16)
    iv = os.urandom(16)  # Generate a random IV

    # Pad the password to be a multiple of 16 bytes (AES block size)
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(password.encode('utf-8')) + padder.finalize()

    # Create AES CFB mode cipher with the generated key and IV
    cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()

    # Return JSON string with iv, ciphertext, and key (base64 encoded)
    return json.dumps({
        'iv': b64encode(iv).decode('utf-8'),
        'ciphertext': b64encode(ciphertext).decode('utf-8'),
        'key': b64encode(key).decode('utf-8')
    })

def decrypt_password(iv_str, ciphertext_str, key_str):
    iv = b64decode(iv_str)
    ciphertext = b64decode(ciphertext_str)
    key = b64decode(key_str)

    # Create AES CFB mode cipher with the given key and IV
    cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
    decryptor = cipher.decryptor()

    # Decrypt ciphertext
    padded_data = decryptor.update(ciphertext) + decryptor.finalize()

    # Unpad the decrypted data
    unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
    decrypted_data = unpadder.update(padded_data) + unpadder.finalize()

    # Return the decrypted password (as UTF-8 string)
    return decrypted_data.decode('utf-8')

if __name__ == "__main__":
    action = sys.argv[1]
    if action == 'encrypt':
        password = sys.argv[2]
        print(encrypt_password(password))
    elif action == 'decrypt':
        iv = sys.argv[2]
        ciphertext = sys.argv[3]
        key = sys.argv[4]
        print(decrypt_password(iv, ciphertext, key))
