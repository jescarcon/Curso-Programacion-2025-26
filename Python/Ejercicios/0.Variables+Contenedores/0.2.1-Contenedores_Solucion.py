
# ------------------- CONTENEDORES -------------------

# ---- LISTAS (Mutable, ordenada, permite duplicados) ----
lista = [1, 2, 3, 4, 5]
print("Lista original:", lista)
lista.append(6)  # Agregar elemento al final
lista.insert(2, 99)  # Insertar en posición específica
lista.remove(3)  # Eliminar un elemento por valor
ultimo = lista.pop()  # Eliminar y devolver el último elemento
longitud_lista = len(lista)  # Obtener la cantidad de elementos

print("Lista modificada:", lista)
print("Último elemento eliminado:", ultimo)
print("Longitud de la lista:", longitud_lista)

print("Lista duplicada",lista*2) #Duplica la lista
lista2=[000,000,000]
print("Lista duplicada",lista+lista2) #Concatena dos o mas listas


# ---- TUPLAS (Inmutable, ordenada, permite duplicados) ----
tupla = (10, 20, 30, 40)
primer_elemento = tupla[0]  # Acceder al primer elemento
longitud_tupla = len(tupla)  # Longitud de la tupla
print("Tupla:", tupla)
print("Primer elemento:", primer_elemento)
print("Longitud de la tupla:", longitud_tupla)




# ---- DICCIONARIOS (Clave-Valor, mutable, sin orden específico hasta Python 3.7+) ----
diccionario = {"nombre": "Juan", "edad": 30, "ciudad": "Madrid"}
print("Diccionario original:", diccionario)
valor = diccionario["nombre"]  # Acceder a un valor

diccionario["edad"] = 31  # Modificar un valor
diccionario["profesion"] = "Ingeniero"  # Agregar un nuevo par clave-valor

del diccionario["ciudad"]  # Eliminar un elemento
longitud_diccionario = len(diccionario)

print("Diccionario modificado:", diccionario)
print("Longitud del diccionario:", longitud_diccionario)

# ---- CONJUNTOS (Mutable, no ordenado, sin duplicados) ----
conjunto1 = {1, 2, 3, 4, 5}
conjunto2 = {3, 4, 5, 6}
print("Conjunto original:", conjunto1)
conjunto1.add(6)  # Agregar elemento
conjunto1.discard(2)  # Eliminar un elemento si existe

tamano_conjunto = len(conjunto1)
print("Conjunto modificado:", conjunto1)
print("Tamaño del conjunto:", tamano_conjunto)

#{1,3,4,5,6} {3,4,5,6}
print(conjunto1 | conjunto2)  # Unión: {1, 2, 3, 4, 5, 6}
print(conjunto1 & conjunto2)  # Intersección: {3, 4, 5, 6}
print(conjunto1 - conjunto2)  # Diferencia: {1}
print(conjunto1 ^ conjunto2)  # Diferencia simétrica: {1} (Solo los que estan en 1 de los dos)


