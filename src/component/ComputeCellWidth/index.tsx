import  { HORIZONTAL, VERTICAL, cellCount } from "../Const";

const ComputeCellWidth = (width: number, height: number) => {
    console.log("ComputeCellWidth() width=" + width + ", height=" + height);

    /* TODO: remove navbar height */
    const height2 = height - 100;

    return Math.min(width / cellCount(HORIZONTAL), height2 / cellCount(VERTICAL));;
}

export default ComputeCellWidth;