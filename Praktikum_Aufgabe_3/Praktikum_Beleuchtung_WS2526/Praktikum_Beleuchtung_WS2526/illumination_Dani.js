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



// das ambiente Licht (Szene-Grundhelligkeit)
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
  },

  // Licht 4:Cyan-Blau
  {
    position:  new THREE.Vector3(50, 80, -120),
    intensity: {r: 0.15, g: 0.25, b: 0.40}
  }

];

// k_a: Ambienter Reflexionskoeffizient
// Bestimmt, wie viel vom Umgebungslicht das Material reflektiert
// Werte nahe 0 = sehr dunkle Grundhelligkeit
// Werte nahe 1 = sehr helle Grundhelligkeit
let k_a = {r: 0.04, g: 0.04, b: 0.04};

// k_d: Diffuser Reflexionskoeffizient
// Bestimmt, wie stark das Material diffus (matt) reflektiert
// Hohe Werte = matte Oberfläche, niedrige Werte = wenig diffuse Reflexion
let k_d = {r: 0.7, g: 0.7, b: 0.7};

// k_s: Spekularer Reflexionskoeffizient
// Bestimmt, wie stark das Material glänzende Highlights erzeugt
// Hohe Werte = glänzende Oberfläche, niedrige Werte = matte Oberfläche
let k_s = {r: 0.6, g: 0.6, b: 0.6};

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
  
  //Ambienter Lichtanteil
  // Formel: i_a = I_a · k_a
  outColor.r = ambientLight.intensity.r * k_a.r;
  outColor.g = ambientLight.intensity.g * k_a.g;
  outColor.b = ambientLight.intensity.b * k_a.b;

  // Normale normalisieren 
  // .clone() erstellt eine Kopie, damit die Originalnormale nicht verändert wird
  let N = normal.clone();
  N.normalize();
  
  // Blickvektor V: vom Vertex zur Kamera
  let V = new THREE.Vector3();            
  V.subVectors(camPosition, position);    
  V.normalize();

  // Iteriert über alle Lichter im lights-Array
  // Für jedes Licht werden diffuser und spekularer Anteil berech
  for (let i = 0; i < lights.length; i++)
  {
    let light = lights[i];
    
    // Lichtvektor L berechnen
    let L = new THREE.Vector3();
    L.subVectors(light.position, position);
    L.normalize();
    
    // Skalarprodukt N · L berechnen
    // Gibt den Cosinus des Winkels zwischen Normale und Lichtrichtung zurück
    // Werte: 1.0 (Licht frontal), 0.0 (Licht von der Seite), <0 (Licht von hinten)
    let NdotL = N.dot(L);
    
    // Nur berechnen, wenn das Licht die Vorderseite der Oberfläche trifft
    // Bei NdotL <= 0 kommt das Licht von hinten (Rückseite) und wird ignoriert
    if (NdotL > 0.0)
    {

      // Diffuser Lichtanteil
      // Formel: i_d = I_p · k_d · (N · L)
      outColor.r += light.intensity.r * k_d.r * NdotL;
      outColor.g += light.intensity.g * k_d.g * NdotL;
      outColor.b += light.intensity.b * k_d.b * NdotL;
      
      
      // Reflexionsvektor R berechnen 
      // Formel: R = 2 · (N · L) · N - L
      // R zeigt in die Richtung, in die das Licht reflektiert wird
      let R = new THREE.Vector3();
      R.copy(N);                        // R = N
      R.multiplyScalar(2.0 * NdotL);    // R = 2 · (N·L) · N
      R.sub(L);                         // R = 2 · (N·L) · N - L
      R.normalize();                    // R auf Länge 1 normalisieren
      
      // Skalarprodukt V · R berechnen
      // Gibt den Cosinus des Winkels zwischen Blickrichtung und Reflexionsrichtung zurück
      // Je näher die Kamera an der Reflexionsrichtung ist, desto stärker das Glanzlicht
      let VdotR = V.dot(R);
      
      // Nur berechnen, wenn die Kamera in Richtung der Reflexion schaut
      // Bei VdotR <= 0 schaut die Kamera weg von der Reflexionsrichtung
      if (VdotR > 0.0)
      {

        // Spekularen Faktor berechnen: (V · R)^shininess
        // Der Exponent shininess konzentriert das Glanzlicht
        // Je höher shininess, desto kleiner und schärfer das Highlight
        let specularFactor = Math.pow(VdotR, shininess);
        
        // Formel: i_s = I_p · k_s · (V · R)^n
        // Spekulare Reflexion: Licht wird in Vorzugsrichtung reflektiert
        // Sorgt für glänzende Highlights
        // Blickwinkelabhängig (bewegt sich mit der Kamera)
        outColor.r += light.intensity.r * k_s.r * specularFactor;
        outColor.g += light.intensity.g * k_s.g * specularFactor;
        outColor.b += light.intensity.b * k_s.b * specularFactor;
      }
    }
  }

  // Rueckgabe des berechneten Farbwerts
  return outColor;
}
