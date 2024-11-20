import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FCreateConnectionEvent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-drag-to-connect',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './drag-to-connect.component.html',
  styleUrl: './drag-to-connect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragToConnectComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public connections: { outputId: string; inputId: string }[] = [];
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  public addConnection(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      return;
    }
    this.connections.push({ outputId: event.fOutputId, inputId: event.fInputId });
    this.changeDetectorRef.detectChanges();
  }
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
