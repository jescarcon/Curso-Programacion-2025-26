import csv
#region Leer Ficheros

#region Lector Basico
def leeficheros(nombre_archivo):
    try:
        with open(nombre_archivo, mode='r', encoding='latin-1') as archivo:
            lector_csv = csv.reader(archivo)  # Lee el archivo CSV   csv.reader(archivo, delimiter=";")  # Especificamos el delimitador
            next(lector_csv) #salta la primera linea (encabezado)
            lista_aeropuerto = [fila for fila in lector_csv]  # Cada fila se guarda como una lista
        return lista_aeropuerto
    except FileNotFoundError:
        print(f"El archivo {nombre_archivo} no se encuentra.")
        return []

nombre_archivo = 'Python/Ejercicios/3.Ficheros/datos_aeropuerto.csv'  # Archivo teniendo en cuenta que va desde raiz
aeropuerto = leeficheros(nombre_archivo)

# Imprimir los datos del aeropuerto (lista de aviones)
# for avion in aeropuerto:
#     print(avion)
#print(aeropuerto[0][0])

#endregion
        
#region Lector Con NamedTuple     
        #--------------------------NamedTuple--------------------------

import csv
from collections import namedtuple

# Definir el namedtuple para representar los datos del Avion
Avion = namedtuple('Avion', ['id','modelo', 'fecha_salida', 'fecha_entrada', 'ciudad_salida', 'ciudad_llegada', 'pasajeros', 'piloto', 'compania'])

def leeficheros(nombre_archivo):
    try:
        with open(nombre_archivo, mode='r', encoding='latin-1') as archivo:
            lector_csv = csv.reader(archivo)  # Lee el archivo CSV  o  csv.reader(archivo, delimiter=";")  # Especificamos el delimitador
            next(lector_csv)  # Omitir la primera línea si es encabezado
            # Usar el namedtuple para guardar los datos de cada fila
            lista_aeropuerto = [Avion(*fila) for fila in lector_csv]

# Escribir Avion(*fila) es lo mismo que escribir separados por coma, si Avion(fila) lo meteria como 1 solo argumento
# avion_objeto = Avion(
#     "1", "Boeing 747", "2024-02-01 12:00:00", "2024-02-01 18:00:00",
#     "Madrid", "Londres", "200", "Piloto 15", "AeroJet"
# )

# Como si en
# def funcion(a, b, c):
#     print(a, b, c)
# valores = [1, 2, 3]
# funcion(valores)  <-- Esto da error
# funcion(*valores)  # Separa los elementos de la lista en argumentos individuales


        return lista_aeropuerto
    except FileNotFoundError:
        print(f"El archivo {nombre_archivo} no se encuentra.")
        return []

# Nombre del archivo CSV
nombre_archivo = 'Python/Ejercicios/3.Ficheros/datos_aeropuerto.csv'

# Cargar los datos de los Avion
aeropuerto = leeficheros(nombre_archivo)

#Imprimir los datos del aeropuerto
# for Avion in aeropuerto:
#     print(Avion)

print(f"Ciudad de salida del primer Avion: {aeropuerto[0].ciudad_salida}")
#endregion

#endregion

#region Escribir ficheros

#w sobreescribe, a añade
with open("archivo1.txt", "a") as f:
    f.write("Esta es una nueva línea añadida.\n")

lineas = ["Línea 1\n", "Línea 2\n", "Línea 3\n"]
with open("archivo2.txt", "w") as f: #Ojo encoding = "utf-8"
    f.writelines(lineas)
#endregion
