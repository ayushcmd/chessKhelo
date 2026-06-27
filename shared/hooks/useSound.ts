import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

type SoundType = 'move' | 'capture' | 'check' | 'gameover';

const SOUND_FILES: Record<SoundType, any> = {
  move: require('../../assets/sounds/move.mp3'),
  capture: require('../../assets/sounds/capture.mp3'),
  check: require('../../assets/sounds/check.mp3'),
  gameover: require('../../assets/sounds/gameover.mp3'),
};

export const useSound = (enabled: boolean = true) => {
  const soundRefs = useRef<Record<string, Audio.Sound>>({});

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });

    return () => {
      Object.values(soundRefs.current).forEach((sound) => {
        sound.unloadAsync();
      });
    };
  }, []);

  const playSound = async (type: SoundType) => {
    if (!enabled) return;

    try {
      const { sound } = await Audio.Sound.createAsync(SOUND_FILES[type]);
      soundRefs.current[type] = sound;
      await sound.playAsync();
    } catch (error) {
      console.log('Sound error:', error);
    }
  };

  return { playSound };
};