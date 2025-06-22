import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Code2, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthCallbackProps {
  onNavigate: (view: string) => void;
}

const AuthCallback: React.FC<AuthCallbackProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if user is confirmed
        if (user && user.email_confirmed_at) {
          setStatus('success');
          setMessage('Votre email a été confirmé avec succès ! Vous pouvez maintenant accéder à tous les cours.');
          
          // Redirect to home after 3 seconds
          setTimeout(() => {
            onNavigate('home');
          }, 3000);
        } else if (user && !user.email_confirmed_at) {
          setStatus('error');
          setMessage('Votre email n\'est pas encore confirmé. Veuillez vérifier votre boîte de réception.');
        } else {
          setStatus('error');
          setMessage('Erreur lors de la confirmation. Veuillez réessayer.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Une erreur est survenue lors de la confirmation.');
      }
    };

    // Wait a bit for auth state to update
    const timer = setTimeout(handleAuthCallback, 1000);
    return () => clearTimeout(timer);
  }, [user, onNavigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <div className="flex justify-center items-center mb-6">
            <Code2 className="h-12 w-12 text-purple-400 mr-2" />
            <h1 className="text-2xl font-bold text-white">Dark-JS Students</h1>
          </div>

          {status === 'loading' && (
            <div className="space-y-4">
              <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h2 className="text-xl font-semibold">Confirmation en cours...</h2>
              <p className="text-gray-400">Veuillez patienter pendant que nous confirmons votre email.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
              <h2 className="text-xl font-semibold text-green-400">Email confirmé !</h2>
              <p className="text-gray-300">{message}</p>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-300 text-sm">
                  Redirection automatique vers l'accueil dans quelques secondes...
                </p>
              </div>
              <button
                onClick={() => onNavigate('home')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Continuer vers l'accueil
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
              <h2 className="text-xl font-semibold text-red-400">Erreur de confirmation</h2>
              <p className="text-gray-300">{message}</p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-300 text-sm">
                  Si le problème persiste, contactez-nous via WhatsApp.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => onNavigate('home')}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Retour à l'accueil
                </button>
                <a
                  href="https://wa.me/22603582906"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Contacter le support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;