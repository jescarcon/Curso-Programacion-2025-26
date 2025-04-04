package Proyecto_Trenes.src.main;

//#region Imports
import Proyecto_Trenes.src.main.servicios.InitService;
import Proyecto_Trenes.src.main.servicios.menu_service.MenuService;

//#endregion

public class App {

    public static void main(String[] args) {
        InitService.cargar_datos_iniciales();

        // ViewService.mostrarEstacionesPublicas();
        // ViewService.mostrarEstacionesPrivadas();
        // ViewService.mostrarPasajeros();
        // ViewService.mostrarTrenes();
        // ViewService.mostrarBilletes();

        MenuService.mostrarMenu();

    }

   
}