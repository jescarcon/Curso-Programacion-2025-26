public class Main {
    public static void main(String[] args) {
        // Crear un avión con el constructor
        Avion avion1 = new Avion("Airbus930", 180, 930.0);
        
        // Usar setter para cambiar el modelo
        avion1.setModelo("AC-130");

        // Obtener y mostrar el modelo con el getter
        System.out.println("Modelo del avión: " + avion1.getModelo());

        // Mostrar capacidad y velocidad máxima
        System.out.println("Capacidad: " + avion1.getCapacidad());
        System.out.println("Velocidad Máxima: " + avion1.getVelocidadMaxima());

        // Probar los métodos personalizados
        avion1.despegar();
        avion1.aterrizar();

        // Crear otro avión para probar equals
        Avion avion2 = new Avion("AC-130", 200, 850.0);

        // Comparación de objetos
        System.out.println("¿Son los aviones iguales? " + avion1.equals(avion2));

        // Mostrar información del avión con toString
        System.out.println(avion1);
    }
}
