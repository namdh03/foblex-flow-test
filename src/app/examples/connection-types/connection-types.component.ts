import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-connection-types',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './connection-types.component.html',
  styleUrl: './connection-types.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionTypesComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
