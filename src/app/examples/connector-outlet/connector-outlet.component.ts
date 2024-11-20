import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';

import { FCanvasComponent, FCreateConnectionEvent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-connector-outlet',
  standalone: true,
  imports: [FFlowModule, MatCheckboxModule, MatIcon],
  templateUrl: './connector-outlet.component.html',
  styleUrl: './connector-outlet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectorOutletComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public connections: { from: string; to: string }[] = [];
  public isConnectionFromOutlet = false;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
  public onCreateConnection(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      return;
    }
    this.connections.push({ from: event.fOutputId, to: event.fInputId });
    this.changeDetectorRef.detectChanges();
  }
  public onDeleteConnections(): void {
    this.connections = [];
    this.changeDetectorRef.detectChanges();
  }
  public onConnectionFromOutletChange(checked: boolean): void {
    this.isConnectionFromOutlet = checked;
  }
}
