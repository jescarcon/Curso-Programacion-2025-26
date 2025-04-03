package Proyecto_Trenes.src.main.modelos.Estacion;
import java.util.List;

import Proyecto_Trenes.src.main.interfaces.Analizable;
import Proyecto_Trenes.src.main.modelos.Tren.Tren;

public class EstacionPublica extends Estacion implements Analizable{
    // #region Atributos

    private Double subvencionPublica;

    // #endregion
 
    // #region Constructores
    public EstacionPublica(String nombre, String ciudad, String pais, List<Tren> trenes, double subvencionPublica) {
        super(nombre, ciudad, pais, trenes);
        this.subvencionPublica = subvencionPublica;
    }
    // #endregion
     
    // #region Getters y Setters
         
        // #region ##################### GETTERS ##############################
        public Double getSubvencionPublica() {
            return subvencionPublica;
        }
        // #endregion 
            
        // #region ##################### SETTERS ##############################
        public void setSubvencionPublica(Double subvencionPublica) {
            this.subvencionPublica = subvencionPublica;
        }
    // #endregion
    
    // #endregion

    // #region ToString

    @Override
    public void mostrarInformacion() {
        super.mostrarInformacion();
        System.out.println("-----------------------------------------");
        System.out.println("+ Subvención pública: " + subvencionPublica + " euros");
        System.out.println("-----------------------------------------");

    }  
    // #endregion
 
    // #region Métodos de Interfaz Analizable

    @Override
    public double calcularIngresosTotales() {
        return subvencionPublica; // Para estaciones públicas, devuelve la subvención
    }
 
    // #endregion
}
