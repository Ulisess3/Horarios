from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def conectar_db():
    conn = sqlite3.connect('database.db')
    conn.execute("PRAGMA foreign_keys = ON;")
    conn.row_factory = sqlite3.Row 
    return conn

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = data.get('usuario')
    clave = data.get('clave')

    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM usuarios 
        WHERE nombre = ? AND contraseña = ? AND estado = 'activo'
    """, (usuario, clave))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({
            'ok': True,
            'mensaje': 'Login correcto',
            'rol': user['rol']
        })
    else:
        return jsonify({'ok': False, 'mensaje': 'Usuario inactivo o credenciales incorrectas'}), 401

@app.route('/registrar-cliente', methods=['POST'])
def registrar_cliente():
    data = request.get_json()
    nombre = data.get('usuario')
    clave = data.get('clave')
    correo = data.get('correo')

    if not nombre or not clave or not correo:
        return jsonify({'ok': False, 'mensaje': 'Faltan datos'}), 400

    conn = conectar_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE nombre = ?", (nombre,))
    if cursor.fetchone():
        conn.close()
        return jsonify({'ok': False, 'mensaje': 'El usuario ya existe'}), 409

    cursor.execute("""
        INSERT INTO usuarios (nombre, correo, contraseña, rol, estado)
        VALUES (?, ?, ?, 'cliente', 'activo')
    """, (nombre, correo, clave))
    
    conn.commit()
    conn.close()

    return jsonify({'ok': True, 'mensaje': 'Cliente registrado correctamente. Ya puede iniciar sesión'})

if __name__ == '__main__':
    app.run(debug=True)