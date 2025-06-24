import sqlite3

conn = sqlite3.connect('database.db')
conn.execute("PRAGMA foreign_keys = ON;")
cursor = conn.cursor()

cursor.execute('''
INSERT INTO usuarios (nombre, correo, contraseña, rol, estado)
VALUES (?,?,?,?,?)
''', ('nico', 'nico@mail.com', '123', 'cliente', 'activo'))

cursor.execute('''
INSERT INTO usuarios (nombre, correo, contraseña, rol, estado)
VALUES (?,?,?,?,?)
''', ('admin', 'admin@mail.com', '123', 'operario', 'activo'))


conn.commit()
conn.close()