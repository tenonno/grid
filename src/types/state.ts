
export interface ILayer {
    name: string;
    visibility: boolean;
}

export interface ISize {
    width: number;
    height: number;
    x:number;
    y:number;
}

export interface IState {
    canvas: ISize;
    layers: ILayer[];
}