# lista=[1,2,3,4]
# for elemento in lista:
#     print(elemento)

# elementos=len(lista)
# i=0
# while i < elementos:
#     print(lista[i])
#     i=i+1
# lista=[]
# limite=int(input("Hasta qué número quieres contar: "))
# i=1
# while i < limite+1:
#     lista.append(i)
#     i=i+1
# print(lista)

#Pares del 5 al 57
# acumulador=1
# for i in range(5, 58):
#     if i%2==0:
#         acumulador=acumulador*i
#     else:
#         continue
# print(f"La suma de los pares del 5 al 57 es {acumulador:.2e}")

# nombres=["Ismael", "Ángela", "Miguel", "Luis", "Inma"]
# nombresOrdenados=sorted(nombres, reverse=True)
# print(nombresOrdenados)

# lista=[25, 43, 12, 91, 21, 4]

# lista2=zip(nombresOrdenados, lista)
# #Qué es lista2?
# #[("Ismael", 25), ("Angela", 43)....]
# provisional=("",0)
# for nombre,edad in lista2:
#     if edad > provisional[1]:
#         provisional=(nombre, edad)
# print(f"El más mayor es {provisional[0]}, la edad es {provisional[1]}")
# print(lista2)


niños = {
    "Fran": 12,
    "Rosa": 19,
    "Jesus": 24,
    "Ana": 30,
    "Carlos": 25,
}

edades=[]
for edad in niños.values():
    edades.append(edad)

print(edades)
edadesOrdenadas=sorted(edades)

print(edadesOrdenadas)

acumulador=[]
#edadesOrdenadas=[12, 19, 24, 25, 30]
for edadOrdenada in edadesOrdenadas:
    for edadNiño, nombreNiño in niños.items():
    #niños.items()=[("Fran", 12), ("Rosa", 19)]
        if edadOrdenada == edadNiño:
            acumulador.append((nombreNiño, edadOrdenada))
print(acumulador)