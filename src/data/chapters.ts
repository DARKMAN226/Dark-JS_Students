export interface Lesson {
  id: string;
  title: string;
  content: string;
  code: string;
}

export interface Exercise {
  id: string;
  title: string;
  instruction: string;
  initialCode: string;
  solution: string;
}

export interface ChapterData {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
  exercises: Exercise[];
  projectId: string;
}

export const chaptersData: ChapterData[] = [
  {
    id: 'chapter-1',
    number: 1,
    title: 'Introduction à JavaScript',
    description: 'Variables, types de données, console.log, premières commandes',
    lessons: [
      {
        id: 'lesson-1-1',
        title: "Qu'est-ce que JavaScript ?",
        content: `
JavaScript est un langage de programmation qui permet de rendre les pages web interactives. 
Il s'exécute directement dans le navigateur et permet de :

• Modifier le contenu d'une page web
• Réagir aux actions de l'utilisateur (clics, saisies...)
• Communiquer avec des serveurs
• Créer des animations et des effets visuels

JavaScript est un langage **côté client**, ce qui signifie qu'il s'exécute sur l'ordinateur 
de l'utilisateur, dans son navigateur web.
        `,
        code: `// Votre premier programme JavaScript !
console.log("Bonjour Dark-JS Students !");
console.log("JavaScript fonctionne !");

// Les commentaires commencent par //
/* Ou peuvent être sur plusieurs lignes
   comme ceci */`
      },
      {
        id: 'lesson-1-2',
        title: "Intégrer JavaScript dans HTML",
        content: `
Il existe plusieurs façons d'intégrer JavaScript dans une page HTML :

**1. Script interne :**
\`\`\`html
<script>
  console.log("JavaScript intégré !");
</script>
\`\`\`

**2. Script externe :**
\`\`\`html
<script src="monscript.js"></script>
\`\`\`

**3. Dans les attributs HTML :**
\`\`\`html
<button onclick="alert('Clic détecté !')">Clique-moi</button>
\`\`\`

La méthode recommandée est d'utiliser des fichiers externes pour organiser son code.
        `,
        code: `// Différentes façons d'afficher des messages
console.log("Message dans la console");
alert("Message dans une popup");

// La console est l'outil de développement de votre navigateur
// Pressez F12 pour l'ouvrir !`
      },
      {
        id: 'lesson-1-3',
        title: "Les Variables",
        content: `
Les variables permettent de stocker des données en mémoire. En JavaScript moderne, 
nous utilisons principalement **let** et **const** :

**let** : pour les variables qui peuvent changer
**const** : pour les constantes (valeurs qui ne changent pas)
**var** : ancienne syntaxe, évitée aujourd'hui

**Règles de nommage :**
• Commence par une lettre, \$ ou _
• Peut contenir des lettres, chiffres, \$ et _
• Sensible à la casse (Age ≠ age)
• Pas d'espaces
        `,
        code: `// Déclaration de variables
let nom = "Alice";
let age = 25;
const ville = "Paris";

console.log("Nom:", nom);
console.log("Age:", age);
console.log("Ville:", ville);

// Modification d'une variable
age = 26;
console.log("Nouvel âge:", age);

// Essayez de décommenter la ligne suivante (erreur!)
// ville = "Lyon"; // Erreur car const ne peut pas changer`
      },
      {
        id: 'lesson-1-4',
        title: "Types de Données de Base",
        content: `
JavaScript gère automatiquement les types, mais il est important de les connaître :

**String (Chaîne de caractères) :** "Bonjour" ou 'Salut'
**Number (Nombre) :** 42, 3.14, -7
**Boolean (Booléen) :** true ou false
**Undefined :** variable déclarée mais pas assignée
**Null :** valeur vide intentionnelle

L'opérateur **typeof** permet de connaître le type d'une variable.
        `,
        code: `// Différents types de données
let texte = "Bonjour monde";
let nombre = 42;
let decimal = 3.14;
let vrai = true;
let faux = false;
let nonDefini;
let vide = null;

// Vérification des types
console.log("Type de texte:", typeof texte);
console.log("Type de nombre:", typeof nombre);
console.log("Type de vrai:", typeof vrai);
console.log("Type de nonDefini:", typeof nonDefini);
console.log("Type de vide:", typeof vide);

// Opérations simples
console.log("Calcul:", nombre + decimal);
console.log("Concaténation:", texte + " " + nombre);`
      }
    ],
    exercises: [
      {
        id: 'exercise-1-1',
        title: "Exercice 1 : Première Variable",
        instruction: "Créez une variable 'monNom' avec votre nom et affichez-la dans la console",
        initialCode: `// Créez votre variable ici
let monNom = "";

// Affichez-la dans la console
console.log();`,
        solution: `let monNom = "Votre Nom";
console.log("Mon nom est:", monNom);`
      },
      {
        id: 'exercise-1-2',
        title: "Exercice 2 : Calculs Simples",
        instruction: "Créez deux variables numériques et affichez leur somme, différence et produit",
        initialCode: `// Créez vos variables
let a = ;
let b = ;

// Calculez et affichez les résultats
console.log("Somme:", );
console.log("Différence:", );
console.log("Produit:", );`,
        solution: `let a = 10;
let b = 5;

console.log("Somme:", a + b);
console.log("Différence:", a - b);
console.log("Produit:", a * b);`
      },
      {
        id: 'exercise-1-3',
        title: "Exercice 3 : Types de Données",
        instruction: "Créez des variables de différents types et affichez leur type avec typeof",
        initialCode: `// Créez vos variables de différents types
let texte = ;
let nombre = ;
let booleen = ;

// Affichez leurs types
console.log();
console.log();
console.log();`,
        solution: `let texte = "Hello";
let nombre = 42;
let booleen = true;

console.log("Type de texte:", typeof texte);
console.log("Type de nombre:", typeof nombre);
console.log("Type de booleen:", typeof booleen);`
      }
    ],
    projectId: 'project-1'
  },
  {
    id: 'chapter-2',
    number: 2,
    title: 'Fonctions et Structures de Contrôle',
    description: 'Fonctions, conditions if/else, boucles for/while, opérateurs',
    lessons: [
      {
        id: 'lesson-2-1',
        title: "Introduction aux Fonctions",
        content: `
Les fonctions sont des blocs de code réutilisables qui effectuent une tâche spécifique.

**Pourquoi utiliser des fonctions ?**
• Éviter la répétition de code
• Organiser et structurer le programme
• Faciliter la maintenance et les tests
• Rendre le code plus lisible

**Syntaxe de base :**
\`\`\`javascript
function nomDeLaFonction() {
    // Code à exécuter
}
\`\`\`
        `,
        code: `// Déclaration d'une fonction simple
function direBonjour() {
    console.log("Bonjour tout le monde !");
}

// Appel de la fonction
direBonjour();

// Fonction avec paramètres
function saluer(nom) {
    console.log("Bonjour " + nom + " !");
}

saluer("Alice");
saluer("Bob");

// Fonction qui retourne une valeur
function additionner(a, b) {
    return a + b;
}

let resultat = additionner(5, 3);
console.log("5 + 3 =", resultat);`
      },
      {
        id: 'lesson-2-2',
        title: "Paramètres et Valeurs de Retour",
        content: `
Les fonctions peuvent recevoir des **paramètres** (données d'entrée) et **retourner** des valeurs.

**Paramètres :**
• Variables locales à la fonction
• Permettent de personnaliser le comportement
• Peuvent avoir des valeurs par défaut

**Return :**
• Renvoie une valeur à l'appelant
• Arrête l'exécution de la fonction
• Si pas de return, la fonction retourne undefined
        `,
        code: `// Fonction avec paramètres par défaut
function presenter(nom, age = 18) {
    return "Je m'appelle " + nom + " et j'ai " + age + " ans.";
}

console.log(presenter("Marie"));
console.log(presenter("Paul", 25));

// Fonction avec plusieurs paramètres
function calculerMoyenne(note1, note2, note3) {
    let somme = note1 + note2 + note3;
    let moyenne = somme / 3;
    return moyenne;
}

let moyenne = calculerMoyenne(15, 12, 18);
console.log("Moyenne:", moyenne.toFixed(2));

// Fonction qui retourne un objet
function creerPersonne(nom, age) {
    return {
        nom: nom,
        age: age,
        majeur: age >= 18
    };
}

let personne = creerPersonne("Sophie", 22);
console.log(personne);`
      },
      {
        id: 'lesson-2-3',
        title: "Conditions if/else",
        content: `
Les structures conditionnelles permettent d'exécuter du code selon certaines conditions.

**Syntaxe :**
• **if** : si la condition est vraie
• **else if** : sinon, si cette autre condition est vraie
• **else** : sinon (dans tous les autres cas)

**Opérateurs de comparaison :**
• == (égal à) / === (strictement égal)
• != (différent de) / !== (strictement différent)
• < (inférieur) / > (supérieur)
• <= (inférieur ou égal) / >= (supérieur ou égal)
        `,
        code: `// Condition simple
let age = 20;

if (age >= 18) {
    console.log("Vous êtes majeur");
} else {
    console.log("Vous êtes mineur");
}

// Conditions multiples
let note = 15;

if (note >= 16) {
    console.log("Très bien !");
} else if (note >= 14) {
    console.log("Bien !");
} else if (note >= 10) {
    console.log("Assez bien");
} else {
    console.log("Peut mieux faire");
}

// Opérateurs logiques
let temperature = 25;
let soleil = true;

if (temperature > 20 && soleil) {
    console.log("Parfait pour une sortie !");
} else if (temperature > 20 || soleil) {
    console.log("Pas mal pour sortir");
} else {
    console.log("Mieux vaut rester à l'intérieur");
}`
      },
      {
        id: 'lesson-2-4',
        title: "Boucles for et while",
        content: `
Les boucles permettent de répéter du code plusieurs fois.

**Boucle for :**
• Utilisée quand on connaît le nombre d'itérations
• Syntaxe : for(initialisation; condition; incrémentation)

**Boucle while :**
• Utilisée quand on ne connaît pas le nombre exact d'itérations
• Continue tant que la condition est vraie

**Attention :** Évitez les boucles infinies !
        `,
        code: `// Boucle for classique
console.log("=== Boucle FOR ===");
for (let i = 1; i <= 5; i++) {
    console.log("Itération numéro", i);
}

// Boucle for avec un tableau
let fruits = ["pomme", "banane", "orange"];
for (let i = 0; i < fruits.length; i++) {
    console.log("Fruit", i + 1, ":", fruits[i]);
}

// Boucle while
console.log("\\n=== Boucle WHILE ===");
let compteur = 1;
while (compteur <= 3) {
    console.log("Compteur:", compteur);
    compteur++; // Équivalent à compteur = compteur + 1
}

// Exemple pratique : deviner un nombre
let nombreSecret = 7;
let tentative = 1;
let trouve = false;

while (!trouve && tentative <= 3) {
    let proposition = Math.floor(Math.random() * 10) + 1;
    console.log("Tentative", tentative, ":", proposition);
    
    if (proposition === nombreSecret) {
        console.log("Trouvé en", tentative, "tentative(s) !");
        trouve = true;
    } else {
        tentative++;
    }
}

if (!trouve) {
    console.log("Pas trouvé ! Le nombre était", nombreSecret);
}`
      }
    ],
    exercises: [
      {
        id: 'exercise-2-1',
        title: "Exercice 1 : Ma Première Fonction",
        instruction: "Créez une fonction 'calculerCarre' qui prend un nombre en paramètre et retourne son carré",
        initialCode: `// Créez votre fonction ici
function calculerCarre(nombre) {
    // Votre code ici
}

// Testez votre fonction
console.log("Le carré de 5 est:", calculerCarre(5));
console.log("Le carré de 8 est:", calculerCarre(8));`,
        solution: `function calculerCarre(nombre) {
    return nombre * nombre;
}

console.log("Le carré de 5 est:", calculerCarre(5));
console.log("Le carré de 8 est:", calculerCarre(8));`
      },
      {
        id: 'exercise-2-2',
        title: "Exercice 2 : Conditions",
        instruction: "Créez une fonction qui détermine si un nombre est pair ou impair",
        initialCode: `// Créez votre fonction
function pairOuImpair(nombre) {
    // Utilisez l'opérateur % (modulo)
    // nombre % 2 === 0 signifie que le nombre est pair
}

// Tests
console.log("10 est", pairOuImpair(10));
console.log("7 est", pairOuImpair(7));`,
        solution: `function pairOuImpair(nombre) {
    if (nombre % 2 === 0) {
        return "pair";
    } else {
        return "impair";
    }
}

console.log("10 est", pairOuImpair(10));
console.log("7 est", pairOuImpair(7));`
      },
      {
        id: 'exercise-2-3',
        title: "Exercice 3 : Boucle de Multiplication",
        instruction: "Utilisez une boucle for pour afficher la table de multiplication de 7",
        initialCode: `// Affichez la table de multiplication de 7
// Format : "7 x 1 = 7"

for (let i = 1; i <= 10; i++) {
    // Votre code ici
}`,
        solution: `for (let i = 1; i <= 10; i++) {
    console.log("7 x " + i + " = " + (7 * i));
}`
      }
    ],
    projectId: 'project-2'
  },
  {
    id: 'chapter-3',
    number: 3,
    title: 'Manipulation du DOM',
    description: 'Sélection d\'éléments, modification du contenu, styles CSS',
    lessons: [
      {
        id: 'lesson-3-1',
        title: "Qu'est-ce que le DOM ?",
        content: `
Le **DOM** (Document Object Model) est la représentation en mémoire de votre page HTML.

**Le DOM permet de :**
• Accéder aux éléments HTML
• Modifier le contenu des éléments
• Changer les styles CSS
• Ajouter ou supprimer des éléments
• Réagir aux événements utilisateur

**Structure arborescente :**
Le DOM organise les éléments HTML comme un arbre, où chaque élément peut avoir des parents, des enfants et des frères/sœurs.
        `,
        code: `// Sélectionner des éléments
// Par ID (le plus courant)
let titre = document.getElementById("monTitre");
console.log("Élément trouvé:", titre);

// Par classe CSS
let boutons = document.getElementsByClassName("btn");
console.log("Nombre de boutons:", boutons.length);

// Par nom de balise
let paragraphes = document.getElementsByTagName("p");
console.log("Nombre de paragraphes:", paragraphes.length);

// Sélecteurs CSS modernes (recommandés)
let premierBouton = document.querySelector(".btn");
let tousLesBoutons = document.querySelectorAll(".btn");

console.log("Premier bouton:", premierBouton);
console.log("Tous les boutons:", tousLesBoutons);

// Exemple pratique
// Supposons qu'on ait : <h1 id="titre">Bonjour</h1>
let monTitre = document.getElementById("titre");
if (monTitre) {
    console.log("Contenu actuel:", monTitre.textContent);
    console.log("HTML actuel:", monTitre.innerHTML);
}`
      },
      {
        id: 'lesson-3-2',
        title: "Modifier le Contenu",
        content: `
Une fois qu'on a sélectionné un élément, on peut modifier son contenu.

**Propriétés importantes :**
• **textContent** : modifie uniquement le texte
• **innerHTML** : modifie le HTML (attention aux risques de sécurité)
• **value** : pour les champs de formulaire (input, textarea)

**Bonnes pratiques :**
• Toujours vérifier que l'élément existe avant de le modifier
• Préférer textContent à innerHTML quand possible
        `,
        code: `// Modifier le texte d'un élément
let titre = document.getElementById("titre");
if (titre) {
    titre.textContent = "Nouveau titre !";
}

// Modifier le HTML d'un élément
let contenu = document.getElementById("contenu");
if (contenu) {
    contenu.innerHTML = "<p>Nouveau <strong>contenu</strong> HTML</p>";
}

// Travailler avec les formulaires
let champNom = document.getElementById("nom");
if (champNom) {
    champNom.value = "Nom par défaut";
    console.log("Valeur actuelle:", champNom.value);
}

// Exemple pratique : compteur
let compteur = 0;
let affichageCompteur = document.getElementById("compteur");

function incrementer() {
    compteur++;
    if (affichageCompteur) {
        affichageCompteur.textContent = compteur;
    }
}

// Simuler quelques clics
incrementer();
incrementer();
incrementer();
console.log("Compteur final:", compteur);`
      },
      {
        id: 'lesson-3-3',
        title: "Modifier les Styles CSS",
        content: `
JavaScript peut modifier l'apparence des éléments en changeant leurs styles CSS.

**Méthodes principales :**
• **element.style.propriété** : modifier une propriété CSS directement
• **element.className** : changer la classe CSS
• **element.classList** : ajouter/supprimer des classes (recommandé)

**Propriétés CSS en JavaScript :**
• background-color → backgroundColor
• font-size → fontSize
• margin-top → marginTop
        `,
        code: `// Modifier les styles directement
let boite = document.getElementById("maBoite");
if (boite) {
    boite.style.backgroundColor = "blue";
    boite.style.color = "white";
    boite.style.padding = "20px";
    boite.style.borderRadius = "10px";
}

// Travailler avec les classes CSS
let bouton = document.getElementById("monBouton");
if (bouton) {
    // Ajouter une classe
    bouton.classList.add("actif");
    
    // Supprimer une classe
    bouton.classList.remove("inactif");
    
    // Basculer une classe (toggle)
    bouton.classList.toggle("surbrillance");
    
    // Vérifier si une classe existe
    if (bouton.classList.contains("actif")) {
        console.log("Le bouton est actif");
    }
}

// Exemple pratique : thème sombre/clair
let body = document.body;
let themeSombre = false;

function changerTheme() {
    if (themeSombre) {
        body.style.backgroundColor = "white";
        body.style.color = "black";
        themeSombre = false;
        console.log("Thème clair activé");
    } else {
        body.style.backgroundColor = "#1a1a1a";
        body.style.color = "white";
        themeSombre = true;
        console.log("Thème sombre activé");
    }
}

// Simuler le changement de thème
changerTheme();`
      },
      {
        id: 'lesson-3-4',
        title: "Créer et Supprimer des Éléments",
        content: `
JavaScript peut créer de nouveaux éléments HTML et les ajouter à la page, ou supprimer des éléments existants.

**Créer des éléments :**
• **document.createElement()** : crée un nouvel élément
• **element.appendChild()** : ajoute un élément enfant
• **element.insertBefore()** : insère avant un élément

**Supprimer des éléments :**
• **element.remove()** : supprime l'élément (moderne)
• **parent.removeChild()** : supprime un enfant (ancienne méthode)
        `,
        code: `// Créer un nouvel élément
let nouveauParagraphe = document.createElement("p");
nouveauParagraphe.textContent = "Ceci est un nouveau paragraphe !";
nouveauParagraphe.style.color = "green";

// L'ajouter à la page
let conteneur = document.getElementById("conteneur");
if (conteneur) {
    conteneur.appendChild(nouveauParagraphe);
}

// Créer une liste dynamiquement
let liste = document.createElement("ul");
let fruits = ["Pomme", "Banane", "Orange"];

fruits.forEach(function(fruit) {
    let item = document.createElement("li");
    item.textContent = fruit;
    liste.appendChild(item);
});

// Ajouter la liste à la page
if (conteneur) {
    conteneur.appendChild(liste);
}

// Supprimer un élément
let elementASupprimer = document.getElementById("aSupprimer");
if (elementASupprimer) {
    elementASupprimer.remove();
    console.log("Élément supprimé");
}

// Exemple pratique : générateur de cartes
function creerCarte(titre, contenu) {
    let carte = document.createElement("div");
    carte.className = "carte";
    carte.style.border = "1px solid #ccc";
    carte.style.padding = "15px";
    carte.style.margin = "10px";
    carte.style.borderRadius = "5px";
    
    let titreCarte = document.createElement("h3");
    titreCarte.textContent = titre;
    
    let contenuCarte = document.createElement("p");
    contenuCarte.textContent = contenu;
    
    carte.appendChild(titreCarte);
    carte.appendChild(contenuCarte);
    
    return carte;
}

// Créer quelques cartes
let carte1 = creerCarte("JavaScript", "Langage de programmation web");
let carte2 = creerCarte("HTML", "Langage de balisage");

console.log("Cartes créées:", carte1, carte2);`
      }
    ],
    exercises: [
      {
        id: 'exercise-3-1',
        title: "Exercice 1 : Sélection d'Éléments",
        instruction: "Sélectionnez un élément par son ID et modifiez son contenu",
        initialCode: `// Supposons qu'il y ait un élément <p id="message">Ancien message</p>

// Sélectionnez l'élément
let element = document.getElementById("message");

// Modifiez son contenu
if (element) {
    // Votre code ici
}

console.log("Message modifié !");`,
        solution: `let element = document.getElementById("message");

if (element) {
    element.textContent = "Nouveau message modifié par JavaScript !";
}

console.log("Message modifié !");`
      },
      {
        id: 'exercise-3-2',
        title: "Exercice 2 : Modifier les Styles",
        instruction: "Changez la couleur de fond et la couleur du texte d'un élément",
        initialCode: `// Supposons un élément <div id="boite">Contenu</div>

let boite = document.getElementById("boite");

if (boite) {
    // Changez la couleur de fond en bleu
    
    // Changez la couleur du texte en blanc
    
    // Ajoutez un peu de padding
}`,
        solution: `let boite = document.getElementById("boite");

if (boite) {
    boite.style.backgroundColor = "blue";
    boite.style.color = "white";
    boite.style.padding = "20px";
}`
      },
      {
        id: 'exercise-3-3',
        title: "Exercice 3 : Créer des Éléments",
        instruction: "Créez un nouveau bouton et ajoutez-le à la page",
        initialCode: `// Créez un nouveau bouton
let bouton = document.createElement("button");

// Définissez son texte

// Définissez ses styles

// Ajoutez-le au body de la page

console.log("Bouton créé et ajouté !");`,
        solution: `let bouton = document.createElement("button");

bouton.textContent = "Cliquez-moi !";
bouton.style.backgroundColor = "green";
bouton.style.color = "white";
bouton.style.padding = "10px 20px";
bouton.style.border = "none";
bouton.style.borderRadius = "5px";

document.body.appendChild(bouton);

console.log("Bouton créé et ajouté !");`
      }
    ],
    projectId: 'project-3'
  },
  {
    id: 'chapter-4',
    number: 4,
    title: 'Événements et Interactions',
    description: 'Gestion des clics, formulaires, événements clavier et souris',
    lessons: [
      {
        id: 'lesson-4-1',
        title: "Introduction aux Événements",
        content: `
Les **événements** permettent à JavaScript de réagir aux actions de l'utilisateur.

**Types d'événements courants :**
• **click** : clic de souris
• **mouseover/mouseout** : survol de souris
• **keydown/keyup** : pression de touches
• **submit** : soumission de formulaire
• **load** : chargement de la page

**Méthodes d'écoute :**
• **onclick** : propriété directe (ancienne méthode)
• **addEventListener()** : méthode moderne (recommandée)
        `,
        code: `// Méthode moderne avec addEventListener
let bouton = document.getElementById("monBouton");

if (bouton) {
    bouton.addEventListener("click", function() {
        console.log("Bouton cliqué !");
        alert("Hello depuis JavaScript !");
    });
}

// Événement de survol
let zone = document.getElementById("zoneHover");
if (zone) {
    zone.addEventListener("mouseover", function() {
        zone.style.backgroundColor = "yellow";
        console.log("Souris sur la zone");
    });
    
    zone.addEventListener("mouseout", function() {
        zone.style.backgroundColor = "white";
        console.log("Souris hors de la zone");
    });
}

// Événement au chargement de la page
window.addEventListener("load", function() {
    console.log("Page entièrement chargée !");
});

// Événement plus utilisé : DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM prêt, on peut manipuler les éléments !");
});`
      },
      {
        id: 'lesson-4-2',
        title: "Événements de Clavier",
        content: `
Les événements de clavier permettent de réagir aux touches pressées par l'utilisateur.

**Événements principaux :**
• **keydown** : touche pressée (se répète si maintenue)
• **keyup** : touche relâchée
• **keypress** : touche caractère pressée (déprécié)

**Propriétés utiles :**
• **event.key** : la touche pressée ("a", "Enter", "Escape")
• **event.code** : code physique de la touche
• **event.ctrlKey, event.shiftKey** : touches modificatrices
        `,
        code: `// Écouter les touches sur un champ de texte
let champTexte = document.getElementById("monChamp");

if (champTexte) {
    champTexte.addEventListener("keydown", function(event) {
        console.log("Touche pressée:", event.key);
        
        // Réagir à des touches spécifiques
        if (event.key === "Enter") {
            console.log("Entrée pressée !");
        } else if (event.key === "Escape") {
            champTexte.value = "";
            console.log("Champ vidé !");
        }
    });
}

// Écouter les touches sur toute la page
document.addEventListener("keydown", function(event) {
    // Combinaisons de touches
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Empêche la sauvegarde du navigateur
        console.log("Ctrl+S détecté ! Sauvegarde personnalisée...");
    }
    
    // Touches fléchées pour un jeu
    switch(event.key) {
        case "ArrowUp":
            console.log("Haut !");
            break;
        case "ArrowDown":
            console.log("Bas !");
            break;
        case "ArrowLeft":
            console.log("Gauche !");
            break;
        case "ArrowRight":
            console.log("Droite !");
            break;
    }
});

// Compteur de caractères en temps réel
let compteurChars = document.getElementById("compteur");
if (champTexte && compteurChars) {
    champTexte.addEventListener("input", function() {
        let longueur = champTexte.value.length;
        compteurChars.textContent = longueur + " caractères";
    });
}`
      },
      {
        id: 'lesson-4-3',
        title: "Gestion des Formulaires",
        content: `
Les formulaires sont essentiels pour collecter des données utilisateur.

**Événements de formulaire :**
• **submit** : soumission du formulaire
• **input** : modification d'un champ
• **change** : changement de valeur (après perte de focus)
• **focus/blur** : entrée/sortie d'un champ

**Validation côté client :**
• Vérifier les données avant envoi
• Afficher des messages d'erreur
• Améliorer l'expérience utilisateur
        `,
        code: `// Gestion de soumission de formulaire
let formulaire = document.getElementById("monFormulaire");

if (formulaire) {
    formulaire.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche l'envoi par défaut
        
        // Récupérer les valeurs
        let nom = document.getElementById("nom").value;
        let email = document.getElementById("email").value;
        let age = document.getElementById("age").value;
        
        // Validation simple
        if (nom.trim() === "") {
            alert("Le nom est obligatoire !");
            return;
        }
        
        if (!email.includes("@")) {
            alert("Email invalide !");
            return;
        }
        
        if (age < 0 || age > 120) {
            alert("Âge invalide !");
            return;
        }
        
        // Si tout est OK
        console.log("Données valides :");
        console.log("Nom:", nom);
        console.log("Email:", email);
        console.log("Âge:", age);
        
        alert("Formulaire soumis avec succès !");
    });
}

// Validation en temps réel
let champEmail = document.getElementById("email");
if (champEmail) {
    champEmail.addEventListener("input", function() {
        let email = champEmail.value;
        let messageErreur = document.getElementById("erreurEmail");
        
        if (email.includes("@") && email.includes(".")) {
            champEmail.style.borderColor = "green";
            if (messageErreur) messageErreur.textContent = "";
        } else {
            champEmail.style.borderColor = "red";
            if (messageErreur) messageErreur.textContent = "Format email invalide";
        }
    });
}

// Exemple de calculatrice simple
function creerCalculatrice() {
    let nombre1 = parseFloat(document.getElementById("nombre1").value);
    let nombre2 = parseFloat(document.getElementById("nombre2").value);
    let operation = document.getElementById("operation").value;
    let resultat = document.getElementById("resultat");
    
    let calcul;
    switch(operation) {
        case "+":
            calcul = nombre1 + nombre2;
            break;
        case "-":
            calcul = nombre1 - nombre2;
            break;
        case "*":
            calcul = nombre1 * nombre2;
            break;
        case "/":
            calcul = nombre2 !== 0 ? nombre1 / nombre2 : "Division par zéro !";
            break;
        default:
            calcul = "Opération inconnue";
    }
    
    if (resultat) {
        resultat.textContent = "Résultat : " + calcul;
    }
}`
      },
      {
        id: 'lesson-4-4',
        title: "Événements de Souris Avancés",
        content: `
La souris offre de nombreuses possibilités d'interaction.

**Événements de souris :**
• **click/dblclick** : clic simple/double
• **mousedown/mouseup** : bouton pressé/relâché
• **mousemove** : mouvement de la souris
• **mouseenter/mouseleave** : entrée/sortie (ne se propage pas)
• **contextmenu** : clic droit

**Propriétés utiles :**
• **event.clientX/clientY** : position dans la fenêtre
• **event.pageX/pageY** : position dans la page
• **event.button** : bouton de souris (0=gauche, 1=milieu, 2=droite)
        `,
        code: `// Suivre la position de la souris
let affichagePosition = document.getElementById("position");

document.addEventListener("mousemove", function(event) {
    if (affichagePosition) {
        affichagePosition.textContent = 
            "Position : X=" + event.clientX + ", Y=" + event.clientY;
    }
});

// Créer un élément qui suit la souris
let suiveur = document.createElement("div");
suiveur.style.position = "fixed";
suiveur.style.width = "20px";
suiveur.style.height = "20px";
suiveur.style.backgroundColor = "red";
suiveur.style.borderRadius = "50%";
suiveur.style.pointerEvents = "none"; // N'interfère pas avec les autres éléments
suiveur.style.zIndex = "9999";
document.body.appendChild(suiveur);

document.addEventListener("mousemove", function(event) {
    suiveur.style.left = (event.clientX - 10) + "px";
    suiveur.style.top = (event.clientY - 10) + "px";
});

// Zone de dessin simple
let canvas = document.getElementById("zoneDessin");
let dessine = false;

if (canvas) {
    canvas.addEventListener("mousedown", function(event) {
        dessine = true;
        canvas.style.backgroundColor = "lightblue";
        console.log("Début du dessin");
    });
    
    canvas.addEventListener("mouseup", function() {
        dessine = false;
        console.log("Fin du dessin");
    });
    
    canvas.addEventListener("mousemove", function(event) {
        if (dessine) {
            // Créer un petit point à la position de la souris
            let point = document.createElement("div");
            point.style.position = "absolute";
            point.style.left = event.clientX + "px";
            point.style.top = event.clientY + "px";
            point.style.width = "3px";
            point.style.height = "3px";
            point.style.backgroundColor = "black";
            point.style.borderRadius = "50%";
            document.body.appendChild(point);
        }
    });
}

// Gestionnaire de clic droit personnalisé
document.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Empêche le menu contextuel par défaut
    console.log("Clic droit détecté à la position:", event.clientX, event.clientY);
    alert("Menu contextuel personnalisé !");
});`
      }
    ],
    exercises: [
      {
        id: 'exercise-4-1',
        title: "Exercice 1 : Gestionnaire de Clic",
        instruction: "Créez un bouton qui change de couleur à chaque clic",
        initialCode: `// Supposons un bouton <button id="boutonCouleur">Cliquez-moi</button>

let bouton = document.getElementById("boutonCouleur");
let couleurs = ["red", "blue", "green", "orange", "purple"];
let indexCouleur = 0;

if (bouton) {
    bouton.addEventListener("click", function() {
        // Changez la couleur de fond du bouton
        // Utilisez l'index pour parcourir le tableau des couleurs
        // N'oubliez pas de passer à la couleur suivante !
    });
}`,
        solution: `let bouton = document.getElementById("boutonCouleur");
let couleurs = ["red", "blue", "green", "orange", "purple"];
let indexCouleur = 0;

if (bouton) {
    bouton.addEventListener("click", function() {
        bouton.style.backgroundColor = couleurs[indexCouleur];
        indexCouleur = (indexCouleur + 1) % couleurs.length;
    });
}`
      },
      {
        id: 'exercise-4-2',
        title: "Exercice 2 : Validation de Formulaire",
        instruction: "Validez qu'un champ nom contient au moins 3 caractères",
        initialCode: `// Supposons un formulaire avec <input id="nom" type="text">

let champNom = document.getElementById("nom");
let messageErreur = document.getElementById("erreur");

if (champNom) {
    champNom.addEventListener("input", function() {
        let nom = champNom.value;
        
        // Vérifiez si le nom a au moins 3 caractères
        // Affichez un message d'erreur si nécessaire
        // Changez la couleur de la bordure selon la validité
    });
}`,
        solution: `let champNom = document.getElementById("nom");
let messageErreur = document.getElementById("erreur");

if (champNom) {
    champNom.addEventListener("input", function() {
        let nom = champNom.value;
        
        if (nom.length < 3) {
            champNom.style.borderColor = "red";
            if (messageErreur) {
                messageErreur.textContent = "Le nom doit contenir au moins 3 caractères";
            }
        } else {
            champNom.style.borderColor = "green";
            if (messageErreur) {
                messageErreur.textContent = "";
            }
        }
    });
}`
      },
      {
        id: 'exercise-4-3',
        title: "Exercice 3 : Compteur de Clics",
        instruction: "Créez un compteur qui s'incrémente à chaque clic et se remet à zéro avec la touche 'r'",
        initialCode: `let compteur = 0;
let affichage = document.getElementById("compteur");
let bouton = document.getElementById("incrementer");

// Gestionnaire de clic pour incrémenter
if (bouton) {
    bouton.addEventListener("click", function() {
        // Incrémentez le compteur
        // Mettez à jour l'affichage
    });
}

// Gestionnaire de touche pour remettre à zéro
document.addEventListener("keydown", function(event) {
    // Si la touche 'r' est pressée, remettez le compteur à zéro
});`,
        solution: `let compteur = 0;
let affichage = document.getElementById("compteur");
let bouton = document.getElementById("incrementer");

if (bouton) {
    bouton.addEventListener("click", function() {
        compteur++;
        if (affichage) {
            affichage.textContent = compteur;
        }
    });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "r" || event.key === "R") {
        compteur = 0;
        if (affichage) {
            affichage.textContent = compteur;
        }
        console.log("Compteur remis à zéro !");
    }
});`
      }
    ],
    projectId: 'project-4'
  }
];

export const projectsData = [
  {
    id: 'project-1',
    number: 1,
    title: 'Devine le Nombre',
    description: 'Créez votre premier jeu interactif en JavaScript'
  },
  {
    id: 'project-2',
    number: 2,
    title: 'Calculatrice Interactive',
    description: 'Une calculatrice complète avec interface utilisateur'
  },
  {
    id: 'project-3',
    number: 3,
    title: 'Liste de Tâches Dynamique',
    description: 'Gérez vos tâches avec ajout, suppression et modification'
  },
  {
    id: 'project-4',
    number: 4,
    title: 'Jeu de Memory',
    description: 'Un jeu de mémoire avec cartes à retourner'
  }
];