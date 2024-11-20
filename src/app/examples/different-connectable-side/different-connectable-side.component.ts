import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-different-connectable-side',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './different-connectable-side.component.html',
  styleUrl: './different-connectable-side.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferentConnectableSideComponent {}
