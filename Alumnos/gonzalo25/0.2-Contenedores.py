
# ------------------- CONTENEDORES -------------------

# ---- LISTAS (Mutable, ordenada, permite duplicados) ----
lista = ["Enero", "Febrero", "Marzo"]
print("Lista original:", lista)
  # Agregar elemento al final
lista.append("Abril")
  # Insertar en posición específica
lista.insert(0, "Diciembre")
 # Eliminar un elemento por valor
ultimo= lista.pop()   # Eliminar y devolver el último elemento
longitud_lista = len(lista)  # Obtener la cantidad de elementos

print("Lista modificada:", lista)
print("Último elemento eliminado:", ultimo)
print("Longitud de la lista:", longitud_lista)



 #Duplica la lista o tuplas
lista2=[000,000,000]
lista3=[1, 2, 3, 4, 5]
 #Concatena dos o mas listas o tuplas
listaConcatenada= lista2 + lista3
print(listaConcatenada)

# ---- TUPLAS (Inmutable, ordenada, permite duplicados) ----
tupla = ("Python", "Java", 27)
primer_elemento = tupla[0]  # Acceder al primer elemento
longitud_tupla = len(tupla)  # Longitud de la tupla
print("Tupla:", tupla)
print("Primer elemento:", primer_elemento)
print("Longitud de la tupla:", longitud_tupla)

# ---- DICCIONARIOS (Clave-Valor, mutable, sin orden específico hasta Python 3.7+) ----
diccionario = {"juego":"Resident Evil 4", "año":2005, "desarrolladora":"Capcom"}
print("Diccionario original:", diccionario)
valor = diccionario["año"]

 # Modificar un valor
diccionario["año"]=2023
 # Agregar un nuevo par clave-valor
diccionario["genero"]="Survival/Horror"
 # Eliminar un elemento
del diccionario["desarrolladora"]
 # longitud_diccionario =  # longitud del dict
longitudDiccionario= len(diccionario)

print("Diccionario modificado:", diccionario)
print("Longitud del diccionario:", longitudDiccionario)

# ---- CONJUNTOS (Mutable, no ordenado, sin duplicados) ----
conjunto1 = {1, 2, 3, 4, 5}
conjunto2 = {3, 4, 5, 6}
print("Conjunto original:", conjunto1)
  # Agregar elemento
conjunto1.add(7)
  # Eliminar un elemento si existe
conjunto1.discard(3)

tamano_conjunto = len(conjunto1)
print("Conjunto modificado:", conjunto1)
print("Tamaño del conjunto:", tamano_conjunto)

  # Unión: {1, 2, 3, 4, 5, 6}
  # Intersección: {3, 4, 5, 6}
  # Diferencia: {1}
  # Diferencia simétrica: {1}
union= conjunto1 | conjunto2
interseccion= conjunto1 & conjunto2
diferencia= conjunto1 - conjunto1
diferenciaSimetrica= conjunto1 ^ conjunto2

print("Unión", union)
print("Intersección", interseccion)
print("Diferencia", diferencia)
print("Diferencia simétrica", diferenciaSimetrica)