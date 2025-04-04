package Proyecto_Trenes.src.main.servicios.menu_service;

import java.util.Scanner;
import Proyecto_Trenes.src.main.servicios.ViewService;

public class Opcion1 {

    private static final Scanner scanner = new Scanner(System.in);

    public static void consultarEstaciones() {
        int opcion;
        do {
            System.out.println("\nSeleccione qué estaciones desea ver:");
            System.out.println("1) Estaciones públicas");
            System.out.println("2) Estaciones privadas");
            System.out.println("3) Volver atrás");
            System.out.print("Seleccione una opción: ");
            opcion = scanner.nextInt();
            scanner.nextLine(); // Consumir el salto de línea

            switch (opcion) {
                case 1:
                    verEstacionesPublicas();  // Ver estaciones públicas
                    break;
                case 2:
                    verEstacionesPrivadas();  // Ver estaciones privadas
                    break;
                case 3:
                    System.out.println("Volviendo al menú principal...");
                    break;  
                default:
                    System.out.println("Opción no válida. Inténtelo de nuevo.");
            }
        } while (opcion != 3);  // El ciclo se detiene cuando se selecciona "volver atrás"
    }

    private static void verEstacionesPublicas() {
        System.out.println("Mostrando estaciones públicas...");
        ViewService.mostrarEstacionesPublicas();
    }

    private static void verEstacionesPrivadas() {
        System.out.println("Mostrando estaciones privadas...");
        ViewService.mostrarEstacionesPrivadas();
    }
}
