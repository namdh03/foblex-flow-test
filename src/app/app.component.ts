import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

import { AddingDraggingFunctionalityComponent } from '~examples/adding-dragging-functionality/adding-dragging-functionality.component';
import { AutoSnapComponent } from '~examples/auto-snap/auto-snap.component';
import { BackgroundComponent } from '~examples/background/background.component';
import { BasicExampleComponent } from '~examples/basic-example/basic-example.component';
import { ConnectableSideComponent } from '~examples/connectable-side/connectable-side.component';
import { ConnectionBehavioursComponent } from '~examples/connection-behaviours/connection-behaviours.component';
import { ConnectionMarkersComponent } from '~examples/connection-markers/connection-markers.component';
import { ConnectionTypesComponent } from '~examples/connection-types/connection-types.component';
import { ConnectorInsideNodeComponent } from '~examples/connector-inside-node/connector-inside-node.component';
import { ConnectorOutletComponent } from '~examples/connector-outlet/connector-outlet.component';
import { CreateNodeOnConnectionDropComponent } from '~examples/create-node-on-connection-drop/create-node-on-connection-drop.component';
import { CustomConnectionTypeComponent } from '~examples/custom-connection-type/custom-connection-type.component';
import { CustomConnectionsComponent } from '~examples/custom-connections/custom-connections.component';
import { CustomNodesComponent } from '~examples/custom-nodes/custom-nodes.component';
import { DagreTreeComponent } from '~examples/dagre-tree/dagre-tree.component';
import { DifferentConnectableSideComponent } from '~examples/different-connectable-side/different-connectable-side.component';
import { DifferentConnectionBehavioursComponent } from '~examples/different-connection-behaviours/different-connection-behaviours.component';
import { DifferentConnectionTypesComponent } from '~examples/different-connection-types/different-connection-types.component';
import { DragHandleComponent } from '~examples/drag-handle/drag-handle.component';
import { DragToConnectComponent } from '~examples/drag-to-connect/drag-to-connect.component';
import { DragToReassignComponent } from '~examples/drag-to-reassign/drag-to-reassign.component';
import { ELKJSTreeComponent } from '~examples/elkjs-tree/elkjs-tree.component';
import { FFlowExamplesComponent } from '~examples/f-flow-examples/f-flow-examples.component';
import { GettingStartedComponent } from '~examples/getting-started/getting-started.component';
import { GroupingComponent } from '~examples/grouping/grouping.component';
import { HelpInPositioningComponent } from '~examples/help-in-positioning/help-in-positioning.component';
import { LimitingConnectionsComponent } from '~examples/limiting-connections/limiting-connections.component';
import { MinimapComponent } from '~examples/minimap/minimap.component';
import { NodeAsConnectorComponent } from '~examples/node-as-connector/node-as-connector.component';
import { NodeSelectionComponent } from '~examples/node-selection/node-selection.component';
import { NodeWithConnectorsComponent } from '~examples/node-with-connectors/node-with-connectors.component';
import { NodeWithDragHandleComponent } from '~examples/node-with-drag-handle/node-with-drag-handle.component';
import { NodeWithPositionComponent } from '~examples/node-with-position/node-with-position.component';
import { ReassignConnectionComponent } from '~examples/reassign-connection/reassign-connection.component';
import { RemoveConnectionOnConnectionDropComponent } from '~examples/remove-connection-on-connection-drop/remove-connection-on-connection-drop.component';
import { ResizeHandleComponent } from '~examples/resize-handle/resize-handle.component';
import { SelectionAreaComponent } from '~examples/selection-area/selection-area.component';
import { ZoomComponent } from '~examples/zoom/zoom.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    GettingStartedComponent,
    BasicExampleComponent,
    AddingDraggingFunctionalityComponent,
    NodeWithDragHandleComponent,
    NodeWithPositionComponent,
    NodeWithConnectorsComponent,
    DifferentConnectableSideComponent,
    DifferentConnectionTypesComponent,
    DifferentConnectionBehavioursComponent,
    CustomConnectionTypeComponent,
    ReassignConnectionComponent,
    FFlowExamplesComponent,
    CustomNodesComponent,
    DragHandleComponent,
    NodeSelectionComponent,
    ResizeHandleComponent,
    GroupingComponent,
    NodeAsConnectorComponent,
    ConnectorInsideNodeComponent,
    ConnectorOutletComponent,
    LimitingConnectionsComponent,
    ConnectableSideComponent,
    DragToConnectComponent,
    DragToReassignComponent,
    CreateNodeOnConnectionDropComponent,
    RemoveConnectionOnConnectionDropComponent,
    AutoSnapComponent,
    ConnectionTypesComponent,
    ConnectionBehavioursComponent,
    ConnectionMarkersComponent,
    CustomConnectionsComponent,
    DagreTreeComponent,
    ELKJSTreeComponent,
    SelectionAreaComponent,
    HelpInPositioningComponent,
    MinimapComponent,
    ZoomComponent,
    BackgroundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'foblex-flow-test';
}
