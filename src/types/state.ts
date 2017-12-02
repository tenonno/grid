
export interface ILayer {
    name: string;
    visibility: boolean;
}

export interface ISize {
    width: number;
    height: number;
    x: number;
    y: number;
}

export interface IGridProperty {
    // 色
    color: number;

    // 階層
    floor: number;
}

/**
 * グリッドのインターフェイス
 */
export interface IGrid {

    // 塗ってあるかフラグの 2 次元配列
    grids: boolean[][];


}


export interface IEditor {
    scale: string;
}

export interface IState {
    canvas: ISize;
    layers: ILayer[];


    editor: IEditor;

}