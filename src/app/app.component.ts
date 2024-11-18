import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

import { AddingDraggingFunctionalityComponent } from '~examples/adding-dragging-functionality/adding-dragging-functionality.component';
import { BasicExampleComponent } from '~examples/basic-example/basic-example.component';
import { CustomConnectionTypeComponent } from '~examples/custom-connection-type/custom-connection-type.component';
import { DifferentConnectableSideComponent } from '~examples/different-connectable-side/different-connectable-side.component';
import { DifferentConnectionBehavioursComponent } from '~examples/different-connection-behaviours/different-connection-behaviours.component';
import { DifferentConnectionTypesComponent } from '~examples/different-connection-types/different-connection-types.component';
import { GettingStartedComponent } from '~examples/getting-started/getting-started.component';
import { NodeWithConnectorsComponent } from '~examples/node-with-connectors/node-with-connectors.component';
import { NodeWithDragHandleComponent } from '~examples/node-with-drag-handle/node-with-drag-handle.component';
import { NodeWithPositionComponent } from '~examples/node-with-position/node-with-position.component';
import { ReassignConnectionComponent } from '~examples/reassign-connection/reassign-connection.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'foblex-flow-test';
}
