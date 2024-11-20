import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FCanvasComponent, FFlowModule, FSelectionChangeEvent } from '@foblex/flow';

@Component({
  selector: 'app-node-selection',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './node-selection.component.html',
  styleUrl: './node-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeSelectionComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public selection: string[][] = [];
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
  public onSelectionChange(event: FSelectionChangeEvent): void {
    this.selection.push(event.nodes);
    console.log('SELECTED', event);
    this.changeDetectorRef.detectChanges();
  }
}
