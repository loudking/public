import { DISTANCE_BETWEEN_L_AND_BORADER, L_LENGTH } from "../Const";
import DrawLAtAngle0 from "../Common/DrawLAtAngle0";
import DrawLAtAngle90 from "../Common/DrawLAtAngle90";
import DrawLAtAngle180 from "../Common/DrawLAtAngle180";
import DrawLAtAngle270 from "../Common/DrawLAtAngle270";

const DrawCannonPoistion = (context: CanvasRenderingContext2D, cellWidth: number) => {
    const distance = DISTANCE_BETWEEN_L_AND_BORADER  * cellWidth;
    const length = L_LENGTH * cellWidth;

    DrawCannonPoistion1(context, cellWidth, distance, length);
    DrawCannonPoistion2(context, cellWidth, distance, length);
    DrawCannonPoistion3(context, cellWidth, distance, length);
    DrawCannonPoistion4(context, cellWidth, distance, length);
};

const DrawCannonPoistion1 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 2;
    const y = 3;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}

const DrawCannonPoistion2 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 8;
    const y = 3;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}
const DrawCannonPoistion3 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 2;
    const y = 8;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}
const DrawCannonPoistion4 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 8;
    const y = 8;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}

export default DrawCannonPoistion;