import java.util.Objects;

class Avion {
    private String modelo;

    // Constructor
    public Avion(String modelo) {
        this.modelo = modelo;
    }

    // Getters
    public String getModelo() {
        return modelo;
    }
    //Setters
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    // toString()
    @Override
    public String toString() {
        return "Avion{" +
                "modelo='" + modelo + '\'' +
                
                '}';
    }

    // equals() y hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Avion avion = (Avion) o;
        return Objects.equals(modelo, avion.modelo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(modelo);
    }
}
