import  { HORIZONTAL, VERTICAL, cellCount, CHESS_MEN_SCALE } from "../Const";

const ComputeCellWidth2 = (width: number, height: number) => {
    console.log("ComputeCellWidth2() width=" + width + ", height=" + height);

    /* TODO: remove navbar height */
    const height2 = height - 100;

    return Math.min(width / cellCount(HORIZONTAL), height2 / cellCount(VERTICAL)) * (1 / CHESS_MEN_SCALE);;
}

export default ComputeCellWidth2;