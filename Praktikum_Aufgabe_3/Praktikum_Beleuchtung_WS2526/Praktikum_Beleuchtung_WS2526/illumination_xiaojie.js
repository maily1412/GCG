////////////////////////////////////////////////////////////////////////////////
// illumination.js
//
// Bearbeiten Sie diese Datei fuer den Praktikumsteil "Illumination".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
//
// Studiengang:
// Gruppe     :
// Autor 1    :
// Autor 2    :
// Autor 3    :
// Autor 4    :
// Autor 5    :
////////////////////////////////////////////////////////////////////////////////



// das ambiente Licht
let ambientLight = {intensity: {r: 0.125, g: 0.125, b: 0.125}};

// alle übrigen (Punkt)-Lichter der Szene
let lights =
[
    //vorgegeben
  {position: new THREE.Vector3(-100, 100, 75),
   intensity: {r: 0.875, g: 0.625, b: 0.125}}, //orange

    //zwei zusätzliche Punktlichter
  {position: new THREE.Vector3(0, 0, -150),
   intensity: {r: 0.1, g: 0.0, b: 0.9}}, //blue

  {position: new THREE.Vector3(0, 0, 150),
   intensity: {r: 0.8, g: 0.0, b: 0.9}}, //purple
];

//Reflexionskoeffizienten
//1 is am einfachsten
let ambiReflexionskoeffizienten = { r: 1.0, g: 1.0, b: 1.0 }; //ka (koeffizienten ambient)
let difuReflexionskoeffizienten = { r: 1.0, g: 1.0, b: 1.0}; //kd (s.o.)
let spekuReflexionskoeffizienten = { r: 1.0, g: 1.0, b: 1.0 }; //ks (s.o.)

let shininess = 10;



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
    // TODO: Implementieren Sie die Beleuchtungsberechnung
    //       mit dem Phong-Beleuchtungsmodell.

  // Initialisiere den Rueckgabewert
    let outColor = { r: 0.0, g: 0.0, b: 0.0 };
    //berechnung: intensity * ReflexKoe von ambient
    outColor.r = ambientLight.intensity.r * ambiReflexionskoeffizienten.r
    outColor.g = ambientLight.intensity.g * ambiReflexionskoeffizienten.g
    outColor.b = ambientLight.intensity.b * ambiReflexionskoeffizienten.b

    //Beurteilung
    //Helligkeit gleich(Wert davon)
    //schwach beleuchtet

    //zwischenspeicher
    let normale = normal.clone() //n
    normale.normalize();


    for (let i = 0; i < lights.length; i++)
    {
        //Diffuser Lichtanteil Rechnung:

        let light = lights[i];

        //Lichtvektor l
        let lichtvektor = new THREE.Vector3();
        lichtvektor.subVectors(light.position, position).normalize(); //von Punkt zur Lichtquelle

        //max Helligkeit Skalarprodukt von n und l
        //beides einheitsvektoren
        let dotNL = normale.dot(lichtvektor);

        //berechnung: intensity * ReflexKoe von diffuser * dotNL
        outColor.r += light.intensity.r * difuReflexionskoeffizienten.r * dotNL
        outColor.g += light.intensity.g * difuReflexionskoeffizienten.g * dotNL
        outColor.b += light.intensity.b * difuReflexionskoeffizienten.b * dotNL

        //Beurteilung
        //augteilt in zwei seiten
        //eine hell und eine dunkel
        //Helligkeit abhänging von der Beleutung


        //Spekularer Lichtanteil Rechnung

        //blickvektor v
        let blickvektor = new THREE.Vector3(); //leerer Vektor
        blickvektor.subVectors(camPosition, position).normalize(); //vom Punkt zur Kamera; Richtungsvektor

        //reflextionsvektor r
        let reflextionsvektor = new THREE.Vector3();
        reflextionsvektor.copy(normale);
        reflextionsvektor.multiplyScalar(2.0 * dotNL);
        reflextionsvektor.sub(lichtvektor).normalize();

        
        //Winkel zwischen Blickrichtung (blickvektor) und Reflextionsvektor
        let dotVR = blickvektor.dot(reflextionsvektor);

        //SpekularFaktor
        let spekularFaktor = Math.pow(dotVR, shininess);

        //berechnung: intensity * ReflexKoe von spekular * dotVR
        outColor.r += light.intensity.r * spekuReflexionskoeffizienten.r * spekularFaktor;
        outColor.g += light.intensity.g * spekuReflexionskoeffizienten.g * spekularFaktor;
        outColor.b += light.intensity.b * spekuReflexionskoeffizienten.b * spekularFaktor;

        //Beurteilung
        //heller Punkt auf Kugel
        //je stärker shininess desto schärfer der helle punkt
    }
  // Rueckgabe des berechneten Farbwerts
  return outColor;
}
