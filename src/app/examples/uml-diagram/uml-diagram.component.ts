import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';

import { Point } from '@foblex/2d';
import { EFMarkerType, FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-uml-diagram',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './uml-diagram.component.html',
  styleUrl: './uml-diagram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UmlDiagramComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvasComponent!: FCanvasComponent;

  public readonly eMarkerType = EFMarkerType;

  public connections = UML_CHART_CONNECTIONS;
  public nodes = UML_CHART_NODES;
  public groups = UML_CHART_GROUPS;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public onInitialized(): void {
    this.fCanvasComponent.fitToScreen(new Point(100, 100), false);
  }
}

export const UML_CHART_CONNECTIONS = [
  {
    from: '1',
    to: '2',
  },
  {
    from: '2',
    to: 'group3',
  },
  {
    from: '1',
    to: '4',
  },
  {
    from: '4',
    to: '2',
  },
];

export const UML_CHART_GROUPS = [
  {
    id: 'group3',
    position: { x: 100, y: 400 },
    size: { width: 400, height: 300 },
    type: 'uml-class',
    data: {
      name: 'Group 3',
      attributes: ['attribute 1', 'attribute 2'],
      methods: ['method 1', 'method 2'],
    },
  },
];

export const UML_CHART_NODES = [
  {
    id: '1',
    position: { x: 50, y: 100 },
    type: 'uml-class',
    parentId: undefined,
    data: {
      name: 'Class 1',
      attributes: ['attribute 1', 'attribute 2'],
      methods: ['method 1', 'method 2'],
    },
  },
  {
    id: '2',
    position: { x: 500, y: 150 },
    type: 'uml-class',
    parentId: undefined,
    data: {
      name: 'Class 2',
      attributes: ['attribute 1', 'attribute 2'],
      methods: ['method 1', 'method 2'],
    },
  },
  {
    id: '4',
    position: { x: 260, y: 520 },
    type: 'uml-class',
    parentId: 'group3',
    data: {
      name: 'Class 4',
      attributes: ['attribute 1', 'attribute 2'],
      methods: ['method 1', 'method 2'],
    },
  },
];
