
import IGrid from './grid';



export interface ILayer {
    name: string;

    // 塗ってあるかフラグの 2 次元配列
    tiles: boolean[][];

    // 色
    color: string;

    // 階層
    floor: number;
    
    // 高さ
    height: number;

    visibility: boolean;
}

export interface ISize {
    width: number;
    height: number;
    x: number;
    y: number;
}


export interface IEditor {
    scale: string;

    tab: string;
}

export interface IState {
    canvas: ISize;

    layers: ILayer[];

    currentLayerIndex: number;

    editor: IEditor;

    grid: { width: number, height: number };



}