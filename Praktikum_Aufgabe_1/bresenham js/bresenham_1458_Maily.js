
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
  
  // Δx berechnen
  let dx = Math.abs(x1 - x0);

  // Δy berechnen
  let dy = Math.abs(y1 - y0);

  // Richtung bestimmen
  // 1. Oktant (x,-y)   - rechts unten (Y-Achse im Fenster des Programms zeigt nach unten)
  
  // 4. Oktant (-x,-y)  - links unten
  // 5. Oktant (-x,y)   - links oben  
  // 8. Oktant (x,y)    - rechts oben 

  // 2. Oktant (-y,x)   - gespiegelt von Oktant 1
  // 3. Oktant (-y,-x)  - gespiegelt von Oktant 4 
  // 6. Oktant (y,-x)   - gespiegelt von Oktant 5 
  // 7. Oktant (y,x)    - gespiegelt von Oktant 8

  // Kurzform: let schrittNachX = (x1 > x0) ? 1 : -1;
  let schrittNachX;
  if (x1 > x0) {  
    schrittNachX = 1;   // Linie geht nach rechts
  } else {
    schrittNachX = -1;  // Linie geht nach links
  } 


  // Kurzform: let schrittNachY = (y1 > y0) ? 1 : -1; 
  let schrittNachY;
  if (y1 > y0) {  
    schrittNachY = 1;   
  } else {
    schrittNachY = -1;  
  }
  

  // Startwerte
  let x = x0;
  let y = y0;



  // Entscheidung, ob Linie flach oder steil ist
  if (dx >= dy) {
    // flache Linie → x ist dominante Achse
    let a = dy;       // Δy
    let b = -dx;      // -Δx
    let Q = 2 * a + b;
    let Q_equal = 2 * a;
    let Q_step = 2 * (a + b);

    for (let i = 0; i <= dx; i++) {
      setPixel(x, y); // Pixel setzen

      if (Q < 0) {
        Q += Q_equal;
      } else {
        Q += Q_step;
        y += schrittNachY; // Richtung in y (nach oben oder unten)
      }
      x += schrittNachX; // Richtung in x (nach links oder rechts)
    }
  } else {
    // steile Linie → y ist dominante Achse
    let a = dx;       // Δx
    let b = -dy;      // -Δy
    let Q = 2 * a + b;
    let Q_equal = 2 * a;
    let Q_step = 2 * (a + b);

    for (let i = 0; i <= dy; i++) {
      setPixel(x, y); // Pixel setzen

      if (Q < 0) {
        Q += Q_equal;
      } else {
        Q += Q_step;
        x += schrittNachX; // Richtung in x (nach links oder rechts)
      }
      y += schrittNachY; // Richtung in y (nach oben oder unten)
    }
  }
}




  /** 
  // 1. Oktant
  // x nimmt zu, y nimmt ab
  let y = y0;
  let a = dy;       // delta y
  let b = -(dx);    // -delta x

  // Da im Canvas y nach unten zeigt, invertieren wir a -> siehe Hinweis in Praktikum Aufgabe
  a = -a;

  // Startwert (Fehlerwert)
  let Q_init = 2 * a + b;
  let Q = Q_init;
  let Q_step = 2 * (a + b);
  let Q_equal = 2 * a;

  // Von links nach rechts (x0 → x1)
  for (let x = x0; x <= x1; x++) {
    setPixel(x, y);  // Pixel setzen

    // Entscheidung
    if (Q < 0) {
      Q = Q + Q_equal;
    } else {
      Q = Q + Q_step;
      y--;  // Y-Achse nach unten → Linie "nach oben"
    }
  }
}*/





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
