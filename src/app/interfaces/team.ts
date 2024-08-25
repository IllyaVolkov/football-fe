export interface TeamPlayer {
  role: string;
  power: string;
  name: string;
  weight: number;
  height: number;
}

export interface Team {
  id: number;
  name: string;
  source: string;
  players: TeamPlayer[];
  power: string;
}
