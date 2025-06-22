import React, { useState } from 'react';
import { ArrowLeft, Trophy, Target, Lightbulb, CheckCircle } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';

interface ProjectData {
  id: string;
  number: number;
  title: string;
  description: string;
}

interface ProjectProps {
  projectData: ProjectData;
  onNavigate: (view: string) => void;
}

const Project: React.FC<ProjectProps> = ({ projectData, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const { markLessonComplete, isLessonComplete } = useProgress();

  // Project steps data based on project number
  const getProjectSteps = (projectNumber: number) => {
    switch (projectNumber) {
      case 1:
        return [
          {
            id: 'intro',
            title: "Présentation du Projet",
            type: "intro",
            content: `
## 🎯 Projet Final : Devine le Nombre

**Objectif :** Créer un jeu interactif où l'ordinateur choisit un nombre aléatoire entre 1 et 100, 
et l'utilisateur doit le deviner.

**Fonctionnalités à implémenter :**
• Génération d'un nombre aléatoire
• Interface pour saisir une proposition
• Vérification de la proposition (trop grand, trop petit, correct)
• Compteur du nombre de tentatives
• Messages d'encouragement
• Possibilité de rejouer

**Ce que vous allez apprendre :**
• Utiliser Math.random() pour générer des nombres aléatoires
• Créer des fonctions pour organiser le code
• Gérer les interactions utilisateur
• Utiliser les structures conditionnelles (if/else)
• Manipuler le DOM pour créer une interface

Ce projet combine tous les concepts vus dans le Chapitre 1 !
            `,
            code: `// Aperçu du projet final que nous allons créer
console.log("=== DEVINE LE NOMBRE ===");
console.log("J'ai choisi un nombre entre 1 et 100");
console.log("À toi de le deviner !");

// Simulation d'une partie
let nombreSecret = 42;
let proposition = 30;
let tentatives = 1;

console.log("Tentative " + tentatives + ": " + proposition);

if (proposition < nombreSecret) {
    console.log("Trop petit ! Essaie plus grand.");
} else if (proposition > nombreSecret) {
    console.log("Trop grand ! Essaie plus petit.");
} else {
    console.log("🎉 Bravo ! Tu as trouvé en " + tentatives + " tentative(s) !");
}`
          },
          {
            id: 'step-1',
            title: "Étape 1 : Générer un Nombre Aléatoire",
            type: "step",
            content: `
La première étape consiste à générer un nombre aléatoire entre 1 et 100.

**Math.random()** génère un nombre décimal entre 0 (inclus) et 1 (exclus).
Pour obtenir un nombre entre 1 et 100 :

1. **Math.random() * 100** → nombre entre 0 et 99.999...
2. **Math.floor()** → arrondit vers le bas
3. **+ 1** → décale de 1 à 100

**Votre mission :** Complétez le code pour générer un nombre aléatoire et l'afficher.
            `,
            code: `// Génération d'un nombre aléatoire entre 1 et 100
let nombreSecret = Math.floor(Math.random() * 100) + 1;

console.log("=== JEU : DEVINE LE NOMBRE ===");
console.log("J'ai choisi un nombre entre 1 et 100");

// Pour les tests, on peut afficher le nombre (à supprimer dans la version finale)
console.log("(Psst... le nombre secret est : " + nombreSecret + ")");

// Testez plusieurs fois pour voir différents nombres
console.log("Autre nombre aléatoire : " + Math.floor(Math.random() * 100) + 1);
console.log("Et encore un autre : " + Math.floor(Math.random() * 100) + 1);`
          }
        ];
      case 2:
        return [
          {
            id: 'intro',
            title: "Présentation du Projet",
            type: "intro",
            content: `
## 🧮 Projet Final : Calculatrice Interactive

**Objectif :** Créer une calculatrice complète avec interface utilisateur.

**Fonctionnalités à implémenter :**
• Interface avec boutons numériques
• Opérations de base (+, -, *, /)
• Affichage du résultat
• Gestion des erreurs
• Historique des calculs
• Fonction clear/reset

**Ce que vous allez apprendre :**
• Créer une interface utilisateur dynamique
• Gérer les événements de clic
• Utiliser les fonctions pour organiser le code
• Valider les entrées utilisateur
• Gérer les erreurs de calcul

Ce projet utilise les fonctions et structures de contrôle du Chapitre 2 !
            `,
            code: `// Aperçu de la calculatrice
let affichage = "0";
let operateur = "";
let nombrePrecedent = 0;

function ajouterNombre(nombre) {
    if (affichage === "0") {
        affichage = nombre.toString();
    } else {
        affichage += nombre;
    }
    console.log("Affichage:", affichage);
}

function choisirOperation(op) {
    nombrePrecedent = parseFloat(affichage);
    operateur = op;
    affichage = "0";
    console.log("Opération:", op);
}

function calculer() {
    let nombreActuel = parseFloat(affichage);
    let resultat;
    
    switch(operateur) {
        case "+":
            resultat = nombrePrecedent + nombreActuel;
            break;
        case "-":
            resultat = nombrePrecedent - nombreActuel;
            break;
        case "*":
            resultat = nombrePrecedent * nombreActuel;
            break;
        case "/":
            resultat = nombreActuel !== 0 ? nombrePrecedent / nombreActuel : "Erreur";
            break;
    }
    
    console.log("Résultat:", resultat);
    return resultat;
}

// Test de la calculatrice
ajouterNombre(5);
choisirOperation("+");
ajouterNombre(3);
calculer(); // Devrait afficher 8`
          }
        ];
      default:
        return [
          {
            id: 'intro',
            title: "Présentation du Projet",
            type: "intro",
            content: `
## 🚀 Projet en Développement

Ce projet sera bientôt disponible ! En attendant, vous pouvez :

• Réviser les chapitres précédents
• Pratiquer avec les exercices
• Rejoindre notre communauté pour poser vos questions

Restez connectés pour les nouveautés !
            `,
            code: `// Projet en cours de développement
console.log("🚧 Projet en construction...");
console.log("Revenez bientôt pour découvrir ce nouveau défi !");

// En attendant, continuez à pratiquer !
let motivation = "La pratique rend parfait !";
console.log(motivation);`
          }
        ];
    }
  };

  const projectSteps = getProjectSteps(projectData.number);
  const currentStepData = projectSteps[currentStep];

  const completeStep = async (stepId: string) => {
    if (user && stepId !== 'intro') {
      await markLessonComplete(projectData.id, stepId);
    }
  };

  const completedSteps = projectSteps.filter(step => 
    step.id === 'intro' || isLessonComplete(projectData.id, step.id)
  ).length;

  const isProjectComplete = completedSteps === projectSteps.length;

  const handleComplete = async () => {
    if (user) {
      await markLessonComplete(projectData.id, 'completed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </button>
          <div className="text-right">
            <h1 className="text-3xl font-bold flex items-center">
              <Trophy className="w-8 h-8 mr-2 text-yellow-400" />
              Projet {projectData.number}
            </h1>
            <p className="text-blue-400">{projectData.title}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-8 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progression du projet</span>
            <span className="text-sm text-blue-400">
              {completedSteps}/{projectSteps.length} étapes
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps / projectSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {projectSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm ${
                currentStep === index 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {step.type === 'intro' && <Lightbulb className="w-4 h-4" />}
              {step.type === 'step' && (
                <>
                  <Target className="w-4 h-4" />
                  {isLessonComplete(projectData.id, step.id) && <CheckCircle className="w-4 h-4 text-green-400" />}
                </>
              )}
              {step.type === 'final' && <Trophy className="w-4 h-4" />}
              <span>{step.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-4 bg-gray-900 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center">
                {currentStepData.type === 'intro' && <Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />}
                {currentStepData.type === 'step' && <Target className="w-6 h-6 mr-2 text-blue-400" />}
                {currentStepData.type === 'final' && <Trophy className="w-6 h-6 mr-2 text-yellow-400" />}
                {currentStepData.title}
              </h2>
              {currentStepData.type !== 'intro' && user && (
                <button
                  onClick={() => completeStep(currentStepData.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isLessonComplete(projectData.id, currentStepData.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isLessonComplete(projectData.id, currentStepData.id) ? '✓ Terminé' : 'Marquer comme terminé'}
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="prose prose-invert max-w-none mb-6">
                <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                  {currentStepData.content}
                </div>
              </div>
            </div>
          </div>

          <CodeEditor
            initialCode={currentStepData.code}
            title={`Code - ${currentStepData.title}`}
            height="400px"
          />

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>
            
            <button
              onClick={() => setCurrentStep(Math.min(projectSteps.length - 1, currentStep + 1))}
              disabled={currentStep === projectSteps.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Suivant</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          {/* Project Completion */}
          {isProjectComplete && user && (
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">🎉 Projet Terminé !</h3>
              <p className="mb-4">
                Félicitations ! Vous avez terminé le projet {projectData.title}. 
                Vous progressez excellemment dans votre apprentissage de JavaScript !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('home')}
                  className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Retour à l'accueil
                </button>
                <button
                  onClick={handleComplete}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Marquer le projet comme terminé
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;