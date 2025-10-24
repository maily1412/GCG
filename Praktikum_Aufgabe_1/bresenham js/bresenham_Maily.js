
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

  //Länge bestimmen 
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);

  //Richtung in x und y bestimmen
  //Entscheidet, in welchen der 8 Oktanten sich die Linie befindet
  let schrittNachX;     // rechts (1,2,7,8) oder links (3,4,5,6)
  if (x1 > x0) {
    schrittNachX = 1;   // Linie geht nach rechts
  } else {
    schrittNachX = -1;  // Linie geht nach links
  }

  let schrittNachY;     // unten (4,5,7,8) oder oben (1,2,3,6)
  if (y1 > y0) {
    schrittNachY = 1;   // Linie geht nach unten
  } else {
    schrittNachY = -1;  // Linie geht nach oben
  }

  //Startpunkt der Linie
  let x = x0;
  let y = y0;

  //Entscheidung, ob flache oder steile Linie
  if (dx >= dy) { //Fall 1: Linie flach 

    //Koeffizienten für flache Linien (x-dominant)
    let a = dy;       
    let b = -dx;      

    //Entscheidungswert (Fehlerwert)
    //Liegt die Linie über oder unter dem Mittelpunkt zwischen den beiden möglichen nächsten Pixeln?
    let Q_init = 2 * a + b;
    let Q = Q_init;
    let Q_equal = 2 * a;
    let Q_step = 2 * (a + b);

    //Linie zeichnen
    //Schleife durchläuft die Spalten (x-Richtung)
    for (let i = 0; i <= dx; i++) {      // x wird immer um 1 erhöht oder verringert, bis der Endpunkt erreicht ist
      setPixel(x, y);                    // Pixel setzen

      //Entscheidung: y bleibt gleich oder verändert sich um 1
      if (Q < 0) {                       // Linie liegt unterhalb des Mittelpunkts
        Q = Q + Q_equal;                 // bleiben in der gleichen Zeile
      } else {                           // Linie liegt oberhalb oder auf dem Mittelpunkt
        Q = Q + Q_step;                  
        y = y + schrittNachY;            // y verändert sich um 1 in Richtung schrittNachY
      }

      x = x + schrittNachX;              // x bewegt sich in Richtung schrittNachX
    }

  } else {  //Fall 2: Linie steil

    //Koeffizienten für steile Linien (y-dominant)
    let a = dx;       
    let b = -dy;      

    //Entscheidungswert (Fehlerwert)
    let Q_init = 2 * a + b;
    let Q = Q_init;
    let Q_equal = 2 * a;
    let Q_step = 2 * (a + b);

    //Linie zeichnen
    //Schleife durchläuft die Zeilen (y-Richtung)
    for (let i = 0; i <= dy; i++) {      //y wird immer um 1 erhöht oder verringert, bis der Endpunkt erreicht ist
      setPixel(x, y);                    //Pixel setzen

      //Entscheidung: x bleibt gleich oder verändert sich um 1
      if (Q < 0) {                       //Linie liegt unterhalb des Mittelpunkts
        Q = Q + Q_equal;                 //bleiben in der gleichen Spalte
      } else {                           //Linie liegt oberhalb oder auf dem Mittelpunkt
        Q = Q + Q_step;                  
        x = x + schrittNachX;            //x verändert sich um 1 in Richtung schrittNachX
      }

      y = y + schrittNachY;              //y bewegt sich in Richtung schrittNachY
    }
  }
}

 /**
  * Richtung bestimmen
  * 1. Oktant (x,-y)   - rechts unten (Y-Achse im Fenster des Programms zeigt nach unten)
  * 4. Oktant (-x,-y)  - links unten
  * 5. Oktant (-x,y)   - links oben  
  * 8. Oktant (x,y)    - rechts oben 
  * 
  * 2. Oktant (-y,x)   - gespiegelt von Oktant 1
  * 3. Oktant (-y,-x)  - gespiegelt von Oktant 4 
  * 6. Oktant (y,-x)   - gespiegelt von Oktant 5 
  * 7. Oktant (y,x)    - gespiegelt von Oktant 8
  */ 
  



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
