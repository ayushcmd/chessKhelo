import { useState, useEffect } from 'react';
import { supabase } from '../../../shared/lib/supabase';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  username: string;
  games_played: number;
  games_won: number;
  games_lost: number;
  games_drawn: number;
  total_moves: number;
  created_at: string;
}

interface GameResult {
  result: 'win' | 'loss' | 'draw' | 'resign';
  opponent: string;
  difficulty?: string;
  total_moves: number;
  duration: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    setProfile(data);
    setLoading(false);
  };

  const saveGameResult = async (gameResult: GameResult) => {
    if (!user) return;

    await supabase.from('game_history').insert({
      player_id: user.id,
      result: gameResult.result,
      opponent: gameResult.opponent,
      difficulty: gameResult.difficulty,
      total_moves: gameResult.total_moves,
      duration: gameResult.duration,
    });

    const updates: any = {
      games_played: (profile?.games_played ?? 0) + 1,
      total_moves: (profile?.total_moves ?? 0) + gameResult.total_moves,
      updated_at: new Date().toISOString(),
    };

    if (gameResult.result === 'win') {
      updates.games_won = (profile?.games_won ?? 0) + 1;
    } else if (gameResult.result === 'loss' || gameResult.result === 'resign') {
      updates.games_lost = (profile?.games_lost ?? 0) + 1;
    } else {
      updates.games_drawn = (profile?.games_drawn ?? 0) + 1;
    }

    await supabase.from('profiles').update(updates).eq('id', user.id);
    fetchProfile();
  };

  const getLeaderboard = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('username, games_won, games_played')
      .order('games_won', { ascending: false })
      .limit(10);
    return data ?? [];
  };

  return {
    profile,
    loading,
    saveGameResult,
    getLeaderboard,
    fetchProfile,
  };
};