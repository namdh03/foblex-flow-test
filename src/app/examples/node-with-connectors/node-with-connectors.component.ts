import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-node-with-connectors',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './node-with-connectors.component.html',
  styleUrl: './node-with-connectors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeWithConnectorsComponent {}
