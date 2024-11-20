import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { EFMarkerType, FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-connection-markers',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './connection-markers.component.html',
  styleUrl: './connection-markers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionMarkersComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public eMarkerType = EFMarkerType;
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
