from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def conectar_db():
    return sqlite3.connect("usuarios.db")

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    usuario = data.get("usuario")
    clave = data.get("clave")

    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE nombre = ? AND clave = ?", (usuario, clave))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"ok": True, "mensaje": "Login correcto"})
    else:
        return jsonify({"ok": False, "mensaje": "Credenciales incorrectas"}), 401

if __name__ == "__main__":
    app.run(port=5000)
