
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
