import { actionCreator } from 'utils/actions'

// Action Creater

export const addTodo = actionCreator<{ id: number, text: string }>('ADD_TODO')
export const toggleTodo = actionCreator<{ index: number }>('TOGGLE_TODO')


export const addLayer = actionCreator<{}>('ADD_LAYER');
export const removeLayer = actionCreator<{}>('REMOVE_LAYER');

export const resizeCanvas = actionCreator<{ width: number, height: number, x: number, y: number }>('RESIZE_CANVAS');


export const editorScaleChange = actionCreator<{ scale: string }>('EDITOR_SCALE_CHANGE');
