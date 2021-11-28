
const DrawDiagnalBottom = (context: CanvasRenderingContext2D, cellWidth: number) => {
    context.moveTo(4 * cellWidth, 8 * cellWidth);
    context.lineTo(6 * cellWidth, 10 * cellWidth);

    context.moveTo(6 * cellWidth, 8 * cellWidth);
    context.lineTo(4 * cellWidth, 10 * cellWidth);
}

export default DrawDiagnalBottom;