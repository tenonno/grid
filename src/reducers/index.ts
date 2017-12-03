import { IAction } from 'types/actions'
import { IState, ILayer } from 'types/state'

import { saveJSON } from './json';

class Layer implements ILayer {

    name: string;

    // 塗ってあるかフラグの 2 次元配列
    tiles: boolean[][] = [];

    // 色
    color: string;

    // 階層
    floor: number;

    visibility: boolean = true;

    /**
     * コンストラクタ
     * @param index レイヤーのインデックス
     * @param gridWidth グリッドの横幅
     * @param gridHeight グリッドの縦幅
     */
    constructor(index: number, gridWidth: number, gridHeight: number) {
        this.name = 'Layer ' + index;

        this.color = '#' + (Math.random() * 3000000).toString(16);

        var rangeRndm = function (min: number, max: number) {
            if (max) {
                return Math.random() * (max - min + 1) + min | 0;
            } else {
                return Math.random() * min | 0;
            }
        };

        this.color = 'hsl(' + rangeRndm(0, 360) + ', 100%, ' + rangeRndm(25, 75) + '%)';

        this.resize(gridWidth, gridHeight);
    }

    /**
     * グリッドをリサイズする
     * @param w 横幅
     * @param h 縦幅
     */
    resize(w: number, h: number) {

        // bool の 2 次元配列
        const tiles: boolean[][] = [];


        for (let y = 0; y < h; ++y) {

            const row: boolean[] = [];

            for (let x = 0; x < w; ++x) {

                // 
                const value = (this.tiles.length > y && this.tiles[y].length > x) ? this.tiles[y][x] : false;



                // デバッグ
                row.push(Math.random() > 0.5);
                // row.push(value);

            }

            tiles.push(row);

        }

        this.tiles = tiles;

    }

}




const initialLayers = Array.from({ length: 1 }).fill(0).map((_, index) => {
    return new Layer(index, 10, 10);
}).reverse();

const initialState: IState = {

    layers: initialLayers,

    canvas: {
        width: 100,
        height: 100,
        x: 0,
        y: 0,
    },

    grid: {
        width: 10,
        height: 10,
    },

    currentLayerIndex: 0,

    editor: {
        scale: '100'
    },

};


function getTile(layer: ILayer, x: number, y: number) {

    if (y < 0 || y >= layer.tiles.length || x < 0 || x >= layer.tiles[y].length) return false;

    return layer.tiles[y][x];

}


function reducer(state: IState = initialState, action: IAction<any>): IState {

    state = Object.assign({}, state);

    switch (action.type) {

        case 'ADD_LAYER':

            const newLayer = new Layer(state.layers.length + 1, 10, 10);

            return Object.assign(state, {
                layers: [newLayer, ...state.layers]
            });

        case 'REMOVE_LAYER': {

            if (state.layers.length === 1) return;

            return Object.assign(state, {
                layers: state.layers.slice(1)
            });
        }

        case 'RESIZE_CANVAS':

            return Object.assign(state, {
                canvas: action.payload
            });


        case 'EDITOR_SCALE_CHANGE':

            console.log(action.payload)

            return Object.assign(state, {
                editor: {
                    scale: action.payload
                }
            });


        case 'SET_TILE': {

            const { x, y, value } = action.payload;

            // 値に変更がないなら更新しない
            if (state.layers[state.currentLayerIndex].tiles[y][x] === value) break;

            const layer = Object.assign({}, state.layers[state.currentLayerIndex]);

            layer.tiles[y][x] = value;

            return Object.assign(state, {
                layers: [
                    ...state.layers.slice(0, state.currentLayerIndex),
                    layer,
                    ...state.layers.slice(state.currentLayerIndex + 1)
                ]
            });
        }

        case 'MOVE_TILE': {

            const $x = action.payload.x;
            const $y = action.payload.y;

            const layer = Object.assign({}, state.layers[state.currentLayerIndex]);

            // tiles をディープコピー
            const tiles = [...layer.tiles.map((row) => [...row])];

            console.warn('タイルを移動します: ', $x, $y);

            for (let y = 0; y < tiles.length; ++y) {
                for (let x = 0; x < tiles[y].length; ++x) {

                    tiles[y][x] = getTile(layer, x - $x, y - $y);

                }
            }

            layer.tiles = tiles;

            return Object.assign(state, {
                layers: [
                    ...state.layers.slice(0, state.currentLayerIndex),
                    layer,
                    ...state.layers.slice(state.currentLayerIndex + 1)
                ]
            });

        }


        case 'SET_LAYER_COLOR': {

            const { color } = action.payload;

            // 値に変更がないなら更新しない
            if (state.layers[state.currentLayerIndex].color === color) break;

            const layer = Object.assign({}, state.layers[state.currentLayerIndex]);

            layer.color = color;

            return Object.assign(state, {
                layers: [
                    ...state.layers.slice(0, state.currentLayerIndex),
                    layer,
                    ...state.layers.slice(state.currentLayerIndex + 1)
                ]
            });

        }
        case 'SET_LAYER_VISIBILITY': {

            const { visibility } = action.payload;

            // 値に変更がないなら更新しない
            if (state.layers[state.currentLayerIndex].visibility === visibility) break;

            const layer = Object.assign({}, state.layers[state.currentLayerIndex]);

            layer.visibility = visibility;

            return Object.assign(state, {
                layers: [
                    ...state.layers.slice(0, state.currentLayerIndex),
                    layer,
                    ...state.layers.slice(state.currentLayerIndex + 1)
                ]
            });
        }


        case 'SAVE_JSON': {

            saveJSON(state);

            return state;
        }

        case 'LOAD_PROJECT': {
            console.warn('reducer: LOAD_PROJECT');
            return;
        }
        case 'LOAD_PROJECT_SUCCESS': {


           ;

            console.warn( action.payload);
            console.warn('reducer: LOAD_PROJECT_SUCCESS');
            return JSON.parse(action.payload);
        }

    }

    console.warn('不明なアクションです');
    return state;
}


export default reducer;

/*
import { combineReducers } from 'redux';

// Reducer をまとめる
export default combineReducers({
    reducer,
});
*/