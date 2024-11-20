import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-basic-example',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './basic-example.component.html',
  styleUrl: './basic-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicExampleComponent {}
