import { actionCreator } from 'utils/actions'

// Action Creater



export const addLayer = actionCreator<{}>('ADD_LAYER');
export const removeLayer = actionCreator<{}>('REMOVE_LAYER');

export const resizeCanvas = actionCreator<{ width: number, height: number, x: number, y: number }>('RESIZE_CANVAS');


export const editorScaleChange = actionCreator<{ scale: string }>('EDITOR_SCALE_CHANGE');


export const setTile = actionCreator<{ tileX: number, tileY: number, value: boolean }>('SET_TILE');

export const moveTile = actionCreator<{ x: number, y: number }>('MOVE_TILE');
