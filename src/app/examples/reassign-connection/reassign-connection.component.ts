import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FCanvasComponent, FFlowModule, FReassignConnectionEvent } from '@foblex/flow';

@Component({
  selector: 'app-reassign-connection',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './reassign-connection.component.html',
  styleUrl: './reassign-connection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReassignConnectionComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public connections: { outputId: string; inputId: string }[] = [{ outputId: '1', inputId: '2' }];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public reassignConnection(event: FReassignConnectionEvent): void {
    if (!event.newFInputId) {
      return;
    }
    this.connections = [{ outputId: event.fOutputId, inputId: event.newFInputId }];
    this.changeDetectorRef.detectChanges();
  }

  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
