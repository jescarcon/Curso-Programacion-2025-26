
# .2f: Formatea un número flotante con dos decimales. Si pones mas del máximo añade 0s
valor = 3.141592
print(f"Valor con 2 decimales: {valor:.2f}")  # Salida: 3.14 redondeada

# Formatea un número con 0s a la izquierda 
valor = 42
print(f"Valor entero: {valor:05}")  # Salida: 00042

# x: Formatea un número entero como hexadecimal en minúsculas. o X para mayúsculas
valor = 255
print(f"Valor en hexadecimal: {valor:x}")  # Salida: ff

# .2e: Formatea un número en notación científica con 2 decimales.
valor = 12345.6789
print(f"Valor en notación científica: {valor:.2e}")  # Salida: 1.23e+04

# .4g: Elige el formato más adecuado (decimal o notación científica) con 4 dígitos significativos.
valor = 12345.6789
print(f"Valor en formato general: {valor:.4g}")  

# 10s: Formatea una cadena para que ocupe al menos 10 caracteres, rellenando con espacios a la izquierda si es necesario.
texto = "Hola"
print(f"Texto con 10 caracteres: {texto:10s}")  # Salida: 'Hola      '