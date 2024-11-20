import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

import { PointExtensions } from '@foblex/2d';
import { FCanvasChangeEvent, FCanvasComponent, FFlowModule } from '@foblex/flow';
import { BrowserService } from '@foblex/platform';

@Component({
  selector: 'app-custom-nodes',
  standalone: true,
  imports: [FFlowModule, MatCardModule, MatButton, MatFormFieldModule, MatSelect, MatOption],
  templateUrl: './custom-nodes.component.html',
  styleUrl: './custom-nodes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomNodesComponent implements OnDestroy {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  constructor(private fBrowser: BrowserService) {}
  public onLoaded(): void {
    this.fCanvas.fitToScreen(PointExtensions.initialize(100, 100), false);
  }
  public onCanvasChanged(event: FCanvasChangeEvent): void {
    this.fBrowser.document.documentElement.style.setProperty('--flow-scale', `${event.scale}`);
  }
  public ngOnDestroy(): void {
    this.fBrowser.document.documentElement.style.removeProperty('--flow-scale');
  }
}
