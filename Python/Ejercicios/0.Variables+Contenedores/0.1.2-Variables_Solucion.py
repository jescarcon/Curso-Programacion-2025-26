"""
Boletín de ejercicios: Variables
"""

# ------------------- VARIABLES PRIMITIVAS -------------------

# Declaración de variables básicas
entero =  1          # int
flotante = 1.0       # float
cadena =  "Hola"      # str ¿ Que diferencia hay entre "" y '' ?? - Permite escribir comillas alternando fuera de un tipo y dentro otra "Hola, 'mundo' "
booleano = True       # bool

# ------------------- OPERACIONES MATEMATICAS CON ENTEROS Y DECIMALES -------------------

suma = 1+1.0      # Suma entero + decimal = ¿Que da? - Decimal
resta = 1-1.5      # Resta entero + decimal = ¿Que da? - Decimal o negativo decimal
multiplicacion =  2*2   # Multiplicación por enteros = ¿Que da? -Entero
multiplicacion_decimal = 2*2.5    # Multiplicación por decimales  = ¿Que da? -Decimal
potencia= 2**2                  # 2^2 como lo harias ¿? ¿Que pasa si haces potencia de decimales o numeros negativos? Da decimal y si respeta negativos
division =  2/2       # División (resultado float)

#Alternativas divisiones
print(round(7 / 2)) #Redondea correctamente considera negativos, si es 4.5 deja 4
import math
print(math.ceil(4.2))  # 5 redondea para arriba considera negativos
print(math.floor(4.2))  # 4  redondea para abajo considera negativos

#---Curisidad Matematica: Los negativos van al reves, entonces puedes hacerlo usando signos
print(-(-4.2 // 1))  # Ceil sin math.ceil()
print(4.2 // 1)      # Floor sin math.floor()

division_entera = 2//2         # División ENTERA (con //) (resultado int) ¿se corta o se redondea? -Redondea abajo,respetando signos y siempre deja decimal
modulo =  2%2          # Resto de la división (útil para ciertas formulas matemáticas)

#IMPROVISA SIN BUSCARLO AUNQUE NO LO CONSIGAS:

#BONUS 1:  HASTA DE 3 FORMAS  LA RAIZ CUADRADA
raiz= 2**0.5  #Mates Raiz de 2
import math
raiz2= math.sqrt(2)  #Libreria math
raiz3= pow(2,0.5)  #sin libreria

#BONUS 2 : Puedo declarar mas de una cosa a la vez en la misma linea?
a,b=2,3 #Ahorra una instruccion

#BONUS 3: Como hago para que 5.0 se transforme en 5 (Casting)
a=2.0
b=int(a)

# Imprimir resultados
print("Suma:", suma)
print("Resta:", resta)
print("Multiplicación:", multiplicacion)
print("Multiplicación decimal:", multiplicacion_decimal)
print("Potencia:", potencia)
print("División:", division)
print("División Entera:", division)
print("Módulo:", modulo)
print("Raiz:", raiz)

# ------------------- OPERACIONES CON STRINGS -------------------

# Concatenación de strings (suma)
cadena="Hola"
cadena2 ="Mundo"
resultado =cadena+cadena2    # "Hola Mundo"  ¿ Que pasa si  +, -, *, /, ** , // ? Solo + junta y * duplica
print("Concatenación:", resultado)

# Repetición de strings 
repeticion =  cadena*2 # "HolaHolaHola"
print("Repetición:", repeticion)

# Métodos básicos de strings
longitud =  len(cadena) # Longitud del string
mayusculas =  cadena.upper()  # Convertir a mayúsculas
minusculas = cadena.lower()  # Convertir a minúsculas
primera_letra = cadena[0]   # Extraer el primer carácter 
ultima_letra =  cadena[-1]  # Extraer el ultimo de dos formas
ultima_letra2 =  cadena[len(cadena)-1]  # 2

print("Longitud:", longitud)
print("Mayúsculas:", mayusculas)
print("Minúsculas:", minusculas)
print(f"Primera letra: {primera_letra} y la segunda letra {ultima_letra}") #NUEVO! : STRING FORMAT utilidades? 
#diferencias con esto?? print("Primera letra:",primera_letra," y la segunda letra",ultima_letra) 

#BONUS 6: Que hace esto 
print(f"Multiplicacion decimal del BONUS 4: {multiplicacion_decimal:.6f}")
#Recorta formatea y recorta un numero a 6 decimales