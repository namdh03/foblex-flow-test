import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-connection-behaviours',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './connection-behaviours.component.html',
  styleUrl: './connection-behaviours.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionBehavioursComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
