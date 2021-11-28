import  { HORIZONTAL, VERTICAL, cellCount } from "../Const";

const SetupCanvas = (context: CanvasRenderingContext2D, cellWidth: number) => {
    context.canvas.width = cellWidth * cellCount(HORIZONTAL);
    context.canvas.height = cellWidth * cellCount(VERTICAL);
};

export default SetupCanvas;