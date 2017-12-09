import { IAction } from 'types/actions'
import { IState, ILayer } from 'types/state'

import { saveJSON } from './json';

import Layer from 'modules/layer';

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
        scale: '100',
        tab: '2d'
    },

};


function getTile(layer: ILayer, x: number, y: number) {

    if (y < 0 || y >= layer.tiles.length || x < 0 || x >= layer.tiles[y].length) return false;

    return layer.tiles[y][x];

}

import { exportOBJ } from 'modules/3d';
import { ActionCreators } from 'redux-undo';


import { store } from 'index'

function reducer(state: IState = initialState, action: IAction<any>): IState {

    console.log(state);

    const $state = state;

    state = Object.assign({}, state);

    switch (action.type) {

        case 'ADD_LAYER':

            const newLayer = new Layer(state.layers.length + 1, state.grid.width, state.grid.height);

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


        case 'EDITOR_SCALE_CHANGE': {
            const editor = Object.assign({}, state.editor);
            editor.scale = (parseInt(action.payload.scale, 10) || 1).toString()
            return Object.assign(state, {
                editor: editor
            });
        }
        
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

            const { color, layerIndex } = action.payload;

            // 値に変更がないなら更新しない
            if (state.layers[layerIndex].color === color) break;

            const layer = Object.assign({}, state.layers[layerIndex]);

            layer.color = color;

            return Object.assign(state, {
                layers: [
                    ...state.layers.slice(0, layerIndex),
                    layer,
                    ...state.layers.slice(layerIndex + 1)
                ]
            });

        }
        case 'SET_LAYER_VISIBILITY': {

            const { visibility, layerIndex } = action.payload;

            // 値に変更がないなら更新しない
            if (state.layers[layerIndex].visibility === visibility) break;

            const layer = Object.assign({}, state.layers[layerIndex]);

            layer.visibility = visibility;

            return Object.assign(state, {
                layers: [
                    ...state.layers.slice(0, layerIndex),
                    layer,
                    ...state.layers.slice(layerIndex + 1)
                ]
            });
        }

        case 'RESIZE': {

            const { x, y } = action.payload;

            const $x = parseInt(x, 10) || 1;
            const $y = parseInt(y, 10) || 1;

            const layers = [... state.layers];

            const layers2 = [];

            for (const layer of layers) {

                //  const layer = Object.assign({}, layer);

                console.log(layer);

                Layer.prototype.resize.call(layer, $x, $y);

                layers2.push(layer);


                if (1 == 1) continue;

                

                // tiles をディープコピー
                const tiles = [...layer.tiles.map((row) => [...row])];

                const tiles2 = [];

                for (let _x = 0; _x < $x; ++_x) {

                    const row: boolean[] = [];

                    for (let _y = 0; _y < $y; ++_y) {


                        row.push(getTile(layer, _x, _y));

                    }

                    tiles2.push(row);

                }

               const layer2 = Object.assign({},layer);
               layer2.tiles = tiles2;

                layers2.push(layer2);

                layer.tiles = tiles2;

                

            }

            console.warn(layers2);

            return Object.assign(state, {
                grid:{
                    width: $x,
                    height: $y
                },
                layers: layers2
            });
        }


        case 'SAVE_JSON': {

            saveJSON(state);

            return state;
        }

        case 'LOAD_PROJECT': {
            console.warn('reducer: LOAD_PROJECT');
            return state;
        }
        case 'LOAD_PROJECT_SUCCESS': {

            console.warn(action.payload);
            console.warn('reducer: LOAD_PROJECT_SUCCESS');
            return JSON.parse(action.payload);
        }

        case 'EXPORT_OBJ': {

            console.warn('OBJ を出力します');
            exportOBJ(state);

            return state;
        }

        case 'CHANGE_EDITOR_TAB': {

            const editor = Object.assign({}, state.editor);
            editor.tab = action.payload.value;
            return Object.assign(state, {
                editor: editor
            });
        }

        case 'UNDO': {
            console.warn('UNDO');
            return $state;
        }

        case 'REDO': {
            console.warn('REDO');
            return $state;
        }

        case 'CHANGE_LAYER_NAME': {
            const { name, layerIndex } = action.payload;
            const layer = Object.assign({}, state.layers[layerIndex]);
            layer.name = name;
            return Object.assign(state, {
                layers: [
                    ...state.layers.slice(0, layerIndex),
                    layer,
                    ...state.layers.slice(layerIndex + 1)
                ]
            });
        }

        case 'REORDER_LAYER': {

            const { startIndex, endIndex } = action.payload;

            const layers = [...state.layers];

            const [removed] = layers.splice(startIndex, 1);
            layers.splice(endIndex, 0, removed);

            return Object.assign(state, {
                layers
            });
        }

    }

    console.warn('不明なアクションです');
    return state;
}

import { combineReducers } from 'redux';
console.log(combineReducers);

export default reducer;

/*
import { combineReducers } from 'redux';

// Reducer をまとめる
export default combineReducers({
    reducer,
});
*/