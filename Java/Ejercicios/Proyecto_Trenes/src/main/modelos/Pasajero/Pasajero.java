package Proyecto_Trenes.src.main.modelos.Pasajero;

public class Pasajero {
    // #region Atributos

    private String nombre_completo;
    private String dni;
    private String nacionalidad;

    // #endregion

    // #region Constructores

    public Pasajero(String nombre_completo, String dni, String nacionalidad) {
        this.nombre_completo = nombre_completo;
        this.dni = dni;
        this.nacionalidad = nacionalidad;
    }

    // #endregion

    // #region Getters y Setters
    
        // #region ##################### GETTERS ##############################

        public String getNombreCompleto() {
            return nombre_completo;
        }

        public String getDni() {
            return dni;
        }

        public String getNacionalidad() {
            return nacionalidad;
        }
        
        // #endregion
        
        // #region ##################### SETTERS ##############################
        public void setNombreCompleto(String nombre_completo) {
            this.nombre_completo = nombre_completo;
        }
        
        public void setDni(String dni) {
            this.dni = dni;
        }
        
        public void setNacionalidad(String nacionalidad) {
            this.nacionalidad = nacionalidad;
        }        
        // #endregion

    // #endregion

    // #region ToString

    @Override
    public String toString() {
        return "Pasajero[" +
                " nombre completo= " + nombre_completo + 
                ", dni= " + dni +
                ", nacionalidad= " + nacionalidad + 
                " ]";
    }

    // #endregion
}
