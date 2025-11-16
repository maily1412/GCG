////////////////////////////////////////////////////////////////////////////////
// transformation-a.js
//
// Bearbeiten Sie diese Datei fuer den Praktikumsteil "Transformationen".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen der Computergrafik
//
// Studiengang  :
// Autor        :
//...
////////////////////////////////////////////////////////////////////////////////



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
    //Mittelpunkt(20;10;0)

    //zehntel drehung pro Sek
    //36 Grad die Sek
    let drehungProSek = 360.0 / 10.0;

    //zeitWinkel - Winkel in betracht der Zeit
    let zeitWinkel = drehungProSek * time * (Math.PI / 180);
    let cosA = Math.cos(zeitWinkel);
    let sinA = Math.sin(zeitWinkel);

    let radARotation = new Matrix4(cosA, -sinA, 0.0, 0.0,
                                   sinA, cosA, 0.0, 0.0,
                                   0.0, 0.0, 1.0, 0.0,
                                   0.0, 0.0, 0.0, 1.0);

    let posOhneTransf = new Matrix4(1.0, 0.0, 0.0, 20.0,
                                    0.0, 1.0, 0.0, 10.0,
                                    0.0, 0.0, 1.0, 1.0,
                                    0.0, 0.0, 0.0, 1.0);

    //Ursprung (0; 0; 0) sprich verschieben 0-20; 0-10 etc.
    let translationUrsprung = new Matrix4(1.0, 0.0, 0.0, -20.0,
                                          0.0, 1.0, 0.0, -10.0,
                                          0.0, 0.0, 1.0, 1.0,
                                          0.0, 0.0, 0.0, 1.0);

    //Matrizen in verkehrte Richtung multiplizieren
    pointMatrix.multiply(posOhneTransf.multiply(radARotation.multiply(translationUrsprung)));

    //Rotation ohne Skalierung
    normalMatrix.multiply(radARotation);

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
    //Mittelpunkt(47;2;0)

    //zehntel drehung pro Sek
    //negativ weil andere Richtung
    //mal 2 weil halbe Zackenanzahl wie bei RadA
    let drehungProSek = -(360.0 / 10.0) * 2;

    //zeitWinkel - Winkel in betracht der Zeit
    let zeitWinkel = drehungProSek * time * (Math.PI / 180);
    let cosB = Math.cos(zeitWinkel);
    let sinB = Math.sin(zeitWinkel);

    let radBRotation = new Matrix4(cosB, -sinB, 0.0, 0.0,
                                   sinB, cosB, 0.0, 0.0,
                                   0.0, 0.0, 1.0, 0.0,
                                   0.0, 0.0, 0.0, 1.0);

    let posOhneTransf = new Matrix4(1.0, 0.0, 0.0, 47.0,
                                    0.0, 1.0, 0.0, 2.0,
                                    0.0, 0.0, 1.0, 1.0,
                                    0.0, 0.0, 0.0, 1.0);

    //Ursprung (0; 0; 0) sprich verschieben 0-20; 0-10 etc.
    let translationUrsprung = new Matrix4(1.0, 0.0, 0.0, -47.0,
                                          0.0, 1.0, 0.0, -2.0,
                                          0.0, 0.0, 1.0, 1.0,
                                          0.0, 0.0, 0.0, 1.0);

    //Matrizen in verkehrte Richtung multiplizieren
    pointMatrix.multiply(posOhneTransf.multiply(radBRotation.multiply(translationUrsprung)));

    //Rotation ohne Skalierung
    normalMatrix.multiply(radBRotation);
  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}



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
    //Mittelpunkt(67;14;0)


    //Skalieren weil schon im Ursprung
    //richtige Dicke also nur x+y richtung skalieren
    let radCSkalierung = new Matrix4(10.0, 0.0, 0.0, 0.0,
                                   0.0, 10.0, 0.0, 0.0,
                                   0.0, 0.0, 1.0, 0.0,
                                   0.0, 0.0, 0.0, 1.0);

    let skalierung = new Matrix4(0.1, 0.0, 0.0, 0.0,
                                    0.0, 0.1, 0.0, 0.0,
                                    0.0, 0.0, 1.0, 0.0,
                                    0.0, 0.0, 0.0, 1.0);

    //zehntel drehung pro Sek
    //negativ weil andere Richtung
    //mal 2 weil halbe Zackenanzahl wie bei RadA
    let drehungProSek = (360.0 / 10.0) * (3 / 2);

    //zeitWinkel - Winkel in betracht der Zeit
    let zeitWinkel = drehungProSek * time * (Math.PI / 180);
    let cosC = Math.cos(zeitWinkel);
    let sinC = Math.sin(zeitWinkel);

    let radCRotation = new Matrix4(cosC, -sinC, 0.0, 0.0,
                                   sinC, cosC, 0.0, 0.0,
                                   0.0, 0.0, 1.0, 0.0,
                                   0.0, 0.0, 0.0, 1.0);

    let posOhneTransf = new Matrix4(1.0, 0.0, 0.0, 67.0,
                                    0.0, 1.0, 0.0, 14.0,
                                    0.0, 0.0, 1.0, 1.0,
                                    0.0, 0.0, 0.0, 1.0);

    //Matrizen in verkehrte Richtung multiplizieren
    pointMatrix.multiply(posOhneTransf.multiply(radCRotation.multiply(radCSkalierung)));

    //Rotation ohne Skalierung
    let normalRotation = radCRotation.clone();
    normalMatrix.multiply(normalRotation.multiply(skalierung));

  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}
