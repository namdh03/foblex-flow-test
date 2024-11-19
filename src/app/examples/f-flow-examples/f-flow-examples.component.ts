import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { IPoint, IRect, ISize } from '@foblex/2d';
import {
  EFConnectionBehavior,
  EFMarkerType,
  FCanvasChangeEvent,
  FCanvasComponent,
  FCreateConnectionEvent,
  FCreateNodeEvent,
  FFlowComponent,
  FFlowModule,
  FReassignConnectionEvent,
  FZoomDirective,
} from '@foblex/flow';

@Component({
  selector: 'app-f-flow-examples',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './f-flow-examples.component.html',
  styleUrl: './f-flow-examples.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FFlowExamplesComponent implements AfterViewInit {
  @ViewChild(FFlowComponent, { static: true })
  public fFlow!: FFlowComponent;
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  @ViewChild(FZoomDirective, { static: true })
  public fZoomDirective!: FZoomDirective;
  public node1Size: ISize = {
    width: 100,
    height: 100,
  };
  public connections: { outputId: string; inputId: string }[] = [];
  public eConnectionBehaviour = EFConnectionBehavior;
  protected readonly eMarkerType = EFMarkerType;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    console.log('Tọa độ tất cả các node:', this.fFlow.getAllNodesRect());
    console.log('Trạng thái hiện tại của Flow:', this.fFlow.getState());
  }

  onFlowLoaded() {
    console.log('Flow đã tải thành công!');
  }

  onSelectAll() {
    this.fFlow.selectAll();
    console.log('Tất cả các thành phần đã được chọn!');
  }

  onClearSelection() {
    this.fFlow.clearSelection();
    console.log('Tất cả các thành phần đã bỏ chọn!');
  }

  onFlowRedraw() {
    console.log('Redraw!');
    this.fFlow.redraw();
  }

  onCanvasChanged(event: FCanvasChangeEvent) {
    console.log('Canvas đã thay đổi:', event);
  }

  onFitToScreen() {
    this.fCanvas.fitToScreen({ x: 0, y: 0 }, true);
  }

  onResetScaleAndCenter() {
    this.fCanvas.resetScaleAndCenter();
  }

  onCenterNode2() {
    this.fCanvas.centerGroupOrNode('node-2', true);
  }

  onSetZoom() {
    console.log('Set Zoom!');
    this.fCanvas.setZoom(2, { x: 50, y: 50 });
  }

  onResetZoom() {
    console.log('Reset Zoom!');
    this.fCanvas.resetZoom();
  }

  onPositionChanged(newPosition: IPoint) {
    console.log('Node position:', newPosition);
  }

  onSizeChanged(newSize: IRect) {
    console.log('Node size:', newSize);
  }

  onSetNewSizeNode1() {
    this.node1Size = {
      width: 200,
      height: 200,
    };
    this.changeDetectorRef.detectChanges();
  }

  // Add new connection
  public addConnection(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      return;
    }
    this.connections.push({ outputId: event.fOutputId, inputId: event.fInputId });
    this.changeDetectorRef.detectChanges();
  }

  public resignConnection(event: FReassignConnectionEvent): void {
    if (!event.newFInputId) {
      return;
    }
    this.connections = [{ outputId: event.fOutputId, inputId: event.newFInputId }];
    this.changeDetectorRef.detectChanges();
  }

  public createNode(event: FCreateNodeEvent) {
    console.log(event);
  }

  public zoomIn(): void {
    this.fZoomDirective.zoomIn();
  }
  public zoomOut(): void {
    this.fZoomDirective.zoomOut();
  }
  public reset(): void {
    this.fZoomDirective.reset();
  }
}
