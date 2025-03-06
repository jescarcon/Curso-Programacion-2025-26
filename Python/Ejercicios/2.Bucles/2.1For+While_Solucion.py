#Ejercicios sobre bucles 

#0.Imprime los elementos de una lista (For/While Basico) ---------------------
lista=["Tomás",2,(5,"Ohio")]
for e in lista:
    print(e)

i=0   
while i<len(lista):
    print(lista[i])
    i +=1


#1.Imprime una lista de los numeros del 1 al 10 (Range) ---------------------
lista=[]
for i in range(11):
    lista.append(i)
print("Numeros del 1 al 11: ",lista)

lista=[]
i=1
while i< 11:
    lista.append(i)
    i+=1
print("Numeros del 1 al 11: ",lista)

#BONUS. Imprime los numeros del 1 al 100 de 10 en 10 ---------------------
lista=[]
for i in range(1,100,10):
    lista.append(i)
print("Numeros del 1 al 100 de 10 en 10: ",lista)

lista=[]
i=1
while i<=100:
    if i % 10 == 1:
        lista.append(i)
        i += 1   
print("Numeros del 1 al 100 de 10 en 10: ",lista)

#2.Suma los numeros impares del 5 al 57. (For Con If + Acumulador) ---------------------
suma=0
lista=[]
for i in range(5,58):
    if(i%2==1):
        suma+=i
        lista.append(i)
print(f"La lista de impares del 5 al 57: {lista} \n La suma es: {suma}")

suma = 0
lista = []
i = 5  
while i <= 57:
    if i % 2 == 1:
        suma += i
        lista.append(i)
    i += 1  

print(f"La lista de impares del 5 al 57: {lista} \nLa suma es: {suma}")

#3.Ordena los nombres en orden alfabetico (Clase anterior) ---------------------
nombres=["Mike","Abraham","Zoe","Beatriz","Tomás"]
print(sorted(nombres))

#4.Haz una lista con nombres y edades (ZIP) ---------------------
edades=[12,32,21,44,5]
lista_niños_edad=zip(nombres,edades)

#5 Cual es el niño mas grande de la lista_niños_edad , 2 formas (MAX, Bucle)
niño_mas_grande=("",0)
for nombre,edad in lista_niños_edad:
    if edad > niño_mas_grande[1]:
        niño_mas_grande=(nombre,edad)
print(f"El niño mas grande es {niño_mas_grande[0]} y tiene {niño_mas_grande[1]}")


niño_mas_grande = ("", 0)
i = 0 
while i < len(lista_niños_edad):
    nombre, edad = lista_niños_edad[i]
    if edad > niño_mas_grande[1]:
        niño_mas_grande = (nombre, edad)
    i += 1  
niño_mas_grande = max(lista_niños_edad, key=lambda x: x[0])
print(f"El niño más grande es {niño_mas_grande[1]} con {niño_mas_grande[0]} años.")

#7. Ordena los niños de menor a mayor ---------------------

niños = {
    "Fran": 12,
    "Rosa": 19,
    "Jesus": 24,
    "Ana": 30,
    "Carlos": 25,
}
res=[]
edades=sorted(niños.values())
for e in edades:
    for nombre,edad in niños.items() :
        if e==edad and (nombre, edad) not in res:
            res.append((nombre,edad))
print(res)

res = []
i = 0  
while i < len(edades):
    e = edades[i] 
    for nombre,edad in niños.items():
        if e==edad and (nombre, edad) not in res:
            res.append((nombre,edad))
    i += 1  

print(res)


#8. Haz un top 2.
print(res[:2])
ls= sorted(niños.items(), key = lambda x:x[1],reverse=True)[:2]
print(ls)


#9.Lista por comprension
print([e for e in sorted(niños.items(),key=lambda x:x[1],reverse=True) if e[1]%2==0][:2])

#Bonus reversed
for i in reversed(range(1, 10)): #1->9 y despues reverse
    print(i)

for i in range(10, 1, -1):  #10....2
    print(i)


#Palabras clave extra sum , max , min