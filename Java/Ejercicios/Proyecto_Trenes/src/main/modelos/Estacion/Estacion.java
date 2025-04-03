package Proyecto_Trenes.src.main.modelos.Estacion;

import java.util.List;

import Proyecto_Trenes.src.main.modelos.Tren.Tren;

abstract class Estacion {
    // #region Atributos

    private String nombre;
    private String ciudad;
    private String pais;
    private List<Tren> trenes;

    // #endregion

    // #region Constructores
    
    public Estacion(String nombre, String ciudad, String pais, List<Tren> trenes) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.pais = pais;
        this.trenes = trenes;
    }
    
    // #endregion

    // #region Getters y Setters

    // #region ##################### GETTERS ##############################

    public String getNombre() {
        return nombre;
    }

    public String getCiudad() {
        return ciudad;
    }

    public String getPais() {
        return pais;
    }

    public List<Tren> getTrenes() {
        return trenes;
    }
    
    // #endregion

    // #region ##################### SETTERS ##############################
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public void setTrenes(List<Tren> trenes) {
        this.trenes = trenes;
    }
    // #endregion

    // #endregion

    // #region HashCode-Equals
    @Override
    public int hashCode() {
        int result = 0;

        result = 31 * (nombre != null ? nombre.hashCode() : 0)
                + (ciudad != null ? ciudad.hashCode() : 0)
                + (pais != null ? pais.hashCode() : 0)
                + (trenes != null ? trenes.hashCode() : 0);

        return result;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;

        Estacion estacion = (Estacion) obj;

        if (!nombre.equals(estacion.nombre))
            return false;
        if (!ciudad.equals(estacion.ciudad))
            return false;
        if (!pais.equals(estacion.pais))
            return false;
        if (trenes != null ? !trenes.equals(estacion.trenes) : estacion.trenes != null)
            return false;

        return true;
    }
    // #endregion

    // #region ToString
    
    public void mostrarInformacion() {
        System.out.println("==========================================================");
        System.out.println("+ Estación: " + nombre + " en " + ciudad + ", " + pais);
        System.out.println("\n+ Trenes operativos: \n");
        for(Tren t: trenes){
            System.out.println(t+"\n");
        }

    }
    // #endregion

}