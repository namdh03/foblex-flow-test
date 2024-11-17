import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FFlowModule, FSelectionChangeEvent } from '@foblex/flow';

@Component({
  selector: 'app-adding-dragging-functionality',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './adding-dragging-functionality.component.html',
  styleUrl: './adding-dragging-functionality.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddingDraggingFunctionalityComponent {
  onSelectionChange(event: FSelectionChangeEvent): void {
    console.log('Selection changed:', event);
  }
}
