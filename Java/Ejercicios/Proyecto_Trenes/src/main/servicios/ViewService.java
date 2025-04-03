package Proyecto_Trenes.src.main.servicios;

//#region Imports
import java.util.List;
import Proyecto_Trenes.src.main.modelos.Billete.Billete;
import Proyecto_Trenes.src.main.modelos.Estacion.EstacionPrivada;
import Proyecto_Trenes.src.main.modelos.Estacion.EstacionPublica;
import Proyecto_Trenes.src.main.modelos.Pasajero.Pasajero;
import Proyecto_Trenes.src.main.modelos.Tren.Tren;
//#endregion

public class ViewService{
    
    public static void mostrarBilletes() {
        List<Billete> billetes=InitService.billetes;
        System.out.println("\n========================== Billetes ==========================");
        billetes.forEach(b -> System.out.println(b + "\n"));
    }

    public static void mostrarTrenes() {
        List<Tren> trenes=InitService.trenes;
        System.out.println("\n========================== Trenes ==========================");
        trenes.forEach(t -> System.out.println(t + "\n"));
    }

    public static void mostrarPasajeros() {
        List<Pasajero> pasajeros=InitService.pasajeros;
        System.out.println("\n========================== Pasajeros ==========================");
        pasajeros.forEach(p -> System.out.println(p + "\n"));
    }

    public static void mostrarEstacionesPrivadas() {
        List<EstacionPrivada> estacionesPrivadas=InitService.estacionesPrivadas;
        System.out.println("\n========================== Estaciones Privadas ==========================");
        estacionesPrivadas.forEach(ep -> {
            ep.mostrarInformacion();
            System.out.println("\n");
        });
    }

    public static void mostrarEstacionesPublicas() {
        List<EstacionPublica> estacionesPublicas=InitService.estacionesPublicas;
        System.out.println("\n========================== Estaciones Públicas ==========================");
        estacionesPublicas.forEach(ep -> {
            ep.mostrarInformacion();
            System.out.println("\n");
        });
    }
}
