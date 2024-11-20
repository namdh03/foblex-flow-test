/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PointExtensions } from '@foblex/2d';
import { EFConnectableSide, FCanvasComponent, FFlowComponent, FFlowModule } from '@foblex/flow';
import { generateGuid } from '@foblex/utils';

@Component({
  selector: 'app-elkjs-tree',
  standalone: true,
  imports: [FFlowModule, MatCheckboxModule],
  templateUrl: './elkjs-tree.component.html',
  styleUrl: './elkjs-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ELKJSTreeComponent implements OnInit {
  private ELK!: any;
  public nodes: any[] = [];
  public connections: any[] = [];
  public configuration = CONFIGURATION[Direction.TOP_TO_BOTTOM];
  @ViewChild(FFlowComponent, { static: false })
  public fFlowComponent!: FFlowComponent;
  @ViewChild(FCanvasComponent, { static: false })
  public fCanvasComponent!: FCanvasComponent;
  public isAutoLayout = true;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  public ngOnInit(): void {
    this.getData(Direction.TOP_TO_BOTTOM);
  }
  public onLoaded(): void {
    this.fitToScreen();
  }
  private getData(direction: Direction): void {
    this.configuration = CONFIGURATION[direction];
    if (this.isAutoLayout) {
      this.fFlowComponent?.reset();
      // if auto layout is disabled, onLoaded will be called only after the first rendering of the flow
    }
    this.mapGraphData({
      id: 'root',
      layoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': direction,
      },
      ...GRAPH_DATA,
    });
  }
  private async mapGraphData(configuration: any): Promise<void> {
    return this.loadElk()
      .then((ELK) => {
        return new ELK().layout(configuration);
      })
      .then((data: any) => {
        this.connections = this.getConnections(data);
        this.nodes = this.getNodes(data);
        this.changeDetectorRef.detectChanges();
      })
      .catch(console.error);
  }
  private loadElk(): Promise<any> {
    if (this.ELK) {
      return Promise.resolve(this.ELK);
    }
    return import('elkjs/lib/elk.bundled').then((module) => {
      this.ELK = module.default;
      return this.ELK;
    });
  }
  private getNodes(data: any): any[] {
    return data.children!.map((node: any) => {
      return {
        id: generateGuid(),
        connectorId: node.id,
        position: PointExtensions.initialize(node.x, node.y),
      };
    });
  }
  private getConnections(data: any): any[] {
    return data.edges!.map((edge: any) => {
      return {
        id: generateGuid(),
        from: edge.sources[0],
        to: edge.targets[0],
      };
    });
  }
  public horizontal(): void {
    this.getData(Direction.LEFT_TO_RIGHT);
  }
  public vertical(): void {
    this.getData(Direction.TOP_TO_BOTTOM);
  }
  public fitToScreen(): void {
    this.fCanvasComponent?.fitToScreen(PointExtensions.initialize(50, 50), false);
  }
  public onAutoLayoutChange(checked: boolean): void {
    this.isAutoLayout = checked;
  }
}
enum Direction {
  LEFT_TO_RIGHT = 'RIGHT',
  TOP_TO_BOTTOM = 'DOWN',
}
const CONFIGURATION = {
  [Direction.LEFT_TO_RIGHT]: {
    outputSide: EFConnectableSide.RIGHT,
    inputSide: EFConnectableSide.LEFT,
  },
  [Direction.TOP_TO_BOTTOM]: {
    outputSide: EFConnectableSide.BOTTOM,
    inputSide: EFConnectableSide.TOP,
  },
};
const GRAPH_DATA = {
  children: [
    { id: 'Node1', width: 120, height: 73 },
    { id: 'Node2', width: 120, height: 73 },
    { id: 'Node3', width: 120, height: 73 },
    { id: 'Node4', width: 120, height: 73 },
    { id: 'Node5', width: 120, height: 73 },
    { id: 'Node6', width: 120, height: 73 },
    { id: 'Node7', width: 120, height: 73 },
    { id: 'Node8', width: 120, height: 73 },
  ],
  edges: [
    { id: 'Edge1', sources: ['Node1'], targets: ['Node2'] },
    { id: 'Edge2', sources: ['Node1'], targets: ['Node3'] },
    { id: 'Edge3', sources: ['Node3'], targets: ['Node4'] },
    { id: 'Edge4', sources: ['Node3'], targets: ['Node5'] },
    { id: 'Edge5', sources: ['Node3'], targets: ['Node6'] },
    { id: 'Edge6', sources: ['Node3'], targets: ['Node7'] },
    { id: 'Edge7', sources: ['Node2'], targets: ['Node8'] },
  ],
};
