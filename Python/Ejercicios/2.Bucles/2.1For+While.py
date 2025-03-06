#Ejercicios sobre bucles Todo con While y For
import random


#0.Imprime los elementos de una lista (For/While Basico) ---------------------
# print("Con for")
# lista=["Jasmine", "Amy", "Dolores"]
# for elemento in lista:
#     print(elemento)

# print("Con while")
# i=0
# while i < len(lista):
#     print(lista[i])
#     i=i+1

#1.Imprime una lista de los numeros del 1 al 10 (Range) ---------------------
# lista=[]
# for i in range(1, 11):
#     lista.append(i)
# print(lista)

#BONUS. Imprime los numeros del 1 al 100 de 10 en 10 ---------------------
# lista=[]
# acumulador=0
# for i in range(1, 101, 10):
#     print(i)

#2.Suma los numeros impares del 5 al 57. (Con If + Acumulador) ---------------------
# lista=[]
# acumulador=0
# for i in range(5, 58):
#     if i%2==0:
#         acumulador=acumulador+i
# print("La suma de todos los pares del 5 al 57 es", acumulador)

#3.Ordena los nombres en orden alfabetico (Clase anterior) ---------------------
# nombres=["Makoto", "Yu", "Ren", "Tatsuya", "Naoya"]
# print(sorted(nombres))

#4.Haz una lista con nombres y edades (ZIP) ---------------------
# nombres=["Makoto", "Yu", "Ren", "Tatsuya", "Naoya"]
# edades=[17, 12, 33, 21, 24]

# nombresEdades=list(zip(nombres,edades))

#5 Cual es el niño mas grande de la lista_niños_edad , 2 formas (MAX, Bucle)
# mayor=("",0)
# for nombre,edad in nombresEdades:
#     if edad > mayor[1]:
#         mayor=(nombre,edad)
# print("El niño más grande es", mayor[0])

#7. Ordena los niños de menor a mayor ---------------------
# niños = {
#     "Fran": 12,
#     "Rosa": 19,
#     "Jesus": 24,
#     "Ana": 30,
#     "Carlos": 25,
# }
# niñosOrdenados=[]
# edadesOrdenadas=sorted(niños.values())
# for edad in edadesOrdenadas:
#     for nombre, edadNiño in niños.items():
#         if edadNiño == edad:
#             niñosOrdenados.append((nombre, edadNiño))
# print(niñosOrdenados)

#8. Haz un top 2 de la lista de antes pista usa [:].
niños = {
    "Fran": 12,
    "Rosa": 19,
    "Jesus": 24,
    "Ana": 30,
    "Carlos": 25,
}
niñosOrdenados=[]
edadesOrdenadas=sorted(niños.values())
for edad in edadesOrdenadas:
    for nombre, edadNiño in niños.items():
        print(niños.items())
        #niños.items() == dict_items([('Fran', 12), ('Rosa', 19), ('Jesus', 24), ('Ana', 30), ('Carlos', 25)])
        if edadNiño == edad:
            niñosOrdenados.append((nombre, edadNiño))
print(niñosOrdenados[:2])

#Palabras clave extra sum , max , min
numeros=[]
for i in range(1, 11):
    n=random.randint(25, 75)
    numeros.append(n)

print(numeros)
print("El máximo valor es", max(numeros))
print("El mínimo valor es", min(numeros))
print("La suma de todos los valores es", sum(numeros))