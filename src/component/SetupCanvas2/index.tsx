import { HORIZONTAL, VERTICAL, cellCount, CHESS_MEN_SCALE } from "../Const";

const SetupCanvas2 = (context: CanvasRenderingContext2D, cellWidth: number) => {
    context.canvas.width = cellWidth * cellCount(HORIZONTAL);
    context.canvas.height = cellWidth * cellCount(VERTICAL);
    context.canvas.style.transform = `scale(${CHESS_MEN_SCALE})`;
};

export default SetupCanvas2;