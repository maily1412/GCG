////////////////////////////////////////////////////////////////////////////////
// transformation-a.js
//
// Bearbeiten Sie diese Datei fuer den Praktikumsteil "Transformationen".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen der Computergrafik
//
// Studiengang  : [HIER EINFÜGEN]
// Autor        : [IHR NAME HIER EINFÜGEN]
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// Gibt die Transformation von Zahnrad A abhängig von der Zeit (time) zurück
// (Rotation um den eigenen Mittelpunkt: T_zurueck * R * T_in_Ursprung)
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
    // Position und Geschwindigkeit (0.1 Umdrehungen/s -> 36 Grad/s)
    const xA = 20.0;
    const yA = 10.0;
    const gradProSekunde = 360.0 / 10.0; 

    // Berechnung des aktuellen Winkels in Grad und Radiant
    let winkelGrad = time * gradProSekunde;
    let winkelRad = winkelGrad * Math.PI / 180.0; 
    let cos = Math.cos(winkelRad);
    let sin = Math.sin(winkelRad);

    // --- Matrizen-Bauanleitung: T_zurueck * R * T_in_Ursprung (TRT-Kette) ---

    // 1. T_inv: Translation in den Ursprung. Verschiebt das Zahnrad von (20, 10) nach (0, 0).
    let T_inUrsprung = new Matrix4(1.0, 0.0, 0.0, -xA,
                                   0.0, 1.0, 0.0, -yA,
                                   0.0, 0.0, 1.0, 0.0,
                                   0.0, 0.0, 0.0, 1.0);

    // 2. R: Rotation um Z-Achse. Dreht das Zahnrad im Ursprung.
    let R_Matrix = new Matrix4(cos, -sin, 0.0, 0.0,
                               sin,  cos, 0.0, 0.0,
                               0.0,  0.0, 1.0, 0.0,
                               0.0,  0.0, 0.0, 1.0);

    // 3. T: Translation zurück. Verschiebt das gedrehte Zahnrad zurück nach (20, 10).
    let T_zurueck = new Matrix4(1.0, 0.0, 0.0, xA,
                                0.0, 1.0, 0.0, yA,
                                0.0, 0.0, 1.0, 0.0,
                                0.0, 0.0, 0.0, 1.0);

    // Transformation für Punkte: M = T_zurueck * R * T_in_Ursprung.
    // Die Matrizen werden in der Reihenfolge T, R, T_inv multipliziert (Post-Multiplikation).
    pointMatrix = T_zurueck.clone(); 
    pointMatrix.multiply(R_Matrix);  
    pointMatrix.multiply(T_inUrsprung); 

    // Transformation für Normalen: Q = R.
    // Die Translation wird ignoriert (Vektoren sind richtungsunabhängig).
    normalMatrix = R_Matrix.clone();
  
  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}



////////////////////////////////////////////////////////////////////////////////
// Gibt die Transformation von Zahnrad B abhängig von der Zeit (time) zurück
// (Entgegengesetzt und 2x schneller: -72 Grad/s)
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
  	// Position und Geschwindigkeit
    const xB = 47.0;
    const yB = 2.0;
    const gradProSekundeA = 360.0 / 10.0;
    // B greift in A: Muss entgegengesetzt (-) und schneller (2x) drehen.
    const gradProSekundeB = -2.0 * gradProSekundeA; 

    let winkelGradB = time * gradProSekundeB;
    let winkelRadB = winkelGradB * Math.PI / 180.0;
    let cosB = Math.cos(winkelRadB);
    let sinB = Math.sin(winkelRadB);

    // --- Matrizen-Bauanleitung: T_zurueck * R * T_in_Ursprung (TRT-Kette) ---

    // 1. T_inv: Translation in den Ursprung (-47, -2)
    let T_inUrsprung = new Matrix4(1.0, 0.0, 0.0, -xB,
                                   0.0, 1.0, 0.0, -yB,
                                   0.0, 0.0, 1.0, 0.0,
                                   0.0, 0.0, 0.0, 1.0);

    // 2. R: Rotation um Z-Achse (mit negativem Winkel)
    let R_Matrix = new Matrix4(cosB, -sinB, 0.0, 0.0,
                               sinB,  cosB, 0.0, 0.0,
                               0.0,  0.0, 1.0, 0.0,
                               0.0,  0.0, 0.0, 1.0);

    // 3. T: Translation zurück (+47, +2)
    let T_zurueck = new Matrix4(1.0, 0.0, 0.0, xB,
                                0.0, 1.0, 0.0, yB,
                                0.0, 0.0, 1.0, 0.0,
                                0.0, 0.0, 0.0, 1.0);

    // Transformation für Punkte: M = T * R * T_inv
    pointMatrix = T_zurueck.clone(); 
    pointMatrix.multiply(R_Matrix);  
    pointMatrix.multiply(T_inUrsprung); 

    // Transformation für Normalen: Q = R
    normalMatrix = R_Matrix.clone();
  
  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}



////////////////////////////////////////////////////////////////////////////////
// Gibt die Transformation von Zahnrad C abhängig von der Zeit (time) zurück
// (Skalierung 10x, Rotation 1.5x, Translation (67, 14, 0))
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
  	// Position, Skalierung und Geschwindigkeit
    const xC = 67.0;
    const yC = 14.0;
    const scaleFactor = 10.0; // 10x Skalierung in X/Y (ungleichmäßig)
    const gradProSekundeA = 360.0 / 10.0;
    const gradProSekundeC = 1.5 * gradProSekundeA; // 1.5x schneller als A

    let winkelGradC = time * gradProSekundeC;
    let winkelRadC = winkelGradC * Math.PI / 180.0;
    let cosC = Math.cos(winkelRadC);
    let sinC = Math.sin(winkelRadC);

    // --- Matrizen-Bauanleitung: T * R * S ---

    // 1. S: Skalierung (10x in XY, 1x in Z)
    let S_Matrix = new Matrix4(scaleFactor, 0.0, 0.0, 0.0,
                               0.0, scaleFactor, 0.0, 0.0,
                               0.0, 0.0, 1.0, 0.0,
                               0.0, 0.0, 0.0, 1.0);
    
    // 2. R: Rotation um Z-Achse
    let R_Matrix = new Matrix4(cosC, -sinC, 0.0, 0.0,
                               sinC,  cosC, 0.0, 0.0,
                               0.0,  0.0, 1.0, 0.0,
                               0.0,  0.0, 0.0, 1.0);

    // 3. T: Translation zur Endposition (+67, +14)
    let T_Matrix = new Matrix4(1.0, 0.0, 0.0, xC,
                               0.0, 1.0, 0.0, yC,
                               0.0, 0.0, 1.0, 0.0,
                               0.0, 0.0, 0.0, 1.0);

    // Transformation für Punkte: M = T * R * S
    pointMatrix = T_Matrix.clone(); 
    pointMatrix.multiply(R_Matrix);  
    pointMatrix.multiply(S_Matrix); 

    // --- Normalen-Korrektur: Q = R * S_inv ---

    // 1. S_inv: Inverse Skalierung (1/10 = 0.1 in XY, 1 in Z)
    // Dies korrigiert die Verformung der Normalen durch die 10x Skalierung.
    let S_Inv_Matrix = new Matrix4(1.0 / scaleFactor, 0.0, 0.0, 0.0,
                                   0.0, 1.0 / scaleFactor, 0.0, 0.0,
                                   0.0, 0.0, 1.0, 0.0,
                                   0.0, 0.0, 0.0, 1.0);

    // Transformation für Normalen: Q = R * S_inv
    // Rotation wird angewendet, danach die inverse Skalierung zur Korrektur.
    normalMatrix = R_Matrix.clone();
    normalMatrix.multiply(S_Inv_Matrix);
  
  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}