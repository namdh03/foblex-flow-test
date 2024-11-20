import { IPoint } from '@foblex/2d';

export interface ITournamentBracketCompetitor {
  title: string;
  score: number;
}

export interface ITournamentBracketItem {
  position?: IPoint;
  id: string;
  competitionPhase: string;
  color: string;
  date: Date;
  competitors: ITournamentBracketCompetitor[];
  nextMatchId: string;
}
