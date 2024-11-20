import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FCanvasComponent, FFlowModule, FZoomDirective } from '@foblex/flow';

@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [FFlowModule, MatCheckboxModule],
  templateUrl: './zoom.component.html',
  styleUrl: './zoom.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  @ViewChild(FZoomDirective, { static: true })
  public fZoom!: FZoomDirective;
  public isZoomEnabled = true;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
  public onZoomIn(): void {
    this.fZoom.zoomIn();
  }
  public onZoomOut(): void {
    this.fZoom.zoomOut();
  }
  public onZoomOnMouseWheelChanged(checked: boolean): void {
    this.isZoomEnabled = checked;
    this.changeDetectorRef.detectChanges();
  }
}
