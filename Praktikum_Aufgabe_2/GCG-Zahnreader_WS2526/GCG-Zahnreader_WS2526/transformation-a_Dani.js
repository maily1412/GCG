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

  // Mittelpunkt von Zahnrad A (ohne Transformation): (20, 10, 0)
  let mittelpunktX = 20.0;
  let mittelpunktY = 10.0;
  let mittelpunktZ = 0.0;

  // Rotationsgeschwindigkeit berechnen
  // 0.1 Umdrehungen pro Sekunde entspricht 36° pro Sekunde
  let zehntelUmdrehungA = 360.0 / 10.0;           // = 36° pro Sekunde
  let winkelGrad = time * zehntelUmdrehungA;      // Aktueller Winkel in Grad
  let winkelRad  = winkelGrad * Math.PI / 180.0;  // Umrechnung in Radiant (für cos/sin)

  // Sinus und Kosinus für die Rotationsmatrix vorberechnen
  let cosA = Math.cos(winkelRad);
  let sinA = Math.sin(winkelRad);

  // Um das Zahnrad um seinen eigenen Mittelpunkt zu drehen:
  // 1. Zum Ursprung verschieben
  // 2. Um Z-Achse rotieren
  // 3. Zurück zur Originalposition verschieben

  // 1) Zahnrad zum Ursprung verschieben
  let translationInUrsprung = new Matrix4(1.0, 0.0, 0.0, -mittelpunktX,
                                          0.0, 1.0, 0.0, -mittelpunktY,
                                          0.0, 0.0, 1.0, -mittelpunktZ,
                                          0.0, 0.0, 0.0, 1.0);

  // 2) Um Z-Achse drehen 
  let zahnradRotation = new Matrix4(cosA, -sinA, 0.0, 0.0,
                                    sinA,  cosA, 0.0, 0.0,
                                    0.0,   0.0,  1.0, 0.0,
                                    0.0,   0.0,  0.0, 1.0);

  // 3) Zahnrad zurück zur Originalposition
  let translationZurueck = new Matrix4(1.0, 0.0, 0.0, mittelpunktX,
                                       0.0, 1.0, 0.0, mittelpunktY,
                                       0.0, 0.0, 1.0, mittelpunktZ,
                                       0.0, 0.0, 0.0, 1.0);

 // Transformation für Punkte
  // Reihenfolge: Translation --> Rotation --> Translation zurück
  pointMatrix.multiply(translationZurueck);   // 3. Schritt
  pointMatrix.multiply(zahnradRotation);      // 2. Schritt 
  pointMatrix.multiply(translationInUrsprung);    // 1. Schritt


  // Normalen: nur Rotation 
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
  
  // Mittelpunkt von Zahnrad B: (ohne Transformation) (47, 2, 0)
  let mittelpunktBX = 47.0;
  let mittelpunktBY = 2.0;
  let mittelpunktBZ = 0.0;

  // Rotationsgeschwindigkeit berechnen
  // Zahnrad B dreht doppelt so schnell wie A, aber in entgegengesetzter Richtung
  // A: 0.1 Umdrehungen/s = 36°/s
  // B: -2 × 36°/s = -72°/s (negativ = im Uhrzeigersinn)
  let zehntelUmdrehungA = 360.0 / 10.0;                  // 36°/s wie bei Zahnrad A 
  let zehntelUmdrehungB = -2.0 * zehntelUmdrehungA;     // -72°/s

  let winkelGradB = time * zehntelUmdrehungB;         // Aktueller Winkel in Grad
  let winkelRadB  = winkelGradB * Math.PI / 180.0;     // Umrechnung in Radiant

   // Sinus und Kosinus für die Rotationsmatrix vorberechnen
  let cosB = Math.cos(winkelRadB);
  let sinB = Math.sin(winkelRadB);

  // Um das Zahnrad um seinen eigenen Mittelpunkt zu drehen:
  // 1. Zum Ursprung verschieben
  // 2. Um Z-Achse rotieren
  // 3. Zurück zur Originalposition verschieben

  // 1) Zahnrad zum Ursprung verschieben
  let translationBInUrsprung = new Matrix4(1.0, 0.0, 0.0, -mittelpunktBX,
                                           0.0, 1.0, 0.0, -mittelpunktBY,
                                           0.0, 0.0, 1.0, -mittelpunktBZ,
                                           0.0, 0.0, 0.0, 1.0);

  
  // 2) Um Z-Achse drehen                                          
  let zahnradBRotation = new Matrix4(cosB, -sinB, 0.0, 0.0,
                                     sinB,  cosB, 0.0, 0.0,
                                     0.0,   0.0,  1.0, 0.0,
                                     0.0,   0.0,  0.0, 1.0);

   // 3) Zahnrad zurück zur Originalposition
  let translationBZurueck = new Matrix4(1.0, 0.0, 0.0, mittelpunktBX,
                                        0.0, 1.0, 0.0, mittelpunktBY,
                                        0.0, 0.0, 1.0, mittelpunktBZ,
                                        0.0, 0.0, 0.0, 1.0);

 
  // Transformation für Punkte
  // Reihenfolge: Translation --> Rotation --> Translation zurück
  pointMatrix.multiply(translationBZurueck);      //3.Schritt
  pointMatrix.multiply(zahnradBRotation);         // 2.Schritt
  pointMatrix.multiply(translationBInUrsprung);   //1.Schritt

  // Normalen: nur Rotation 
  normalMatrix.multiply(zahnradBRotation);


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
  
  // Zahnrad C wird um Faktor 10 vergrößert
  let skalierungsFaktorC = 10.0;

  // Skalierungsmatrix für Punkte
  let skalierungsMatrixC = new Matrix4(skalierungsFaktorC, 0.0,               0.0, 0.0,
                                       0.0,               skalierungsFaktorC, 0.0, 0.0,
                                       0.0,               0.0,               1.0, 0.0,
                                       0.0,               0.0,               0.0, 1.0);

  // Inverse Skalierungsmatrix für Normalen
  // Bei Skalierung müssen Normalen mit der inversen Skalierung transformiert werden
  // Sonst zeigen sie nach der Transformation in die falsche Richtung
  let inverseSkalierungsMatrixC = new Matrix4(1.0 / skalierungsFaktorC, 0.0,                    0.0, 0.0,
                                              0.0,                      1.0 / skalierungsFaktorC, 0.0, 0.0,
                                              0.0,                      0.0,                    1.0, 0.0,
                                              0.0,                      0.0,                    0.0, 1.0);

  // Rotationsgeschwindigkeit berechnen
  // Zahnrad C dreht 1.5-mal so schnell wie Zahnrad A
  // A: 0.1 Umdrehungen/s = 36°/s
  // C: 1.5 × 36°/s = 54°/s
  let zehntelUmdrehungA = 360.0 / 10.0;            // 36°/s wie bei Zahnrad A 
  let zehntelUmdrehungC = zehntelUmdrehungA * 1.5; // 54°/s 

  let winkelGradC = time * zehntelUmdrehungC;         // Aktueller Winkel in Grad
  let winkelRadC  = winkelGradC * Math.PI / 180.0;    // Umrechnung in Radiant
  
  // Sinus und Kosinus für die Rotationsmatrix vorberechnen
  let cosC = Math.cos(winkelRadC);
  let sinC = Math.sin(winkelRadC);
  
  // Rotationsmatrix: Um Z-Achse drehen (gegen Uhrzeigersinn)
  let rotationMatrixC = new Matrix4(cosC, -sinC, 0.0, 0.0,
                                    sinC,  cosC, 0.0, 0.0,
                                    0.0,   0.0,  1.0, 0.0,
                                    0.0,   0.0,  0.0, 1.0);

  // Endposition von Zahnrad C
  let mittelpunktCX = 67.0;
  let mittelpunktCY = 14.0;
  let mittelpunktCZ = 0.0;
  
  // Translation zum Ursprung
  let translationMatrixC = new Matrix4(1.0, 0.0, 0.0, mittelpunktCX,
                                       0.0, 1.0, 0.0, mittelpunktCY,
                                       0.0, 0.0, 1.0, mittelpunktCZ,
                                       0.0, 0.0, 0.0, 1.0);

  // Transformation für Punkte
  // Reihenfolge: Skalierung --> Rotation --> Translation
  pointMatrix.multiply(translationMatrixC);
  pointMatrix.multiply(rotationMatrixC);
  pointMatrix.multiply(skalierungsMatrixC);

  // Transformation für Normalen
  normalMatrix.multiply(rotationMatrixC);
  normalMatrix.multiply(inverseSkalierungsMatrixC);

  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}


