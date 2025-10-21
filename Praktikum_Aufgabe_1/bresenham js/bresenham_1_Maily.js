
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
  // 1. Oktant
  let y = y1;
  let a = y2 - y1;       // delta y
  let b = -(x2 - x1);    // - delta x

  let Q_init = 2 * a + b;
  let Q = Q_init;
  let Q_step = 2 * (a + b);
  let Q_equal = 2 * a;

  for (let x = x1; x <= x2; x++) {
    setPixel(x, y);  
    
    if (Q < 0) {
      Q = Q + Q_equal; 
    } else {
      Q = Q + Q_step;
      y++;
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
