"""
Ejercicios de Listas por Comprensión en Python
"""

#region Nivel Fácil

# 1. Generar una lista de los primeros 10 números cuadrados
ejercicio_facil_1 = [x**2 for x in range(1, 11)]

# 2. Crear una lista con los números pares del 1 al 20
ejercicio_facil_2 = [x for x in range(1, 21) if x % 2 == 0]

# 3. Dado un numero quiero una lista donde sus elementos sea su tabla de multiplicar [ '2x1=2', '2x2=4' ...]
ejercicio_facil_3 = [f"{2}x{b}={2*b}" for b in range(1,11)]

# 4. Filtrar los números que sean múltiplos de 3 en un rango del 1 al 50
ejercicio_facil_4 = [x for x in range(1, 51) if x % 3 == 0]

# 5. Convertir una lista de palabras en una lista con sus longitudes
palabras = ["Python", "Listas", "Comprensión"]
ejercicio_facil_5 = [len(palabra) for palabra in palabras]

# 6. Generar una lista con los cuadrados de los números impares del 1 al 20
ejercicio_facil_6 = [x**2 for x in range(1, 21) if x % 2 != 0]

# 7. Obtener una lista con las vocales de una cadena dada
cadena = "Programación en Python"
ejercicio_facil_7 = [letra for letra in cadena if letra.lower() in "aeiou"]

#8. Generar una lista de tuplas (número, cuadrado, cubo) para los números del 1 al 10
ejercicio_facil_8 = [(x, x**2, x**3) for x in range(1, 11)]

# 9. Transformar una matriz (lista de listas) en una lista plana
matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
ejercicio_facil_9 = [num for fila in matriz for num in fila]

# 10. Dado un diccionario de nombres y edades, obtener una lista con los nombres de las personas mayores de 18 años
personas = {"Ana": 25, "Luis": 17, "Pedro": 30, "Maria": 15}
ejercicio_facil_10 = [nombre for nombre, edad in personas.items() if edad > 18]

# Imprimir resultados
# print("Ejercicio 1:", ejercicio_facil_1)
# print("Ejercicio 2:", ejercicio_facil_2)
# print("Ejercicio 3:", ejercicio_facil_3)
# print("Ejercicio 4:", ejercicio_facil_4)
# print("Ejercicio 5:", ejercicio_facil_5)
# print("Ejercicio 6:", ejercicio_facil_6)
# print("Ejercicio 7:", ejercicio_facil_7)
# print("Ejercicio 8:", ejercicio_facil_8)
# print("Ejercicio 9:", ejercicio_facil_9)
# print("Ejercicio 10:", ejercicio_facil_10)

#endregion

#region Nivel Medio

#1. Mezcla todas las posibilidades entre modelos y pilotos

modelos = ["Boeing 737", "Airbus A320", "Embraer 190"]
pilotos = ["Piloto 1", "Piloto 2", "Piloto 3"]

ejercicio_medio_1 = [(modelo, piloto) for modelo in modelos for piloto in pilotos]

#2.Usando random.randint(x,y) crea combinaciones de (modelos,salida,llegada,pasajeros) BONUS: ¿Y si quiero filtrar por los de +200 pasajeros?

import random

modelos = ["Boeing 737", "Airbus A320", "Embraer 190"]
ciudades = ["Madrid", "Barcelona", "Lisboa"]

ejercicio_medio_2 = [(modelo, salida, llegada, random.randint(100, 250)) 
          for modelo in modelos 
          for salida in ciudades 
          for llegada in ciudades if salida != llegada]

ejercicio_medio_2_BONUS=[(modelo, salida, llegada, pasajeros) for modelo, salida, llegada, pasajeros in ejercicio_medio_2 if pasajeros>200  ]


# 4. Generar una lista de diccionarios {modelo:pasajeros} con datos ficticios de vuelos. Usa random.choice(lista) y random.randint(x,y)

ejercicio_medio_4 = [
    {"modelo": random.choice(modelos), 
     "pasajeros": random.randint(100, 300)}
    for _ in range(10)
]

# 5. Dada una lista de palabras, obtener una lista de las palabras que tienen más de 5 letras y empiezan con vocal
palabras = ["avión", "tren", "aeropuerto", "autobús", "viaje", "itinerario"]
ejercicio_medio_5 = [palabra for palabra in palabras if len(palabra) > 5 and palabra[0].lower() in "aeiou"]

# 6. Filtrar de una lista de vuelos solo aquellos cuyo modelo es "Boeing 737" y tienen más de 150 pasajeros
vuelos = [
    ("Boeing 737", "Madrid", "Barcelona", 180),
    ("Airbus A320", "Londres", "Roma", 121),
    ("Boeing 737", "Lisboa", "Paris", 95),
    ("Embraer 190", "Berlin", "Amsterdam", 200),
    ("Boeing 737", "Madrid", "Londres", 220),
]

ejercicio_medio_6 = [vuelo for vuelo in vuelos if vuelo[0] == "Boeing 737" and vuelo[3] > 150]

# 7. Crear una lista con los vuelos ordenados por número de pasajeros de forma descendente
ejercicio_medio_7 = sorted(vuelos, key=lambda x: x[3], reverse=True)

# 8. Obtener una lista de vuelos en los que el número de pasajeros sea múltiplo de 10
ejercicio_medio_10 = [vuelo for vuelo in vuelos if vuelo[3] % 10 == 0]

# 9. Crear una lista de cadenas con formato "Salida - Llegada: Pasajeros" para todos los vuelos
ejercicio_medio_11 = [f"{vuelo[1]} - {vuelo[2]}: {vuelo[3]} pasajeros" for vuelo in vuelos]

# 10. Generar una lista de tuplas con los vuelos donde la ciudad de llegada es más larga en caracteres que la de salida
ejercicio_medio_12 = [(vuelo[1], vuelo[2]) for vuelo in vuelos if len(vuelo[2]) > len(vuelo[1])]


# Imprimir resultados

# print(ejercicio_medio_1)
# print(ejercicio_medio_2)
# print(ejercicio_medio_2_BONUS)
# print(ejercicio_medio_3)
# print(ejercicio_medio_4)
# print(ejercicio_medio_5)
# print(ejercicio_medio_6)
# print(ejercicio_medio_7)

#endregion

#region Nivel Dificil

# 1. Crear un diccionario donde las claves sean los modelos de aviones y los valores sean un conjunto de ciudades a las que vuelan.
# El conjunto de ciudades debe ser único (sin repeticiones).
ejercicio_dificil_1 = {modelo: set(vuelo[2] for vuelo in vuelos if vuelo[0] == modelo) for modelo in set(vuelo[0] for vuelo in vuelos)}

# 2. Calcular el número total de pasajeros por ciudad de salida, utilizando un diccionario. Las claves son las ciudades y los valores son la suma de los pasajeros.
ejercicio_dificil_2 = {ciudad: sum(vuelo[3] for vuelo in vuelos if vuelo[1] == ciudad) for ciudad in set(vuelo[1] for vuelo in vuelos)}

# 3. Crear una lista de tuplas con el modelo y el número total de pasajeros transportados para cada modelo, ordenado de mayor a menor número de pasajeros.
ejercicio_dificil_4 = sorted([(modelo, sum(vuelo[3] for vuelo in vuelos if vuelo[0] == modelo)) for modelo in set(vuelo[0] for vuelo in vuelos)], key=lambda x: x[1], reverse=True)

# 4. Generar un set con las combinaciones únicas de (ciudad de salida, ciudad de llegada) para evitar vuelos repetidos entre las mismas ciudades.
ejercicio_dificil_5 = set((vuelo[1], vuelo[2]) for vuelo in vuelos if vuelo[1] != vuelo[2])


# print(ejercicio_dificil_1)
# print(ejercicio_dificil_2)
# print(ejercicio_dificil_3)
# print(ejercicio_dificil_4)
# print(ejercicio_dificil_5)
# print(ejercicio_dificil_X)
# print(ejercicio_dificil_X2)

# X. Crear un diccionario donde las claves sean los modelos de avión y los valores sean la cantidad total de pasajeros transportados
ejercicio_dificil_X = {modelo: sum(vuelo[3] for vuelo in vuelos if vuelo[0] == modelo) for modelo in set(v[0] for v in vuelos)}

# X2. Encontrar la ciudad con la mayor cantidad de vuelos (es decir, la ciudad con más vuelos de salida) usando un diccionario.
ejercicio_dificil_X2 = max({ciudad: sum(1 for vuelo in vuelos if vuelo[1] == ciudad) for ciudad in set(vuelo[1] for vuelo in vuelos)}, key=lambda x: ejercicio_dificil_2[x])

#endregion
