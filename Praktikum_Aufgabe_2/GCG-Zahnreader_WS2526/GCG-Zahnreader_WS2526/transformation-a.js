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
  
  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}
