
////////////////////////////////////////////////////////////////////////////////
// bresenham.js
//
// Bearbeiten Sie diese Datei für den Praktikumsteil "Bresenham Line".
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


////////////////////////////////////////////////////////////////////////////////
// drawLine(x0, y0, x1, y1)
// Diese Funktion soll eine Linie von (x0, y0) nach (x1, y1) zeichnen.
// Implementieren Sie dazu den Bresenham-Line-Algorithmus für alle Oktanten
// in dieser Funktion. Einen Punkt zeichnen Sie mit setPixel(x,y).
////////////////////////////////////////////////////////////////////////////////

//positiv y nach unten 
//positiv x nach rechts

//Oktant 1
function drawLine(x0, y0, x1, y1)
{
	//zwischenspeichern
	int y = y0;
	//delta x und y
	let delta_X = -(Math.abs(x1-x0)); //-x //delta x
	let delta_Y = Math.abs(y1-y0);  //delta y
	
	//initial
	float Q_init =  2 * delta_X + delta_Y;
	
	//y werte änderung
	float Q_schritt = 2 * (delta_X + delta_Y);
	//y wert gleich
	float Q_equal = 2 * delta_Y;
	
	//zwischenspeichern
	float Q = Q_init;
	
	for(int x=x0; x<=x1 ; x++))
	{
		setPixel(x,y);
		
		//y werte änderung oder gleich
		if(Q<0)
		{
			//wert gleich
			Q += Q_equal;
		}
		else
		{
			//werte änderung
			Q += Q_schritt;
			//erhöht y um 1
			y++;
			//x-wert wird in der for erhöht
		}
	}
}


//Oktant 4,5,8
function drawLineTwo(x0, y0, x1, y1)
{
	//delta x und y
	let delta_X = Math.abs(x1-x0); //-x //delta x
	let delta_Y = Math.abs(y1-y0);  //delta y
	
	//link oder rechts
	let bewegeNachX;
	if(x0 < x1)
		bewegeNachX = 1; //rechts
	else
		bewegeNachX = -1; //links
	
	//oben oder unten
	let bewegeNachY;
	if(y0 < y1)
		bewegeNachY = 1; //unten
	else
		bewegeNachY = -1; //oben
	
	//inital
	float Q_init =  2 * delta_X + delta_Y;
	
	//y werte änderung
	float Q_schritt = 2 * (delta_X + delta_Y);
	//y wert gleich
	float Q_equal = 2 * delta_Y;
	
	//zwischenspeichern
	float Q = Q_init;
	
	for(int x=x0; x<=x1 ; x++))
	{
		setPixel(x,y);
		
		//y werte änderung oder gleich
		if(Q<0)
		{
			//wert gleich
			Q += Q_equal;
		}
		else
		{
			//werte änderung
			Q += Q_schritt;
			//erhöht y um 1
			y+= bewegeNachY;
			//x-wert wird in der for erhöht
		}
		x+= bewegeNachX;
	}
}


////////////////////////////////////////////////////////////////////////////////
// example(i)
// Diese Funktion dient als Codebeispiel.
// Sie wird beim Laden der Seite aufgerufen und kann entfernt werden.
////////////////////////////////////////////////////////////////////////////////
function example(i)
{
  let y = i + 2;
  for (let x = 0; x < 400; x++)
  {
    y--;
    if (y < -i)
    {
      y = i;
    }
    setPixel(x, Math.abs(y));
  }
}
