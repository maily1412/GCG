
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

// Zeichnet Linien nur im 1. Oktanten.
// ----------------------------------------------------
// Bedeutung:
// - x wird größer → Linie verläuft von links nach rechts
// - y wird größer → im Canvas also nach unten
// - die Linie darf nicht steil sein: 0 ≤ dy ≤ dx
//
// Ablauf:
// Wir gehen in jeder Schleife einen Schritt in x-Richtung.
// Wenn der Fehlerwert Q zu groß wird, erhöhen wir y um 1.
// Dadurch entsteht eine gleichmäßige Linie mit ganzzahligen Pixeln.



function drawLine(x0, y0, x1, y1) {

// Wenn x0 größer als x1 ist, werden die Punkte getauscht,damit die Schleife korrekt von links nach rechts läuft    
if (x0 > x1) 
{ 
    let t = x0; x0 = x1; x1 = t; 
    t = y0; y0 = y1; y1 = t; 
}    

// dx = horizontale Differenz, dy = vertikale Differenz
// Somit weiss man, wie stark sich x und y zwischen den Punkten verändern.
  let dx = x1 - x0;
  let dy = y1 - y0;


// Wenn die Linie zu steil oder nach oben verläuft, wird sie hier nicht gezeichnet
if (dy < 0 || dy > dx) 
return;

let a = dy;   // Änderung in y-Richtung
let b = -dx;  // negative Änderung in x-Richtung


let Q_init  = 2 * a + b;     // Startwert von Q
let Q_step  = 2 * (a + b);   // Änderung von Q, wenn y erhöht wird
let Q_equal = 2 * a;         // Änderung von Q, wenn y gleich bleibt
let Q = Q_init;              // aktueller Wert von Q

//Startpunkt der Linie
let y = y0;

// Wir laufen von x0 bis x1 und setzen bei jedem Schritt einen Pixel.
for (let x = x0; x <= x1; x++) 
{
setPixel(x, y); // Pixel zeichnen

// Wenn Q < 0: Linie liegt unterhalb des Mittelpunktes → y bleibt gleich
// Wenn Q >= 0: Linie liegt über dem Mittelpunkt → y um 1 erhöhen
if (Q < 0) 
{              
    Q += Q_equal;   // y bleibt gleich → nur Q wird angepasst
} else {                 
    y += 1;         // y um eine Zeile nach unten (Canvas-Koordinaten)
    Q += Q_step;    // Q anpassen, weil y verändert wurde
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
