import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-custom-connections',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './custom-connections.component.html',
  styleUrl: './custom-connections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomConnectionsComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
