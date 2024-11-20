import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FCanvasComponent, FFlowModule } from '@foblex/flow';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [FFlowModule, MatFormField, MatLabel, MatOption, MatSelectModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;
  public background = 'circle';
  public backgroundOptions = ['circle', 'rect', 'none'];
  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }
}
