import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { IPoint } from '@foblex/2d';
import { FCanvasComponent, FFlowComponent, FFlowModule, FReassignConnectionEvent } from '@foblex/flow';

@Component({
  selector: 'app-remove-connection-on-connection-drop',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './remove-connection-on-connection-drop.component.html',
  styleUrl: './remove-connection-on-connection-drop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveConnectionOnConnectionDropComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  @ViewChild(FFlowComponent, { static: true })
  public fFlowComponent!: FFlowComponent;

  public nodes: { id: string; position: IPoint }[] = [
    {
      id: '1',
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      position: { x: 200, y: 100 },
    },
    {
      id: '3',
      position: { x: 400, y: 100 },
    },
  ];
  public connections: { outputId: string; inputId: string }[] = [
    { outputId: this.nodes[0].id, inputId: this.nodes[1].id },
    { outputId: this.nodes[1].id, inputId: this.nodes[2].id },
  ];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public onConnectionDropped(event: FReassignConnectionEvent): void {
    if (!event.newFInputId) {
      this.removeConnection(event);
    } else {
      this.reassignConnection(event);
    }
    this.changeDetectorRef.detectChanges();
  }

  private removeConnection(event: FReassignConnectionEvent): void {
    const connectionIndex = this.findConnectionIndex(event.fOutputId, event.oldFInputId);
    if (connectionIndex === -1) {
      throw new Error('Connection not found');
    }
    this.connections.splice(connectionIndex, 1);
  }

  private findConnectionIndex(outputId: string, inputId: string): number {
    return this.connections.findIndex((x) => x.outputId === outputId && x.inputId === inputId);
  }

  private reassignConnection(event: FReassignConnectionEvent): void {
    this.removeConnection(event);
    this.connections.push({ outputId: event.fOutputId, inputId: event.newFInputId! });
  }

  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
