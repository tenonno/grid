import { IAction } from 'types/actions'
import { IState } from 'types/state'

//import todos from 'reducers/todos'
//import visibilityFilter from 'reducers/visibilityFilter'
//import nextTodoId from 'reducers/nextTodoId'





const initialState: IState = {
    layers: Array.from({ length: 10 }).fill(0).map((_, index) => {
        return {
            name: `Layer ${index + 1}`,
            visibility: true
        };
    }).reverse(),

    canvas: {
        width: 100,
        height: 100,
        x: 0,
        y: 0,
    },

    editor: {
        scale: '100'
    }


};

import { ILayer } from 'types/state'

// Do not use combineReducers in order to enforce type correctness (combineReducers can return {})


function reducer(state: IState = initialState, action: IAction<any>): IState {

    state = Object.assign({}, state);

    switch (action.type) {

        case 'ADD_LAYER':

            const newLayer: ILayer = {
                name: `Layer ${state.layers.length + 1}`,
                visibility: true
            };

            return Object.assign(state, {
                layers: [newLayer, ...state.layers]
            });

        case 'REMOVE_LAYER':

            return Object.assign(state, {
                layers: state.layers.slice(1)
            });


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