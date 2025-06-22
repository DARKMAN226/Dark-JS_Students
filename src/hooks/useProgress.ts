import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface UserProgress {
  id: string;
  user_id: string;
  chapter_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
    } else {
      setProgress([]);
      setLoading(false);
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setProgress(data || []);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (chapterId: string, lessonId: string) => {
    if (!user) return;

    try {
      // Check if already exists
      const existing = progress.find(
        p => p.chapter_id === chapterId && p.lesson_id === lessonId
      );

      if (existing && existing.completed) {
        return; // Already completed
      }

      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          chapter_id: chapterId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,chapter_id,lesson_id'
        });

      if (error) throw error;

      // Update local state immediately
      setProgress(prev => {
        const filtered = prev.filter(
          p => !(p.chapter_id === chapterId && p.lesson_id === lessonId)
        );
        return [...filtered, {
          id: existing?.id || `temp-${Date.now()}`,
          user_id: user.id,
          chapter_id: chapterId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
          created_at: existing?.created_at || new Date().toISOString(),
        }];
      });

      // Refresh from server to get accurate data
      await fetchProgress();
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const isLessonComplete = (chapterId: string, lessonId: string) => {
    return progress.some(
      p => p.chapter_id === chapterId && p.lesson_id === lessonId && p.completed
    );
  };

  const getChapterProgress = (chapterId: string) => {
    const chapterProgress = progress.filter(p => p.chapter_id === chapterId && p.completed);
    return chapterProgress.length;
  };

  const getCompletedLessonsCount = () => {
    return progress.filter(p => p.completed).length;
  };

  const getTotalProgressPercentage = () => {
    // Calculate based on all available lessons across all chapters
    const totalLessons = progress.length;
    const completedLessons = getCompletedLessonsCount();
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  return {
    progress,
    loading,
    markLessonComplete,
    isLessonComplete,
    getChapterProgress,
    getCompletedLessonsCount,
    getTotalProgressPercentage,
    fetchProgress,
  };
}