// Data Structure for Syntax Bento Grid
// ColSpan: 1 = small, 2 = medium wide, 3 = very wide, 4 = full width
// RowSpan: 1 = small height, 2 = tall height
const syntaxData = {
    python: [
        {
            title: "Concetti Base: Paradigma",
            desc: "Panoramica sul paradigma di programmazione Python.",
            colSpan: 2,
            rowSpan: 1,
            htmlContent: `<ul>
                <li><strong>Multiparadigma:</strong> Supporta la programmazione procedurale, orientata agli oggetti (OOP) e funzionale.</li>
                <li><strong>Imperativo vs Dichiarativo:</strong> Scrivi principalmente in modo <em>imperativo</em> (dicendo <em>come</em> fare le cose passo-passo).</li>
                <li><strong>Tipizzazione Dinamica:</strong> I tipi di dato vengono assegnati a runtime (non devi dichiarare int, string ecc.).</li>
            </ul>`
        },
        {
            title: "Liste vs Tuple vs Set",
            desc: "Qual è la differenza fondamentale?",
            colSpan: 4,
            rowSpan: 1,
            htmlContent: `<ul style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                <li><strong>List (Lista):</strong> <code>[1, 2, 3]</code><br>Ordinata e <em>mutabile</em> (modificabile). Ideale per accogliere dati dinamici. Può contenere duplicati.</li>
                <li><strong>Tuple (Tupla):</strong> <code>(1, 2, 3)</code><br>Ordinata ma <em>immutabile</em> (non modificabile dopo la creazione). Occupano meno memoria e sono più veloci.</li>
                <li><strong>Set (Insieme):</strong> <code>{1, 2, 3}</code><br>Non ordinata e <em>non ammette duplicati</em>. Ideale per operazioni matematiche come unione e intersezione. Molto veloce nella ricerca.</li>
                <li><strong>Dictionary:</strong> <code>{"a": 1}</code><br>Struttura Chiave-Valore. Ottimizzato per la ricerca tramite la chiave.</li>
            </ul>`
        },
        {
            title: "Python Intro / Hello World",
            desc: "The simplest Python script.",
            colSpan: 1,
            code: `print("Hello, World!")`
        },
        {
            title: "Variables & Data Types",
            desc: "Dynamic typing in Python. No declaration needed.",
            colSpan: 2,
            code: `# Variables
x = 5             # int
name = "Bento"    # str
is_cool = True    # bool
pi = 3.14         # float

print(type(x))    # <class 'int'>`
        },
        {
            title: "Python Lists",
            desc: "Ordered, mutable collections.",
            colSpan: 1,
            rowSpan: 2,
            code: `fruits = ["apple", "banana", "cherry"]

# Access Items
print(fruits[0])  # 'apple'
print(fruits[-1]) # 'cherry'

# Add Items
fruits.append("orange")
fruits.insert(1, "mango")

# Remove Items
fruits.remove("banana")
fruits.pop() # removes last`
        },
        {
            title: "If...Else (Conditionals)",
            desc: "Control flow based on logical conditions.",
            colSpan: 2,
            code: `a = 200
b = 33

if b > a:
    print("b is greater than a")
elif a == b:
    print("a and b are equal")
else:
    print("a is greater than b")`
        },
        {
            title: "Python Dictionaries",
            desc: "Key-Value pairs. Ordered (Python 3.7+), changeable, no duplicates.",
            colSpan: 2,
            rowSpan: 2,
            code: `user = {
  "name": "Paolo",
  "role": "Admin",
  "year": 2026
}

# Access
print(user["name"])
print(user.get("role"))

# Add / Update
user["color"] = "dark"
user.update({"year": 2027})

# Loop Through
for key, value in user.items():
    print(f"{key}: {value}")`
        },
        {
            title: "For Loops",
            desc: "Iterating over a sequence.",
            colSpan: 2,
            code: `fruits = ["apple", "banana"]
for fruit in fruits:
    print(fruit)

# Loop through a string
for x in "banana":
    print(x)

# The range() function
for x in range(2, 6):
    print(x) # 2, 3, 4, 5`
        },
        {
            title: "Functions",
            desc: "A block of code which only runs when it is called.",
            colSpan: 2,
            code: `def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Call function
msg = greet("World")
print(msg) # Hello, World!

# Keyword arguments
print(greet(greeting="Hi", name="Bento"))`
        },
        {
            title: "Python Classes/Objects (OOP)",
            desc: "Creating classes and the __init__ method.",
            colSpan: 3,
            rowSpan: 2,
            code: `class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def myfunc(self):
    print("Hello my name is " + self.name)

# Create Object
p1 = Person("John", 36)
p1.myfunc()

# The self parameter is a reference to the current instance of the class.`
        },
        {
            title: "File Handling",
            desc: "Reading and Writing open files.",
            colSpan: 1,
            rowSpan: 2,
            code: `try:
  # Write to file
  f = open("demofile.txt", "w")
  f.write("Now the file has more content!")
  f.close()

  # Read file
  f = open("demofile.txt", "r")
  print(f.read())
except Exception as e:
  print("Failed handling file", e)
finally:
  f.close()`
        },
        {
            title: "Python Tuples",
            desc: "Ordered and UNCHANGEABLE collections.",
            colSpan: 1,
            code: `thistuple = ("apple", "banana")
print(thistuple[1])

# Cannot do: thistuple[1] = "blackcurrant"
# Tuples are immutable`
        },
        {
            title: "Python Try...Except",
            desc: "Exception handling blocks.",
            colSpan: 2,
            code: `try:
  print(x)
except NameError:
  print("Variable x is not defined")
except:
  print("Something else went wrong")
finally:
  print("The 'try except' is finished")`
        },
        {
            title: "List Comprehension",
            desc: "A shorter syntax to create a new list.",
            colSpan: 2,
            code: `fruits = ["apple", "banana", "cherry", "kiwi", "mango"]

# newlist = [expression for item in iterable if condition == True]
newlist = [x for x in fruits if "a" in x]

print(newlist) 
# ['apple', 'banana', 'mango']`
        }
    ],
    html: [
        {
            title: "HTML Introduction",
            desc: "Overview of HTML Introduction",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Introduction example 
console.log('HTML Introduction');`
        },
        {
            title: "HTML Editors",
            desc: "Overview of HTML Editors",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Editors example 
console.log('HTML Editors');`
        },
        {
            title: "HTML Basic",
            desc: "Overview of HTML Basic",
            colSpan: 1,
            rowSpan: 1,
            code: `// Struttura di base di una pagina HTML5
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
</html>`
        },
        {
            title: "HTML Elements",
            desc: "Overview of HTML Elements",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Elements example 
console.log('HTML Elements');`
        },
        {
            title: "HTML Attributes",
            desc: "Overview of HTML Attributes",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Attributes example 
console.log('HTML Attributes');`
        },
        {
            title: "HTML Headings",
            desc: "Overview of HTML Headings",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Headings example 
console.log('HTML Headings');`
        },
        {
            title: "HTML Paragraphs",
            desc: "Overview of HTML Paragraphs",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Paragraphs example 
console.log('HTML Paragraphs');`
        },
        {
            title: "HTML Styles",
            desc: "Overview of HTML Styles",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Styles example 
console.log('HTML Styles');`
        },
        {
            title: "HTML Formatting",
            desc: "Overview of HTML Formatting",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Formatting example 
console.log('HTML Formatting');`
        },
        {
            title: "HTML Quotations",
            desc: "Overview of HTML Quotations",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Quotations example 
console.log('HTML Quotations');`
        },
        {
            title: "HTML Comments",
            desc: "Overview of HTML Comments",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Comments example 
console.log('HTML Comments');`
        },
        {
            title: "HTML Colors",
            desc: "Overview of HTML Colors",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Colors example 
console.log('HTML Colors');`
        },
        {
            title: "HTML CSS",
            desc: "Overview of HTML CSS",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML CSS example 
console.log('HTML CSS');`
        },
        {
            title: "HTML Links",
            desc: "Overview of HTML Links",
            colSpan: 1,
            rowSpan: 1,
            code: `<!-- Collegamento a un URL esterno -->
<a href="https://www.google.com" target="_blank">Visita Google</a>

<!-- Collegamento a un id interno -->
<a href="#sezione-1">Vai alla Sezione 1</a>`
        },
        {
            title: "HTML Images",
            desc: "Overview of HTML Images",
            colSpan: 1,
            rowSpan: 1,
            code: `<!-- Immagine con attributo alt per accessibilità -->
<img src="percorso/immagine.jpg" alt="Descrizione dell'immagine" width="500" height="300">

<!-- Immagine come link -->
<a href="index.html">
  <img src="logo.png" alt="Torna alla Home">
</a>`
        },
        {
            title: "HTML Favicon",
            desc: "Overview of HTML Favicon",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Favicon example 
console.log('HTML Favicon');`
        },
        {
            title: "HTML Page Title",
            desc: "Overview of HTML Page Title",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Page Title example 
console.log('HTML Page Title');`
        },
        {
            title: "HTML Tables",
            desc: "Overview of HTML Tables",
            colSpan: 1,
            rowSpan: 1,
            code: `<table>
  <tr>
    <th>Nome</th>
    <th>Età</th>
  </tr>
  <tr>
    <td>Paolo</td>
    <td>28</td>
  </tr>
</table>`
        },
        {
            title: "HTML Lists",
            desc: "Overview of HTML Lists",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Lists example 
console.log('HTML Lists');`
        },
        {
            title: "HTML Block & Inline",
            desc: "Overview of HTML Block & Inline",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Block & Inline example 
console.log('HTML Block & Inline');`
        },
        {
            title: "HTML Div",
            desc: "Overview of HTML Div",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Div example 
console.log('HTML Div');`
        },
        {
            title: "HTML Classes",
            desc: "Overview of HTML Classes",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Classes example 
console.log('HTML Classes');`
        },
        {
            title: "HTML Id",
            desc: "Overview of HTML Id",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Id example 
console.log('HTML Id');`
        },
        {
            title: "HTML Buttons",
            desc: "Overview of HTML Buttons",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Buttons example 
console.log('HTML Buttons');`
        },
        {
            title: "HTML Iframes",
            desc: "Overview of HTML Iframes",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Iframes example 
console.log('HTML Iframes');`
        },
        {
            title: "HTML JavaScript",
            desc: "Overview of HTML JavaScript",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML JavaScript example 
console.log('HTML JavaScript');`
        },
        {
            title: "HTML File Paths",
            desc: "Overview of HTML File Paths",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML File Paths example 
console.log('HTML File Paths');`
        },
        {
            title: "HTML Head",
            desc: "Overview of HTML Head",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Head example 
console.log('HTML Head');`
        },
        {
            title: "HTML Layout",
            desc: "Overview of HTML Layout",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Layout example 
console.log('HTML Layout');`
        },
        {
            title: "HTML Responsive",
            desc: "Overview of HTML Responsive",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Responsive example 
console.log('HTML Responsive');`
        },
        {
            title: "HTML Computercode",
            desc: "Overview of HTML Computercode",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Computercode example 
console.log('HTML Computercode');`
        },
        {
            title: "HTML Semantics",
            desc: "Overview of HTML Semantics",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Semantics example 
console.log('HTML Semantics');`
        },
        {
            title: "HTML Style Guide",
            desc: "Overview of HTML Style Guide",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Style Guide example 
console.log('HTML Style Guide');`
        },
        {
            title: "HTML Entities",
            desc: "Overview of HTML Entities",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Entities example 
console.log('HTML Entities');`
        },
        {
            title: "HTML Symbols",
            desc: "Overview of HTML Symbols",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Symbols example 
console.log('HTML Symbols');`
        },
        {
            title: "HTML Emojis",
            desc: "Overview of HTML Emojis",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Emojis example 
console.log('HTML Emojis');`
        },
        {
            title: "HTML Charsets",
            desc: "Overview of HTML Charsets",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Charsets example 
console.log('HTML Charsets');`
        },
        {
            title: "HTML URL Encode",
            desc: "Overview of HTML URL Encode",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML URL Encode example 
console.log('HTML URL Encode');`
        },
        {
            title: "HTML vs. XHTML",
            desc: "Overview of HTML vs. XHTML",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML vs. XHTML example 
console.log('HTML vs. XHTML');`
        },
        {
            title: "HTML Forms",
            desc: "Overview of HTML Forms",
            colSpan: 1,
            rowSpan: 1,
            code: `<!-- Creazione di un modulo di accesso base -->
<form action="/login" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  
  <label for="pwd">Password:</label>
  <input type="password" id="pwd" name="pwd" minlength="8">
  
  <input type="submit" value="Accedi">
</form>`
        },
        {
            title: "HTML Form Attributes",
            desc: "Overview of HTML Form Attributes",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Form Attributes example 
console.log('HTML Form Attributes');`
        },
        {
            title: "HTML Form Elements",
            desc: "Overview of HTML Form Elements",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Form Elements example 
console.log('HTML Form Elements');`
        },
        {
            title: "HTML Input Types",
            desc: "Overview of HTML Input Types",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Input Types example 
console.log('HTML Input Types');`
        },
        {
            title: "HTML Input Attributes",
            desc: "Overview of HTML Input Attributes",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Input Attributes example 
console.log('HTML Input Attributes');`
        },
        {
            title: "HTML Canvas",
            desc: "Overview of HTML Canvas",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Canvas example 
console.log('HTML Canvas');`
        },
        {
            title: "HTML SVG",
            desc: "Overview of HTML SVG",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML SVG example 
console.log('HTML SVG');`
        },
        {
            title: "HTML Media",
            desc: "Overview of HTML Media",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Media example 
console.log('HTML Media');`
        },
        {
            title: "HTML Video",
            desc: "Overview of HTML Video",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Video example 
console.log('HTML Video');`
        },
        {
            title: "HTML Audio",
            desc: "Overview of HTML Audio",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Audio example 
console.log('HTML Audio');`
        },
        {
            title: "HTML Plug-ins",
            desc: "Overview of HTML Plug-ins",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Plug-ins example 
console.log('HTML Plug-ins');`
        },
        {
            title: "HTML Web APIs",
            desc: "Overview of HTML Web APIs",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Web APIs example 
console.log('HTML Web APIs');`
        },
        {
            title: "HTML Geolocation",
            desc: "Overview of HTML Geolocation",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Geolocation example 
console.log('HTML Geolocation');`
        },
        {
            title: "HTML Drag and Drop",
            desc: "Overview of HTML Drag and Drop",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Drag and Drop example 
console.log('HTML Drag and Drop');`
        },
        {
            title: "HTML Web Storage",
            desc: "Overview of HTML Web Storage",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Web Storage example 
console.log('HTML Web Storage');`
        },
        {
            title: "HTML Web Workers",
            desc: "Overview of HTML Web Workers",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML Web Workers example 
console.log('HTML Web Workers');`
        },
        {
            title: "HTML SSE",
            desc: "Overview of HTML SSE",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add HTML SSE example 
console.log('HTML SSE');`
        }
    ],
    css: [
        {
            title: "CSS Introduction",
            desc: "Overview of CSS Introduction",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Introduction example 
console.log('CSS Introduction');`
        },
        {
            title: "CSS Syntax",
            desc: "Overview of CSS Syntax",
            colSpan: 1,
            rowSpan: 1,
            code: `/* Selettore { Proprietà: Valore; } */
body {
  background-color: #0d1117;
  color: #c9d1d9;
  font-family: 'Inter', sans-serif;
}

h1 {
  font-size: 2rem;
  text-align: center;
}`
        },
        {
            title: "CSS Selectors",
            desc: "Overview of CSS Selectors",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Selectors example 
console.log('CSS Selectors');`
        },
        {
            title: "CSS How To",
            desc: "Overview of CSS How To",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS How To example 
console.log('CSS How To');`
        },
        {
            title: "CSS Comments",
            desc: "Overview of CSS Comments",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Comments example 
console.log('CSS Comments');`
        },
        {
            title: "CSS Errors",
            desc: "Overview of CSS Errors",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Errors example 
console.log('CSS Errors');`
        },
        {
            title: "CSS Colors",
            desc: "Overview of CSS Colors",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Colors example 
console.log('CSS Colors');`
        },
        {
            title: "CSS Backgrounds",
            desc: "Overview of CSS Backgrounds",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Backgrounds example 
console.log('CSS Backgrounds');`
        },
        {
            title: "CSS Borders",
            desc: "Overview of CSS Borders",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Borders example 
console.log('CSS Borders');`
        },
        {
            title: "CSS Margins",
            desc: "Overview of CSS Margins",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Margins example 
console.log('CSS Margins');`
        },
        {
            title: "CSS Padding",
            desc: "Overview of CSS Padding",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Padding example 
console.log('CSS Padding');`
        },
        {
            title: "CSS Height / Width",
            desc: "Overview of CSS Height / Width",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Height / Width example 
console.log('CSS Height / Width');`
        },
        {
            title: "CSS Box Model",
            desc: "Overview of CSS Box Model",
            colSpan: 1,
            rowSpan: 1,
            code: `/* Il Box Model determina le dimensioni totali */
.box {
  width: 300px;
  padding: 20px;     /* Spazio interno */
  border: 2px solid; /* Bordo */
  margin: 15px;      /* Spazio esterno */
  
  /* Usa border-box per includere padding e border nella width */
  box-sizing: border-box; 
}`
        },
        {
            title: "CSS Outline",
            desc: "Overview of CSS Outline",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Outline example 
console.log('CSS Outline');`
        },
        {
            title: "CSS Text",
            desc: "Overview of CSS Text",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Text example 
console.log('CSS Text');`
        },
        {
            title: "CSS Fonts",
            desc: "Overview of CSS Fonts",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Fonts example 
console.log('CSS Fonts');`
        },
        {
            title: "CSS Icons",
            desc: "Overview of CSS Icons",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Icons example 
console.log('CSS Icons');`
        },
        {
            title: "CSS Links",
            desc: "Overview of CSS Links",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Links example 
console.log('CSS Links');`
        },
        {
            title: "CSS Lists",
            desc: "Overview of CSS Lists",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Lists example 
console.log('CSS Lists');`
        },
        {
            title: "CSS Tables",
            desc: "Overview of CSS Tables",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Tables example 
console.log('CSS Tables');`
        },
        {
            title: "CSS Display",
            desc: "Overview of CSS Display",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Display example 
console.log('CSS Display');`
        },
        {
            title: "CSS Max-width",
            desc: "Overview of CSS Max-width",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Max-width example 
console.log('CSS Max-width');`
        },
        {
            title: "CSS Position",
            desc: "Overview of CSS Position",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Position example 
console.log('CSS Position');`
        },
        {
            title: "CSS Position Offsets",
            desc: "Overview of CSS Position Offsets",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Position Offsets example 
console.log('CSS Position Offsets');`
        },
        {
            title: "CSS Z-index",
            desc: "Overview of CSS Z-index",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Z-index example 
console.log('CSS Z-index');`
        },
        {
            title: "CSS Overflow",
            desc: "Overview of CSS Overflow",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Overflow example 
console.log('CSS Overflow');`
        },
        {
            title: "CSS Float",
            desc: "Overview of CSS Float",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Float example 
console.log('CSS Float');`
        },
        {
            title: "CSS Inline-block",
            desc: "Overview of CSS Inline-block",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Inline-block example 
console.log('CSS Inline-block');`
        },
        {
            title: "CSS Align",
            desc: "Overview of CSS Align",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Align example 
console.log('CSS Align');`
        },
        {
            title: "CSS Combinators",
            desc: "Overview of CSS Combinators",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Combinators example 
console.log('CSS Combinators');`
        },
        {
            title: "CSS Pseudo-classes",
            desc: "Overview of CSS Pseudo-classes",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Pseudo-classes example 
console.log('CSS Pseudo-classes');`
        },
        {
            title: "CSS Pseudo-elements",
            desc: "Overview of CSS Pseudo-elements",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Pseudo-elements example 
console.log('CSS Pseudo-elements');`
        },
        {
            title: "CSS Opacity",
            desc: "Overview of CSS Opacity",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Opacity example 
console.log('CSS Opacity');`
        },
        {
            title: "CSS Navigation Bars",
            desc: "Overview of CSS Navigation Bars",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Navigation Bars example 
console.log('CSS Navigation Bars');`
        },
        {
            title: "CSS Dropdowns",
            desc: "Overview of CSS Dropdowns",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Dropdowns example 
console.log('CSS Dropdowns');`
        },
        {
            title: "CSS Image Gallery",
            desc: "Overview of CSS Image Gallery",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Image Gallery example 
console.log('CSS Image Gallery');`
        },
        {
            title: "CSS Image Sprites",
            desc: "Overview of CSS Image Sprites",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Image Sprites example 
console.log('CSS Image Sprites');`
        },
        {
            title: "CSS Attribute Selectors",
            desc: "Overview of CSS Attribute Selectors",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Attribute Selectors example 
console.log('CSS Attribute Selectors');`
        },
        {
            title: "CSS Forms",
            desc: "Overview of CSS Forms",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Forms example 
console.log('CSS Forms');`
        },
        {
            title: "CSS Counters",
            desc: "Overview of CSS Counters",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Counters example 
console.log('CSS Counters');`
        },
        {
            title: "CSS Units",
            desc: "Overview of CSS Units",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Units example 
console.log('CSS Units');`
        },
        {
            title: "CSS Inheritance",
            desc: "Overview of CSS Inheritance",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Inheritance example 
console.log('CSS Inheritance');`
        },
        {
            title: "CSS Specificity",
            desc: "Overview of CSS Specificity",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Specificity example 
console.log('CSS Specificity');`
        },
        {
            title: "CSS !important",
            desc: "Overview of CSS !important",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS !important example 
console.log('CSS !important');`
        },
        {
            title: "CSS Math Functions",
            desc: "Overview of CSS Math Functions",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Math Functions example 
console.log('CSS Math Functions');`
        },
        {
            title: "CSS Optimization",
            desc: "Overview of CSS Optimization",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Optimization example 
console.log('CSS Optimization');`
        },
        {
            title: "CSS Accessibility",
            desc: "Overview of CSS Accessibility",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Accessibility example 
console.log('CSS Accessibility');`
        },
        {
            title: "CSS Website Layout",
            desc: "Overview of CSS Website Layout",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Website Layout example 
console.log('CSS Website Layout');`
        },
        {
            title: "CSS Rounded Corners",
            desc: "Overview of CSS Rounded Corners",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Rounded Corners example 
console.log('CSS Rounded Corners');`
        },
        {
            title: "CSS Border Images",
            desc: "Overview of CSS Border Images",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Border Images example 
console.log('CSS Border Images');`
        },
        {
            title: "CSS Gradients",
            desc: "Overview of CSS Gradients",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Gradients example 
console.log('CSS Gradients');`
        },
        {
            title: "CSS Shadows",
            desc: "Overview of CSS Shadows",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Shadows example 
console.log('CSS Shadows');`
        },
        {
            title: "CSS Text Effects",
            desc: "Overview of CSS Text Effects",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Text Effects example 
console.log('CSS Text Effects');`
        },
        {
            title: "CSS Custom Fonts",
            desc: "Overview of CSS Custom Fonts",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Custom Fonts example 
console.log('CSS Custom Fonts');`
        },
        {
            title: "CSS 2D Transforms",
            desc: "Overview of CSS 2D Transforms",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS 2D Transforms example 
console.log('CSS 2D Transforms');`
        },
        {
            title: "CSS 3D Transforms",
            desc: "Overview of CSS 3D Transforms",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS 3D Transforms example 
console.log('CSS 3D Transforms');`
        },
        {
            title: "CSS Transitions",
            desc: "Overview of CSS Transitions",
            colSpan: 1,
            rowSpan: 1,
            code: `.button {
  background-color: blue;
  transition: background-color 0.3s ease, transform 0.2s;
}

.button:hover {
  background-color: darkblue;
  transform: translateY(-5px); /* Si solleva al passaggio del mouse */
}`
        },
        {
            title: "CSS Animations",
            desc: "Overview of CSS Animations",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Animations example 
console.log('CSS Animations');`
        },
        {
            title: "CSS Tooltips",
            desc: "Overview of CSS Tooltips",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Tooltips example 
console.log('CSS Tooltips');`
        },
        {
            title: "CSS Image Styling",
            desc: "Overview of CSS Image Styling",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Image Styling example 
console.log('CSS Image Styling');`
        },
        {
            title: "CSS Image Modal",
            desc: "Overview of CSS Image Modal",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Image Modal example 
console.log('CSS Image Modal');`
        },
        {
            title: "CSS Image Filters",
            desc: "Overview of CSS Image Filters",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Image Filters example 
console.log('CSS Image Filters');`
        },
        {
            title: "CSS object-fit",
            desc: "Overview of CSS object-fit",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS object-fit example 
console.log('CSS object-fit');`
        },
        {
            title: "CSS object-position",
            desc: "Overview of CSS object-position",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS object-position example 
console.log('CSS object-position');`
        },
        {
            title: "CSS Masking",
            desc: "Overview of CSS Masking",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Masking example 
console.log('CSS Masking');`
        },
        {
            title: "CSS Buttons",
            desc: "Overview of CSS Buttons",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Buttons example 
console.log('CSS Buttons');`
        },
        {
            title: "CSS Pagination",
            desc: "Overview of CSS Pagination",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Pagination example 
console.log('CSS Pagination');`
        },
        {
            title: "CSS Multiple Columns",
            desc: "Overview of CSS Multiple Columns",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Multiple Columns example 
console.log('CSS Multiple Columns');`
        },
        {
            title: "CSS Variables",
            desc: "Overview of CSS Variables",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Variables example 
console.log('CSS Variables');`
        },
        {
            title: "CSS @property",
            desc: "Overview of CSS @property",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS @property example 
console.log('CSS @property');`
        },
        {
            title: "CSS Box Sizing",
            desc: "Overview of CSS Box Sizing",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Box Sizing example 
console.log('CSS Box Sizing');`
        },
        {
            title: "CSS Media Queries",
            desc: "Overview of CSS Media Queries",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS Media Queries example 
console.log('CSS Media Queries');`
        },
        {
            title: "Flexbox Intro",
            desc: "Overview of Flexbox Intro",
            colSpan: 1,
            rowSpan: 1,
            code: `/* Centrare perfettamente con Flexbox */
.container {
  display: flex;
  justify-content: center; /* Allinea in orizzontale */
  align-items: center;     /* Allinea in verticale */
  min-height: 100vh;
  gap: 20px;               /* Spazio tra gli elementi */
}`
        },
        {
            title: "Flex Container",
            desc: "Overview of Flex Container",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add Flex Container example 
console.log('Flex Container');`
        },
        {
            title: "Flex Items",
            desc: "Overview of Flex Items",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add Flex Items example 
console.log('Flex Items');`
        },
        {
            title: "CSS Grid Intro",
            desc: "Overview of CSS Grid Intro",
            colSpan: 1,
            rowSpan: 1,
            code: `/* Creare una griglia Bento responsiva */
.bento-grid {
  display: grid;
  /* Colonne di minimo 250px, si adattano allo schermo */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.item-large {
  grid-column: span 2;
}`
        },
        {
            title: "CSS SASS",
            desc: "Overview of CSS SASS",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add CSS SASS example 
console.log('CSS SASS');`
        }
    ],
    js: [
        {
            title: "JS Introduction",
            desc: "Overview of JS Introduction",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Introduction example 
console.log('JS Introduction');`
        },
        {
            title: "JS Where To",
            desc: "Overview of JS Where To",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Where To example 
console.log('JS Where To');`
        },
        {
            title: "JS Output",
            desc: "Overview of JS Output",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Output example 
console.log('JS Output');`
        },
        {
            title: "JS Syntax",
            desc: "Overview of JS Syntax",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Syntax example 
console.log('JS Syntax');`
        },
        {
            title: "JS Variables",
            desc: "Overview of JS Variables",
            colSpan: 1,
            rowSpan: 1,
            code: `// const: valore costante, let: valore mutabile
const API_URL = "https://api.example.com";
let counter = 0;

counter += 1; // Valido
// API_URL = "nuovo url"; // Errore: Assignment to constant variable

console.log(\`Il contatore è \${counter}\`);`
        },
        {
            title: "JS Operators",
            desc: "Overview of JS Operators",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Operators example 
console.log('JS Operators');`
        },
        {
            title: "JS If Conditions",
            desc: "Overview of JS If Conditions",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS If Conditions example 
console.log('JS If Conditions');`
        },
        {
            title: "JS Loops",
            desc: "Overview of JS Loops",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Loops example 
console.log('JS Loops');`
        },
        {
            title: "JS Strings",
            desc: "Overview of JS Strings",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Strings example 
console.log('JS Strings');`
        },
        {
            title: "JS Numbers",
            desc: "Overview of JS Numbers",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Numbers example 
console.log('JS Numbers');`
        },
        {
            title: "JS Functions",
            desc: "Overview of JS Functions",
            colSpan: 1,
            rowSpan: 1,
            code: `// Funzione tradizionale
function saluta(nome) {
  return "Ciao " + nome;
}

// Arrow Function (più sintetica)
const moltiplica = (a, b) => a * b;

// Callback in array methods
const numeri = [1, 2, 3];
const doppi = numeri.map(n => n * 2);`
        },
        {
            title: "JS Objects",
            desc: "Overview of JS Objects",
            colSpan: 1,
            rowSpan: 1,
            code: `const utente = {
  nome: "Paolo",
  ruolo: "Sviluppatore",
  competenze: ["JS", "Python", "CSS"],
  saluta() {
    console.log("Ciao, sono " + this.nome);
  }
};

console.log(utente.competenze[1]); // Python
utente.saluta();`
        },
        {
            title: "JS Scope",
            desc: "Overview of JS Scope",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Scope example 
console.log('JS Scope');`
        },
        {
            title: "JS Dates",
            desc: "Overview of JS Dates",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Dates example 
console.log('JS Dates');`
        },
        {
            title: "JS Temporal",
            desc: "Overview of JS Temporal",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Temporal example 
console.log('JS Temporal');`
        },
        {
            title: "JS Arrays",
            desc: "Overview of JS Arrays",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Arrays example 
console.log('JS Arrays');`
        },
        {
            title: "JS Sets",
            desc: "Overview of JS Sets",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Sets example 
console.log('JS Sets');`
        },
        {
            title: "JS Maps",
            desc: "Overview of JS Maps",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Maps example 
console.log('JS Maps');`
        },
        {
            title: "JS Iterations",
            desc: "Overview of JS Iterations",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Iterations example 
console.log('JS Iterations');`
        },
        {
            title: "JS Math",
            desc: "Overview of JS Math",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Math example 
console.log('JS Math');`
        },
        {
            title: "JS RegExp",
            desc: "Overview of JS RegExp",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS RegExp example 
console.log('JS RegExp');`
        },
        {
            title: "JS Destructuring",
            desc: "Overview of JS Destructuring",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Destructuring example 
console.log('JS Destructuring');`
        },
        {
            title: "JS Data Types",
            desc: "Overview of JS Data Types",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Data Types example 
console.log('JS Data Types');`
        },
        {
            title: "JS Errors",
            desc: "Overview of JS Errors",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Errors example 
console.log('JS Errors');`
        },
        {
            title: "JS Debugging",
            desc: "Overview of JS Debugging",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Debugging example 
console.log('JS Debugging');`
        },
        {
            title: "JS Conventions",
            desc: "Overview of JS Conventions",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Conventions example 
console.log('JS Conventions');`
        },
        {
            title: "JS HTML DOM",
            desc: "Overview of JS HTML DOM",
            colSpan: 1,
            rowSpan: 1,
            code: `// Selezionare elementi
const bottone = document.getElementById('mioBottone');
const titoli = document.querySelectorAll('h1');

// Modificare il testo e lo stile
bottone.textContent = "Cliccami Ora!";
bottone.style.backgroundColor = "red";

// Aggiungere un Event Listener
bottone.addEventListener('click', () => {
  alert('Hai cliccato!');
});`
        },
        {
            title: "JS Events",
            desc: "Overview of JS Events",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Events example 
console.log('JS Events');`
        },
        {
            title: "JS Classes",
            desc: "Overview of JS Classes",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Classes example 
console.log('JS Classes');`
        },
        {
            title: "JS Asynchronous",
            desc: "Overview of JS Asynchronous",
            colSpan: 1,
            rowSpan: 1,
            code: `// Richiedere dati da un'API con Async/Await
async function recuperaDati() {
  try {
    const risposta = await fetch('https://api.example.com/data');
    const dati = await risposta.json();
    console.log(dati);
  } catch (errore) {
    console.error("Si è verificato un errore:", errore);
  }
}

recuperaDati();`
        },
        {
            title: "JS Modules",
            desc: "Overview of JS Modules",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Modules example 
console.log('JS Modules');`
        },
        {
            title: "JS Meta & Proxy",
            desc: "Overview of JS Meta & Proxy",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Meta & Proxy example 
console.log('JS Meta & Proxy');`
        },
        {
            title: "JS Typed Arrays",
            desc: "Overview of JS Typed Arrays",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Typed Arrays example 
console.log('JS Typed Arrays');`
        },
        {
            title: "JS DOM Navigation",
            desc: "Overview of JS DOM Navigation",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS DOM Navigation example 
console.log('JS DOM Navigation');`
        },
        {
            title: "JS Windows",
            desc: "Overview of JS Windows",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Windows example 
console.log('JS Windows');`
        },
        {
            title: "JS Web APIs",
            desc: "Overview of JS Web APIs",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Web APIs example 
console.log('JS Web APIs');`
        },
        {
            title: "JS AJAX",
            desc: "Overview of JS AJAX",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS AJAX example 
console.log('JS AJAX');`
        },
        {
            title: "JS JSON",
            desc: "Overview of JS JSON",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS JSON example 
console.log('JS JSON');`
        },
        {
            title: "JS jQuery",
            desc: "Overview of JS jQuery",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS jQuery example 
console.log('JS jQuery');`
        },
        {
            title: "JS Graphics",
            desc: "Overview of JS Graphics",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add JS Graphics example 
console.log('JS Graphics');`
        }
    ],
    sql: [
        {
            title: "SELECT Statement",
            desc: "Query data from database.",
            colSpan: 2,
            code: `SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1 ASC;`
        },
        {
            title: "Inner Join",
            colSpan: 2,
            code: `SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;`
        }
    ],
    php: [
        {
            title: "PHP Intro",
            desc: "Overview of PHP Intro",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Intro example 
console.log('PHP Intro');`
        },
        {
            title: "PHP Install",
            desc: "Overview of PHP Install",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Install example 
console.log('PHP Install');`
        },
        {
            title: "PHP Syntax",
            desc: "Overview of PHP Syntax",
            colSpan: 1,
            rowSpan: 1,
            code: `<?php
// Uno script PHP inizia con <?php e finisce con ?>
echo "Ciao Mondo!"; 

// Le variabili iniziano col dollaro \$
\$nome = "Paolo";
echo "Benvenuto, " . \$nome;
?>`
        },
        {
            title: "PHP Comments",
            desc: "Overview of PHP Comments",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Comments example 
console.log('PHP Comments');`
        },
        {
            title: "PHP Variables",
            desc: "Overview of PHP Variables",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Variables example 
console.log('PHP Variables');`
        },
        {
            title: "PHP Echo / Print",
            desc: "Overview of PHP Echo / Print",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Echo / Print example 
console.log('PHP Echo / Print');`
        },
        {
            title: "PHP Data Types",
            desc: "Overview of PHP Data Types",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Data Types example 
console.log('PHP Data Types');`
        },
        {
            title: "PHP Strings",
            desc: "Overview of PHP Strings",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Strings example 
console.log('PHP Strings');`
        },
        {
            title: "PHP Numbers",
            desc: "Overview of PHP Numbers",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Numbers example 
console.log('PHP Numbers');`
        },
        {
            title: "PHP Casting",
            desc: "Overview of PHP Casting",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Casting example 
console.log('PHP Casting');`
        },
        {
            title: "PHP Math",
            desc: "Overview of PHP Math",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Math example 
console.log('PHP Math');`
        },
        {
            title: "PHP Constants",
            desc: "Overview of PHP Constants",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Constants example 
console.log('PHP Constants');`
        },
        {
            title: "PHP Magic Constants",
            desc: "Overview of PHP Magic Constants",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Magic Constants example 
console.log('PHP Magic Constants');`
        },
        {
            title: "PHP Operators",
            desc: "Overview of PHP Operators",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Operators example 
console.log('PHP Operators');`
        },
        {
            title: "PHP If...Else...Elseif",
            desc: "Overview of PHP If...Else...Elseif",
            colSpan: 1,
            rowSpan: 1,
            code: `<?php
\$ora = date("H");

if (\$ora < "12") {
  echo "Buongiorno!";
} elseif (\$ora < "20") {
  echo "Buonasera!";
} else {
  echo "Buonanotte!";
}
?>`
        },
        {
            title: "PHP Switch",
            desc: "Overview of PHP Switch",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Switch example 
console.log('PHP Switch');`
        },
        {
            title: "PHP Match",
            desc: "Overview of PHP Match",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Match example 
console.log('PHP Match');`
        },
        {
            title: "PHP Loops",
            desc: "Overview of PHP Loops",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Loops example 
console.log('PHP Loops');`
        },
        {
            title: "PHP Functions",
            desc: "Overview of PHP Functions",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Functions example 
console.log('PHP Functions');`
        },
        {
            title: "PHP Arrays",
            desc: "Overview of PHP Arrays",
            colSpan: 1,
            rowSpan: 1,
            code: `<?php
// Array indicizzato
\$colori = array("Rosso", "Verde", "Blu");
echo \$colori[0]; // Stampa "Rosso"

// Array associativo (simile a dizionari/oggetti)
\$eta = ["Paolo" => 28, "Luca" => 32];
echo "Paolo ha " . \$eta["Paolo"] . " anni.";

// Ciclare un array
foreach (\$eta as \$nome => \$anni) {
    echo "\$nome: \$anni <br>";
}
?>`
        },
        {
            title: "PHP Superglobals",
            desc: "Overview of PHP Superglobals",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Superglobals example 
console.log('PHP Superglobals');`
        },
        {
            title: "PHP RegEx",
            desc: "Overview of PHP RegEx",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP RegEx example 
console.log('PHP RegEx');`
        },
        {
            title: "PHP Form Handling",
            desc: "Overview of PHP Form Handling",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Form Handling example 
console.log('PHP Form Handling');`
        },
        {
            title: "PHP Form Validation",
            desc: "Overview of PHP Form Validation",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Form Validation example 
console.log('PHP Form Validation');`
        },
        {
            title: "PHP Date and Time",
            desc: "Overview of PHP Date and Time",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Date and Time example 
console.log('PHP Date and Time');`
        },
        {
            title: "PHP Include",
            desc: "Overview of PHP Include",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Include example 
console.log('PHP Include');`
        },
        {
            title: "PHP File Handling",
            desc: "Overview of PHP File Handling",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP File Handling example 
console.log('PHP File Handling');`
        },
        {
            title: "PHP File Open/Read",
            desc: "Overview of PHP File Open/Read",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP File Open/Read example 
console.log('PHP File Open/Read');`
        },
        {
            title: "PHP File Create/Write",
            desc: "Overview of PHP File Create/Write",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP File Create/Write example 
console.log('PHP File Create/Write');`
        },
        {
            title: "PHP File Upload",
            desc: "Overview of PHP File Upload",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP File Upload example 
console.log('PHP File Upload');`
        },
        {
            title: "PHP Cookies",
            desc: "Overview of PHP Cookies",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Cookies example 
console.log('PHP Cookies');`
        },
        {
            title: "PHP Sessions",
            desc: "Overview of PHP Sessions",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Sessions example 
console.log('PHP Sessions');`
        },
        {
            title: "PHP Filters",
            desc: "Overview of PHP Filters",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Filters example 
console.log('PHP Filters');`
        },
        {
            title: "PHP JSON",
            desc: "Overview of PHP JSON",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP JSON example 
console.log('PHP JSON');`
        },
        {
            title: "PHP Exceptions",
            desc: "Overview of PHP Exceptions",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Exceptions example 
console.log('PHP Exceptions');`
        },
        {
            title: "PHP What is OOP",
            desc: "Overview of PHP What is OOP",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP What is OOP example 
console.log('PHP What is OOP');`
        },
        {
            title: "PHP Classes/Objects",
            desc: "Overview of PHP Classes/Objects",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Classes/Objects example 
console.log('PHP Classes/Objects');`
        },
        {
            title: "PHP Constructor",
            desc: "Overview of PHP Constructor",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Constructor example 
console.log('PHP Constructor');`
        },
        {
            title: "PHP Destructor",
            desc: "Overview of PHP Destructor",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Destructor example 
console.log('PHP Destructor');`
        },
        {
            title: "PHP Inheritance",
            desc: "Overview of PHP Inheritance",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Inheritance example 
console.log('PHP Inheritance');`
        },
        {
            title: "PHP Abstract Classes",
            desc: "Overview of PHP Abstract Classes",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Abstract Classes example 
console.log('PHP Abstract Classes');`
        },
        {
            title: "PHP Interfaces",
            desc: "Overview of PHP Interfaces",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Interfaces example 
console.log('PHP Interfaces');`
        },
        {
            title: "PHP Traits",
            desc: "Overview of PHP Traits",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Traits example 
console.log('PHP Traits');`
        },
        {
            title: "PHP Static Methods",
            desc: "Overview of PHP Static Methods",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Static Methods example 
console.log('PHP Static Methods');`
        },
        {
            title: "PHP Namespaces",
            desc: "Overview of PHP Namespaces",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP Namespaces example 
console.log('PHP Namespaces');`
        },
        {
            title: "MySQL Connect",
            desc: "Overview of MySQL Connect",
            colSpan: 1,
            rowSpan: 1,
            code: `<?php
\$servername = "localhost";
\$username = "root";
\$password = "";
\$dbname = "mio_database";

// Connessione con PDO (Consigliato per sicurezza)
try {
  \$conn = new PDO("mysql:host=\$servername;dbname=\$dbname", \$username, \$password);
  // Imposta l'errore PDO ad exception
  \$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connesso con successo";
} catch(PDOException \$e) {
  echo "Connessione fallita: " . \$e->getMessage();
}
?>`
        },
        {
            title: "MySQL Create DB",
            desc: "Overview of MySQL Create DB",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add MySQL Create DB example 
console.log('MySQL Create DB');`
        },
        {
            title: "MySQL Create Table",
            desc: "Overview of MySQL Create Table",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add MySQL Create Table example 
console.log('MySQL Create Table');`
        },
        {
            title: "MySQL Insert Data",
            desc: "Overview of MySQL Insert Data",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add MySQL Insert Data example 
console.log('MySQL Insert Data');`
        },
        {
            title: "MySQL Select Data",
            desc: "Overview of MySQL Select Data",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add MySQL Select Data example 
console.log('MySQL Select Data');`
        },
        {
            title: "MySQL Where",
            desc: "Overview of MySQL Where",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add MySQL Where example 
console.log('MySQL Where');`
        },
        {
            title: "MySQL Order By",
            desc: "Overview of MySQL Order By",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add MySQL Order By example 
console.log('MySQL Order By');`
        },
        {
            title: "MySQL Delete Data",
            desc: "Overview of MySQL Delete Data",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add MySQL Delete Data example 
console.log('MySQL Delete Data');`
        },
        {
            title: "MySQL Update Data",
            desc: "Overview of MySQL Update Data",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add MySQL Update Data example 
console.log('MySQL Update Data');`
        },
        {
            title: "PHP XML Parsers",
            desc: "Overview of PHP XML Parsers",
            colSpan: 1,
            rowSpan: 1,
            code: `// TODO: Add PHP XML Parsers example 
console.log('PHP XML Parsers');`
        }
    ]
};
