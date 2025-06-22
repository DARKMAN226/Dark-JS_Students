import React, { useState, useEffect } from 'react';
import { Code2, BookOpen, Target, Users, MessageCircle, Mail, Phone, User, LogOut } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import Chapter from './components/Chapter';
import Project from './components/Project';
import Contact from './components/Contact';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import AuthCallback from './components/AuthCallback';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import { chaptersData, projectsData } from './data/chapters';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { isLessonComplete, getChapterProgress, getCompletedLessonsCount } = useProgress();

  // Check for auth callback on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isAuthCallback = window.location.pathname === '/auth/callback' || 
                          urlParams.has('access_token') || 
                          urlParams.has('refresh_token');
    
    if (isAuthCallback) {
      setCurrentView('auth-callback');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Redirect to auth if trying to access protected content without being logged in
  const handleProtectedNavigation = (view: string) => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    // Show auth modal if needed
    if (showAuth) {
      return <Auth onClose={() => setShowAuth(false)} />;
    }

    // Show profile modal if needed
    if (showProfile) {
      return <UserProfile onClose={() => setShowProfile(false)} />;
    }

    switch (currentView) {
      case 'auth-callback':
        return <AuthCallback onNavigate={setCurrentView} />;
        
      case 'contact':
        return <Contact onNavigate={setCurrentView} />;
      
      default:
        // Handle chapter views
        if (currentView.startsWith('chapter-')) {
          const chapterData = chaptersData.find(c => c.id === currentView);
          if (chapterData) {
            return (
              <Chapter 
                chapterData={chapterData}
                onNavigate={setCurrentView}
              />
            );
          }
        }
        
        // Handle project views
        if (currentView.startsWith('project-')) {
          const projectData = projectsData.find(p => p.id === currentView);
          if (projectData) {
            return (
              <Project 
                projectData={projectData}
                onNavigate={setCurrentView}
              />
            );
          }
        }

        // Default home view
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
            {/* Header with Auth */}
            <div className="absolute top-4 right-4 z-10">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-300">
                      Bonjour, {user.user_metadata?.full_name || 'Étudiant'}
                    </div>
                    {!user.email_confirmed_at && (
                      <div className="text-xs text-yellow-400">
                        Email non confirmé
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowProfile(true)}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img 
                        src={user.user_metadata.avatar_url} 
                        alt="Avatar" 
                        className="w-5 h-5 rounded-full object-cover border border-purple-300"
                        onError={(e) => {
                          // Fallback to User icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <User className={`w-4 h-4 ${user.user_metadata?.avatar_url ? 'hidden' : ''}`} />
                    <span>Profil</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Se connecter
                </button>
              )}
            </div>

            {/* Email confirmation banner */}
            {user && !user.email_confirmed_at && (
              <div className="bg-yellow-600/20 border-b border-yellow-600/30 p-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-200 text-sm">
                        Veuillez confirmer votre email pour accéder à toutes les fonctionnalités.
                      </span>
                    </div>
                    <button
                      onClick={() => setShowAuth(true)}
                      className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                    >
                      Renvoyer l'email
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Section */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                  <div className="flex justify-center items-center mb-8">
                    <Code2 className="h-16 w-16 text-purple-400 mr-4" />
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Dark-JS Students
                    </h1>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                    Plateforme pédagogique interactive pour apprendre JavaScript de manière pratique et motivante
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => handleProtectedNavigation('chapter-1')}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Commencer l'apprentissage
                    </button>
                    <button
                      onClick={() => setCurrentView('contact')}
                      className="bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                    >
                      Nous contacter
                    </button>
                  </div>
                  {!user && (
                    <p className="text-sm text-gray-400 mt-4">
                      <button 
                        onClick={() => setShowAuth(true)}
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        Créez un compte
                      </button> pour sauvegarder votre progression et recevoir des notifications
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités de la Plateforme</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <BookOpen className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Cours Interactifs</h3>
                  <p className="text-gray-300">
                    Apprenez JavaScript avec des leçons claires, des exemples pratiques et un éditeur de code intégré
                  </p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <Target className="h-12 w-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Exercices Pratiques</h3>
                  <p className="text-gray-300">
                    Mettez en pratique vos connaissances avec des exercices guidés et une validation instantanée
                  </p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <Code2 className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Projets Finaux</h3>
                  <p className="text-gray-300">
                    Construisez des mini-applications complètes pour consolider vos apprentissages
                  </p>
                </div>
              </div>
            </div>

            {/* Chapters Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <h2 className="text-3xl font-bold text-center mb-12">Parcours d'Apprentissage</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chaptersData.map((chapter) => {
                  const progress = user ? getChapterProgress(chapter.id) : 0;
                  const totalLessons = chapter.lessons.length + chapter.exercises.length;
                  const progressPercentage = totalLessons > 0 ? Math.round((progress / totalLessons) * 100) : 0;
                  
                  return (
                    <div 
                      key={chapter.id}
                      onClick={() => handleProtectedNavigation(chapter.id)}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 cursor-pointer transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">Chapitre {chapter.number}</h3>
                        {user && progress > 0 && (
                          <div className="text-sm text-purple-400 font-medium">
                            {progressPercentage}%
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4">{chapter.title}</p>
                      <p className="text-sm text-gray-400 mb-4">
                        {chapter.description}
                      </p>
                      {user && progress > 0 && (
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {projectsData.map((project) => {
                  const isComplete = user ? isLessonComplete(project.id, 'completed') : false;
                  
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProtectedNavigation(project.id)}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 cursor-pointer transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">Projet {project.number}</h3>
                        {isComplete && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4">{project.title}</p>
                      <p className="text-sm text-gray-400">
                        {project.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Preview */}
            <div className="bg-gray-800/30 backdrop-blur-sm py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-8">Besoin d'aide ?</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Notre communauté est là pour vous accompagner dans votre apprentissage
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/22603582906"
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Support
                  </a>
                  <button
                    onClick={() => setCurrentView('contact')}
                    className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Rejoindre la Communauté
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <Code2 className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-spin" />
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {renderContent()}
    </div>
  );
}

export default App;