import { actionCreator } from 'utils/actions'

// Action Creater



export const addLayer = actionCreator<{}>('ADD_LAYER');
export const removeLayer = actionCreator<{}>('REMOVE_LAYER');

export const resizeCanvas = actionCreator<{ width: number, height: number, x: number, y: number }>('RESIZE_CANVAS');


export const editorScaleChange = actionCreator<{ scale: string }>('EDITOR_SCALE_CHANGE');


export const setTile = actionCreator<{ tileX: number, tileY: number, value: boolean }>('SET_TILE');

export const moveTile = actionCreator<{ x: number, y: number }>('MOVE_TILE');

export const setLayerColor = actionCreator<{ layerIndex: number, color: string }>('SET_LAYER_COLOR');
export const setLayerVisibility = actionCreator<{ layerIndex: number, visibility: boolean }>('SET_LAYER_VISIBILITY');


export const saveJSON = actionCreator<{ visibility: boolean }>('SAVE_JSON');


export const loadProject = actionCreator<{}>('LOAD_PROJECT');
export const loadProjectSuccess = actionCreator<{}>('LOAD_PROJECT_SUCCESS');


// 2D, 3D タブ切り替え
export const changeEditorTab = actionCreator<{ value: string }>('CHANGE_EDITOR_TAB');

// OBJ 出力
export const exportOBJ = actionCreator<{}>('EXPORT_OBJ');

