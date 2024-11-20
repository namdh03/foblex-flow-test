import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-connector-inside-node',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './connector-inside-node.component.html',
  styleUrl: './connector-inside-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectorInsideNodeComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
