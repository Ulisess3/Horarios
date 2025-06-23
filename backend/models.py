import sqlite3

conn = sqlite3.connect('usuarios.db')
cursor = conn.cursor()

cursor.execute("PRAGMA foreign_keys = ON;")

cursor.execute('''
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL,
    contraseña TEXT NOT NUL
    rol TEXT NOT NULL,
    estado TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS reserva (
    id_reserva INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_reserva DATE NOT NULL,
    direccion TEXT NOT NULL,
    tipo_ubicacion TEXT NOT NULL,
    estado TEXT NOT NULL,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS asignacion (
    id_asignacion INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_asignacion DATE NOT NULL,
    id_reserva INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS historial_tareas (
    id_historial INTEGER PRIMARY KEY AUTOINCREMENT,
    hora_inicio DATETIME NOT NULL,
    hora_fin DATETIME NOT NULL,
    ubicacion TEXT NOT NULL,
    id_asignacion INTEGER NOT NULL,
    FOREIGN KEY (id_asignacion) REFERENCES asignacion(id_asignacion) ON DELETE CASCADE
)
''')


cursor.execute("INSERT INTO usuarios (nombre, correo, contraseña, rol, estado) VALUES (?, ?, ?, ?, ?)",
                ("nico", "nico@mail.com", "123", "cliente", "activo"))

conn.commit()
conn.close()