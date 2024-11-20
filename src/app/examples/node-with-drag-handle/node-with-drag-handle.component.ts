import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-node-with-drag-handle',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './node-with-drag-handle.component.html',
  styleUrl: './node-with-drag-handle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeWithDragHandleComponent {}
