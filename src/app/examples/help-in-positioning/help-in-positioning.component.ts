import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-help-in-positioning',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './help-in-positioning.component.html',
  styleUrl: './help-in-positioning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpInPositioningComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
