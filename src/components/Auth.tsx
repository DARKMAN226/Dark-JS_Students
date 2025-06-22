import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Code2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AuthProps {
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const { signUp, signIn, resendConfirmation } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        const result = await signUp(email, password, fullName);
        if (result.user && !result.user.email_confirmed_at) {
          setEmailSent(true);
          setSuccess('Un email de confirmation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation.');
        } else {
          setSuccess('Compte créé avec succès !');
          setTimeout(() => onClose(), 2000);
        }
      } else {
        await signIn(email, password);
        setSuccess('Connexion réussie !');
        setTimeout(() => onClose(), 1000);
      }
    } catch (err: any) {
      if (err.message?.includes('Email not confirmed')) {
        setError('Votre email n\'est pas encore confirmé. Veuillez vérifier votre boîte de réception.');
        setEmailSent(true);
      } else if (err.message?.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.');
      } else if (err.message?.includes('User already registered')) {
        setError('Un compte existe déjà avec cette adresse email.');
      } else {
        setError(err.message || 'Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Veuillez saisir votre adresse email');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await resendConfirmation(email);
      setSuccess('Email de confirmation renvoyé ! Vérifiez votre boîte de réception.');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'envoi de l\'email');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    
    return {
      minLength,
      hasNumber,
      hasLetter,
      isValid: minLength && hasNumber && hasLetter
    };
  };

  const passwordValidation = validatePassword(password);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Code2 className="h-12 w-12 text-purple-400 mr-2" />
            <h1 className="text-2xl font-bold text-white">Dark-JS Students</h1>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </h2>
          <p className="text-gray-400">
            {isSignUp 
              ? 'Rejoignez notre communauté d\'apprentissage' 
              : 'Accédez à votre progression'
            }
          </p>
        </div>

        {emailSent && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-blue-400 font-medium mb-1">Email de confirmation envoyé</h3>
                <p className="text-blue-300 text-sm mb-3">
                  Nous avons envoyé un lien de confirmation à <strong>{email}</strong>. 
                  Cliquez sur le lien dans l'email pour activer votre compte.
                </p>
                <div className="text-xs text-blue-200 mb-3">
                  <p>• Vérifiez votre dossier spam si vous ne voyez pas l'email</p>
                  <p>• Le lien expire dans 24 heures</p>
                </div>
                <button
                  onClick={handleResendConfirmation}
                  disabled={loading}
                  className="text-blue-400 hover:text-blue-300 text-sm underline disabled:opacity-50"
                >
                  Renvoyer l'email de confirmation
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom complet *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Votre nom complet"
                  required
                  minLength={2}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mot de passe *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            
            {isSignUp && password && (
              <div className="mt-2 space-y-1">
                <div className={`flex items-center space-x-2 text-xs ${passwordValidation.minLength ? 'text-green-400' : 'text-red-400'}`}>
                  {passwordValidation.minLength ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  <span>Au moins 6 caractères</span>
                </div>
                <div className={`flex items-center space-x-2 text-xs ${passwordValidation.hasLetter ? 'text-green-400' : 'text-red-400'}`}>
                  {passwordValidation.hasLetter ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  <span>Au moins une lettre</span>
                </div>
                <div className={`flex items-center space-x-2 text-xs ${passwordValidation.hasNumber ? 'text-green-400' : 'text-red-400'}`}>
                  {passwordValidation.hasNumber ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  <span>Au moins un chiffre</span>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (isSignUp && !passwordValidation.isValid)}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Chargement...</span>
              </div>
            ) : (
              isSignUp ? 'Créer le compte' : 'Se connecter'
            )}
          </button>
        </form>

        {isSignUp && (
          <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
            <p className="text-xs text-gray-400">
              En créant un compte, vous acceptez de recevoir des emails de confirmation et de récupération de mot de passe.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccess('');
              setEmailSent(false);
            }}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            {isSignUp 
              ? 'Déjà un compte ? Se connecter' 
              : 'Pas de compte ? S\'inscrire'
            }
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Auth;