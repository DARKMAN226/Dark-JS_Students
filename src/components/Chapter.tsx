import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Target, CheckCircle, User } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { ChapterData } from '../data/chapters';

interface ChapterProps {
  chapterData: ChapterData;
  onNavigate: (view: string) => void;
}

const Chapter: React.FC<ChapterProps> = ({ chapterData, onNavigate }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const { user } = useAuth();
  const { markLessonComplete, isLessonComplete, getChapterProgress } = useProgress();

  const allItems = [...chapterData.lessons, ...chapterData.exercises];
  const totalItems = allItems.length;

  const completedCount = allItems.filter(item => 
    isLessonComplete(chapterData.id, item.id)
  ).length;

  const completeLesson = async (lessonId: string) => {
    if (user) {
      await markLessonComplete(chapterData.id, lessonId);
    }
  };

  const isChapterComplete = completedCount === totalItems;

  // Force re-render when currentLesson changes
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [currentLesson]);

  useEffect(() => {
    if (isChapterComplete && user) {
      // Chapter completed logic can be added here
    }
  }, [isChapterComplete, user]);

  const currentItem = allItems[currentLesson];
  const isExercise = currentLesson >= chapterData.lessons.length;

  const handleNext = () => {
    if (currentLesson < totalItems - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </button>
          <div className="text-right">
            <h1 className="text-3xl font-bold">Chapitre {chapterData.number}</h1>
            <p className="text-purple-400">{chapterData.title}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-8 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progression du chapitre</span>
            <span className="text-sm text-purple-400">{completedCount}/{totalItems} éléments</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-purple-300">
              {progressPercentage}% terminé
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {chapterData.lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => setCurrentLesson(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm ${
                currentLesson === index 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {isLessonComplete(chapterData.id, lesson.id) && (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
              <span>{lesson.title}</span>
            </button>
          ))}
          {chapterData.exercises.map((exercise, index) => (
            <button
              key={exercise.id}
              onClick={() => setCurrentLesson(chapterData.lessons.length + index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm ${
                currentLesson === chapterData.lessons.length + index 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Target className="w-4 h-4" />
              {isLessonComplete(chapterData.id, exercise.id) && (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
              <span>{exercise.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-4 bg-gray-900 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center">
                {isExercise ? (
                  <Target className="w-6 h-6 mr-2 text-green-400" />
                ) : (
                  <BookOpen className="w-6 h-6 mr-2 text-blue-400" />
                )}
                {currentItem.title}
              </h2>
              {user && (
                <button
                  onClick={() => completeLesson(currentItem.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isLessonComplete(chapterData.id, currentItem.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isLessonComplete(chapterData.id, currentItem.id) ? '✓ Terminé' : 'Marquer comme terminé'}
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="prose prose-invert max-w-none mb-6">
                <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                  {isExercise ? (currentItem as any).instruction : currentItem.content}
                </div>
              </div>
            </div>
          </div>

          <CodeEditor
            key={`${currentItem.id}-${key}`}
            initialCode={currentItem.code || (isExercise ? (currentItem as any).initialCode : '')}
            title={`Code - ${currentItem.title}`}
            height="400px"
          />

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentLesson === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-400">
                {currentLesson + 1} / {totalItems}
              </span>
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentLesson === totalItems - 1}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            >
              <span>Suivant</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          {/* Chapter Completion */}
          {isChapterComplete && user && (
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Chapitre Terminé !</h3>
              <p className="mb-4">Félicitations ! Vous maîtrisez maintenant les concepts de ce chapitre.</p>
              <button
                onClick={() => onNavigate(chapterData.projectId)}
                className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Passer au Projet Final
              </button>
            </div>
          )}

          {!user && (
            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-yellow-200 mb-2">Connectez-vous pour sauvegarder votre progression</p>
              <p className="text-sm text-yellow-300">Vos progrès seront perdus si vous fermez la page</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapter;