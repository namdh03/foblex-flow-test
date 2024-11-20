import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IPoint, PointExtensions } from '@foblex/2d';
import {
  EFConnectionBehavior,
  F_CONNECTION_BUILDERS,
  FFlowModule,
  IFConnectionBuilder,
  IFConnectionBuilderRequest,
  IFConnectionBuilderResponse,
} from '@foblex/flow';

class OffsetStraightBuilder implements IFConnectionBuilder {
  public handle(request: IFConnectionBuilderRequest): IFConnectionBuilderResponse {
    const { source, target } = request;
    const path = `M ${source.x} ${source.y} L ${source.x + 20} ${source.y} L ${target.x - 20} ${target.y} L ${target.x} ${target.y}`;
    return {
      path,
      connectionCenter: { x: 0, y: 0 },
      penultimatePoint: PointExtensions.initialize(target.x - 20, target.y),
    };
  }
}

class CircleConnectionBuilder implements IFConnectionBuilder {
  public handle(request: IFConnectionBuilderRequest): IFConnectionBuilderResponse {
    const { source, target } = request;
    const d = this.getD(request);
    const path = `M ${source.x} ${source.y} S${d.x} ${d.y} ${target.x} ${target.y}`;
    return { path, connectionCenter: { x: 0, y: 0 }, penultimatePoint: d };
  }
  private getD(request: IFConnectionBuilderRequest): IPoint {
    const offset: number = request.offset;
    const cx: number = (request.source.x + request.radius + request.target.x) / 2;
    const cy: number = (request.source.y + request.radius + request.target.y) / 2;
    const dx: number =
      cx +
        (offset * (request.source.y - request.target.y)) /
          Math.sqrt(
            Math.pow(request.source.x - request.target.x, 2) + Math.pow(request.source.y - request.target.y, 2),
          ) || cx;
    const dy: number =
      cy -
        (offset * (request.source.x - request.target.x)) /
          Math.sqrt(
            Math.pow(request.source.x - request.target.x, 2) + Math.pow(request.source.y - request.target.y, 2),
          ) || cy;
    return { x: dx, y: dy };
  }
}

class CurvedLineBuilder implements IFConnectionBuilder {
  public handle(request: IFConnectionBuilderRequest): IFConnectionBuilderResponse {
    const { source, target } = request;

    // Tính điểm điều khiển ở giữa source và target, dịch theo chiều dọc
    const controlX = (source.x + target.x) / 2;
    const controlY = Math.min(source.y, target.y) - 50; // Đặt bán kính cố định

    const path = `
      M ${source.x} ${source.y}
      Q ${controlX} ${controlY} ${target.x} ${target.y}
    `;

    return {
      path,
      connectionCenter: { x: controlX, y: controlY },
      penultimatePoint: { x: controlX, y: controlY },
    };
  }
}

class ZigzagLineBuilder implements IFConnectionBuilder {
  public handle(request: IFConnectionBuilderRequest): IFConnectionBuilderResponse {
    const { source, target } = request;

    const midX1 = (2 * source.x + target.x) / 3;
    const midX2 = (source.x + 2 * target.x) / 3;
    const midY = (source.y + target.y) / 2;

    const zigzagHeight = 20; // Độ cao zigzag
    const path = `
      M ${source.x} ${source.y}
      L ${midX1} ${midY - zigzagHeight}
      L ${midX2} ${midY + zigzagHeight}
      L ${target.x} ${target.y}
    `;

    return {
      path,
      connectionCenter: { x: (source.x + target.x) / 2, y: midY },
      penultimatePoint: { x: midX2, y: midY + zigzagHeight },
    };
  }
}

class ArrowLineBuilder implements IFConnectionBuilder {
  public handle(request: IFConnectionBuilderRequest): IFConnectionBuilderResponse {
    const { source, target } = request;

    // Tính toán vector hướng từ source đến target
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    // Định nghĩa kích thước mũi tên
    const arrowSize = 10; // Chiều dài mũi tên
    const arrowWidth = 5; // Độ rộng mũi tên

    // Tính toán vị trí điểm gốc của mũi tên
    const unitDx = dx / length;
    const unitDy = dy / length;
    const arrowBaseX = target.x - arrowSize * unitDx;
    const arrowBaseY = target.y - arrowSize * unitDy;

    // Tính toán các điểm góc của mũi tên
    const arrowLeftX = arrowBaseX - arrowWidth * unitDy;
    const arrowLeftY = arrowBaseY + arrowWidth * unitDx;
    const arrowRightX = arrowBaseX + arrowWidth * unitDy;
    const arrowRightY = arrowBaseY - arrowWidth * unitDx;

    // Đường dẫn SVG
    const path = `
      M ${source.x} ${source.y} L ${target.x} ${target.y}
      M ${arrowLeftX} ${arrowLeftY} L ${target.x} ${target.y} L ${arrowRightX} ${arrowRightY}
    `;

    return {
      path,
      connectionCenter: { x: (source.x + target.x) / 2, y: (source.y + target.y) / 2 },
      penultimatePoint: { x: arrowBaseX, y: arrowBaseY },
    };
  }
}

const connectionBuilders = {
  ['offset_straight']: new OffsetStraightBuilder(),
  ['circle']: new CircleConnectionBuilder(),
  ['curved_line']: new CurvedLineBuilder(),
  ['zigzag']: new ZigzagLineBuilder(),
  ['arrow']: new ArrowLineBuilder(),
};

@Component({
  selector: 'app-custom-connection-type',
  standalone: true,
  imports: [FFlowModule],
  templateUrl: './custom-connection-type.component.html',
  styleUrl: './custom-connection-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: F_CONNECTION_BUILDERS,
      useValue: connectionBuilders,
    },
  ],
})
export class CustomConnectionTypeComponent {
  public eConnectionBehaviour = EFConnectionBehavior;
}
