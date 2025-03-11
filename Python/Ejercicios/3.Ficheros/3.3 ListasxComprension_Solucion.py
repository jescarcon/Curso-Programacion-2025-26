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

vuelos_madrid = [vuelo for vuelo in aeropuerto if vuelo.ciudad_salida == "Madrid"]
#print(vuelos_madrid)


#2. Obtener los modelos de avión.------------------------------------

modelos= set([vuelo.modelo for vuelo in aeropuerto])
#print(modelos)


#3. Filtrar vuelos con más de 150 pasajeros------------------------------------

vuelos_mas_150 = [vuelo for vuelo in aeropuerto if int(vuelo.pasajeros) > 150]
#print(vuelos_mas_150)

#4. Numero total de pasajeros y otra con el total de la compañía Nimbus Airways------------------------------------

total_pasajeros = sum([int(vuelo.pasajeros) for vuelo in aeropuerto])
total_pasajeros_Nimbus = sum([int(vuelo.pasajeros) for vuelo in aeropuerto if vuelo.compania=="Nimbus Airways"])

print(f"Total pasajeros: {total_pasajeros} , de los cuales son de Nimbus: {total_pasajeros_Nimbus}")

#5.Obtener vuelos entre dos fechas específicas
vuelos_filtrados = [vuelo for vuelo in aeropuerto if "2024-12-14 00:00:00" < vuelo.fecha_salida < "2024-12-16 00:00:00"]
print(vuelos_filtrados)

#6. Encontrar el vuelo con más pasajeros
vuelo_max_pasajeros = max(aeropuerto, key=lambda vuelo: int(vuelo.pasajeros))
print(vuelo_max_pasajeros)

#7. Calcular el número promedio de pasajeros por vuelo
promedio_pasajeros = total_pasajeros / len(aeropuerto) if aeropuerto else 0
print(promedio_pasajeros)

#8.Genera un diccionario donde las claves sean las compañías y los valores el número de vuelos operados por cada una.
vuelos_por_compania = {compania: sum(1 for vuelo in aeropuerto if vuelo.compania == compania)
                        for compania in set(vuelo.compania for vuelo in aeropuerto)}
print(vuelos_por_compania)

#9.Encuentra el vuelo con menos pasajeros de cada compañia
vuelos_min_por_compania = {
    compania: min(
        [vuelo for vuelo in aeropuerto if vuelo.compania == compania],
        key=lambda vuelo: int(vuelo.pasajeros)
    )
    for compania in set(vuelo.compania for vuelo in aeropuerto)
}

print(vuelos_min_por_compania)

#10. Numero de pasajeros por compañia.
pasajeros_por_modelo = {modelo: sum(int(vuelo.pasajeros) for vuelo in aeropuerto if vuelo.modelo == modelo)
                         for modelo in set(vuelo.modelo for vuelo in aeropuerto)}
print(pasajeros_por_modelo, "total: ",sum(pasajeros_por_modelo.values()))