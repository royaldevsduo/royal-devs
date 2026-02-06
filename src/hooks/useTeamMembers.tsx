import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  whatsapp: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  display_order: number;
  is_active: boolean;
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setTeamMembers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch team members'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return { teamMembers, isLoading, error };
}
