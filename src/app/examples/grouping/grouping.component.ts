import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { PointExtensions } from '@foblex/2d';
import { EFResizeHandleType, FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-grouping',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupingComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.fitToScreen(PointExtensions.initialize(50, 50), false);
  }
  protected readonly eResizeHandleType = EFResizeHandleType;
}
