#Jugando con operaciones
    #Suma
num1 = 2
num2 = 2
suma = num1 + num2
print(suma)

    #Resta
num1 = 128
num2 = 96
resta = num1 - num2
print(resta)

    #Multiplicación
num1 = 5
num2 = 5
multiplicacion = num1 * num2
print(multiplicacion)
    #Entero * string
cadena = "illo"
entero = 4
multiplicacion = cadena * entero
print(multiplicacion)

    #División
num1 = 56
num2 = 7
division = num1 / num2
print(division)

#Declara cada uno de los tipos de contenedores y comprueba sus propiedades Usando Println() para mostrarlo
"""
Tipos de contenedores
# Lista= [1,1,[1,2,3],1] 
#    -Elementos indexados 
#    -Mutable .append() .remove() .insert(posicion,elemento)
#    -Permite Repeticion

# Tuplas= (1,3)
#    -Elementos indexados 
#    -INMutable
#    -Permite Repeticion

# Conjuntos o "Set" {1,2,3,4,5}
#    -Elementos NO indexados 
#    -Mutable .add()
#    -NO Permite Repeticion

# Diccionario {Clave:Valor} Key value
#   diccionario1={ 
#      "pepe":12, 
#      "juan":{
#         "jose":1
#         }
#     } 
# [pepe,juan,roberto....] [12,32,12] , diccionario1["pepe"] -> 12
"""
#-------Lista---------
lista=["Gonzalo", "Iker", "Miguel"]
lista.append("Alba")
#print(lista)

#print(len(lista))
numElementos = len(lista)
#print(numElementos)

lista.insert(0, "Makoto")
#print(lista)

#lista.remove(3) - No funciona especificando índice
lista.remove("Miguel")
#print(lista)

lista.sort()
#print(lista)
lista.reverse()
#print(lista)

nombre = "Alba"
if nombre in lista:
    print(nombre + " está en la lista")
else:
    print(nombre + " no está en la lista")

#for nombre in lista:
#    print(nombre)


#-------Tupla---------
tupla = ("Gonzalo", "Iker", "Miguel")
#tupla.append("Alba") - Operación no posible, las tuplas no se pueden modificar
#print(tupla)

#Transformaciones de lista a tupla y viceversa
lista = list(tupla) 
lista.insert(1, "Antonio")
tupla = tuple(lista)
#print(tupla)

lista = list(tupla)
lista.remove("Miguel")
tupla = tuple(lista)
#print(tupla)

tuplaOrdenada = tuple(sorted(tupla))
#print(tuplaOrdenada)

tuplaDesordenada = tuple(reversed(tupla))
#print(tuplaDesordenada)

nombre = "Antonio"
if nombre in tupla:
    print(nombre + " está en la tupla")
else:
    print(nombre + " no está en la tupla")

for nombre in tupla:
    print(nombre)

#-------Conjunto/Set---------
setA = {1, 2, 3, 4}
setB = {5, 6, 7, 8}

setA.add(10)
setB.remove(7)

print(setA)
print(setB)

#-------Diccionario---------
# Crear un diccionario
persona = {
    "nombre": "Gonzalo",
    "edad": 19,
    "ciudad": "Sevilla"
}

print(persona["nombre"])
print(persona.get("edad"))

persona["ciclo-formativo"] = "ASIR"
persona["ciudad"] = "Olivares"

del persona["ciudad"]
print(persona)

for clave, valor in persona.items():
    print(f"{clave}: {valor}")

print(persona.keys())
print(persona.values())

extra = {"hobby": "Música", "edad": 20}
persona.update(extra)

if "nombre" in persona:
    print("La clave 'nombre' está en el diccionario.")