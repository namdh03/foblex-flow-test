import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EFConnectionBehavior, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-different-connection-behaviours',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './different-connection-behaviours.component.html',
  styleUrl: './different-connection-behaviours.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferentConnectionBehavioursComponent {
  public eConnectionBehaviour = EFConnectionBehavior;
}
