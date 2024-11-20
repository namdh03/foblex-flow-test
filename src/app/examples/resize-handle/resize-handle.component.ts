import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IRect } from '@foblex/2d';
import { EFResizeHandleType, FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-resize-handle',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './resize-handle.component.html',
  styleUrl: './resize-handle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizeHandleComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
  protected readonly eResizeHandleType = EFResizeHandleType;
  public onNodeSizeChanged(rect: IRect): void {
    console.log('Node size changed', rect);
  }
}
