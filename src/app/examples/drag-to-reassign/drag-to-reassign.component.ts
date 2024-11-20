import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';

import { FCanvasComponent, FFlowModule, FReassignConnectionEvent } from '@foblex/flow';

@Component({
  selector: 'app-drag-to-reassign',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './drag-to-reassign.component.html',
  styleUrl: './drag-to-reassign.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragToReassignComponent {
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
