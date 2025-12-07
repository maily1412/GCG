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
  {position: new THREE.Vector3(-100, 100, 75),
  intensity: {r: 0.875, g: 0.625, b: 0.125}},
  {position: new THREE.Vector3(100, -100, 75),
  intensity: {r: 0.9, g: 0.2, b: 0.5}},
  {position: new THREE.Vector3(75, 50, 100),
  intensity: {r: 0.1, g: 0.7, b: 0.7}},

];

//Reflexionskoeffizienten
let reflexionsKoeffizientAmbient = {r: 0.2, g: 0.2, b: 0.2};

let reflexionsKoeffizientDiffus =  {r: 0.6, g: 0.4, b: 0.0};

let reflexionsKoeffizientSpekular ={r: 0.3, g: 0.4, b: 0.0};

//weitere Materialeigenschaft für spekularen Anteil
let glanzstaerke = 50;

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
  
  
  //Aufgabe 1 - ambient
  let iAmbientR = ambientLight.intensity.r * reflexionsKoeffizientAmbient.r;
  let iAmbientG = ambientLight.intensity.g * reflexionsKoeffizientAmbient.g;
  let iAmbientB = ambientLight.intensity.b * reflexionsKoeffizientAmbient.b;

  //ambientes Licht outColor hinzufügen
  outColor.r += iAmbientR;
  outColor.g += iAmbientG;
  outColor.b += iAmbientB;

  
  //Vektor, der nicht jedes Mal in der for-each-Schleife neu gesetzt werden muss, 
  //da er nur von der Kameraposition sowie der Position des betrachteten Punktes abhängig ist
  let view = new THREE.Vector3();
  view.subVectors(camPosition, position);
  view.normalize();

  //für jedes Licht diffusen und spekularen Anteil bestimmen
  lights.forEach(element => {
    //normale Klonen, da sie sonst durch .dot mit dem Ergebnis überschrieben wird
    //sonst hätte man sie auch außerhalb der for-each-Schleife definieren können
    let normale = normal.clone();
    //normale.normalize(); wird schon normalisiert übergeben, deshalb nicht nötig

    //Richtung der jeweiligen Lichtquelle bestimmen
    let lichtRichtung = new THREE.Vector3();
    lichtRichtung.subVectors(element.position, position);
    lichtRichtung.normalize();


    //Aufgabe 2 - diffus
    //iDiffus = Lichtquelle * reflexionsKoeffizientDiffus * (normal ° richtungZumLicht)
    let diffusSkalar = normale.dot(lichtRichtung);

    //diffuser Anteil soll nur hinzugefügt werden, wenn es kein "negatives" Licht ist, 
    //d.h. wenn der Winkel größer als 90° ist darf es nicht beachtet werden
    if(diffusSkalar > 0){
      outColor.r += element.intensity.r * reflexionsKoeffizientDiffus.r * diffusSkalar;
      outColor.g += element.intensity.g * reflexionsKoeffizientDiffus.g * diffusSkalar;
      outColor.b += element.intensity.b * reflexionsKoeffizientDiffus.b * diffusSkalar;
    }
    

    //Aufgabe 3 - spekular
    //iSpekular = Lichtquelle * reflexionsKoeffizientSpekular * (view ° reflexion)^glanzstärke
    let reflexionsVektor = new THREE.Vector3();
    let reflexionsTerm1 = new THREE.Vector3();
    reflexionsTerm1 = normale.multiplyScalar(diffusSkalar * 2);
    
    reflexionsVektor.subVectors(reflexionsTerm1, lichtRichtung);
    reflexionsVektor.normalize();
  
    let spekularSkalar = view.dot(reflexionsVektor);

    //spekularer Anteil soll nur hinzugefügt werden, wenn es kein "negatives" Licht ist, 
    //d.h. wenn der Winkel größer als 90° ist darf es nicht beachtet werden
    if(spekularSkalar > 0){
      let powSpekularSkalar = Math.pow(spekularSkalar, glanzstaerke);
      outColor.r += element.intensity.r * reflexionsKoeffizientSpekular.r * powSpekularSkalar;
      outColor.g += element.intensity.g * reflexionsKoeffizientSpekular.g * powSpekularSkalar;
      outColor.b += element.intensity.b * reflexionsKoeffizientSpekular.b * powSpekularSkalar;
    }
    
  }); 

  // Rueckgabe des berechneten Farbwerts
  return outColor;
}
