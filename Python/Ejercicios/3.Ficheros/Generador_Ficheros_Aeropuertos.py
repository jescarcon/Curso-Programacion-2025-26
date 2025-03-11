import csv
import random
from datetime import datetime, timedelta

# Definimos los modelos de aviones y compañías aéreas ficticias
modelos_avion = ["Boeing 747", "Airbus A320", "Boeing 737", "Embraer 190", "Bombardier CRJ900"]
companias = ["AeroJet", "SkyWings", "FlyHigh", "BlueAir", "Nimbus Airways"]
ciudades = ["Madrid", "Barcelona", "Paris", "Londres", "Roma", "Berlin", "Lisboa", "Amsterdam"]

# Número de registros a generar
num_vuelos = 100

# Nombre del archivo CSV
archivo_csv = "datos_aeropuerto.csv"

# Función para generar una fecha aleatoria dentro de un rango
def generar_fecha_aleatoria():
    hoy = datetime.now()
    dias_anteriores = random.randint(1, 365)  # Hace entre 1 y 365 días
    fecha = hoy - timedelta(days=dias_anteriores)
    return fecha

# Creamos y escribimos los datos en el archivo CSV
with open(archivo_csv, mode="w", newline="") as file:
    writer = csv.writer(file)
    
    # Escribimos la cabecera del CSV
    writer.writerow(["ID Vuelo", "Modelo Avion", "Fecha Salida", "Fecha Entrada", 
                     "Ciudad Salida", "Ciudad Llegada", "Pasajeros", "Piloto", "Compañia"])
    
    for id_vuelo in range(1, num_vuelos + 1):
        modelo = random.choice(modelos_avion)
        ciudad_salida = random.choice(ciudades)
        ciudad_llegada = random.choice([ciudad for ciudad in ciudades if ciudad != ciudad_salida])  # Evita la misma ciudad de salida
        fecha_salida = generar_fecha_aleatoria().strftime("%Y-%m-%d %H:%M:%S")
        fecha_entrada = (datetime.strptime(fecha_salida, "%Y-%m-%d %H:%M:%S") + timedelta(hours=random.randint(1, 12))).strftime("%Y-%m-%d %H:%M:%S")
        pasajeros = random.randint(50, 300)
        piloto = f"Piloto {random.randint(1, 100)}"
        compania = random.choice(companias)
        
        writer.writerow([id_vuelo, modelo, fecha_salida, fecha_entrada, ciudad_salida, 
                         ciudad_llegada, pasajeros, piloto, compania])

print(f"Archivo '{archivo_csv}' generado con éxito. ✈️")
