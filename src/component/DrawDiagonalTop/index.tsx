
const DrawDiagnalTop = (context: CanvasRenderingContext2D, cellWidth: number) => {
    context.moveTo(4 * cellWidth, cellWidth);
    context.lineTo(6 * cellWidth, 3 * cellWidth);

    context.moveTo(6 * cellWidth, cellWidth);
    context.lineTo(4 * cellWidth, 3 * cellWidth);
}

export default DrawDiagnalTop;