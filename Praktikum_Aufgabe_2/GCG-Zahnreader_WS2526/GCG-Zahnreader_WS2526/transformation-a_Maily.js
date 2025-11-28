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
  // pointMatrix beschreibt gesamte räumliche Bewegung (Transformation) des Zahnrads
  let pointMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                0.0, 0.0, 0.0, 1.0);
  
  // Beleuchtung 
  let normalMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
                                 0.0, 1.0, 0.0, 0.0,
                                 0.0, 0.0, 1.0, 0.0,
                                 0.0, 0.0, 0.0, 1.0);
  
  // TODO: Implementieren Sie die Berechnung der Transformationsmatrizen
  
  // zuerst Transformation in den Ursprung
  let translation1 = new Matrix4( 1.0, 0.0, 0.0, -20.0,
                                  0.0, 1.0, 0.0, -10.0,
                                  0.0, 0.0, 1.0, 0.0,
                                  0.0, 0.0, 0.0, 1.0);

  // Rotationsgeschwindigkeit
  const omega = 0.1 * 2 * Math.PI; // 1/10 Umdrehungen pro Sekunde; Ergebnis Radient/sek

  // Drehwinkel (wie weit hat es sich zu einem bestimmten Zeitpunkt gedreht)
  const winkel = omega * time;

  //Rotation um die z-Achse
  const cos = Math.cos(winkel);
  const sin = Math.sin(winkel);

  let rotation = new Matrix4( cos, -sin,  0.0,  0.0,
                              sin,  cos,  0.0,  0.0,
                              0.0,  0.0,  1.0,  0.0,
                              0.0,  0.0,  0.0,  1.0
    
  );

  let translation2 = new Matrix4( 1.0, 0.0, 0.0, 20.0,
                                  0.0, 1.0, 0.0, 10.0,
                                  0.0, 0.0, 1.0, 0.0,
                                  0.0, 0.0, 0.0, 1.0);


  pointMatrix.multiply(translation2.multiply(rotation.multiply(translation1)));

  //Normale nur bei Rotation wichtig, hier keine Skalierung, deshalb muss Rotationsmatrix nicht angepasst werden
  normalMatrix.multiply(rotation);


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

  let normalMatrix = new Matrix4( 1.0, 0.0, 0.0, 0.0,
                                  0.0, 1.0, 0.0, 0.0,
                                  0.0, 0.0, 1.0, 0.0,
                                  0.0, 0.0, 0.0, 1.0);
  
  // TODO: Implementieren Sie die Brechnung der Transformationsmatrizen
  // zuerst Transformation in den Ursprung
  let translation1 = new Matrix4( 1.0, 0.0, 0.0, -47.0,
                                  0.0, 1.0, 0.0, -2.0,
                                  0.0, 0.0, 1.0, 0.0,
                                  0.0, 0.0, 0.0, 1.0);

  // Rotationsgeschwindigkeit
  const omega = 0.1 * 2 * Math.PI; // 1/10 Umdrehungen pro Sekunde; Ergebnis Radient/sek

  // Drehwinkel (wie weit hat es sich zu einem bestimmten Zeitpunkt gedreht)
  // Rotationsgeschwindikeit negieren, weil es sich in die andere Richtung dreht
  // Rotationsgeschwingkeit doppelt so schnell (siehe Zacken)
  const winkel = -(2 * omega) * time;

  //Rotation um die z-Achse
  const cos = Math.cos(winkel);
  const sin = Math.sin(winkel);

  let rotation = new Matrix4( cos, -sin,  0.0,  0.0,
                              sin,  cos,  0.0,  0.0,
                              0.0,  0.0,  1.0,  0.0,
                              0.0,  0.0,  0.0,  1.0
    
  );

  let translation2 = new Matrix4( 1.0, 0.0, 0.0, 47.0,
                                  0.0, 1.0, 0.0, 2.0,
                                  0.0, 0.0, 1.0, 0.0,
                                  0.0, 0.0, 0.0, 1.0);


  pointMatrix.multiply(translation2.multiply(rotation.multiply(translation1)));

  //Normale nur bei Rotation wichtig, hier keine Skalierung, deshalb muss Rotationsmatrix nicht angepasst werden
  normalMatrix.multiply(rotation);

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

  let normalMatrix = new Matrix4( 1.0, 0.0, 0.0, 0.0,
                                  0.0, 1.0, 0.0, 0.0,
                                  0.0, 0.0, 1.0, 0.0,
                                  0.0, 0.0, 0.0, 1.0);
  
  // TODO: Implementieren Sie die Brechnung der Transformationsmatrizen
  let translation1 = new Matrix4( 1.0, 0.0, 0.0, -47.0,
                                  0.0, 1.0, 0.0, -2.0,
                                  0.0, 0.0, 1.0, 0.0,
                                  0.0, 0.0, 0.0, 1.0);

  // Rotationsgeschwindigkeit
  const omega = 0.1 * 2 * Math.PI; // 1/10 Umdrehungen pro Sekunde; Ergebnis Radient/sek

  // Drehwinkel (wie weit hat es sich zu einem bestimmten Zeitpunkt gedreht)
  // Wie kommt man auf 3/2??
  const winkel = 3/2 * omega * time;
  // const winkel = omega * time;

  // Skalierung um 10, weil "Ein Zehntel des benötigten Durchmessers"
  const skalierung = new Matrix4( 10.0, 0.0, 0.0, 0.0,
                                  0.0, 10.0, 0.0, 0.0,
                                  0.0, 0.0,  1.0, 0.0,
                                  0.0, 0.0,  0.0, 1.0
    );


  //Rotation um die z-Achse
  const cos = Math.cos(winkel);
  const sin = Math.sin(winkel);

  let rotation = new Matrix4( cos, -sin,  0.0,  0.0,
                              sin,  cos,  0.0,  0.0,
                              0.0,  0.0,  1.0,  0.0,
                              0.0,  0.0,  0.0,  1.0
    
  );

  let translation = new Matrix4( 1.0, 0.0, 0.0, 67.0,
                                  0.0, 1.0, 0.0, 14.0,
                                  0.0, 0.0, 1.0, 0.0,
                                  0.0, 0.0, 0.0, 1.0);

  pointMatrix.multiply(translation.multiply(rotation.multiply(skalierung)));

  //Normale nur bei Rotation wichtig, hier keine Skalierung, deshalb muss Rotationsmatrix nicht angepasst werden
  normalMatrix.multiply(rotation);
  return {
    "pointMatrix" : pointMatrix,
    "normalMatrix" : normalMatrix
  };
}
