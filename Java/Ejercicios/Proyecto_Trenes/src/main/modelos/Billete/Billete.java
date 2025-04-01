package Proyecto_Trenes.src.main.modelos.Billete;
import Proyecto_Trenes.src.main.modelos.Pasajero.Pasajero;

public class Billete {
    // #region Atributos

    private int idTren;
    private TipoBillete clase;
    private double precio;
    private Pasajero pasajero; 

    // #endregion

    // #region Constructores

    public Billete(int idTren, TipoBillete clase, double precio, Pasajero pasajero) {
        this.idTren = idTren;
        this.clase = clase;
        this.precio = Math.round(precio * 100) / 100.0; // Redondea a 2 decimales
        this.pasajero = pasajero;
    }

    // #endregion

    // #region Getters y Setters
    
        // #region ##################### GETTERS ##############################

        public int getIdTren() {
            return idTren;
        }

        public TipoBillete getClase() {
            return clase;
        }

        public double getPrecio() {
            return precio;
        }

        public Pasajero getPasajero() {
            return pasajero;
        }
        // #endregion

        // #region ##################### SETTERS ##############################
        public void setIdTren(int idTren) {
            this.idTren = idTren;
        }
        
        public void setClase(TipoBillete clase) {
            this.clase = clase;
        }
        
        public void setPrecio(double precio) {
            this.precio = precio;
        }
        
        public void setPasajero(Pasajero pasajero) {
            this.pasajero = pasajero;
        }
        
        // #endregion

    // #endregion

    // #region ToString

    @Override
    public String toString() {
        return "Billete[" +
                " idTren= " + idTren +
                ", clase= " + clase +
                ", precio= " + precio +
                ", pasajero= " + pasajero +
                " ]";
    }

    // #endregion
}
