import { DISTANCE_BETWEEN_L_AND_BORADER, L_LENGTH } from "../Const";
import DrawLAtAngle0 from "../Common/DrawLAtAngle0";
import DrawLAtAngle90 from "../Common/DrawLAtAngle90";
import DrawLAtAngle180 from "../Common/DrawLAtAngle180";
import DrawLAtAngle270 from "../Common/DrawLAtAngle270";

const DrawPawnPoistion = (context: CanvasRenderingContext2D, cellWidth: number) => {
    const distance = DISTANCE_BETWEEN_L_AND_BORADER  * cellWidth;
    const length = L_LENGTH * cellWidth;

    DrawPawnPoistion1(context, cellWidth, distance, length);
    DrawPawnPoistion2(context, cellWidth, distance, length);
    DrawPawnPoistion3(context, cellWidth, distance, length);
    DrawPawnPoistion4(context, cellWidth, distance, length);
    DrawPawnPoistion5(context, cellWidth, distance, length);
    DrawPawnPoistion6(context, cellWidth, distance, length);
    DrawPawnPoistion7(context, cellWidth, distance, length);
    DrawPawnPoistion8(context, cellWidth, distance, length);
    DrawPawnPoistion9(context, cellWidth, distance, length);
    DrawPawnPoistion10(context, cellWidth, distance, length);
};

const DrawPawnPoistion1 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 1;
    const y = 4;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
}

const DrawPawnPoistion2 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 3;
    const y = 4;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}

const DrawPawnPoistion3 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 5;
    const y = 4;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}

const DrawPawnPoistion4 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 7;
    const y = 4;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}
const DrawPawnPoistion5 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 9;
    const y = 4;
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}
const DrawPawnPoistion6 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 1;
    const y = 7;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
}
const DrawPawnPoistion7 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 3;
    const y = 7;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}
const DrawPawnPoistion8 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 5;
    const y = 7;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}
const DrawPawnPoistion9 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 7;
    const y = 7;
    DrawLAtAngle0(context, cellWidth, distance, length, x, y);
    DrawLAtAngle90(context, cellWidth, distance, length, x, y);
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}
const DrawPawnPoistion10 = (context: CanvasRenderingContext2D, cellWidth: number, distance: number, length: number) => {
    const x = 9;
    const y = 7;
    DrawLAtAngle180(context, cellWidth, distance, length, x, y);
    DrawLAtAngle270(context, cellWidth, distance, length, x, y);
}

export default DrawPawnPoistion;