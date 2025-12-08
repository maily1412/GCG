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



// das ambiente Licht
let ambientLight = {intensity: {r: 0.125, g: 0.125, b: 0.125}};

// alle übrigen (Punkt)-Lichter der Szene
let lights = [
  
   // Licht 1:Warmes Orange-Gelb
  {
    position:  new THREE.Vector3(150, 20, 100),
    intensity: {r: 0.85, g: 0.60, b: 0.12}
  },

  // Licht 2:Grün
  {
    position:  new THREE.Vector3(100, 120, 80),
    intensity: {r: 0.05, g: 0.40, b: 0.05}
  },

  // Licht 3: Rot
  {
    position:  new THREE.Vector3(-120, 100, 80),
    intensity: {r: 0.45, g: 0.06, b: 0.06}
  }

];

// k_a: Ambienter Reflexionskoeffizient
// Bestimmt, wie viel vom Umgebungslicht das Material reflektiert
// Werte nahe 0 = sehr dunkle Grundhelligkeit
// Werte nahe 1 = sehr helle Grundhelligkeit
let k_a = {r: 0.2, g: 0.2, b: 0.2};

// k_d: Diffuser Reflexionskoeffizient
// Bestimmt, wie stark das Material diffus (matt) reflektiert
// Hohe Werte = matte Oberfläche, niedrige Werte = wenig diffuse Reflexion
let k_d = {r: 0.6, g: 0.4, b: 0.0};

// k_s: Spekularer Reflexionskoeffizient
// Bestimmt, wie stark das Material glänzende Highlights erzeugt
// Hohe Werte = glänzende Oberfläche, niedrige Werte = matte Oberfläche
let k_s = {r: 0.3, g: 0.4, b: 0.0};

//Größe des Highlights (höher = kleiner/heller)
let shininess = 30.0;


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
  
  // Ambienter Lichtanteil
  // Formel: i_a = I_a · k_a
  outColor.r = ambientLight.intensity.r * k_a.r;
  outColor.g = ambientLight.intensity.g * k_a.g;
  outColor.b = ambientLight.intensity.b * k_a.b;

  // Blickvektor berechnen
  let view = new THREE.Vector3();  // erstellt leeren Vektor
  view.subVectors(camPosition, position).normalize();  // View ist der Richtungsvektor vom Punkt zur Kameraquelle; wird normalisiert, um das Skalarprodukt richtig zu berechnen

  
  // alle Punktlichter werden mit der Schleife berücksichtigt
  for (let i = 0; i < lights.length; i++) {

  // Diffuser Lichtanteil berechnen: id = Ip * kd * max(N * L)

  // Lichtvektor berechnen
  let light = lights[i];        // Lichter der Szenen
  let light_vector = new THREE.Vector3();  // erstellt leeren vektor
  light_vector.subVectors(light.position, position).normalize();   // Lichtvektor ist der Richtungsvektor vom Punkt zur Lichtquelle (L = Lichtposition - Punktposition)

  // Normale normalisieren
  let normale = normal.clone().normalize(); // Kopie der normalisierten Normale

  // Skalarprodukt
  // N und L sind Einheitsvektoren, d.h. N * L = cos(0) = 1 -> max. Helligkeit
  let dotNL = normale.dot(light_vector);

  // Nur berechnen, wenn das Licht die Vorderseite der Oberfläche trifft
  // Bei NdotL <= 0 kommt das Licht von hinten (Rückseite) und wird ignoriert
  if (dotNL > 0) {
    // id = Ip * kd * max(N⋅L)
    outColor.r += light.intensity.r * k_d.r * dotNL;
    outColor.g += light.intensity.g * k_d.g * dotNL;
    outColor.b += light.intensity.b * k_d.b * dotNL;
  }
  
  // Beurteilung: Man sieht jetzt eine Lichtseite und eine Schattenseite. Die Helligkeit ist auf die Beleuchtung angepasst.


  // Spekularer Lichtanteil berechnen: is= Ip * ks * (V * R)^n

  // Reflexionsvektor berechnen
  let reflexion = normale.clone().multiplyScalar(2 * normale.dot(light_vector)).sub(light_vector).normalize(); // berechnet den reflektierten Lichtvektor der Normalen gespiegelt und normalisiert wird für das spätere Skalarprodukt mit dem Blickvektor

  // Skalarprodukt
  let dotVR = view.dot(reflexion);
  
  // Nur berechnen, wenn die Kamera in Richtung der Reflexion schaut
  // Bei VdotR <= 0 schaut die Kamera weg von der Reflexionsrichtung
  if (dotVR > 0) {
    // Spekularfaktor
    let specularFactor = Math.pow(dotVR, shininess); // berechnet die Stärke des Glanzpunkts: (V·R)^n verstärkt hohe Werte und macht den Glanzpunkt kleiner und schärfer je höher der Shininess-Wert ist

    // is= Ip * ks * (V * R)^n
    outColor.r += light.intensity.r * k_s.r * specularFactor;
    outColor.g += light.intensity.g * k_s.g * specularFactor;
    outColor.b += light.intensity.b * k_s.b * specularFactor;
  }

  // Beurteilung: Es erscheint ein heller Glanzpunkt auf der Kugel. Je nach dem wie man die Shininess einstellt, wird diese schärfer oder weicher.
  }
  //Beurteilung: Durch das Hinzufügen mehrerer farbiger Punktlichter entsteht eine vielfältigere Lichtstimmung. Die Kugel zeigt klar getrennte rote, grüne und warme Beleuchtungszonen, deren diffuse und spekulare Anteile sich überlagern und zu Farbverläufen führen.


  // Rueckgabe des berechneten Farbwerts
  return outColor;
}
