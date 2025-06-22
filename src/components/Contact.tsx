import React from 'react';
import { ArrowLeft, MessageCircle, Mail, Users, ExternalLink, Heart, Code } from 'lucide-react';

interface ContactProps {
  onNavigate: (view: string) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </button>
          <div className="text-right">
            <h1 className="text-3xl font-bold">Contact & Communauté</h1>
            <p className="text-green-400">Rejoignez notre communauté d'apprentissage</p>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Direct */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-green-400" />
              Contact Direct
            </h2>
            
            <div className="space-y-4">
              <a
                href="https://wa.me/22603582906"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                <div>
                  <div className="font-semibold">WhatsApp Support</div>
                  <div className="text-sm opacity-90">+226 03 58 29 06</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </a>

              <a
                href="mailto:darkmanterrible@gmail.com"
                className="flex items-center p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-6 h-6 mr-3" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm opacity-90">darkmanterrible@gmail.com</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </a>
            </div>
          </div>

          {/* Communauté */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="w-6 h-6 mr-2 text-purple-400" />
              Communauté
            </h2>
            
            <div className="space-y-4">
              <a
                href="https://whatsapp.com/channel/0029VbAfF6f1dAw7hJidqS0i"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Users className="w-6 h-6 mr-3" />
                <div>
                  <div className="font-semibold">Chaîne WhatsApp</div>
                  <div className="text-sm opacity-90">Dark-JS Students Community</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </a>

              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-semibold mb-2">Rejoignez notre communauté pour :</h3>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Poser vos questions</li>
                  <li>• Partager vos projets</li>
                  <li>• Recevoir de l'aide</li>
                  <li>• Échanger avec d'autres étudiants</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* À propos */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-red-400" />
            À propos de Dark-JS Students
          </h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
              Dark-JS Students est une plateforme d'apprentissage JavaScript créée avec passion pour 
              démocratiser la programmation et rendre l'apprentissage du code accessible à tous.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Code className="w-5 h-5 mr-2 text-blue-400" />
              Notre Mission
            </h3>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>🎯 <strong>Simplicité :</strong> Apprendre JavaScript sans complexité inutile</li>
              <li>🚀 <strong>Pratique :</strong> Mettre l'accent sur la pratique avec des projets concrets</li>
              <li>🤝 <strong>Communauté :</strong> Créer un environnement d'entraide et de partage</li>
              <li>📈 <strong>Progression :</strong> Accompagner chaque étudiant dans son parcours</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Pourquoi "Dark-JS" ?</h3>
            <p className="text-gray-300">
              Le nom "Dark-JS" fait référence au thème sombre que privilégient la plupart des développeurs, 
              mais aussi à l'idée d'éclairer les aspects "obscurs" de JavaScript pour les rendre accessibles. 
              Nous croyons que chaque concept complexe peut être expliqué simplement !
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Questions Fréquentes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-400">
                🤔 Je suis débutant complet, puis-je suivre les cours ?
              </h3>
              <p className="text-gray-300">
                Absolument ! Les cours sont conçus pour les débutants. Nous partons de zéro et 
                expliquons chaque concept étape par étape.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">
                💻 Ai-je besoin d'installer quelque chose ?
              </h3>
              <p className="text-gray-300">
                Non ! Tout fonctionne directement dans votre navigateur. Vous pouvez commencer 
                à apprendre immédiatement sans aucune installation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-400">
                🕐 Combien de temps faut-il pour terminer un chapitre ?
              </h3>
              <p className="text-gray-300">
                Cela dépend de votre rythme, mais en général 2-4 heures suffisent pour un chapitre 
                complet avec les exercices et le projet final.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">
                🎓 Y a-t-il des certificats ?
              </h3>
              <p className="text-gray-300">
                Pour l'instant, nous nous concentrons sur l'apprentissage pratique. Un système de 
                certification pourrait être ajouté dans le futur selon les demandes de la communauté.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer votre voyage JavaScript ?</h2>
          <p className="text-gray-300 mb-6">
            Rejoignez des centaines d'étudiants qui apprennent JavaScript avec Dark-JS Students
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('chapter-1')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Commencer le Chapitre 1
            </button>
            <a
              href="https://whatsapp.com/channel/0029VbAfF6f1dAw7hJidqS0i"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Rejoindre la Communauté
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;