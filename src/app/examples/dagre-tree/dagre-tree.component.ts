import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import * as dagre from '@dagrejs/dagre';
import { graphlib } from '@dagrejs/dagre';
import { IPoint, PointExtensions } from '@foblex/2d';
import { EFConnectableSide, FCanvasComponent, FFlowComponent, FFlowModule } from '@foblex/flow';
import { generateGuid } from '@foblex/utils';

import Graph = graphlib.Graph;
import { MatCheckboxModule } from '@angular/material/checkbox';

interface INodeViewModel {
  id: string;
  connectorId: string;
  position: IPoint;
}

interface IConnectionViewModel {
  id: string;
  from: string;
  to: string;
}

@Component({
  selector: 'app-dagre-tree',
  standalone: true,
  imports: [FFlowModule, MatCheckboxModule],
  templateUrl: './dagre-tree.component.html',
  styleUrl: './dagre-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DagreTreeComponent implements OnInit {
  public nodes: INodeViewModel[] = [];
  public connections: IConnectionViewModel[] = [];
  public configuration = CONFIGURATION[Direction.TOP_TO_BOTTOM];
  @ViewChild(FFlowComponent, { static: true })
  public fFlowComponent!: FFlowComponent;
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvasComponent!: FCanvasComponent;
  public isAutoLayout = true;
  public ngOnInit(): void {
    this.getData(new dagre.graphlib.Graph(), Direction.TOP_TO_BOTTOM);
  }
  public onLoaded(): void {
    this.fitToScreen();
  }
  private getData(graph: Graph, direction: Direction): void {
    if (this.isAutoLayout) {
      this.fFlowComponent.reset();
      // if auto layout is disabled, onLoaded will be called only after the first rendering of the flow
    }
    this.setGraph(graph, direction);
    this.nodes = this.getNodes(graph);
    this.connections = this.getConnections(graph);
  }
  private setGraph(graph: Graph, direction: Direction): void {
    this.configuration = CONFIGURATION[direction];
    graph.setGraph({ rankdir: direction });
    GRAPH_DATA.forEach((node) => {
      graph.setNode(node.id, { width: 120, height: 73 });
      if (node.parentId != null) {
        graph.setEdge(node.parentId, node.id, {});
      }
    });
    dagre.layout(graph);
  }
  private getNodes(graph: Graph): INodeViewModel[] {
    return graph.nodes().map((x) => {
      const node = graph.node(x);
      return {
        id: generateGuid(),
        connectorId: x,
        position: { x: node.x, y: node.y },
      };
    });
  }
  private getConnections(graph: Graph): IConnectionViewModel[] {
    return graph.edges().map((x) => ({ id: generateGuid(), from: x.v, to: x.w }));
  }
  public horizontal(): void {
    this.getData(new dagre.graphlib.Graph(), Direction.LEFT_TO_RIGHT);
  }
  public vertical(): void {
    this.getData(new dagre.graphlib.Graph(), Direction.TOP_TO_BOTTOM);
  }
  public fitToScreen(): void {
    this.fCanvasComponent.fitToScreen(PointExtensions.initialize(50, 50), false);
  }
  public onAutoLayoutChange(checked: boolean): void {
    this.isAutoLayout = checked;
  }
}
enum Direction {
  LEFT_TO_RIGHT = 'LR',
  TOP_TO_BOTTOM = 'TB',
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
const GRAPH_DATA = [
  { id: 'Node1', parentId: null },
  { id: 'Node2', parentId: 'Node1' },
  { id: 'Node3', parentId: 'Node1' },
  { id: 'Node4', parentId: 'Node3' },
  { id: 'Node5', parentId: 'Node3' },
  { id: 'Node6', parentId: 'Node3' },
  { id: 'Node7', parentId: 'Node3' },
  { id: 'Node8', parentId: 'Node2' },
];
