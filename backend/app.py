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

@app.route('/reservar', methods=['POST'])
def reservar():
    data = request.get_json()
    fecha = data.get('fecha')
    direccion = data.get('direccion')
    tipo = data.get('tipo_ubicacion')
    id_usuario = data.get('id_usuario')

    if not fecha or not direccion or not tipo or not id_usuario:
        return jsonify({'ok': False, 'mensaje': 'Datos incompletos'}), 400

    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO reserva (fecha_reserva, direccion, tipo_ubicacion, estado, id_usuario)
        VALUES (?, ?, ?, 'pendiente', ?)
    """, (fecha, direccion, tipo, id_usuario))
    conn.commit()
    conn.close()

    return jsonify({'ok': True, 'mensaje': 'Reserva registrada'})

@app.route('/reservas/<int:id_usuario>', methods=['GET'])
def obtener_reservas_usuario(id_usuario):
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT fecha_reserva, direccion, tipo_ubicacion, estado
        FROM reserva
        WHERE id_usuario = ?
        ORDER BY fecha_reserva ASC
    """, (id_usuario,))
    reservas = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(reservas)

@app.route('/reservas-disponibles', methods=['GET'])
def reservas_disponibles():
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT r.id_reserva, r.fecha_reserva, r.direccion, r.tipo_ubicacion
        FROM reserva r
        LEFT JOIN asignacion a ON r.id_reserva = a.id_reserva
        WHERE r.estado = 'pendiente' AND a.id_asignacion IS NULL
        ORDER BY r.fecha_reserva ASC
    """)
    reservas = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(reservas)

@app.route('/tareas-operario/<int:id_usuario>', methods=['GET'])
def tareas_operario(id_usuario):
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT r.fecha_reserva, r.direccion, r.tipo_ubicacion, r.estado
        FROM asignacion a
        JOIN reserva r ON a.id_reserva = r.id_reserva
        WHERE a.id_usuario = ? AND r.estado = 'asignada'
        ORDER BY r.fecha_reserva ASC
    """, (id_usuario,))
    tareas = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(tareas)

if __name__ == '__main__':
    app.run(debug=True)