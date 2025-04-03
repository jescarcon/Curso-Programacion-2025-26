package Proyecto_Trenes.src.main.servicios.menu_service;

import java.util.Scanner;

public class MenuService {

    private static final Scanner scanner = new Scanner(System.in);

    public static void mostrarMenu() {
        int opcion;
        do {
            imprimirOpciones(); // Opciones del Menú
            System.out.print("Seleccione una opción: ");
            opcion = scanner.nextInt();
            scanner.nextLine(); // Consumir el salto de línea

            switch (opcion) {
                case 1:
                    Opcion1.consultarEstaciones(); // Delegando a la clase Opcion1
                    break;
                case 2:
                    Opcion2.consultarPatrocinadorSubvencion(); // Delegando a la clase Opcion1
                    break;
                case 0:
                    System.out.println("Saliendo de la aplicación...");
                    break;
                default:
                    System.out.println("Opción no válida. Inténtelo de nuevo.");
            }
        } while (opcion != 0);

        scanner.close();
    }

    private static void imprimirOpciones() {
        System.out.println("\n--- MENÚ DE LA APLICACIÓN ---");
        System.out.println("1) Consultar estaciones gestionadas.");
        System.out.println("2) Consultar patrocinadores (en estaciones privadas) o subvención (en estaciones públicas) de cierta estación.");

        System.out.println("0) Salir");
    }
}
