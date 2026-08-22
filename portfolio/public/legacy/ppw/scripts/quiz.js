/**/var nodoNumeroDomanda;
/**/var nodoTestoDomanda;
/**/var nodoRisposta0;
/**/var nodoTestoRisposta0;
/**/var nodoRisposta1;
/**/var nodoTestoRisposta1;
/**/var nodoRisposta2;
/**/var nodoTestoRisposta2;
/**/var nodoAvanti;
/**/var nodoRisultato;
/**/var nodoInizia;
/**/var numeroDomande;
/**/var numeroDomandaCorrente;
/**/var risposteDate;


/**/document.getElementById("nascosto").style.display = "none";

/**/function gestoreLoad () {
/**/   try {
/**/	  nodoNumeroDomanda = document.getElementById("numeroDomanda");
/**/	  nodoTestoDomanda = document.getElementById("testoDomanda");
/**/	  nodoRisposta0 = document.getElementById("risposta0");
/**/	  nodoTestoRisposta0 = document.getElementById("testoRisposta0");
/**/	  nodoRisposta1 = document.getElementById("risposta1");
/**/	  nodoTestoRisposta1 = document.getElementById("testoRisposta1");
/**/	  nodoRisposta2 = document.getElementById("risposta2");
/**/	  nodoTestoRisposta2 = document.getElementById("testoRisposta2");
/**/	  nodoAvanti = document.getElementById("avanti");

/**/		nodoRisultato = document.getElementById("risultato");
/**/		nodoInizia = document.getElementById("inizia");
/**/		nodoAvanti.onclick = gestoreClickAvanti;
			nodoInizia.onclick = gestoreClickInizia;
			
			
/**/		numeroDomande = quiz.length;
/**/		nuovoQuiz();

/**/	 } catch ( e ) {
/**/		alert("gestoreLoad " + e);
/**/	 }
/**/  }
/**/  window.onload = gestoreLoad;
  
/**/  function nuovoQuiz () {
/**/	 numeroDomandaCorrente = 0;
/**/	 aggiornaDomanda(numeroDomandaCorrente);
/**/	 scriviMessaggio(nodoRisultato, "");
/**/	 risposteDate = [];
/**/  }
/**/  function aggiornaDomanda (i) {
/**/	 scriviMessaggio(nodoNumeroDomanda,
/**/					 "Domanda " + (i + 1) + " di " + numeroDomande);
/**/	 var parte = quiz[i];

/**/	 scriviMessaggio(nodoTestoDomanda, parte.domanda)
/**/	 scriviMessaggio(nodoTestoRisposta0, parte.risposte[0]);
/**/	 scriviMessaggio(nodoTestoRisposta1, parte.risposte[1]);
/**/	 scriviMessaggio(nodoTestoRisposta2, parte.risposte[2]);
/**/	 nodoRisposta0.checked = false;
/**/	 nodoRisposta1.checked = false;
/**/	 nodoRisposta2.checked = false;
/**/  }




/**/  var quiz = [

	
/**/  { // domanda 1
/**/  domanda : "Quale dei seguenti è un obiettivo chiave della missione Mars Perseverance 2020?", risposte : [
					 "Individuare tracce di vita biologica passata sul suolo marziano",
					 "Analizzare il suolo e il clima per la futura esplorazione umana di Marte",
					 "Tutte le precedenti affermazioni sono corrette"
					],
/**/		rispostaEsatta : 2
/**/	 },
/**/	 {  // domanda 1
	 
	 
	 
/**/	 domanda : "Quale è stato il sito di atterraggio di Perseverance?", risposte : [
/**/		"Il cratere di Jazero",
/**/		"Il cratere di Gale",
/**/		"Il cratere di Gusev"
/**/	   ],
/**/rispostaEsatta : 0
/**/},
/**/{  // domanda 2
/**/domanda : "Chi è Ingenuity?", risposte : [
/**/		"Un rover gemello di Perseverance",
/**/		"Il nome generale della missione Mars 2020",
/**/		"Un piccolo elicottero spedito insieme a  Perseverance"
/**/	   ],
/**/rispostaEsatta : 2
/**/},
/**/{  // domanda 3
/**/domanda : "Chi ha dato il nome a Perseverance?", risposte : [
/**/		"Il Direttore Generale della Nasa",
/**/		"Uno studente",
/**/		"Il Presidente degli Stati Uniti d'America"
/**/		
/**/	   ],
/**/rispostaEsatta : 1
} ];



/**/function scriviMessaggio (nodo, messaggio) {
	
/**/   var nodoTesto = document.createTextNode(messaggio);

/**/   if (nodo.childNodes.length == 0) {
/**/	  nodo.appendChild(nodoTesto);
/**/   } else {
/**/	  nodo.replaceChild(nodoTesto, nodo.firstChild);
/**/   }
/**/}
/**/function gestoreClickAvanti () {
/**/   try {
/**/	  if (numeroDomandaCorrente == numeroDomande) {
/**/		 return;
/**/	  }
/**/	  if (nodoRisposta0.checked) {
/**/		 risposteDate[numeroDomandaCorrente] = 0;


/**/	  } else if (nodoRisposta1.checked) {
/**/		 risposteDate[numeroDomandaCorrente] = 1;
/**/	  } else if (nodoRisposta2.checked) {
/**/		 risposteDate[numeroDomandaCorrente] = 2;
/**/	  } else {
/**/return; }
/**/	  numeroDomandaCorrente++;
/**/	  if (numeroDomandaCorrente == numeroDomande) {
/**/		 var esito = calcolaEsito();
/**/		 var s;
/**/		 if (esito == 1) {
			s = "1 risposta esatta su " + numeroDomande+ "- ACCESSO NEGATO - Mi dispiace ma non hai superato il test! Ricarica la pagina e riprova";
/**/		 } else if (esito == 2)
/**/		 {
			s = esito + " risposte esatte su " + numeroDomande + "- ACCESSO NEGATO - Mi dispiace ma non hai superato il test! Ricarica la pagina e riprova";
/**/		 } else if (esito == 3)
/**/		  {
			 s = esito + " risposte esatte su " + numeroDomande + "- ACCESSO NEGATO - Per pochissimo! Mi dispiace ma non hai superato il test! Ricarica la pagina e riprova";
/**/		  } 
/**/		  else if (esito == 0)
/**/		  {
			 s = esito + " risposte corrette. - ACCESSO NEGATO - Mi dispiace ma non hai superato il test, tutte le risposte sono errate! Ricarica la pagina e riprova";
/**/		  } 
/**/		  else if (esito == 4)
/**/		   {
			  s = esito + " risposte esatte su " + numeroDomande + "- Hai risposto correttamente a tutte le domande! Hai sbloccato l'accesso al codice segreto della Missione Perseverance!";
/**/			  document.getElementById("nascosto").style.display = "block"; 
/**/		   } 
/**/		 scriviMessaggio(nodoRisultato, s);
/**/	  } else {
/**/		 aggiornaDomanda(numeroDomandaCorrente);
/**/	  }
/**/   } catch ( e ) {
/**/	  alert("gestoreClickAvanti " + e);
/**/} }

/**/function calcolaEsito () {
/**/   var numeroRisposteEsatte = 0;

/**/   for (var i = 0; i < quiz.length; i++) {
/**/	  var parte = quiz[i];


/**/	  if (parte.rispostaEsatta == risposteDate[i]) {
/**/		 numeroRisposteEsatte++;
/**/	  }
/**/}
/**/	console.log(numeroRisposteEsatte)
/**/   return numeroRisposteEsatte;
/**/}
/**/
/**/function gestoreClickInizia () {
/**/	 try {
/**/	 nuovoQuiz();
/**/	 } catch ( e ) {
/**/	 alert("gestoreClickInizia " + e);
/**/	 }
/**/	}