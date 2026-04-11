
export interface Team {
  name: string;
}
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
  gameImgUrl?: string;
  categories: Category[];
}
