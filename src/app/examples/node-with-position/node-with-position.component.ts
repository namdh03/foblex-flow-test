import { Component } from '@angular/core';

import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-node-with-position',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './node-with-position.component.html',
  styleUrl: './node-with-position.component.scss',
})
export class NodeWithPositionComponent {}
