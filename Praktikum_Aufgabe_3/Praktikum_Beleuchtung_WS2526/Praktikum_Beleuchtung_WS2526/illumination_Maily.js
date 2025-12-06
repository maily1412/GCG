////////////////////////////////////////////////////////////////////////////////
// illumination.js
//
// Bearbeiten Sie diese Datei fuer den Praktikumsteil "Illumination".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
//
// Studiengang: BMI
// Gruppe     : K
// Autor 1    : Mai Ly Le
// Autor 2    : Emma Damm
// Autor 3    : Daniela Janjic
// Autor 4    : Xiaojie Chen
// Autor 5    : Sara Saeid
////////////////////////////////////////////////////////////////////////////////


// das ambiente Licht (Ia)
let ambientLight = {intensity: {r: 0.125, g: 0.125, b: 0.125}};

// alle übrigen (Punkt)-Lichter der Szene
let lights = [
  {position: new THREE.Vector3(-100, 100, 75),
  intensity: {r: 0.875, g: 0.625, b: 0.125}}, //orange
  
  {position: new THREE.Vector3(120, 100, -60),
  intensity: { r: 0.857, g: 0.214, b: 0.345 }}, // rot

  {position: new THREE.Vector3(0, -100, -20),
  intensity: { r: 0.354, g: 0.777, b: 0.201 }}, // grün

  {position: new THREE.Vector3(0, 0, 150),
  intensity: { r: 0.8, g: 0.0, b: 0.9 }}, // lila

  {position: new THREE.Vector3(0, 0, -150),
  intensity: { r: 0.1, g: 0.0, b: 0.9 }}, // blau

];

// ambienter Reflektionskoeff. Material (0,…,1) r,g,b (ka)
let ambientReflectionCoefficient = {r: 1.0, g: 1.0, b: 1.0};

// diffuser Reflexionskoeffizient (kd)
let diffuseReflectionCoefficient = {r: 1.0, g: 1.0, b: 1.0};

// spekularer Reflexionskoeffizient (ks)
let specularReflectionCoefficient = { r: 1.0, g: 1.0, b: 1.0 };

// Highlight des Glanzes
let shininess = 20.0;



////////////////////////////////////////////////////////////////////////////////
// initScene()
// Initialisierung.
// Wird automatisch beim Start aufgerufen.
////////////////////////////////////////////////////////////////////////////////
function initScene()
{
  registerLights(lights);
}



////////////////////////////////////////////////////////////////////////////////
// phong(position, normal, camPosition)
// Wird während des Renderings für jeden Vertex einmal aufgerufen.
// Parameter: position     Vertexposition (Vector3)
//            normal       Vertexnormale (Vector3)
//            camPosition  Kameraposition (Vector3)
// Rueckgabe: Eine Farbe. D.h. ein Objekt mit den Attributen .r, .g und .b
//
// Hinweis: Alle Parameter befinden sich im selben Koordinatensystem.
////////////////////////////////////////////////////////////////////////////////
function phong(position, normal, camPosition)
{
  // Initialisiere den Rueckgabewert
  let outColor = {r: 0.0, g: 0.0, b: 0.0};
  
  // Ambienter Anteil berechnen: ia = Ia * ka

  outColor.r = ambientLight.intensity.r * ambientReflectionCoefficient.r;
  outColor.g = ambientLight.intensity.g * ambientReflectionCoefficient.g;
  outColor.b = ambientLight.intensity.b * ambientReflectionCoefficient.b;

  // Beurteilung: Kugel ist gleichmäßig schwach ausgeleuchtet. Egal wie man ihn dreht, er hat überall denselben Helligkeitswert


  // alle Punktlichter werden mit der Schleife berücksichtigt
  for (let i = 0; i < lights.length; i++) {

  // Diffuser Lichtanteil berechnen: id = Ip * kd * max(N * L)

  // Lichtvektor L berechnen
  let light = lights[i];        // alle Lichter der Szenen
  let L = new THREE.Vector3();  // erstellt leeren vektor
  L.subVectors(light.position, position).normalize();   // L ist ein normalisierter Richtungsvektor vom Punkt zur Lichtquelle (L = Lichtposition - Punktposition)

  // Normale normalisieren
  let N = normal.clone().normalize(); // Kopie der normalisierten Normale

  // Skalarprodukt
  // N und L sind Einheitsvektoren, d.h. N * L = cos(0) = 1 -> max. Helligkeit
  let dotNL = N.dot(L);

  // Wenn das Skalarprodukt negativ ist, dann kommt kein Licht -> max()
  // Wert muss dann auf 0 gesetzt werden, damit nichts verfälscht wird  -> Clamping
  if (dotNL < 0) dotNL = 0;

  // id = Ip * kd * max(N⋅L)
  outColor.r += light.intensity.r * diffuseReflectionCoefficient.r * dotNL;
  outColor.g += light.intensity.g * diffuseReflectionCoefficient.g * dotNL;
  outColor.b += light.intensity.b * diffuseReflectionCoefficient.b * dotNL;
  
  // Beurteilung: Man sieht jetzt eine Lichtseite und eine Schattenseite. Die Helligkeit ist auf die Beleuchtung angepasst.


  // Spekularer Lichtanteil berechnen: is= Ip * ks * (V * R)^n

  // Blickvektor V berechnen
  let V = new THREE.Vector3();  // erstellt leeren Vektor
  V.subVectors(camPosition, position).normalize();  // V ist normalisierter Richtungsvektor vom Punkt zur Kameraquelle

  // Reflexionsvektor R berechnen
  let R = N.clone().multiplyScalar(2 * N.dot(L)).sub(L).normalize(); // berechnet den reflektierten Lichtvektor R, das an der Normale gespiegelt und normalisiert für das spätere Skalarprodukt mit dem Blickvektor ist

  // Skalarprodukt
  let dotVR = V.dot(R);
  // setzen negative Werte auf 0, da nur reflektiertes Licht sichtbar ist (wichtig für Glanzpunkt)
  if (dotVR < 0) dotVR = 0;

  // Spekularfaktor
  let specularFactor = Math.pow(dotVR, shininess); // berechnet die Stärke des Glanzpunkts: (V·R)^n verstärkt hohe Werte und macht den Glanzpunkt kleiner und schärfer je höher der Shininess-Wert ist

  // is= Ip * ks * (V * R)^n
  outColor.r += light.intensity.r * specularReflectionCoefficient.r * specularFactor;
  outColor.g += light.intensity.g * specularReflectionCoefficient.g * specularFactor;
  outColor.b += light.intensity.b * specularReflectionCoefficient.b * specularFactor;

  // Beurteilung: Es erscheint ein heller Glanzpunkt auf der Kugel. Je nach dem wie man die Shininess einstellt, wird diese schärfer oder weicher.
  }
  //Beurteilung: Durch das Hinzufügen mehrerer farbiger Punktlichter entsteht eine vielfältigere Lichtstimmung. Die Kugel zeigt klar getrennte rote, grüne und warme Beleuchtungszonen, deren diffuse und spekulare Anteile sich überlagern und zu Farbverläufen führen. Die Darstellung wirkt räumlich, farbig und physikalisch korrekt.

  // Rueckgabe des berechneten Farbwerts
  return outColor;
}
