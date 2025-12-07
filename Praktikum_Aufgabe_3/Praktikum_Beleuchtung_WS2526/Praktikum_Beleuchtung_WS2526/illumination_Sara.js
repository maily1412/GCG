////////////////////////////////////////////////////////////////////////////////
// illumination.js – Praktikum Illumination
//
// HS Düsseldorf – Grundlagen der Computergrafik
//
// Studiengang: BMI
// Gruppe     : K
// Autor 1    : Mai Ly Le
// Autor 2    : Emma Damm
// Autor 3    : Daniela Janjic
// Autor 4    : Xiaojie Chen
// Autor 5    : Sara Saeid
//
// Ziel: Beleuchtung mit Phong-Modell (Ambient + Diffus + Spekular)
// Jede Farbe wird pro Vertex berechnet.
// -----------------------------------------------------------------------------
// WICHTIG ZUM PRINZIP:
// Farbe = Ambient + Σ(Lichter → Diffus + Spekular)
// -----------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////


// -----------------------------------------------------------------------------
// Umgebungslampe (Grundhelligkeit der Szene)
// -----------------------------------------------------------------------------

let ambientLight = { intensity: { r:0.125, g:0.125, b:0.125 }}; // schwaches graues Umgebungslicht


// -----------------------------------------------------------------------------
// Materialeigenschaften (Skalarwerte → Material reagiert gleich für R,G,B)
// -----------------------------------------------------------------------------
let k_a = 0.55;  // Ambientanteil (Grundhelligkeit des Materials)
let k_d = 0.8;   // Diffusanteil (wie stark Licht matt reflektiert wird)
let k_s = 0.3;   // Spekularanteil (Glanzstärke)
let shininess = 18; // exponent → höher = kleiner/heller Glanzpunkt


// -----------------------------------------------------------------------------
// Punktlichter in der Szene (position + Lichtfarbe RGB)
// Drei farbige Lichter für sichtbare Mischung
// -----------------------------------------------------------------------------

let lights = [
  { position:new THREE.Vector3(-120,110,80), intensity:{r:0.9,g:0.2,b:0.2} }, // Rot von links
  { position:new THREE.Vector3(120,110,80),  intensity:{r:0.2,g:0.9,b:0.2} }, // Grün von rechts
  { position:new THREE.Vector3(160,-40,40),  intensity:{r:1.0,g:0.8,b:0.1} }  // Gelb (Key Light unten)
];


// -----------------------------------------------------------------------------
// Szene-Setup
// -----------------------------------------------------------------------------
function initScene()
{
  registerLights(lights); // Lichter im Renderer registrieren
}



// -----------------------------------------------------------------------------
// PHONG-SHADER (für jeden Vertex ausgeführt)
// Berechnet finalen Farbwert r,g,b → wird im Rendering verwendet
// position   = Punkt auf Oberfläche
// normal     = Normale des Punkts (für Einfallswinkel)
// camPosition= Position der Kamera für Glanzwinkel
// -----------------------------------------------------------------------------

function phong(position, normal, camPosition)
{
    // Startfarbe = schwarz
    let outColor = { r:0.0, g:0.0, b:0.0 };


    // -------------------------------------------------------------------------
    // 1) AMBIENT – Grundhelligkeit unabhängig vom Lichtwinkel
    // Formel: I_a = ambientLight * k_a
    // -------------------------------------------------------------------------
    outColor.r += ambientLight.intensity.r * k_a;
    outColor.g += ambientLight.intensity.g * k_a;
    outColor.b += ambientLight.intensity.b * k_a;



    // -------------------------------------------------------------------------
    // 2) Für jedes Punktlicht diffus + spekular berechnen (Phong)
    // -------------------------------------------------------------------------
    for(let i=0; i<lights.length; i++)
    {
        let lightPos = lights[i].position;
        let lightInt = lights[i].intensity;


        // --- Richtungsvektor vom Punkt zum Licht
        let L = new THREE.Vector3().subVectors(lightPos, position).normalize();

        // --- Normale kopieren & normieren (wichtig!)
        let N = normal.clone().normalize();


        // ---------------------------------------------------------------------
        // DIFFUS – mattes Licht abhängig vom Winkel
        // Formel: I_d = I_light * k_d * max(N·L,0)
        // ---------------------------------------------------------------------

        let NdotL = Math.max(N.dot(L),0); // <0 → Licht hinter Objekt → kein Licht

        outColor.r += lightInt.r * k_d * NdotL;
        outColor.g += lightInt.g * k_d * NdotL;
        outColor.b += lightInt.b * k_d * NdotL;



        // ---------------------------------------------------------------------
        // SPEKULAR – Glanzlicht abhängig von Blickrichtung
        // nur wenn Oberfläche überhaupt Licht erhält
        // Formel: I_s = I_light * k_s * (R·V)^shininess
        // ---------------------------------------------------------------------
        if(NdotL > 0)
        {
            // Blickvektor Kamera←Punkt
            let V = new THREE.Vector3().subVectors(camPosition, position).normalize();

            // Spiegelungsvektor R = 2(N·L)N - L
            let R = N.clone().multiplyScalar(2*NdotL).sub(L).normalize();

            let RdotV = Math.max(R.dot(V),0); // Licht reflektiert + Kamera sieht es

            let spec = k_s * Math.pow(RdotV, shininess);

            outColor.r += lightInt.r * spec;
            outColor.g += lightInt.g * spec;
            outColor.b += lightInt.b * spec;
        }
    }

    return outColor;
}
