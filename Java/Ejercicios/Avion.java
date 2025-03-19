public class Avion {
    // Atributos
    private String modelo;
    private int capacidad;
    private double velocidadMaxima;

    // Constructor
    public Avion(String modelo, int capacidad, double velocidadMaxima) {
        this.modelo = modelo;
        this.capacidad = capacidad;
        this.velocidadMaxima = velocidadMaxima;
    }

    // Getters y Setters
    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public int getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(int capacidad) {
        this.capacidad = capacidad;
    }

    public double getVelocidadMaxima() {
        return velocidadMaxima;
    }

    public void setVelocidadMaxima(double velocidadMaxima) {
        this.velocidadMaxima = velocidadMaxima;
    }

    // HashCode & Equals
    @Override
    public int hashCode() {
        return modelo.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Avion avion = (Avion) obj;
        return modelo.equals(avion.modelo);
    }

    // ToString
    @Override
    public String toString() {
        return "Avion{" +
                "modelo='" + modelo + '\'' +
                ", capacidad=" + capacidad +
                ", velocidadMaxima=" + velocidadMaxima +
                '}';
    }

    // Otros métodos personalizados
    public void despegar() {
        System.out.println("El avión " + modelo + " está despegando.");
    }

    public void aterrizar() {
        System.out.println("El avión " + modelo + " está aterrizando.");
    }
}
