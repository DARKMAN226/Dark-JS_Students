import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Trophy, BookOpen, Target, Camera, Upload, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { supabase } from '../lib/supabase';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, signOut, updateUserMetadata, refreshUser } = useAuth();
  const { progress, getCompletedLessonsCount } = useProgress();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync avatar URL with user metadata
  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      setAvatarUrl(user.user_metadata.avatar_url);
    } else {
      setAvatarUrl('');
    }
  }, [user?.user_metadata?.avatar_url]);

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return;

    try {
      setUploading(true);

      // Delete old avatar if exists
      if (avatarUrl) {
        const oldFileName = avatarUrl.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('avatars')
            .remove([`${user.id}/${oldFileName}`]);
        }
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update user metadata
      await updateUserMetadata({ avatar_url: publicUrl });

      // Update user profile in database
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ 
          avatar_url: publicUrl, 
          updated_at: new Date().toISOString() 
        })
        .eq('user_id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
      }

      // Update local state
      setAvatarUrl(publicUrl);
      
      // Force refresh user data
      await refreshUser();
      
      alert('Photo de profil mise à jour avec succès !');
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      alert('Erreur lors du téléchargement : ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image doit faire moins de 5MB');
      return;
    }

    uploadAvatar(file);
  };

  const removeAvatar = async () => {
    if (!user || !avatarUrl) return;

    try {
      setUploading(true);

      // Delete file from storage
      const fileName = avatarUrl.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('avatars')
          .remove([`${user.id}/${fileName}`]);
      }

      // Update user metadata
      await updateUserMetadata({ avatar_url: null });

      // Update user profile in database
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ 
          avatar_url: null, 
          updated_at: new Date().toISOString() 
        })
        .eq('user_id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
      }

      // Update local state
      setAvatarUrl('');
      
      // Force refresh user data
      await refreshUser();
      
      alert('Photo de profil supprimée');
    } catch (error: any) {
      console.error('Error removing avatar:', error);
      alert('Erreur lors de la suppression : ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const totalLessons = progress.length;
  const completedLessons = getCompletedLessonsCount();
  const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const chapterStats = [
    { id: 'chapter-1', name: 'Introduction à JavaScript', total: 7 },
    { id: 'chapter-2', name: 'Fonctions et Structures', total: 8 },
    { id: 'chapter-3', name: 'Manipulation du DOM', total: 9 },
    { id: 'chapter-4', name: 'Événements et Interactions', total: 7 },
  ].map(chapter => {
    const completed = progress.filter(p => p.chapter_id === chapter.id && p.completed).length;
    return {
      ...chapter,
      completed,
      percentage: chapter.total > 0 ? Math.round((completed / chapter.total) * 100) : 0,
    };
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            {/* Avatar avec upload */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center border-2 border-gray-600">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading avatar:', avatarUrl);
                      setAvatarUrl('');
                    }}
                    onLoad={() => console.log('Avatar loaded successfully:', avatarUrl)}
                  />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              
              {/* Overlay pour indiquer le chargement */}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Boutons d'upload */}
              <div className="absolute -bottom-2 -right-2 flex space-x-1">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors disabled:opacity-50"
                  title="Changer la photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
                
                {avatarUrl && (
                  <button
                    onClick={removeAvatar}
                    disabled={uploading}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors disabled:opacity-50"
                    title="Supprimer la photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white">
                {user?.user_metadata?.full_name || 'Étudiant'}
              </h2>
              <p className="text-gray-400">{user?.email}</p>
              {user?.email_confirmed_at && (
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-400">Email confirmé</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Instructions pour l'upload */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-6">
          <div className="flex items-start space-x-2">
            <Upload className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-300">
              <p className="font-medium mb-1">Photo de profil</p>
              <p>Cliquez sur l'icône appareil photo pour ajouter votre photo. Formats acceptés : JPG, PNG, GIF (max 5MB)</p>
            </div>
          </div>
        </div>

        {/* Debug info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-700/30 rounded-lg p-3 mb-6 text-xs">
            <p className="text-gray-400">Debug - Avatar URL: {avatarUrl || 'Aucune'}</p>
            <p className="text-gray-400">User metadata avatar: {user?.user_metadata?.avatar_url || 'Aucune'}</p>
          </div>
        )}

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{completedLessons}</div>
            <div className="text-sm text-gray-400">Leçons terminées</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{completionRate}%</div>
            <div className="text-sm text-gray-400">Progression globale</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {chapterStats.filter(c => c.percentage === 100).length}
            </div>
            <div className="text-sm text-gray-400">Chapitres terminés</div>
          </div>
        </div>

        {/* Progression par chapitre */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Progression par chapitre</h3>
          <div className="space-y-4">
            {chapterStats.map((chapter) => (
              <div key={chapter.id} className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-white">{chapter.name}</h4>
                  <span className="text-sm text-gray-400">
                    {chapter.completed}/{chapter.total}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${chapter.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1">
                  <span className="text-sm text-purple-400">{chapter.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;