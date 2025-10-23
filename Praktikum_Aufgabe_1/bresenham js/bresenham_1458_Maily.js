
////////////////////////////////////////////////////////////////////////////////
// bresenham.js
//
// Bearbeiten Sie diese Datei für den Praktikumsteil "Bresenham Line".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
//
// Studiengang:
// Gruppe     : K BMI
// Autor 1    : Mai Ly Le
// Autor 2    : Emma Damm
// Autor 3    : Daniela Janjic
// Autor 4    : Xiaojie Chen
// Autor 5    : Sara Saeid
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// drawLine(x0, y0, x1, y1)
// Diese Funktion soll eine Linie von (x0, y0) nach (x1, y1) zeichnen.
// Implementieren Sie dazu den Bresenham-Line-Algorithmus für alle Oktanten
// in dieser Funktion. Einen Punkt zeichnen Sie mit setPixel(x,y).
////////////////////////////////////////////////////////////////////////////////


function drawLine(x0, y0, x1, y1){
  // nur postive Beträge -> wir wollen nur die Länge herausfinden, nicht die Richtung
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);

  // Richtung in x und y bestimmen
  // entscheidet, in welchen der Oktanten 1, 4, 5 oder 8 wir uns befinden

  let schrittNachX; // rechts (1,8) oder links (4,5)
  if (x1 > x0) {  
    schrittNachX = 1;   // Linie geht nach rechts
  } else {
    schrittNachX = -1;  // Linie geht nach links
  } 

  
  let schrittNachY; // unten (4,8) oder oben (1,5)
  if (y1 > y0) {  
    schrittNachY = 1;   
  } else {
    schrittNachY = -1;  
  }

  // Startpunkt
  let x = x0;
  let y = y0;

  // Koeffizienten für den Bresenham-Algorithmus
  let a = dy;       // Δy
  let b = -dx;      // -Δx

  // Entscheidungsvariablen
  let Q_init = 2 * a + b;
  let Q = Q_init;
  let Q_equal = 2 * a;
  let Q_step = 2 * (a + b);

  // Schleife läuft über x -> flache Linien
  for (let i = 0; i <= dx; i++) {
    setPixel(x, y);

    // Entscheidung: y bleibt oder verändert sich um 1
    if (Q < 0) {
      Q += Q_equal; // y bleibt gleich
    } else {
      Q += Q_step;  // y ändert sich
      y += schrittNachY;
    }

    // x bewegt sich immer um 1 (nach links oder rechts)
    x += schrittNachX;
  }

  /* 
    --- Kommentare für die 4 flachen Oktanten ---
    
    Oktant 1 (x, -y) → rechts oben
      x1 > x0, y1 < y0  → schrittNachX = +1, schrittNachY = -1

    Oktant 4 ( -x, -y ) → links oben
      x1 < x0, y1 < y0  → schrittNachX = -1, schrittNachY = -1

    Oktant 5 ( -x, y ) → links unten
      x1 < x0, y1 > y0  → schrittNachX = -1, schrittNachY = +1

    Oktant 8 ( x, y ) → rechts unten
      x1 > x0, y1 > y0  → schrittNachX = +1, schrittNachY = +1
  */
}





////////////////////////////////////////////////////////////////////////////////
// example(i)
// Diese Funktion dient als Codebeispiel.
// Sie wird beim Laden der Seite aufgerufen und kann entfernt werden.
////////////////////////////////////////////////////////////////////////////////
function example(i)
{
  let y = i + 2;
  for (let x = 0; x < 400; x++)
  {
    y--;
    if (y < -i)
    {
      y = i;
    }
    setPixel(x, Math.abs(y));
  }
}
