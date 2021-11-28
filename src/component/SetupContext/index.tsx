const SetupContext = (context: CanvasRenderingContext2D, lineWidth: number, stokeStyle: string, fillStyle: string) => {
    context.lineWidth = lineWidth;
    context.strokeStyle = stokeStyle;
    context.fillStyle = fillStyle;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

export default SetupContext;