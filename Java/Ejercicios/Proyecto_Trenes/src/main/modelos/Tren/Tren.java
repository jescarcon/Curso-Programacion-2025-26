package Proyecto_Trenes.src.main.modelos.Tren;

import java.util.List;
import java.util.Objects;

import Proyecto_Trenes.src.main.interfaces.Analizable;
import Proyecto_Trenes.src.main.modelos.Billete.Billete;

public class Tren implements Analizable {
    // #region Atributos
    private static int contadorId = 0;  // Contador estático para gestionar el id auto-incremental
    private int id;
    private String compañia;
    private String ciudad_origen;
    private String ciudad_destino;
    private List<Billete> billetes;
    private Integer capacidad_maxima;
    private Integer ocupacion_actual;

    // #endregion

    // #region Constructores

    public Tren(String compañia, String ciudad_origen, String ciudad_destino, 
                List<Billete> billetes, Integer capacidad_maxima) {
        this.id =  ++contadorId;
        this.compañia = compañia;
        this.ciudad_origen = ciudad_origen;
        this.ciudad_destino = ciudad_destino;
        this.billetes = billetes;
        this.capacidad_maxima = capacidad_maxima;
        this.ocupacion_actual = billetes.size();
    }

    // #endregion

    // #region Getters y Setters

        // #region ##################### GETTERS ##############################

        public int getId() {
            return id;
        }

        public String getCompañia() {
            return compañia;
        }

        public String getCiudadOrigen() {
            return ciudad_origen;
        }

        public String getCiudadDestino() {
            return ciudad_destino;
        }

        public List<Billete> getBilletes() {
            return billetes;
        }

        public Integer getCapacidadMaxima() {
            return capacidad_maxima;
        }

        public Integer getOcupacionActual() {
            return ocupacion_actual;
        }

        // #endregion
        
        // #region ##################### SETTERS ##############################
        public void setId(int id) {
            this.id = id;
        }
        
        public void setCompañia(String compañia) {
            this.compañia = compañia;
        }
        
        public void setCiudadOrigen(String ciudad_origen) {
            this.ciudad_origen = ciudad_origen;
        }
        
        public void setCiudadDestino(String ciudad_destino) {
            this.ciudad_destino = ciudad_destino;
        }
        
        public void setBilletes(List<Billete> billetes) {
            this.billetes = billetes;
        }
        
        public void setCapacidadMaxima(Integer capacidad_maxima) {
            this.capacidad_maxima = capacidad_maxima;
        }
        
        // #endregion

    // #endregion

    // #region HashCode-Equals

    @Override
    public int hashCode() {
        return Objects.hash(id, compañia, ciudad_origen, ciudad_destino, billetes, capacidad_maxima, ocupacion_actual);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Tren tren = (Tren) obj;
        return id == tren.id &&
                Objects.equals(compañia, tren.compañia) &&
                Objects.equals(ciudad_origen, tren.ciudad_origen) &&
                Objects.equals(ciudad_destino, tren.ciudad_destino) &&
                Objects.equals(billetes, tren.billetes) &&
                Objects.equals(capacidad_maxima, tren.capacidad_maxima) &&
                Objects.equals(ocupacion_actual, tren.ocupacion_actual);
    }

    // #endregion

    // #region ToString

    @Override
    public String toString() {
        return "-Tren[" +
                " id=" + id +
                ", compañia= " + compañia +
                ", ciudad_origen= " + ciudad_origen +
                ", ciudad_destino= " + ciudad_destino+
                ", billetes= " + billetes +
                ", capacidad_maxima= " + capacidad_maxima  +
                ", ocupacion_actual= " + ocupacion_actual +
                " ]";
    }

    // #endregion
    
    // #region Métodos de Interfaz Analizable

    @Override
    public double calcularIngresosTotales() {
        double ingresosTotales = 0;
        for (Billete billete : billetes) {
            ingresosTotales += billete.getPrecio();
        }
        return ingresosTotales;
    }

    // #endregion

    //#region Métodos Adicionales
    public void agregarBillete(Billete billete) {
        this.billetes.add(billete);
        this.ocupacion_actual = this.billetes.size();
    }
    
    //#endregion
}
