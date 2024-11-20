import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-minimap',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './minimap.component.html',
  styleUrl: './minimap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimapComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
