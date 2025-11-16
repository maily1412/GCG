////////////////////////////////////////////////////////////////////////////////
// transformation-a.js
//
// Bearbeiten Sie diese Datei fuer den Praktikumsteil "Transformationen".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen der Computergrafik
//
// Studiengang: BMI
// Gruppe     : K
// Autor 1    : Mai Ly Le
// Autor 2    : Emma Damm
// Autor 3    : Daniela Janjic
// Autor 4    : Xiaojie Chen
// Autor 5    : Sara Saeid
////////////////////////////////////////////////////////////////////////////////

//Methoden für Matrizen

//2D-Translation
/**
 * Erstellt eine Matrix für eine 2D-Translation.
 * @param {number} verschiebungInXRichtung 
 * @param {number} verschiebungInYRichtung 
 * @returns 2D-Translationsmatrix
 */
function translationsMatrix2D(verschiebungInXRichtung, verschiebungInYRichtung){
    return new Matrix4 (1.0, 0.0, 0.0, verschiebungInXRichtung,
                        0.0, 1.0, 0.0, verschiebungInYRichtung,
                        0.0, 0.0, 1.0, 1.0,
                        0.0, 0.0, 0.0, 1.0);
}

//2D-Rotation
/**
 * Erstellt eine Matrix für eine 2D-Rotation.
 * @param {number} winkel um den rotiert werden soll
 * @returns 2D-Rotationsmatrix
 */
function rotationsMatrix2D(winkel){
    return new Matrix4 (Math.cos(winkel), -Math.sin(winkel), 0.0, 0.0,
                        Math.sin(winkel), Math.cos(winkel), 0.0, 0.0,
                        0.0, 0.0, 1.0, 0.0,
                        0.0, 0.0, 0.0, 1.0);
}

//2D-Skalierung
/**
 * Erstellt eine Matrix für eine 2D-Skalierung.
 * @param {number} skalierungInXRichtung 
 * @param {number} skalierungInYRichtung 
 * @returns 2D-Skalierungsmatrix
 */
function skalierungsMatrixPoints2D(skalierungInXRichtung, skalierungInYRichtung){
    return new Matrix4 (skalierungInXRichtung, 0.0, 0.0, 0.0,
                        0.0, skalierungInYRichtung, 0.0, 0.0,
                        0.0, 0.0, 1.0, 0.0,
                        0.0, 0.0, 0.0, 1.0);
}


//Definitionen für Umdrehung

//eine Umdrehung hat 360°, es soll eine Zehntel Umdrehung pro Sekunde erfolgen
//Einheit: °/s
const zehntelUmdrehung = 360 / 10;

/**
 * Rechnet Grad in Radiant um.
 * @param {number} grad der umgerechnet werden soll
 * @returns radiant zum grad
 */
function radiant(grad){
  return grad * (Math.PI/180);
}

/**
 * Gibt einen Winkel, der von der Zeit (zehntel Umdrehung pro Sekunde) abhängig ist, als Radiant zurück, sodasss er in sin und cos verwendet werden kann.
 * Einheitencheck: s * °/s = °, und dann ° in rad
 * @param {number} faktor mit dem multipliziert werden muss, je nachdem wie schnell die Umdrehung erfolgen soll
 * @param {*} zeit von der der Winkel abhängig ist
 * @returns Zeitabhängigerwinkel als Radiant
 */
function zeitabhaengigerWinkel(faktor, zeit){
  return radiant(faktor * zeit * zehntelUmdrehung);
}


////////////////////////////////////////////////////////////////////////////////
// Gibt die Transformation von Zahnrad A abhängig von der Zeit (time) zurück
////////////////////////////////////////////////////////////////////////////////
function animateA(time)
{
  let pointMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                0.0, 0.0, 0.0, 1.0);
  
  let normalMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
                                 0.0, 1.0, 0.0, 0.0,
                                 0.0, 0.0, 1.0, 0.0,
                                 0.0, 0.0, 0.0, 1.0);
  
  // TODO: Implementieren Sie die Berechnung der Transformationsmatrizen
  
  //Zahnrad in den Ursprung verschieben
    //Mittelpunkt (20; 10; 0) zu (0; 0; 0)
    //verschiebungInXRichtung: -20, verschiebungInYRichtung: -10
  let translationInUrsprung = translationsMatrix2D(-20, -10);


  //Zahnrad rotieren
    //zeitabhängigerWinkel mit Faktor 1, da Zahnrad A das Rad sein soll, dass sich tatsächlich ein Zehntel pro Sekunde dreht
  let zeitabhaengigerWinkelA = zeitabhaengigerWinkel(1, time);
  
  let zahnradRotation = rotationsMatrix2D(zeitabhaengigerWinkelA);
  
  //Zahnrad zurück an eigentliche Position verschieben
  let tranlationZurueck = translationsMatrix2D(20, 10);

  //Matrizen in umgekehrter Richtung multiplizieren
  pointMatrix.multiply(tranlationZurueck.multiply(zahnradRotation.multiply(translationInUrsprung)));

  //Normale nur bei Rotation wichtig, hier keine Skalierung, deshalb muss Rotationsmatrix nicht angepasst werden
  normalMatrix.multiply(zahnradRotation);
  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}


////////////////////////////////////////////////////////////////////////////////
// Gibt die Transformation von Zahnrad B abhängig von der Zeit (time) zurück
////////////////////////////////////////////////////////////////////////////////
function animateB(time)
{
  let pointMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                0.0, 0.0, 0.0, 1.0);

  let normalMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
                                 0.0, 1.0, 0.0, 0.0,
                                 0.0, 0.0, 1.0, 0.0,
                                 0.0, 0.0, 0.0, 1.0);
  
  // TODO: Implementieren Sie die Brechnung der Transformationsmatrizen
  
  //Zahnrad in den Ursprung verschieben
    //Mittelpunkt (47; 2; 0) zu (0; 0; 0)
    //verschiebungInXRichtung: -47, verschiebungInYRichtung: -2
  let translationInUrsprung = translationsMatrix2D(-47, -2);

  //Zahnrad rotieren
    //zeitabhängigerWinkel mit Faktor 2, da Zahnrad B (9 Zacken) halb so groß wie Rad A (18 Zacken) ist und sich daher doppelt so schnell drehen muss
    //hier negativ, da Zahnrad in andere Richtung drehen muss
  let zeitabhaengigerWinkelB = - zeitabhaengigerWinkel(2, time);

  let zahnradRotation = rotationsMatrix2D(zeitabhaengigerWinkelB);
  
  
  //Zahnrad zurück an eigentliche Position verschieben
  let tranlationZurueck = translationsMatrix2D(47, 2);

  //Matrizen in umgekehrter Richtung multiplizieren
  pointMatrix.multiply(tranlationZurueck.multiply(zahnradRotation.multiply(translationInUrsprung)));

  //Normale nur bei Rotation wichtig, hier keine Skalierung, deshalb muss Rotationsmatrix nicht angepasst werden
  normalMatrix.multiply(zahnradRotation);

  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}


//3. Zahnrad C animieren
//Animieren Sie Zahnrad C so, dass es sich um seine Achse dreht, korrekt in Zahnrad B greift und genau so dick ist wie die anderen Zahnräder auch. Stellen Sie sicher, dass die Beleuchtung korrekt berechnet werden kann.
//Wenn Sie die anderen Zahnräder nicht verschoben haben, sollte der Mittelpunkt von Zahnrad C während der Animation an der Position (67; 14; 0) liegen.
//Hinweis: Der Mittelpunkt von Zahnrad C befindet sich ohne Transformation an der Position (0; 0; 0). Ohne Transformation hat das Zahnrad ein Zehntel seines benötigten Durchmessers, allerdings hat es bereits die richtige Dicke.
////////////////////////////////////////////////////////////////////////////////
// Gibt die Transformation von Zahnrad C abhängig von der Zeit (time) zurück
////////////////////////////////////////////////////////////////////////////////
function animateC(time)
{
  let pointMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                0.0, 0.0, 0.0, 1.0);

  let normalMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
                                 0.0, 1.0, 0.0, 0.0,
                                 0.0, 0.0, 1.0, 0.0,
                                 0.0, 0.0, 0.0, 1.0);
  
  // TODO: Implementieren Sie die Brechnung der Transformationsmatrizen
  
  //Zahnrad zuerst skalieren, da es sich bereits im Ursprung befindet
  //Zahnrad hat vorher ein Zehntel des benötigten Durchmessers, aber richtige Dicke, also nur in x- und y-Richtung skalieren
  let zahnradSkalieren = skalierungsMatrixPoints2D(10, 10);

  //bei Skalierung Normalen getrennt behandeln, Inverse bilden
  //hier Transponieren nicht notwendig, da transponierte Matrix gleich der nicht transponierten ist
  let normalenSkalieren = new Matrix4(0.1, 0.0, 0.0, 0.0,
                                     0.0, 0.1, 0.0, 0.0,
                                     0.0, 0.0, 1.0, 0.0,
                                     0.0, 0.0, 0.0, 1.0);


  //Zahnrad rotieren
    //zeitabhängigerWinkel mit Faktor 3/2, da Zahnrad C (12 Zacken) 2/3 so groß wie Rad A (18 Zacken) ist und sich daher 3/2 so schnell drehen muss
    //hier wieder positiv, da Zahnrad in andere Richtung drehen muss als Zahnrad B
  let zeitabhaengigerWinkelC = zeitabhaengigerWinkel(3/2, time);
    
  let zahnradRotation = rotationsMatrix2D(zeitabhaengigerWinkelC);
 
  //Zahnrad an Endposition verschieben
    //Mittelpunkt (0; 0; 0) zu (67; 14; 0)
    //verschiebungInXRichtung: 67, verschiebungInYRichtung: 14
  let zahnradVerschieben = translationsMatrix2D(67, 14); 

  //zweimal zahnradRotation benötigt, einmal für pointMatrix und einmal für normalMatrix, deshalb klonen
  let normalRotation = zahnradRotation.clone();

  //Matrizen in umgekehrter Richtung multiplizieren
  pointMatrix.multiply(zahnradVerschieben.multiply(zahnradRotation.multiply(zahnradSkalieren)));

  //Normale bei Rotation wichtig, hier Skalierung, deshalb muss Rotationsmatrix mit Skalierungsmatrix für Normalen multipliziert werden
  normalMatrix.multiply(normalRotation.multiply(normalenSkalieren));
  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}
