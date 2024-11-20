import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-drag-handle',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './drag-handle.component.html',
  styleUrl: './drag-handle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragHandleComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
