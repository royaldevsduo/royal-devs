import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image_url: string;
  technologies: string[];
  icon: string;
  results: string;
  is_featured: boolean;
  display_order: number;
}

export function useProjects(featuredOnly = false) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let query = supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });

        if (featuredOnly) {
          query = query.eq('is_featured', true);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [featuredOnly]);

  return { projects, isLoading, error };
}
