import { PADDING, HORIZONTAL, VERTICAL } from "../Const";

const DrawVerticalLine = (context: CanvasRenderingContext2D, cellWidth: number) => {
    const startY1 = (PADDING / 2) * cellWidth;
    const endY1 = (VERTICAL / 2) * cellWidth;
    const startY2 = ((PADDING / 2) + (VERTICAL / 2)) * cellWidth;
    const endY2 = VERTICAL * cellWidth;

    for (let i = PADDING / 2; i < PADDING / 2 + HORIZONTAL; i++ ) {
        const positionX = i * cellWidth;

        if (i !== PADDING / 2 && i !== PADDING / 2 + HORIZONTAL - 1) {
            context.moveTo(positionX, startY1);
            context.lineTo(positionX, endY1);
            context.moveTo(positionX, startY2);
            context.lineTo(positionX, endY2);
            continue;
        }

        context.moveTo(positionX, startY1);
        context.lineTo(positionX, endY2);
    }
}

export default DrawVerticalLine;