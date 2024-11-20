import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { IPoint, PointExtensions } from '@foblex/2d';
import {
  EFMarkerType,
  F_CONNECTION_BUILDERS,
  FCanvasComponent,
  FCreateConnectionEvent,
  FFlowComponent,
  FFlowModule,
  FReassignConnectionEvent,
  IFConnectionBuilder,
  IFConnectionBuilderRequest,
  IFConnectionBuilderResponse,
} from '@foblex/flow';
import { generateGuid } from '@foblex/utils';

class OffsetStraightBuilder implements IFConnectionBuilder {
  public handle(request: IFConnectionBuilderRequest): IFConnectionBuilderResponse {
    const { source, target } = request;
    const path = `M ${source.x} ${source.y} L ${source.x + 20} ${source.y} L ${target.x - 20} ${target.y} L ${target.x} ${target.y}`;
    return {
      path,
      connectionCenter: { x: 0, y: 0 },
      penultimatePoint: PointExtensions.initialize(target.x - 20, target.y),
    };
  }
}

class CircleConnectionBuilder implements IFConnectionBuilder {
  public handle(request: IFConnectionBuilderRequest): IFConnectionBuilderResponse {
    const { source, target } = request;
    const d = this.getD(request);
    const path = `M ${source.x} ${source.y} S${d.x} ${d.y} ${target.x} ${target.y}`;
    return { path, connectionCenter: { x: 0, y: 0 }, penultimatePoint: d };
  }
  private getD(request: IFConnectionBuilderRequest): IPoint {
    const offset: number = request.offset;
    const cx: number = (request.source.x + request.radius + request.target.x) / 2;
    const cy: number = (request.source.y + request.radius + request.target.y) / 2;
    const dx: number =
      cx +
        (offset * (request.source.y - request.target.y)) /
          Math.sqrt(
            Math.pow(request.source.x - request.target.x, 2) + Math.pow(request.source.y - request.target.y, 2),
          ) || cx;
    const dy: number =
      cy -
        (offset * (request.source.x - request.target.x)) /
          Math.sqrt(
            Math.pow(request.source.x - request.target.x, 2) + Math.pow(request.source.y - request.target.y, 2),
          ) || cy;
    return { x: dx, y: dy };
  }
}

const connectionBuilders = {
  ['offset_straight']: new OffsetStraightBuilder(),
  ['circle']: new CircleConnectionBuilder(),
};

@Component({
  selector: 'app-create-node-on-connection-drop',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './create-node-on-connection-drop.component.html',
  styleUrl: './create-node-on-connection-drop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: F_CONNECTION_BUILDERS, useValue: connectionBuilders }],
})
export class CreateNodeOnConnectionDropComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  @ViewChild(FFlowComponent, { static: true })
  public fFlowComponent!: FFlowComponent;
  public eMarkerType = EFMarkerType;

  public connections: { outputId: string; inputId: string }[] = [];
  public nodes: { id: string; position: IPoint }[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public onConnectionDroppedByCreate(event: FCreateConnectionEvent): void {
    console.log('onConnectionDroppedByCreate', event);
    if (!event.fInputId) {
      this.createNode(event.fOutputId, event.fDropPosition);
    } else {
      this.createConnection(event.fOutputId, event.fInputId);
    }
    console.log('this.nodes', this.nodes);
    console.log('this.connections', this.connections);
    this.changeDetectorRef.detectChanges();
  }

  public onConnectionDroppedByReassign(event: FReassignConnectionEvent): void {
    console.log('onConnectionDroppedByReassign', event);
    if (!event.newFInputId) {
      this.removeConnection(event);
    } else {
      this.reassignConnection(event);
    }
    this.changeDetectorRef.detectChanges();
  }

  private createNode(outputId: string, position: IPoint): void {
    this.nodes.push({ id: generateGuid(), position: this.fFlowComponent.getPositionInFlow(position) });
    this.createConnection(outputId, this.nodes[this.nodes.length - 1].id);
  }

  private createConnection(outputId: string, inputId: string): void {
    this.connections.push({ outputId: outputId, inputId: inputId });
  }

  public onDeleteConnections(): void {
    this.connections = [];
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
