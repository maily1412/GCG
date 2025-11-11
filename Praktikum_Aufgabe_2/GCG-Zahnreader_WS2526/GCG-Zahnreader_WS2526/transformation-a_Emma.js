////////////////////////////////////////////////////////////////////////////////
// transformation-a.js
//
// Bearbeiten Sie diese Datei fuer den Praktikumsteil "Transformationen".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen der Computergrafik
//
// Studiengang  : BMI
// Autor        :
//...
////////////////////////////////////////////////////////////////////////////////


//1. Zahnrad A animieren
//Animieren Sie Zahnrad A so, dass es sich um seine Achse mit z.B. einer zehntel Umdrehung pro Sekunde dreht. Stellen Sie sicher, dass die Beleuchtung korrekt berechnet werden kann.
//Hinweis: Der Mittelpunkt von Zahnrad A befindet sich ohne Transformation an der Position (20; 10; 0).
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
    //Verschiebungsvektor: (-20
    //                      -10
    //                       1)
  let translationInUrsprung = new Matrix4(1.0, 0.0, 0.0, -20.0,
                                          0.0, 1.0, 0.0, -10.0,
                                          0.0, 0.0, 1.0, 1.0,
                                          0.0, 0.0, 0.0, 1.0);
  //Zahnrad rotieren
    //zehntel Umdrehung pro Sekunde --> 360° : 10 = 36°
    let zehntelUmdrehung = 360 / 10;
    let zeitabhaengigerWinkel = time * zehntelUmdrehung * (Math.PI/180);
    let cos = Math.cos(zeitabhaengigerWinkel);
    let sin = Math.sin(zeitabhaengigerWinkel);
    //Rotationsmatrix = (cos(a), -sin(a), 0, 0,
    //                   sin(a),  cos(a), 0, 0,
    //                   0,       0,      1, 0,
    //                   0,       0,      0, 1)
  let zahnradRotation = new Matrix4(cos, -sin, 0.0, 0.0,
                                    sin, cos, 0.0, 0.0,
                                    0.0, 0.0, 1.0, 0.0,
                                    0.0, 0.0, 0.0, 1.0);
  
  //Zahnrad zurück an eigentliche Position verschieben
  let tranlationZurueck = new Matrix4(1.0, 0.0, 0.0, 20.0,
                                      0.0, 1.0, 0.0, 10.0,
                                      0.0, 0.0, 1.0, 1.0,
                                      0.0, 0.0, 0.0, 1.0);
  //Matrizen in umgekehrter Richtung multiplizieren
  pointMatrix.multiply(tranlationZurueck.multiply(zahnradRotation.multiply(translationInUrsprung)));

  //Normale nur bei Rotation wichtig, hier keine Skalierung, deshalb muss Rotationsmatrix nicht angepasst werden
  normalMatrix.multiply(zahnradRotation);
  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}


//Methode für Matrizen aulagern... Parameter Rotation --> Winkel, Parameter Translation --> x,y...
//2. Zahnrad B animieren
//Animieren Sie Zahnrad B so, dass es sich um seine Achse dreht und korrekt in Zahnrad A greift. Stellen Sie sicher, dass die Beleuchtung korrekt berechnet werden kann.
//Hinweis: Der Mittelpunkt von Zahnrad B befindet sich ohne Transformation an der Position (47; 2; 0).
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
    //Verschiebungsvektor: (-47
    //                      -2
    //                       1)
  let translationInUrsprung = new Matrix4(1.0, 0.0, 0.0, -47.0,
                                          0.0, 1.0, 0.0, -2.0,
                                          0.0, 0.0, 1.0, 1.0,
                                          0.0, 0.0, 0.0, 1.0);

  //Zahnrad rotieren
    //zehntel Umdrehung pro Sekunde --> 360° : 10 = 36°
    //hier negativ, da Zahnrad in andere Richtung drehen muss
    //mal 2, da halb so viele Zacken, wie bei Zahnrad A und daher doppelt so schnell
    let zehntelUmdrehung = -(360 / 10) * 2;
    let zeitabhaengigerWinkel = time * zehntelUmdrehung * (Math.PI/180);
    let cos = Math.cos(zeitabhaengigerWinkel);
    let sin = Math.sin(zeitabhaengigerWinkel);
    //Rotationsmatrix = (cos(a), -sin(a), 0, 0,
    //                   sin(a),  cos(a), 0, 0,
    //                   0,       0,      1, 0,
    //                   0,       0,      0, 1)
  let zahnradRotation = new Matrix4(cos, -sin, 0.0, 0.0,
                                    sin, cos, 0.0, 0.0,
                                    0.0, 0.0, 1.0, 0.0,
                                    0.0, 0.0, 0.0, 1.0);
  
  
  //Zahnrad zurück an eigentliche Position verschieben
  let tranlationZurueck = new Matrix4(1.0, 0.0, 0.0, 47.0,
                                      0.0, 1.0, 0.0, 2.0,
                                      0.0, 0.0, 1.0, 1.0,
                                      0.0, 0.0, 0.0, 1.0);

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
  let zahnradSkalieren = new Matrix4(10.0, 0.0, 0.0, 0.0,
                                     0.0, 10.0, 0.0, 0.0,
                                     0.0, 0.0, 1.0, 0.0,
                                     0.0, 0.0, 0.0, 1.0);

  //bei Skalierung Normalen getrennt behandeln
  let normalenSkalieren = new Matrix4(0.1, 0.0, 0.0, 0.0,
                                     0.0, 0.1, 0.0, 0.0,
                                     0.0, 0.0, 1.0, 0.0,
                                     0.0, 0.0, 0.0, 1.0);


  //Zahnrad rotieren
    //zehntel Umdrehung pro Sekunde --> 360° : 10 = 36°
    //hier wieder positiv, da Zahnrad in andere Richtung drehen muss als Zahnrad B
    
  let zehntelUmdrehung = (360 / 10) * (3/2);
  let zeitabhaengigerWinkel = time * zehntelUmdrehung * (Math.PI/180);
  let cos = Math.cos(zeitabhaengigerWinkel);
  let sin = Math.sin(zeitabhaengigerWinkel);
    //Rotationsmatrix = (cos(a), -sin(a), 0, 0,
    //                   sin(a),  cos(a), 0, 0,
    //                   0,       0,      1, 0,
    //                   0,       0,      0, 1)
  let zahnradRotation = new Matrix4(cos, -sin, 0.0, 0.0,
                                    sin, cos, 0.0, 0.0,
                                    0.0, 0.0, 1.0, 0.0,
                                    0.0, 0.0, 0.0, 1.0);
 
  //Zahnrad an Endposition verschieben
    //Mittelpunkt (0; 0; 0) zu (67; 14; 0)
    //Verschiebungsvektor: (67
    //                      14
    //                       1)
  let zahnradVerschieben = new Matrix4(1.0, 0.0, 0.0, 67.0,
                                      0.0, 1.0, 0.0, 14.0,
                                      0.0, 0.0, 1.0, 1.0,
                                      0.0, 0.0, 0.0, 1.0);

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
