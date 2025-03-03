
public class Main {
    public static void main(String[] args) {
        // Con clase
        Avion avionClase = new Avion("Boeing 737");
        System.out.println(avionClase);

        // Con record
        Avion2 avionRecord = new Avion2("Boeing 737");
        System.out.println(avionRecord.modelo());
    }
}
