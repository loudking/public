import React, { useRef, useEffect, useState } from 'react';

import  { VERTICAL, HORIZONTAL, PADDING, CHESS_MEN, COLOR_TYPE, RED, BLACK, CHESS_MEN_SHADOW_OFFSET_X,
  CHESS_MEN_SHADOW_OFFSET_Y, CHESS_MEN_SHADOW_BLUR, CHESS_MEN_SHADOW_COLOR, CHESS_MEN_OUTSIDE_COLOR,
  CHESS_MEN_INSIDE_COLOR, RED_COLOR, BLACK_COLOR } from "../Const";

import ComputeCellWidth2 from "../ComputeCellWidth2";
import SetupCanvas2 from "../SetupCanvas2";

/**
 * Reference: https://hashnode.blainegarrett.com/html-5-canvas-react-refs-and-typescript-ckf4jju8r00eypos1gyisenyf
 * 
 * @returns 
 */
const ChessMen: React.FC<{}> = () => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [cellWidth, setCellWidth] = useState(0);

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current;
      console.log("ChessMen() ctx before width=" + ctx!.canvas.width + ", height=" + ctx!.canvas.height);

      setCellWidth(ComputeCellWidth2(document.documentElement.clientWidth, document.documentElement.clientHeight));
      console.log("ChessMen() cellWidth=" + cellWidth);

      const drawCell = () => {
        console.log("drawCell()");
        for (let i = 0; i < VERTICAL; i++) {
            for (let j = 0; j < HORIZONTAL; j++) {
                const chessman = CHESS_MEN[i][j];

                if (chessman === 0) continue;
                drawChessman(i, j);
            }
        }
      }

      const drawChessman = (i: number, j: number) => {
        console.log("drawChessman() i=" + i + ", j=" + j);

        if (CHESS_MEN[i][j] === 0) return;

        const chessman = CHESS_MEN[i][j];
        const [colorType, chessType] = String(chessman).split('');
        //const xx = parseInt(colorType);
        /* TODO: how to convert string to int */
        //const chessName = COLOR_TYPE.RED === Number(colorType) ? RED[0] : BLACK[0];
        const chessName = 'XXX';

        const positionX = (PADDING / 2 + j) * cellWidth;
        const positionY = (PADDING / 2 + i) * cellWidth;
        const radius = cellWidth * 0.8 / 2;
        console.log("positionX=" + positionX + ", positionY=" + positionY + ", radius=" + radius);

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
        //ctx!.font = `${cellWidth * (Number(chessType) === 6 ? 0.65 : 0.68)}px STKaiti`;
        ctx!.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx!.textAlign = 'center';
        ctx!.fillStyle = COLOR_TYPE.RED === Number(colorType) ? RED_COLOR: BLACK_COLOR;
        ctx!.fillText(chessName, positionX, positionY + cellWidth * (Number(chessType) === 6 ? 0.21 : 0.25));
        ctx!.stroke();
      }

      SetupCanvas2(ctx!, cellWidth);
      drawCell();
    }
  }, [cellWidth]);

  return <canvas ref={canvasRef}></canvas>;
};

export default ChessMen;