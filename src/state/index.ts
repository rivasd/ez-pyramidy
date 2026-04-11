import {create} from 'zustand';
import { parse } from 'yaml';
import { z } from 'zod';
import type { Game, Team } from '../models';

const WordSchema = z.object({
  mot: z.string(),
  imgUrl: z.preprocess(
    (value) => (value == null || value === '' ? undefined : value),
    z.string().optional()
  ),
  success: z.boolean().default(false),
  responseTime: z.number().optional(),
});

const WordsSchema = z
  .array(z.union([z.string(), WordSchema]))
  .transform((words) =>
    words.map((word) =>
      typeof word === 'string' ? { mot: word, success: false } : word
    )
  );

const CategorySchema = z.object({
  displayName: z.string(),
  fullName: z.string(),
  words: WordsSchema,
  selectedBy: z.number().optional(),
  max_time: z.coerce.number().optional(),
});

const GameSchema = z.object({
  max_time: z.coerce.number().default(60),
  categories: z.array(CategorySchema),
});

function formatValidationErrors(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
      return `${path}: ${issue.message}`;
    })
    .join('\n');
}

interface PyramidState {
  gameDef?: Game
  teams: Team[];
  currentTeam?: number;
  setGameDef: (gameDef: Game) => void;
  resetGame: () => void;
  advanceToNextTeam: () => void;
  setTeams : (teams: Team[]) => void;
  playCategory: (categoryIndex: number) => void;
  loadGameDef: (file: File) => void;
  answerWord: (categoryIndex: number, wordIndex: number, responseTime: number) => void;
}

export const useGameStore = create<PyramidState>((set) => ({
  teams: [],
  setGameDef: (gameDef: Game) => set({ gameDef }),
  setTeams: (teams: Team[]) => set({ teams, currentTeam: 0 }),
  resetGame: () => set({ gameDef: undefined, currentTeam: undefined }),
  playCategory: (categoryIndex: number) => set((state) => {
    if (!state.gameDef) {
      throw new Error("Game definition must be set before playing a category.");
    }
    const updatedCategories = state.gameDef.categories.map((cat, idx) => {
      if (idx === categoryIndex) {
        return {
          ...cat,
          selectedBy: state.currentTeam
        }
      }
      return cat;
    });
    return {
      gameDef: {
        ...state.gameDef,
        categories: updatedCategories
      }
    };
  }),
  advanceToNextTeam: () => set((state) => {
    if (!state.gameDef) {
      throw new Error("Game definition must be set before changing the current team.");
    }
    if( state.currentTeam === undefined) {
      return { currentTeam: 0 };
    }
    return { currentTeam: (state.currentTeam + 1) % state.teams.length };
  }),
  loadGameDef: (file: File) => {
    const reader = new FileReader();
    reader.onload = function() {
      const text = reader.result;
      try {
        if (typeof text !== 'string') {
          throw new Error('File content is not a string');
        }
        const parsed = parse(text) as unknown;
        const validated = GameSchema.parse(parsed);
        const gameDef: Game = {
          ...validated,
        };
        set({ gameDef });
      } catch (error) {
        if (error instanceof z.ZodError) {
          alert(`Invalid game definition:\n${formatValidationErrors(error)}`);
          return;
        }
        alert('Oups! there was a problem with your file, check syntax');
      }
    };
    reader.readAsText(file);
  },  
  answerWord: (categoryIndex: number, wordIndex: number, responseTime: number) => set((state) => {
    if (!state.gameDef) {
      throw new Error("Game definition must be set before answering a word.");
    }
    const updatedCategories = state.gameDef.categories.map((cat, idx) => {
      if (idx === categoryIndex) {
        const updatedWords = cat.words.map((word, wIdx) => {
          if (wIdx === wordIndex) {
            return {
              ...word,
              success: true,
              responseTime: responseTime
            }
          }
          return word;
        });
        return {
          ...cat,
          words: updatedWords
        }
      }
      return cat;
    });
    return {
      gameDef: {
        ...state.gameDef,
        categories: updatedCategories
      }
    };
  })
}));