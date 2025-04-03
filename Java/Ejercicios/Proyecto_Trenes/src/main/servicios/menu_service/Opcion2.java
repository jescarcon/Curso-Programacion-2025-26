package Proyecto_Trenes.src.main.servicios.menu_service;

import java.util.Scanner;

public class Opcion2 {
    private static final Scanner scanner = new Scanner(System.in);

    public static void consultarPatrocinadorSubvencion() {
        int opcion;

        System.out.println("\nSeleccione qué estación desea inspeccionar:");
        System.out.print("Introduzca el id de una estación o enter para volver atrás.");
        opcion = scanner.nextInt();
        scanner.nextLine(); // Consumir el salto de línea
        
    }
}
