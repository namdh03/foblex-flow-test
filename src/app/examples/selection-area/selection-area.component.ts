import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-selection-area',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './selection-area.component.html',
  styleUrl: './selection-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionAreaComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
