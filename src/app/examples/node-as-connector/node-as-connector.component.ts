import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-node-as-connector',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './node-as-connector.component.html',
  styleUrl: './node-as-connector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeAsConnectorComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
