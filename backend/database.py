import sqlite3

conn = sqlite3.connect('usuarios.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    clave TEXT NOT NULL
)
''')

cursor.execute("INSERT INTO usuarios (nombre, clave) VALUES (?, ?)", ("nico", "123"))

conn.commit()
conn.close()