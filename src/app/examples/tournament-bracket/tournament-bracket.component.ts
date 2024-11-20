import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { PointExtensions } from '@foblex/2d';
import { FCanvasComponent, FFlowModule } from '@foblex/flow';

import { TournamentBracket } from './entity';
import { ITournamentBracketItem } from './model';
import { TOURNAMENT_BRACKET_STORE } from './storage';

@Component({
  selector: 'app-tournament-bracket',
  standalone: true,
  imports: [FFlowModule, DatePipe],
  templateUrl: './tournament-bracket.component.html',
  styleUrl: './tournament-bracket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentBracketComponent implements OnInit {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvasComponent!: FCanvasComponent;

  public viewModel: ITournamentBracketItem[] = [];

  public ngOnInit(): void {
    this.viewModel = new TournamentBracket(TOURNAMENT_BRACKET_STORE, 200, 113, 100, 150).calculate();
  }

  public onInitialized(): void {
    this.fCanvasComponent.fitToScreen(PointExtensions.initialize(100, 100), false);
  }
}
