'''Trataremos sobre el fichero de Aeropuertos
Muestra de las dos primeras lineas

Modelo Avion,Fecha Salida,Fecha Entrada,Ciudad Salida,Ciudad Llegada,Pasajeros,Piloto,Compañia
Embraer 190,2024-12-14 23:40:05,2024-12-15 09:40:05,Madrid,Lisboa,142,Piloto 60,BlueAir

'''

#region Lector

import csv
from collections import namedtuple

# Definir el namedtuple para representar los datos del Avion
Avion = namedtuple('Avion', ['id','modelo', 'fecha_salida', 'fecha_entrada', 'ciudad_salida', 'ciudad_llegada', 'pasajeros', 'piloto', 'compania'])

def leeficheros(nombre_archivo):
    try:
        with open(nombre_archivo, mode='r', encoding='latin-1') as archivo:
            lector_csv = csv.reader(archivo)  # Lee el archivo CSV
            next(lector_csv)  # Omitir la primera línea si es encabezado
            # Usar el namedtuple para guardar los datos de cada fila
            lista_aeropuerto = [Avion(*fila) for fila in lector_csv]
        return lista_aeropuerto
    except FileNotFoundError:
        print(f"El archivo {nombre_archivo} no se encuentra.")
        return []

# Nombre del archivo CSV
nombre_archivo = 'Python/Ejercicios/3.Ficheros/datos_aeropuerto.csv'

# Cargar los datos de los Avion
aeropuerto = leeficheros(nombre_archivo)

#endregion


#1. Filtrar vuelos por ciudad de salida (Madrid)------------------------------------


#2.Obtener los modelos de avión.------------------------------------


#3.Filtrar vuelos con más de 150 pasajeros------------------------------------


#4.Numero total de pasajeros y otra con el total de la compañía Nimbus Airways------------------------------------


#5.Obtener vuelos entre dos fechas específicas


#6.Encontrar el vuelo con más pasajeros


#7.Calcular el número promedio de pasajeros por vuelo


#8.Genera un diccionario donde las claves sean las compañías y los valores el número de vuelos operados por cada una.


#9.Encuentra el vuelo con menos pasajeros de cada compañia


#10.Numero de pasajeros por compañia.
