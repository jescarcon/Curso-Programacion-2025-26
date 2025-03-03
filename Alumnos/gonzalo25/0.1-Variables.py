"""
Boletín de ejercicios: Variables
"""
import math

# ------------------- VARIABLES PRIMITIVAS -------------------

# Declaración de variables básicas
entero = 10          # int
flotante = 2.8       # float
cadena = "Hoy llueve"       # str ¿ Que diferencia hay entre "" y '' ??
booleano = False       # bool

# ------------------- OPERACIONES MATEMATICAS CON ENTEROS Y DECIMALES -------------------

suma = 2+2      # Suma entero + decimal = ¿Que da? 
resta = 90-60      # Resta entero + decimal = ¿Que da?
multiplicacion = 5*5    # Multiplicación por enteros = ¿Que da? 
multiplicacion_decimal = 6*4.2    # Multiplicación por decimales  = ¿Que da? 
potencia= 2**2                  # 2^2 como lo harias ¿? ¿Que pasa si haces potencia de decimales o numeros negativos?
division = 60/3        # División (resultado float)
division_entera = 80//21         # División ENTERA (con //) (resultado int) ¿se corta o se redondea?
modulo = 41%2           # Resto de la división (útil para ciertas formulas matemáticas)

#IMPROVISA SIN BUSCARLO AUNQUE NO LO CONSIGAS:
#BONUS 1:  HASTA DE 3 FORMAS  LA RAIZ CUADRADA
#BONUS 2 : Puedo declarar mas de una cosa a la vez en la misma linea?
raiz= math.sqrt(9)
nombre, apellidos="Gonzalo", "García Prieto"

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
print(f"Nombre y apellidos: {nombre} {apellidos}")

# ------------------- OPERACIONES CON STRINGS -------------------

# Concatenación de strings (suma)
cadena= "Tokyo"
cadena2= "Ghoul"
#Error - resultado= cadena*cadena 
resultado= cadena+cadena
print("Concatenación:", resultado)

# Repetición de strings 
repeticion = "Hola"*3
print("Repetición:", repeticion)

# Métodos básicos de strings
longitud= len(nombre)
mayusculas= nombre.upper()  # Convertir a mayúsculas
minusculas= nombre.lower()   # Convertir a minúsculas
primera_letra= nombre[0]   # Extraer el primer carácter y el (ultimo de dos formas)
ultima_letra= nombre[-1]  # Extraer el primer carácter y el (ultimo de dos formas)
#   O bien
# ultima_letra= nombre[len(nombre)-1]

print("Longitud:", longitud)
print("Mayúsculas:", mayusculas)
print("Minúsculas:", minusculas)
print(f"Primera letra: {primera_letra} y la última letra {ultima_letra}") #NUEVO! : STRING FORMAT utilidades? 
#diferencias con esto?? print("Primera letra:",primera_letra," y la segunda letra",ultima_letra) 
print("Primera letra:",primera_letra," y la última letra",ultima_letra)
# Como diferencia uno puede considerar que un print f es más cómodo para el programador
# En cambio la segunda forma es útil cuando se trata de imprimir datos de poco volumen

#BONUS 4: Que hace esto 
print("Qué hace esto?")
print(f"Multiplicacion decimal del BONUS 4: {multiplicacion_decimal:.6f}")
# Lo que esto hace es imprimir la variable multiplicacion_decimal, que tiene un valor float de 25.2, con 6 decimales