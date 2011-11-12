/*
	Skripts for hent_kaffi
	Kalles fra generert java-script i /views/kaffeflyttinger/hent_kaffi.ctp
*/

function hentLagerType(lagerId, typeId){
	var kaffetypevalg = document.getElementById(typeId).selectedIndex;
	var kaffetypeid = document.getElementById(typeId)[kaffetypevalg].value
	return hentLager(lagerId, kaffetypeid)
}

function hentLager(lagerId, kaffetypeid){
        var fralagervalg = document.getElementById(lagerId).selectedIndex;
        var fralagerid = document.getElementById(lagerId)[fralagervalg].value
        var returstreng = 'lager=' + fralagerid + '&type=' + kaffetypeid
        return returstreng
}


/**
	Skript for validering av frakt i heile kroner
	Stjelt fra http://www.w3schools.com/jsref/event_onkeydown.asp
**/
function sjekk_frakt_tast(event){
	var keynum
	var keychar
	var numcheck

	if(window.event) // IE
	{
		keynum = event.keyCode
	}
	else if(event.which) // Netscape/Firefox/Opera
	{
		keynum = event.which
	}
	/* Info fra http://www.cambiaresearch.com/c4/702b8cd1-e5b0-42e6-83ac-25f0306e3e25/Javascript-Char-Codes-Key-Codes.aspx */
	erSpesiell = (keynum < 47 && keynum != '32' /* mellomrom */) || (keynum > 112 && keynum < 146) || (keynum > 90 && keynum < 96)
	keychar = String.fromCharCode(keynum)
	numcheck = /\d/
	
	erTall = numcheck.test(keychar) 
	if(!erTall && !erSpesiell) 
	{
		alert("Frakta kan berre vere i heile kroner (Ingen komma eller ører).")
	}
	return erTall || erSpesiell
}


/*
	Setter antallet riktig første gang, altså ved lasting av siden.
	url må være parameter siden denne skal genereres fra cake etter riktig webrot
*/
function lastetSide(url, antallskjema, lagerskjema, typeskjema){
    new Ajax.Updater(antallskjema, url, {asynchronous:true, evalScripts:true, parameters:hentLagerType(lagerskjema, typeskjema), requestHeaders:['X-Update', antallskjema]});
}




/* 
   Brukes i kaffesalg/add
*/
function visAdresser(url){
    var velger = document.getElementById("KaffeSalgKunde");
    var kundeValg = velger.selectedIndex;
    var kundeId = velger[kundeValg].value;
    var postSending = document.getElementById("KaffeSalgPostSending").checked;
    var epostSending = document.getElementById("KaffesalgBetalingEpost").checked;
    var kontantBetaling = document.getElementById("KaffesalgBetalingKontant").checked;
    if(!kontantBetaling || postSending || epostSending){
	new Ajax.Request(url + '/adresser/' + kundeId, 
			 {asynchronous:false, 
				 evalScripts:true, 
				 parameters:kundeId, 
				 onSuccess: function(transport){
				 Element.update('adresseVisning', transport.responseText);
			     }});
    } else {
	Element.update('adresseVisning','');
    }
    if(postSending || !kontantBetaling){
	document.getElementById("KaffeSalgKundeDiv").style.visibility = 'visible';
	document.getElementById("nyKundeKnapp").style.visibility = 'visible';
    } else {
	document.getElementById("KaffeSalgKundeDiv").style.visibility = 'hidden';
	document.getElementById("nyKundeKnapp").style.visibility = 'hidden';
    }
    if(kontantBetaling){
	document.getElementById("KaffeSelgerDiv").style.visibility = 'visible';
	document.getElementById("BetalingsfristDiv").style.visibility = 'hidden';
    } else {
	document.getElementById("KaffeSelgerDiv").style.visibility = 'hidden';
	document.getElementById("BetalingsfristDiv").style.visibility = 'visible';
    }
}
