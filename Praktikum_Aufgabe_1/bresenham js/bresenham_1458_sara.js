////////////////////////////////////////////////////////////////////////////////
// bresenham_1458.js
//
// Bearbeiten Sie diese Datei für den Praktikumsteil "Bresenham Line".
// Implementierung für Oktanten 1, 4, 5 und 8 (Flache Linien: |Steigung| <= 1).
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
 * Zeichnet eine Linie von (x0, y0) nach (x1, y1) für die Oktanten 1, 4, 5 und 8.
 * Diese Implementierung funktioniert nur, wenn die X-Achse die dominante Achse ist 
 * (d.h. |x1 - x0| >= |y1 - y0|).
 */
function drawLine(x0, y0, x1, y1) {
    
    // 1. Berechnung der absoluten Differenzen (Delta-Werte)
    let delta_x_abs = Math.abs(x1 - x0);
    let delta_y_abs = Math.abs(y1 - y0);

    // **WICHTIGE PRÜFUNG (Nicht gefordert, aber gute Praxis):**
    // Für bresenham_1458.js muss delta_x_abs die dominante Achse sein.
    if (delta_x_abs < delta_y_abs) {
        // console.error("drawLine_1458: Linie ist zu steil (Oktant 2, 3, 6, 7). Implementierung nur für flache Linien.");
        return; // Verlassen der Funktion, da der Code nur flache Linien behandeln soll
    }

    // 2. Bestimmung der Schrittweite (Vorzeichen) für alle 4 Oktanten
    // Dies deckt alle Richtungen ab: x+ oder x- und y+ oder y-.
    let schritt_x = (x0 < x1) ? 1 : -1; 
    let schritt_y = (y0 < y1) ? 1 : -1; 
    
    let x_aktuell = x0;
    let y_aktuell = y0;

    // 3. Initialisierung des Entscheidungsparameters (fehlerterm)
    // E = 2 * dy - dx
    let fehlerterm = 2 * delta_y_abs - delta_x_abs; 
    
    setPixel(x_aktuell, y_aktuell); // Startpunkt setzen

    // 4. Hauptschleife: läuft die Distanz der dominanten Achse (X) ab
    while (x_aktuell != x1) {
        
        x_aktuell += schritt_x; // X-Schritt in jedem Durchlauf (dominante Achse)
        
        // Bedingung: Muss ein Schritt in der Nebenachse (Y) erfolgen?
        if (fehlerterm >= 0) {
            y_aktuell += schritt_y; // Y-Schritt in die korrekte Richtung (schritt_y ist +1 oder -1)
            fehlerterm -= 2 * delta_x_abs; // Fehlerterm korrigieren
        }
        
        // Fehlerterm in jedem Schritt inkrementieren
        fehlerterm += 2 * delta_y_abs; 

        setPixel(x_aktuell, y_aktuell);
    }
}