package Proyecto_Trenes.src.main.modelos.Estacion;
import java.util.List;

import Proyecto_Trenes.src.main.interfaces.Analizable;
import Proyecto_Trenes.src.main.modelos.Tren.Tren;


public class EstacionPrivada extends Estacion implements Analizable{
    // #region Atributos

    private List<String> empresasPatrocinadoras;

    // #endregion

    // #region Constructores

    public EstacionPrivada(String nombre, String ciudad, String pais, List<Tren> trenes, List<String> empresasPatrocinadoras) {
        super(nombre, ciudad, pais, trenes);
        this.empresasPatrocinadoras = empresasPatrocinadoras;
    }

    // #endregion

    // #region Getters y Setters
    
        // #region ##################### GETTERS ##############################
        public List<String> getEmpresasPatrocinadoras() {
            return empresasPatrocinadoras;
        }
        // #endregion 
                
        // #region ##################### SETTERS ##############################
        public void setEmpresasPatrocinadoras(List<String> empresasPatrocinadoras) {
            this.empresasPatrocinadoras = empresasPatrocinadoras;
        }
        // #endregion 
        
    // #endregion 
    
    // #region ToString
    
    @Override
    public void mostrarInformacion() {
        super.mostrarInformacion();
        System.out.println("--------------------------------------------------------------");
        System.out.println("+ Empresas patrocinadoras: " + empresasPatrocinadoras);
        System.out.println("--------------------------------------------------------------");

    }

    // #endregion

    // #region Métodos de Interfaz Analizable

    @Override
    public double calcularIngresosTotales() {
        double ingresosTotales = 0;
        for (Tren tren : getTrenes()) {
            ingresosTotales += tren.calcularIngresosTotales(); // Sumar los ingresos del tren (suma de sus billetes)
        }
        return ingresosTotales;
    }
    
    // #endregion

}

