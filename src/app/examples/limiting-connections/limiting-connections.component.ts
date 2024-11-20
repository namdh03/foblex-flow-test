import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FCreateConnectionEvent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-limiting-connections',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './limiting-connections.component.html',
  styleUrl: './limiting-connections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitingConnectionsComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public connections: { from: string; to: string }[] = [];
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
  public onCreateConnection(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      return;
    }
    this.connections.push({ from: event.fOutputId, to: event.fInputId });
    console.log(this.connections);
    this.changeDetectorRef.detectChanges();
  }
  public onDeleteConnections(): void {
    this.connections = [];
    this.changeDetectorRef.detectChanges();
  }
}
