import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

import { AddingDraggingFunctionalityComponent } from '~examples/adding-dragging-functionality/adding-dragging-functionality.component';
import { BasicExampleComponent } from '~examples/basic-example/basic-example.component';
import { GettingStartedComponent } from '~examples/getting-started/getting-started.component';
import { NodeWithDragHandleComponent } from '~examples/node-with-drag-handle/node-with-drag-handle.component';
import { NodeWithPositionComponent } from '~examples/node-with-position/node-with-position.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'foblex-flow-test';
}
