/**
 *      |
 *     ||
 *     ||
 *     ||
 * -----|
 *      -----------
 * @param context Canvas context
 * @param cellWidth Cell width
 * @param distance Distance bewteen L and cell boarder
 * @param length Length of L
 * @param x X
 * @param y Y
 */
const DrawLAtAngle270 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number, x: number, y: number) => {
    context.moveTo(x * cellWidth - distance, y * cellWidth + distance);
    context.lineTo(x * cellWidth - distance, y * cellWidth + distance + length);

    context.moveTo(x * cellWidth - distance, y * cellWidth + distance);
    context.lineTo(x * cellWidth - distance - length, y * cellWidth + distance);
}

export default DrawLAtAngle270;