const fs = require('fs');
const pathStr = '/Users/paolopirruccio/.gemini/antigravity/scratch/portfolio/code/data.js';

let content = fs.readFileSync(pathStr, 'utf8');

const replacements = {
  // HTML Snippets
  "HTML Basic": `// Struttura di base di una pagina HTML5
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8">
    <title>Titolo Pagina</title>
  </head>
  <body>
    <h1>Titolo Principale</h1>
    <p>Questo è un paragrafo.</p>
  </body>
</html>`,
  "HTML Links": `<!-- Collegamento a un URL esterno -->
<a href="https://www.google.com" target="_blank">Visita Google</a>

<!-- Collegamento a un id interno -->
<a href="#sezione-1">Vai alla Sezione 1</a>`,
  "HTML Images": `<!-- Immagine con attributo alt per accessibilità -->
<img src="percorso/immagine.jpg" alt="Descrizione dell'immagine" width="500" height="300">

<!-- Immagine come link -->
<a href="index.html">
  <img src="logo.png" alt="Torna alla Home">
</a>`,
  "HTML Forms": `<!-- Creazione di un modulo di accesso base -->
<form action="/login" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  
  <label for="pwd">Password:</label>
  <input type="password" id="pwd" name="pwd" minlength="8">
  
  <input type="submit" value="Accedi">
</form>`,
  "HTML Tables": `<table>
  <tr>
    <th>Nome</th>
    <th>Età</th>
  </tr>
  <tr>
    <td>Paolo</td>
    <td>28</td>
  </tr>
</table>`,

  // CSS Snippets
  "CSS Syntax": `/* Selettore { Proprietà: Valore; } */
body {
  background-color: #0d1117;
  color: #c9d1d9;
  font-family: 'Inter', sans-serif;
}

h1 {
  font-size: 2rem;
  text-align: center;
}`,
  "CSS Box Model": `/* Il Box Model determina le dimensioni totali */
.box {
  width: 300px;
  padding: 20px;     /* Spazio interno */
  border: 2px solid; /* Bordo */
  margin: 15px;      /* Spazio esterno */
  
  /* Usa border-box per includere padding e border nella width */
  box-sizing: border-box; 
}`,
  "Flexbox Intro": `/* Centrare perfettamente con Flexbox */
.container {
  display: flex;
  justify-content: center; /* Allinea in orizzontale */
  align-items: center;     /* Allinea in verticale */
  min-height: 100vh;
  gap: 20px;               /* Spazio tra gli elementi */
}`,
  "CSS Grid Intro": `/* Creare una griglia Bento responsiva */
.bento-grid {
  display: grid;
  /* Colonne di minimo 250px, si adattano allo schermo */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.item-large {
  grid-column: span 2;
}`,
  "CSS Transitions": `.button {
  background-color: blue;
  transition: background-color 0.3s ease, transform 0.2s;
}

.button:hover {
  background-color: darkblue;
  transform: translateY(-5px); /* Si solleva al passaggio del mouse */
}`,

  // JS Snippets
  "JS Variables": `// const: valore costante, let: valore mutabile
const API_URL = "https://api.example.com";
let counter = 0;

counter += 1; // Valido
// API_URL = "nuovo url"; // Errore: Assignment to constant variable

console.log(\`Il contatore è \${counter}\`);`,
  "JS Functions": `// Funzione tradizionale
function saluta(nome) {
  return "Ciao " + nome;
}

// Arrow Function (più sintetica)
const moltiplica = (a, b) => a * b;

// Callback in array methods
const numeri = [1, 2, 3];
const doppi = numeri.map(n => n * 2);`,
  "JS Objects": `const utente = {
  nome: "Paolo",
  ruolo: "Sviluppatore",
  competenze: ["JS", "Python", "CSS"],
  saluta() {
    console.log("Ciao, sono " + this.nome);
  }
};

console.log(utente.competenze[1]); // Python
utente.saluta();`,
  "JS Asynchronous": `// Richiedere dati da un'API con Async/Await
async function recuperaDati() {
  try {
    const risposta = await fetch('https://api.example.com/data');
    const dati = await risposta.json();
    console.log(dati);
  } catch (errore) {
    console.error("Si è verificato un errore:", errore);
  }
}

recuperaDati();`,
  "JS HTML DOM": `// Selezionare elementi
const bottone = document.getElementById('mioBottone');
const titoli = document.querySelectorAll('h1');

// Modificare il testo e lo stile
bottone.textContent = "Cliccami Ora!";
bottone.style.backgroundColor = "red";

// Aggiungere un Event Listener
bottone.addEventListener('click', () => {
  alert('Hai cliccato!');
});`,

  // PHP Snippets
  "PHP Syntax": `<?php
// Uno script PHP inizia con <?php e finisce con ?>
echo "Ciao Mondo!"; 

// Le variabili iniziano col dollaro $
$nome = "Paolo";
echo "Benvenuto, " . $nome;
?>`,
  "PHP Arrays": `<?php
// Array indicizzato
$colori = array("Rosso", "Verde", "Blu");
echo $colori[0]; // Stampa "Rosso"

// Array associativo (simile a dizionari/oggetti)
$eta = ["Paolo" => 28, "Luca" => 32];
echo "Paolo ha " . $eta["Paolo"] . " anni.";

// Ciclare un array
foreach ($eta as $nome => $anni) {
    echo "$nome: $anni <br>";
}
?>`,
  "MySQL Connect": `<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mio_database";

// Connessione con PDO (Consigliato per sicurezza)
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // Imposta l'errore PDO ad exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connesso con successo";
} catch(PDOException $e) {
  echo "Connessione fallita: " . $e->getMessage();
}
?>`,
  "PHP If...Else...Elseif": `<?php
$ora = date("H");

if ($ora < "12") {
  echo "Buongiorno!";
} elseif ($ora < "20") {
  echo "Buonasera!";
} else {
  echo "Buonanotte!";
}
?>`
};

// Replace placeholders
for (const [topic, snippet] of Object.entries(replacements)) {
    // Escape backslashes for the snippet
    const escapedSnippet = snippet.replace(/\\/g, "\\\\").replace(/\`/g, "\\\`").replace(/\$/g, "\\$");
    
    // Create the regex to find the exact code block for this topic
    const regex = new RegExp(`code: \\\`\\/\\/ TODO: Add ${topic} example [\\s\\S]*?\\\``, 'g');
    
    content = content.replace(regex, `code: \`${escapedSnippet}\``);
}

fs.writeFileSync(pathStr, content, 'utf8');
console.log("Replaced top topics with real, high-quality code snippets!");
