export const VERTICAL = 10;
export const HORIZONTAL = 9;
export const PADDING = 2;

export const cellCount = (n: number) => n - 1 + PADDING

export const DEFAULT_CHESSBOARD_LINE_WIDTH = 1;
export const DEFAULT_CHESSBOARD_LINE_COLOR = '#221c15';
export const DEFAULT_CHESSBOARD_BACKGROUND = '#ddba84';
export const DEFAULT_CHESSBOARD_BOARDER_WIDTH = 1.5;
export const DEFAULT_CHESSBOARD_BOARDER_COLOR = '#221c15';
export const DEFAULT_CHESSBOARD_BOARDER_DISTANCE = 4;
export const DEFAULT_CHESSBOARD_TEXT_COLOR = '#000';

export const DEFAULT_CHESSMAN_SHADOW_OFFSET_X = 2;
export const DEFAULT_CHESSMAN_SHADOW_OFFSET_Y = 2;
export const DEFAULT_CHESSMAN_SHADOW_BLUR = 3;
export const DEFAULT_CHESSMAN_SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)';
export const DEFAULT_CHESSMAN_OUTSIDE_COLOR = '#dca373';
export const DEFAULT_CHESSMAN_INSIDE_COLOR = '#e4d0a1';
export const DEFAULT_CHESSMAN_RED_COLOR = '#bc291d';
export const DEFAULT_CHESSMAN_BLACK_COLOR = '#100d0d';

export const DISTANCE_BETWEEN_L_AND_BORADER = 1 / 10;
export const L_LENGTH = 1 / 4;

export const CHESS_MEN = [
    [241, 251, 231, 221, 211, 222, 232, 252, 242],
    [0,   0,   0,   0,   0,   0,   0,   0,   0],
    [0,   261, 0,   0,   0,   0,   0,   262, 0],
    [201, 0,   202, 0,   203, 0,   204, 0,   205],
    [0,   0,   0,   0,   0,   0,   0,   0,   0],
    [0,   0,   0,   0,   0,   0,   0,   0,   0],
    [101, 0,   102, 0,   103, 0,   104, 0,   105],
    [0,   161, 0,   0,   0,   0,   0,   162, 0],
    [0,   0,   0,   0,   0,   0,   0,   0,   0],
    [141, 151, 131, 121, 111, 122, 132, 152, 142]
];

export const COLOR_TYPE = {
    RED: 1,
    BLACK: 2
};

/*
export const RED = {
    0: '兵',
    1: '帅',
    2: '仕',
    3: '相',
    4: '車',
    5: '馬',
    6: '炮'
};

export const BLACK = {
    0: '卒',
    1: '将',
    2: '士',
    3: '象',
    4: '車',
    5: '馬',
    6: '炮'
};

*/

export const RED: Array<string> = [
    '兵',
    '帅',
    '仕',
    '相',
    '俥',
    '傌',
    '炮'
];

export const BLACK: Array<string> = [
    '卒',
    '将',
    '士',
    '象',
    '車',
    '馬',
    '炮'
];

export const CHESS_MEN_SCALE = 0.5;

export const CHESS_MEN_SHADOW_OFFSET_X = 2;

export const CHESS_MEN_SHADOW_OFFSET_Y = 2;

export const CHESS_MEN_SHADOW_BLUR = 3;

export const CHESS_MEN_SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)';

export const CHESS_MEN_OUTSIDE_COLOR = '#dca373';

export const CHESS_MEN_INSIDE_COLOR = '#e4d0a1';

export const RED_COLOR = '#bc291d';

export const BLACK_COLOR = '#100d0d';
