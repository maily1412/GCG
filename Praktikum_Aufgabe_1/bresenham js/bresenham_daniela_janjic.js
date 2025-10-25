
////////////////////////////////////////////////////////////////////////////////
// bresenham.js
//
// Bearbeiten Sie diese Datei für den Praktikumsteil "Bresenham Line".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
//
// Studiengang: BMI
// Gruppe     : K
// Autor 1    : Xiaojie Chen
// Autor 2    : Emma Damm
// Autor 3    : Mai Ly Le
// Autor 4    : Sara Saeid
// Autor 5    : Daniela Janjic
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// drawLine(x0, y0, x1, y1)
// Diese Funktion soll eine Linie von (x0, y0) nach (x1, y1) zeichnen.
// Implementieren Sie dazu den Bresenham-Line-Algorithmus für alle Oktanten
// in dieser Funktion. Einen Punkt zeichnen Sie mit setPixel(x,y).
////////////////////////////////////////////////////////////////////////////////





function drawLine(x0, y0, x1, y1) {

  // Bestimmen der Richtung: x-Achse (rechts/links) und y-Achse (oben/unten)
  let schrittX;
  if (x1 > x0) {
    schrittX = 1;   // Linie verläuft nach rechts
  } else {
    schrittX = -1;  // Linie verläuft nach links
  }

  let schrittY;
  if (y1 > y0) {
    schrittY = 1;   // Linie verläuft nach unten (im Canvas wird y nach unten größer)
  } else {
    schrittY = -1;  // Linie verläuft nach oben
  }

  // Berechnen des Abstands zwischen den Punkten in x- und y-Richtung
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);

  // Steile Linien (|dy| > dx)
  // Die Hauptbewegung erfolgt entlang der y-Achse, x wird bei Bedarf angepasst
  if (dy > dx) {

    let a = dx;       
    let b = -dy;      
    let Q       = 2 * a + b;        
    let Q_equal = 2 * a;            
    let Q_step  = 2 * (a + b);      

    let x = x0;
    let y = y0;

    // y wird in jedem Schritt verändert, x nur gelegentlich
    for (let i = 0; i <= dy; i++) {
      setPixel(x, y);

      if (Q < 0) {
        Q += Q_equal;         
      } else {
        x += schrittX;        
        Q += Q_step;
      }
      y += schrittY;          
    }

    return; // Steile Linie wurde vollständig gezeichnet
  }

  // Flache Linien (|dy| ≤ dx)
  // Die Hauptbewegung erfolgt entlang der x-Achse, y wird bei Bedarf angepasst
  let a = dy;       
  let b = -dx;      
  let Q       = 2 * a + b;        
  let Q_equal = 2 * a;           
  let Q_step  = 2 * (a + b);     

  let x = x0;
  let y = y0;

  // x wird in jedem Schritt verändert, y nur gelegentlich
  for (let i = 0; i <= dx; i++) {
    setPixel(x, y);

    if (Q < 0) {
      Q += Q_equal;         
    } else {
      y += schrittY;        
      Q += Q_step;
    }
    x += schrittX;          
  }
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
