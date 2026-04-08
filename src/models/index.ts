
export interface Team {
  name: string;
}

type Teams = Team[];

export interface Word {
  mot: string;
  imgUrl?: string;
  success: boolean;
  responseTime?: number;
}

export interface Category {
  displayName: string;
  fullName: string;
  words: Word[];
  selectedBy?: number;
  max_time?: number;
}

export interface Game {
  max_time: number;
  categories: Category[];
  teams: Teams;
  currentTeam: number;
}
