////////////////////////////////////////////////////////////////////////////////
// bresenham.js
//
// Bearbeiten Sie diese Datei für den Praktikumsteil "Bresenham Line".
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
 * Zeichnet eine Linie von (x0, y0) nach (x1, y1) unter Verwendung des Bresenham-Line-Algorithmus.
 * Die Implementierung nutzt die Symmetrie-Eigenschaften, um alle 8 Oktanten abzudecken.
 * Die Rasterung erfolgt immer entlang der Achse mit der größten absoluten Differenz.
 */
function drawLine(x0, y0, x1, y1) {
    // 1. Berechnung der absoluten Differenzen (Delta-Werte)
    let delta_x_abs = Math.abs(x1 - x0);
    let delta_y_abs = Math.abs(y1 - y0);

    // 2. Bestimmung der Schrittweite (Vorzeichen)
    // Schrittweite in X-Richtung (+1 oder -1)
    let schritt_x = (x0 < x1) ? 1 : -1; 
    // Schrittweite in Y-Richtung (+1 oder -1)
    let schritt_y = (y0 < y1) ? 1 : -1; 
    
    // Aktuelle Koordinaten
    let x_aktuell = x0;
    let y_aktuell = y0;
    
    // Flag zur Kennzeichnung, ob die Achsen (Rollen von X und Y) getauscht werden müssen
    let achsen_getauscht = false; 

    // **Symmetrie-Analyse (Achsen-Tausch):**
    // Für die Oktanten 2, 3, 6 und 7 (|Steigung| > 1, d.h. delta_y_abs > delta_x_abs),
    // wird die Rolle von X und Y getauscht. Der Algorithmus läuft dann immer entlang
    // der dominanten Achse (die die größere Distanz hat), um pro Schritt nur eine
    // Ganzzahl-Addition in der Nebenrichtung zu benötigen.
    if (delta_y_abs > delta_x_abs) {
        // Rollentausch von delta_x und delta_y
        [delta_x_abs, delta_y_abs] = [delta_y_abs, delta_x_abs];
        achsen_getauscht = true;
    }

    // 3. Initialisierung des Entscheidungsparameters (fehlerterm)
    // Fehlerterm E = 2 * dy - dx (wobei dx hier delta_x_abs nach eventuellem Tausch ist)
    let fehlerterm = 2 * delta_y_abs - delta_x_abs; 
    
    setPixel(x_aktuell, y_aktuell); // Startpunkt setzen

    // 4. Hauptschleife: Führt dx Schritte aus (Länge der dominanten Achse)
    // Die Schleife läuft die Distanz der dominanten Achse ab.
    for (let i = 0; i < delta_x_abs; i++) {
        
        // Bedingung: Muss ein Schritt in der Nebenachse erfolgen?
        if (fehlerterm >= 0) {
            // Schritt in der Nebenachse
            if (achsen_getauscht) {
                // Wenn Achsen getauscht: X ist die Nebenachse
                x_aktuell += schritt_x; 
            } else {
                // Wenn Achsen nicht getauscht: Y ist die Nebenachse
                y_aktuell += schritt_y;
            }
            // Fehlerterm für den Schritt in der Nebenachse korrigieren
            fehlerterm -= 2 * delta_x_abs; 
        }
        
        // Schritt in der dominanten Achse (erfolgt in jedem Durchlauf)
        if (achsen_getauscht) {
            // Wenn Achsen getauscht: Y ist die dominante Achse
            y_aktuell += schritt_y;
        } else {
            // Wenn Achsen nicht getauscht: X ist die dominante Achse
            x_aktuell += schritt_x;
        }

        // Fehlerterm in jedem Schritt inkrementieren
        fehlerterm += 2 * delta_y_abs; 

        setPixel(x_aktuell, y_aktuell);
    }
}