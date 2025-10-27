
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
  let x = x0;
  let y = y0;

  let deltaX = x1 - x0; // horizontale Differenz
  let deltaY = y1 - y0; // vertikale Differenz

  let a = -deltaY; // hier wird deltaY negiert, da y-Wert nach oben hin negativ wird (y-Achse zeigt nach unten)
  let b = -deltaX; 
  
  // Entscheidungswert (Fehlerwert)
  let q_init = 2 * a + b;   // Startwert von q
  let q_step = 2 * (a + b); // Änderung von q, wenn y erhöht wird 
  let q_equal = 2 * a;      // Änderung von q, wenn y gleich bleibt
  let q = q_init;           // aktueller Wert von q

  // Linie zeichnen
  for (x; x <= x1; x++){ // x wird immer um 1 erhöht, bis es den Endpunkt erreicht
    setPixel (x,y);
    // Entscheidung y bleibt gleich oder verändert sich um 1
    if (q < 0){         
      q += q_equal;                    
    } else{             
      q += q_step;   
      y--;              // y-Achse zeigt nach unten, daher y dekrementieren
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
