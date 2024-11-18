import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-different-connection-types',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './different-connection-types.component.html',
  styleUrl: './different-connection-types.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferentConnectionTypesComponent {}
