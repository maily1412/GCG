
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

  //Startpunkt der Linie
  let y = y0;

  //Konstanten berechnen 
  let a = y1-y0;       // delta y
  let b = -(x1-x0);    // -delta x

  a = -a; //y zeigt nach unten, deswegen invertieren wir a -> siehe Hinweis in Praktikum Aufgabe

  //Entscheidungswert (Fehlerwert)
  //Liegt die Linie über oder unter dem Mittelpunkt zwischen den beiden möglichen nächsten Pixeln?
  let Q_init = 2 * a + b;
  let Q = Q_init;
  let Q_step = 2 * (a + b);
  let Q_equal = 2 * a;

  //Linie zeichnen
  //Schleife durchläuft die Spalten (x-Richtung)
  for (let x = x0; x <= x1; x++) {  //x wird immer um 1 erhöht, bis es den Endpunkt erreicht
    setPixel(x, y);                 // Pixel setzen

    //Entscheidung y bleibt gleich oder verändert sich um 1
    if (Q < 0) {        //Linie liegt unterhalb des Mittelpunkts
      Q = Q + Q_equal;  //bleiben in der gleichen Zeile
    } else {            //Linie liegt oberhalb oder auf dem Mittelpunkt
      Q = Q + Q_step;   //eine Zeile nach oben
      y--;              
    }
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
