////////////////////////////////////////////////////////////////////////////////
// bresenham_1.js
//
// Bearbeiten Sie diese Datei für den Praktikumsteil "Bresenham Line".
// Implementierung nur für den ERSTEN OKTANTEN (0 <= Steigung <= 1).
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
//
// Studiengang: K BMI
// Gruppe     : K BMI
// Autor 1    : Mai Ly Le
// Autor 2    : Emma Damm
// Autor 3    : Daniela Janjic
// Autor 4    : Xiaojie Chen
// Autor 5    : Sara Saeid
////////////////////////////////////////////////////////////////////////////////

/**
 * Zeichnet eine Linie von (x0, y0) nach (x1, y1) NUR für den ersten Oktanten.
 * Voraussetzung: 0 <= (y1 - y0) <= (x1 - x0) und x0 <= x1.
 * Die Rasterung erfolgt entlang der X-Achse.
 */
function drawLine(x0, y0, x1, y1) {
    // Da wir nur den 1. Oktanten betrachten, sind die Differenzen positiv
    // und x ist die dominante Achse (delta_x_abs >= delta_y_abs).
    let delta_x_abs = x1 - x0;
    let delta_y_abs = y1 - y0;

    let x_aktuell = x0;
    let y_aktuell = y0;

    // Der erste Oktant zeichnet immer von x0 nach x1 und y0 nach y1.
    // Die Schrittweiten sind fest +1.
    const schritt_x = 1; 
    const schritt_y = 1; 

    // Initialisierung des Entscheidungsparameters (fehlerterm)
    // E = 2 * dy - dx
    let fehlerterm = 2 * delta_y_abs - delta_x_abs; 
    
    setPixel(x_aktuell, y_aktuell); // Startpunkt setzen

    // Hauptschleife: läuft die Distanz der dominanten Achse (X) ab
    while (x_aktuell < x1) {
        
        x_aktuell += schritt_x; // X-Schritt in jedem Durchlauf (dominante Achse)
        
        // Bedingung: Muss ein Schritt in der Nebenachse (Y) erfolgen?
        if (fehlerterm >= 0) {
            y_aktuell += schritt_y; // Y-Schritt
            fehlerterm -= 2 * delta_x_abs; // Fehlerterm korrigieren
        }
        
        // Fehlerterm in jedem Schritt inkrementieren
        fehlerterm += 2 * delta_y_abs; 

        setPixel(x_aktuell, y_aktuell);
    }
}