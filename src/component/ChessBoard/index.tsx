import React, { useRef, useEffect, useState } from 'react';

import  { DEFAULT_CHESSBOARD_LINE_WIDTH, DEFAULT_CHESSBOARD_LINE_COLOR, DEFAULT_CHESSBOARD_BACKGROUND } from "../Const";

import  { VERTICAL, HORIZONTAL, PADDING, CHESS_MEN, COLOR_TYPE, RED, BLACK, CHESS_MEN_SHADOW_OFFSET_X,
  CHESS_MEN_SHADOW_OFFSET_Y, CHESS_MEN_SHADOW_BLUR, CHESS_MEN_SHADOW_COLOR, CHESS_MEN_OUTSIDE_COLOR,
  CHESS_MEN_INSIDE_COLOR, RED_COLOR, BLACK_COLOR } from "../Const";

import ComputeCellWidth from "../ComputeCellWidth";
import SetupCanvas from "../SetupCanvas";
import SetupContext from "../SetupContext";
import DrawHorizontalLine from "../DrawHorizontalLine";
import DrawVerticalLine from "../DrawVerticalLine";
import DrawDiagonalTop from "../DrawDiagonalTop";
import DrawDiagonalBottom from "../DrawDiagonalBottom";
import DrawPawnPosition from "../DrawPawnPosition";
import DrawCannonPosition from "../DrawCannonPosition";

/**
 * Reference: https://hashnode.blainegarrett.com/html-5-canvas-react-refs-and-typescript-ckf4jju8r00eypos1gyisenyf
 * 
 * @returns 
 */
const ChessBoard: React.FC<{}> = () => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [cellWidth, setCellWidth] = useState(0);

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current;
      console.log("ctx before width=" + ctx!.canvas.width + ", height=" + ctx!.canvas.height);

      setCellWidth(ComputeCellWidth(document.documentElement.clientWidth, document.documentElement.clientHeight));
      console.log("cellWidth=" + cellWidth);

      const drawCell = () => {
        console.log("drawCell() cellWidth=" + cellWidth);

        if (cellWidth > 0) {
          ctx!.font = '40px SIMLI-1';
          ctx!.beginPath();

          DrawVerticalLine(ctx!, cellWidth);
          DrawHorizontalLine(ctx!, cellWidth);
          DrawDiagonalTop(ctx!, cellWidth);
          DrawDiagonalBottom(ctx!, cellWidth);
          DrawPawnPosition(ctx!, cellWidth);
          DrawCannonPosition(ctx!, cellWidth);

          ctx!.stroke();

          ctx!.beginPath();
          for (let i = 0; i < VERTICAL; i++) {
            for (let j = 0; j < HORIZONTAL; j++) {
              const chessman = CHESS_MEN[i][j];

              if (chessman === 0) continue;
              drawChessman(i, j);
            }
          }
          ctx!.stroke();
        }
      }

      const drawChessman = (i: number, j: number) => {
        console.log("drawChessman() i=" + i + ", j=" + j);

        if (CHESS_MEN[i][j] === 0) return;

        const chessman = CHESS_MEN[i][j];
        const [colorType, chessType] = String(chessman).split('');
        const index = parseInt(chessType);
        const chessName = COLOR_TYPE.RED === Number(colorType) ? RED[index] : BLACK[index];

        const positionX = (PADDING / 2 + j) * cellWidth;
        const positionY = (PADDING / 2 + i) * cellWidth;
        const radius = cellWidth * 0.8 / 2;

        ctx!.beginPath();
        ctx!.shadowOffsetX = CHESS_MEN_SHADOW_OFFSET_X; // 设置水平位移
        ctx!.shadowOffsetY = CHESS_MEN_SHADOW_OFFSET_Y; // 设置垂直位移
        ctx!.shadowBlur = CHESS_MEN_SHADOW_BLUR; // 设置模糊度
        ctx!.shadowColor = CHESS_MEN_SHADOW_COLOR; // 设置阴影颜色
        ctx!.arc(positionX, positionY, radius, 0, Math.PI*2, true); 
        ctx!.lineWidth = cellWidth * 0.1 / 2;
        ctx!.strokeStyle = CHESS_MEN_OUTSIDE_COLOR;
        ctx!.fillStyle = CHESS_MEN_INSIDE_COLOR;
        ctx!.fill();
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.shadowBlur = 0; // 设置模糊度
        // ctx!.font = '40px SIMLI-1';
        ctx!.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx!.textAlign = 'center';
        ctx!.textBaseline = "middle";
        ctx!.fillStyle = COLOR_TYPE.RED === Number(colorType) ? RED_COLOR: BLACK_COLOR;
        ctx!.fillText(chessName, positionX, positionY);
        ctx!.stroke();
      }
      SetupCanvas(ctx!, cellWidth);
      SetupContext(ctx!, DEFAULT_CHESSBOARD_LINE_WIDTH, DEFAULT_CHESSBOARD_LINE_COLOR, DEFAULT_CHESSBOARD_BACKGROUND);
      drawCell();
    }
  }, [cellWidth]);

  return <canvas ref={canvasRef}></canvas>;
};

export default ChessBoard;