import { PADDING, HORIZONTAL, VERTICAL } from "../Const";

const DrawHorizontalLine = (context: CanvasRenderingContext2D, cellWidth: number) => {
    const startX = (PADDING / 2) * cellWidth;
    const endX = HORIZONTAL * cellWidth;

    for (let i = PADDING / 2; i < PADDING / 2 + VERTICAL; i++ ) {
        const positionY = i * cellWidth;
        context.moveTo(startX, positionY);
        context.lineTo(endX, positionY);
    }
}

export default DrawHorizontalLine;