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

// Zeichnet alle flachen Richtungen (Oktanten 1, 4, 5 und 8).
// ----------------------------------------------------
// Bedeutung:
// - Die Linie kann nach rechts oder links gehen (x wird größer oder kleiner)
// - und nach oben oder unten verlaufen (y wird größer oder kleiner)
// - Es werden nur Linien gezeichnet, bei denen |dy| ≤ dx (also flach)
//
// Ablauf:
// Der Algorithmus arbeitet immer entlang der x-Achse.
// In jedem Schritt wird x um ±1 verändert.
// Nur wenn der Fehlerwert Q den Mittelpunkt überschreitet,
// wird y um ±1 angepasst (je nach Richtung).



function drawLine(x0, y0, x1, y1) {

//Wir bestimmen zuerst, in welche Richtung die Linie verläuft:
//nach rechts oder links (x-Richtung), nach oben oder unten (y-Richtung) */
  let schrittX;
  if (x1 > x0) {
    schrittX = 1;   // Linie geht nach rechts
  } else {
    schrittX = -1;  // Linie geht nach links
  }

  let schrittY;
  if (y1 > y0) {
    schrittY = 1;   // Linie geht nach unten (weil im Canvas y nach unten größer wird)
  } else {
    schrittY = -1;  // Linie geht nach oben
  }

  // Berechnen, wie weit sich x und y jeweils ändern.
  // dx = horizontale Entfernung, dy = vertikale Entfernung.
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);

 
  // a zeigt, wie stark sich y verändert,
  // b ist die Gegenrichtung von x (wird hier negativ gebraucht für die Formel).
  let a = dy;
  let b = -dx;

  
  if (dy > dx) return;  // Steile Linien (|dy| > dx) ignorieren
  

  // Q ist der Fehlerwert, der entscheidet, wann y verändert wird.
  let Q = 2 * a + b;
  let Q_equal = 2 * a;       // wenn y gleich bleibt
  let Q_step = 2 * (a + b);  // wenn y verändert wird

  // Startpunkt der Linie
  let x = x0;
  let y = y0;

  // Wir durchlaufen die Linie Schritt für Schritt in x-Richtung.
  // In jedem Durchgang setzen wir einen Pixel.
  for (let i = 0; i <= dx; i++)
  {
    setPixel(x, y);  // Der aktuelle Pixel wird gezeichnet.

    // Wenn Q < 0 liegt die Linie noch unter dem Mittelpunkt → y bleibt gleich.
    // Wenn Q >= 0 liegt sie darüber → y wird um 1 in Richtung schrittY verschoben.
    if (Q < 0) 
    {
      Q += Q_equal;
    } else {
      y += schrittY;
      Q += Q_step;
    }

    // Danach bewegen wir uns in x-Richtung weiter.
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
