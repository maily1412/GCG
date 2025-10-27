
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

/**
 * Zeichnet eine Linie von (x0, y0) nach (x1,y1) in den Oktanten 1,4,5 und 8.
 * Oktant 1: deltaX > 0, deltaY > 0
 * Oktant 4: deltaX < 0, deltaY > 0
 * Oktant 5: deltaX < 0, deltaY < 0
 * Oktant 8: deltaX > 0, deltaY < 0
 * @param {*} x0 Startpunkt x-Koordinate
 * @param {*} y0 Startpunkt y-Koordinate
 * @param {*} x1 Endpunkt x-Koordinate
 * @param {*} y1 Endpunkt y-Koordinate
 */
function drawLine(x0, y0, x1, y1){
  let x = x0;
  let y = y0;

  let deltaX = x1 - x0; //horizontale Differenz
  let deltaY = y1 - y0; //vertikale Differenz

  let schrittInXRichtung;
  if (deltaX > 0){            //wenn deltaX positiv ist, geht die Linie von links nach rechts
    schrittInXRichtung = 1;   //nach rechts
  } else{                     //sonst, wenn deltaX negativ ist, geht die Linie von rechts nach links
    schrittInXRichtung = -1;  //nach links
  }

  let schrittInYRichtung;
  if (deltaY > 0){             //wenn deltaY positiv ist, geht die Linie von unten nach oben
    schrittInYRichtung = 1;    //nach oben
  } else{                      //sonst, wenn deltaY negativ ist, geht die Linie von oben nach unten
    schrittInYRichtung = -1;   //nach unten
  }

  deltaX = Math.abs(deltaX);   //Richtung wird durch SchrittInXRichtung bestimmt, daher hier nur noch Wert
  deltaY = Math.abs(deltaY);   //Richtung wird durch SchrittInYRichtung bestimmt, daher hier nur noch Wert

  if(deltaX > deltaY){  //|deltaX| > |deltaY| --> x steigt schneller als y --> Oktanten 1,4,5,8
    let a = deltaY; 
    let b = -deltaX;
    
    let q = 2 * a + b;         //qinit --> erster Abstand zwischen M(x+1,y+1/2) und der Geraden
    let q_step = 2 * (a + b);  //q_step, Abstand, der addiert wird, wenn Linie zur nächsten Zeile wechselt
    let q_equal = 2 * a;       //q_equal, Abstand, der addiert wird, wenn Linie in gleicher Zeile bleibt

    for (let i = 0; i <= deltaX; i++){ //solange es in x-Richtung noch Pixel zu zeichnen gibt
      setPixel (x,y);
      //Entscheidung y bleibt gleich oder verändert sich um 1
      if (q < 0){                 
        q = q + q_equal;          //Linie bleibt in der gleichen Zeile
      } else{                     
        q = q + q_step;           //Linie wechselt zur nächsten Zeile
        y += schrittInYRichtung;  //eine Zeile nach oben oder unten, je nach schrittInYRichtung
      }
      x += schrittInXRichtung;    //eine Spalte nach rechts oder links, je nach schrittInXRichtung
    }
  } else{   ////|deltaX| < |deltaY| --> y steigt schneller als x --> Oktanten 2,3,6,7
    let a = deltaX; 
    let b = -deltaY;
    
    let q = 2 * a + b;         //qinit --> erster Abstand zwischen M(x+1/2,y+1) und der Geraden
    let q_step = 2 * (a + b);  //q_step, Abstand, der addiert wird, wenn Linie zur nächsten Spaltewechselt
    let q_equal = 2 * a;       //q_equal, Abstand, der addiert wird, wenn Linie in gleicher Spalte bleibt

    for (let i = 0; i <= deltaY; i++){ //solange es in y-Richtung noch Pixel zu zeichnen gibt
      setPixel (x,y);
      //Entscheidung x bleibt gleich oder verändert sich um 1
      if (q < 0){                 
        q = q + q_equal;          //Linie bleibt in der gleichen Spalte
      } else{                     
        q = q + q_step;           //Linie wechselt zur nächsten Spalte
        x += schrittInXRichtung;  //eine Spalte nach rechts oder links, je nach schrittInXRichtung
      }
      y += schrittInYRichtung;    //eine Zeile nach oben oder unten, je nach schrittInYRichtung
    }
  }

}



////////////////////////////////////////////////////////////////////////////////
// example(i)
// Diese Funktion dient als Codebeispiel.
// Sie wird beim Laden der Seite aufgerufen und kann entfernt werden.
////////////////////////////////////////////////////////////////////////////////
function example(i) //i gleich Höhe der Zickzacklinie
{
  let y = i + 2; //Startwert für y... bei i=10 wird bei 0,12 das erste Pixel gesetzt
  for (let x = 0; x < 400; x++) //x wird jeden Schritt erhöht
  {
    y--; // y wird jeden Durchgang um 1 erniedrigt
    if (y < -i) //wenn der Wert von y unter den Wert von i (Höhe der Zickzacklinie) fällt,
    {
      y = i; //dann wird y zurückgesetzt, sodass eine neue Zacke angeschlossen wird
    }
    setPixel(x, Math.abs(y)); //Math.abs gibt den Wert zurück, bei Umschwung in den negativen Bereich erhöht sich also der Wert von y, wenn y dekrementiert wird
  }
}
//für i = 10 --> y = 12
//1. Durchgang:  x = 0, y = 11    -->  11 > -10,  also nicht in if-Zweig --> Pixel 0,12
//2. Durchgang:  x = 1, y = 10    -->  10 > -10,  also nicht in if-Zweig --> Pixel 1,10
//3. Durchgang:  x = 2, y = 9     -->   9 > -10,  also nicht in if-Zweig --> Pixel 2,9
//4. Durchgang:  x = 3, y = 8     -->   8 > -10,  also nicht in if-Zweig --> Pixel 3,8
//5. Durchgang:  x = 4, y = 7     -->   7 > -10,  also nicht in if-Zweig --> Pixel 4,7
//...
//12. Durchgang: x = 11, y = 0    -->   0 > -10,  also nicht in if-Zweig --> Pixel 11,0
//13. Durchgang: x = 12, y = -1   -->  -1 > -10,  also nicht in if-Zweig --> Pixel 12,1 weil Wert von y genommen wird
//14. Durchgang: x = 13, y = -2   -->  -2 > -10,  also nicht in if-Zweig --> Pixel 13,2 weil Wert von y genommen wird
//...
//22. Durchgang: x = 21, y = -10  -->  -10 = -10, also nicht in if-Zweig --> Pixel 21,10 weil Wert von y genommen wird
//23. Durchgang: x = 22, y = -11  -->  -11 < -10, also in if-Zweig --> y = 10 --> Pixel 22,10 
//Fazit: eine Zacke, die gezeichnet wird, kann in zwei Abschnitte geteilt werden: 
//          1. Weg nach oben mit y im positiven Bereich, Wert von y sinkt
//          2. Weg nach unten mit y im negativen Bereich, Wert von y steigt
//        Wenn der y-Wert unter die negierte Höhe der Zacke fällt (hier = -10) wird der y-Wert zurückgesetzt und die nächste Zacke wird angeschlossen