
import * as React from 'react';

import { IState } from 'types/state';



interface View2DProps {

}

import * as $actions from 'actions/actionCreators';
type Actions = typeof $actions;


class View2D extends React.Component<View2DProps> {

    state: {
        el?: Element
    }

    constructor(props: View2DProps, context: any) {
        super(props, context)

        this.state = {
            el: null
        };

    }

    ww = (el: Element) => {

        if (1 == 1) return;

        console.log('ww', el);

        if (!el) return;


        el.addEventListener('mousewheel', (e: WheelEvent) => {

            const actions = (this.props as any).actions as Actions;

            const scale = (this.props as any).editor.scale;

            actions.editorScaleChange({scale: (scale + 12).toString()});

            console.log(e.wheelDeltaY);

        });

    }

    componentWillMount() {

        console.warn(this.state);

    }

    render() {
        return (

            <div style={{ display: 'table', width: '100%', height: '100%'  }}>
                <div ref={(el) => this.ww(el)} style={{ overflow: 'scroll', width: '100%', height: '100%' }}>

                    {Array.from({ length: 10 }).map(() => (<div>a</div>))}

                </div>
            </div>

        );
    }
}


import connect from 'utils/connect';

export default connect(View2D, (state: IState) => ({
    layers: state.layers,
    grid: state.grid,
    editor: state.editor
}), {});
