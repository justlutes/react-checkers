export interface ILeader {
  name: string;
  wins: number;
}

export interface ILeaderboard {
  leaderBoard: ILeader[];
}
