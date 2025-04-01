package Proyecto_Trenes.src.main.servicios;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import Proyecto_Trenes.src.main.modelos.Billete.Billete;
import Proyecto_Trenes.src.main.modelos.Billete.TipoBillete;
import Proyecto_Trenes.src.main.modelos.Estacion.EstacionPrivada;
import Proyecto_Trenes.src.main.modelos.Estacion.EstacionPublica;
import Proyecto_Trenes.src.main.modelos.Pasajero.Pasajero;
import Proyecto_Trenes.src.main.modelos.Tren.Tren;

public class InitService {
    // #region Variables
    public static Integer MAX_ESTACIONES_PUBLICAS = 5;
    public static Integer MAX_ESTACIONES_PRIVADAS = 5;

    public static Integer MAX_TRENES = 5;
    public static Integer MAX_BILLETES = 5;
    public static Integer MAX_PASAJEROS = 5;

    // #region Datos Base
    public static List<EstacionPublica> estacionesPublicas = new ArrayList<>();
    public static List<EstacionPrivada> estacionesPrivadas = new ArrayList<>();

    public static List<Pasajero> pasajeros = new ArrayList<>();
    public static List<Tren> trenes = new ArrayList<>();
    public static List<Billete> billetes = new ArrayList<>();

    public static List<String> compañias = List.of("Renfe", "SNCF", "Deutsche Bahn", "Eurostar", "Amtrak", "Trenitalia",
            "Thalys",
            "Alstom", "MTR Corporation", "China Railway", "JR East", "SBB CFF FFS", "Via Rail",
            "NS (Nederlandse Spoorwegen)", "Canadian National Railway", "Union Pacific", "Bombardier",
            "KTX (Korea Train Express)", "OEBB (Österreichische Bundesbahnen)", "Russian Railways (RZD)",
            "Indian Railways");

    public static List<String> empresasPatrocinadoras = List.of("Coca-Cola", "McDonald's", "Microsoft", "Tuenti",
            "Pepsi",
            "Burger King", "Apple", "Facebook", "Amazon", "Google", "Nike", "Adidas", "Samsung", "Tesla", "Sony",
            "Toyota", "BMW", "Volkswagen", "Intel", "Huawei", "Spotify", "Twitter", "Uber", "Airbnb", "Instagram");

    public static List<String> ciudades = List.of("Benacazón", "Sanlúcar la Mayor", "Villanueva del Ariscal",
            "Salteras",
            "Valencina-Santiponce", "Camas", "San Jeronimo", "Santa Justa", "San Bernardo", "Virgen del Rocio",
            "Jardines de Hércules", "Bellavista", "Dos Hermanas");

    public static List<String> paises = List.of("España", "Francia", "Alemania", "Italia", "Reino Unido",
            "Estados Unidos",
            "Canadá", "México", "Argentina", "Brasil");

    public static List<String> nombres_completos = List.of("Carlos García Fernández", "Ana María López Ruiz",
            "Juan Antonio Sánchez Pérez", "María José Rodríguez Gómez", "Luis Miguel Pérez Díaz",
            "Lucía González Martínez", "Pedro José Martín Gómez", "Isabel Cristina Hernández López",
            "David José Pérez Sánchez", "Laura Fernández García");

    public static List<String> nacionalidades = List.of("Española", "Mexicana", "Argentina", "Colombiana", "Venezolana",
            "Chilena", "Peruana", "Ecuatoriana", "Uruguaya", "Paraguaya");

    public static List<String> nombres_estaciones = List.of(
            "Estación de Atocha",
            "Estación de Sants",
            "Estación Central de Zurich",
            "Estación de Milán Centrale",
            "Estación de Frankfurt Hauptbahnhof",
            "Estación Penn Station",
            "Estación Tokyo Station",
            "Estación Waterloo",
            "Estación de Roma Termini",
            "Estación de Bruselas Midi",
            "Estación de Berlín Hauptbahnhof",
            "Estación de Barcelona Sants",
            "Estación de Lisboa Oriente");

    // #endregion

    // #endregion

    //#region-----------------------PRINCIPAL---------------------------

    public static void cargar_datos_iniciales() {
        generar_pasajeros(MAX_PASAJEROS);
        generar_trenes(MAX_TRENES);
        generar_billetes(MAX_BILLETES);
        cargar_trenes(); // Carga los trenes con billetes

        generar_estaciones_privadas(MAX_ESTACIONES_PRIVADAS);
        generar_estaciones_publicas(MAX_ESTACIONES_PUBLICAS);      
    }

    //#endregion
    
    
    //#region----------------------GENERADORES----------------------------


    private static void generar_estaciones_publicas(Integer MAX_ESTACIONES_PUBLICAS) {
        Random random = new Random();

        for (int i = 0; i < MAX_ESTACIONES_PUBLICAS; i++) {
            String nombreEstacion = nombres_estaciones.get(random.nextInt(nombres_estaciones.size()));
            String ciudad = ciudades.get(random.nextInt(ciudades.size()));
            String pais = paises.get(random.nextInt(paises.size()));

            int randomTrenIndex = random.nextInt(trenes.size()); // Número aleatorio para trenes

            List<Tren> trenesAleatorios = random.ints(0, trenes.size()) // Obtiene índices aleatorios entre 0 y el len
                                                                        // de trenes
                    .limit(randomTrenIndex)
                    .distinct() // Asegura que no se repitan los índices
                    .mapToObj(trenes::get) // Mapea los índices a los trenes correspondientes
                    .collect(Collectors.toList());

            int subvencion = 100000 + random.nextInt(1900001); // 1900001 es la diferencia entre 2,000,000 y 100,000 + 1

            EstacionPublica estacionPublica = new EstacionPublica(nombreEstacion, ciudad, pais, trenesAleatorios,
                    subvencion);

            estacionesPublicas.add(estacionPublica);
        }
    }

    private static void generar_estaciones_privadas(Integer MAX_ESTACIONES_PRIVADAS) {
        Random random = new Random();

        for (int i = 0; i < MAX_ESTACIONES_PRIVADAS; i++) {

            String nombreEstacion = nombres_estaciones.get(random.nextInt(nombres_estaciones.size()));
            String ciudad = ciudades.get(random.nextInt(ciudades.size()));
            String pais = paises.get(random.nextInt(paises.size()));

            int randomTrenIndex = random.nextInt(trenes.size()); // Número aleatorio para trenes
            int randomEmpresaIndex = random.nextInt(empresasPatrocinadoras.size()); // Número aleatorio para empresas

            List<Tren> trenesAleatorios = random.ints(0, trenes.size()) // Obtiene índices aleatorios entre 0 y el len
                                                                        // de trenes
                    .limit(randomTrenIndex)
                    .distinct() // Asegura que no se repitan los índices
                    .mapToObj(trenes::get) // Mapea los índices a los trenes correspondientes
                    .collect(Collectors.toList());

            List<String> empresasAleatorias = random.ints(0, empresasPatrocinadoras.size())
                    .limit(randomEmpresaIndex)
                    .distinct()
                    .mapToObj(empresasPatrocinadoras::get)
                    .collect(Collectors.toList());

            EstacionPrivada estacionPrivada = new EstacionPrivada(nombreEstacion, ciudad, pais, trenesAleatorios,
                    empresasAleatorias);

            estacionesPrivadas.add(estacionPrivada);
        }

    }

    private static void generar_billetes(Integer MAX_BILLETES) {
        Random random = new Random();

        for (int i = 0; i < MAX_BILLETES; i++) {

            TipoBillete tipoBillete = TipoBillete.values()[random.nextInt(TipoBillete.values().length)];

            double precio = 50 + (random.nextDouble() * 250);

            Pasajero pasajero = pasajeros.get(random.nextInt(pasajeros.size()));

            Tren t = trenes.get(random.nextInt(trenes.size()));

            Billete b = new Billete(t.getId(), tipoBillete, precio, pasajero);

            billetes.add(b);
        }
    }

    private static void generar_trenes(Integer MAX_TRENES) {
        Random random = new Random();

        for (int i = 0; i < MAX_TRENES; i++) {
            String compañia = compañias.get(random.nextInt(compañias.size()));
            String ciudadOrigen = ciudades.get(random.nextInt(ciudades.size()));
            String ciudadDestino;
            do {
                ciudadDestino = ciudades.get(random.nextInt(ciudades.size()));
            } while (ciudadOrigen.equals(ciudadDestino));

            int capacidadMax = 100 + random.nextInt(201); // 100 - 200

            Tren t = new Tren(compañia, ciudadOrigen, ciudadDestino, new ArrayList<>(), capacidadMax);
            trenes.add(t);

        }
    }

    private static void generar_pasajeros(Integer MAX_PASAJEROS) {
        Random random = new Random();

        for (int i = 0; i < MAX_PASAJEROS; i++) {
            String nombreAleatorio = nombres_completos.get(random.nextInt(nombres_completos.size()));
            String nacionalidadAleatoria = nacionalidades.get(random.nextInt(nacionalidades.size()));

            // Crear un pasajero con los valores aleatorios
            Pasajero p = new Pasajero(nombreAleatorio, generarDNI(), nacionalidadAleatoria);
            pasajeros.add(p);
        }
    }

    //#endregion


    //#region--------------------AUXILIAR------------------------------
    
    private static void cargar_trenes() {

        for (Billete billete : billetes) {
            for (Tren tren : trenes) {
                if (billete.getIdTren() == tren.getId()) {
                    tren.agregarBillete(billete);
                }
            }
        }
    }

    private static String generarDNI() {
        Random random = new Random();

        Integer numero = random.nextInt(99999999 - 10000000 + 1) + 10000000; // Numero de 8 cifras
        char letra = (char) ('A' + random.nextInt(26)); // Rango de A a Z

        String dni = numero.toString() + letra;
        return dni;
    }
    
    //#endregion
}
