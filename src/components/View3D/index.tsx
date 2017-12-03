import * as React from 'react';
import * as ReactDOM from 'react-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Grid from 'material-ui/Grid';

import IconButton from 'material-ui/Button';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';

import LensIcon from 'material-ui-icons/Lens';


import { SketchPicker, RGBColor } from 'react-color';

const ToggleIcon: any = require('material-ui-toggle-icon').default;

import Popover from 'material-ui/Popover';
import { findDOMNode } from 'react-dom';
import { Button, FormControl, Input, FormHelperText, ListItemSecondaryAction } from 'material-ui';
import { ILayer, IState } from 'types/state';


import * as actions from 'actions/actionCreators';

export interface LayerProps {

    layers: ILayer[];

    actions?: any;
}

interface State {
    openColor: boolean;
    anchorEl?: Element;
}


import NS_THREE from 'three';

const THREE = require('three');

var renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500);

let scene: NS_THREE.Scene = null;

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 10);

camera.position.y = 1.5;
camera.position.z = 3;

var OrbitControls = require('three-orbit-controls')(THREE)


var controls = new OrbitControls(camera, renderer.domElement);
controls.userPan = false;
controls.userPanSpeed = 0.0;
controls.maxDistance = 10.0;
controls.maxPolarAngle = Math.PI * 0.495;
controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
controls.autoRotateSpeed = -2.0;    //自動回転する時の速度



function animate() {
    
    if (scene) {



    renderer.render(scene, camera);

    controls.update();
}

    requestAnimationFrame(animate);
};
animate();
/*


var OBJExporter = require('three-obj-exporter');
var exporter = new OBJExporter();
var result = exporter.parse(scene);
console.log(result);

const fs = require('fs');

fs.writeFile('C:/Users/tis-teno/Documents/GitHub/grid/ww.obj', result, (err: any) => {
    // 書き出しに失敗した場合
    if (err) {
        console.log("エラーが発生しました。" + err)
        throw err
    }
    // 書き出しに成功した場合
    else {
        console.log("ファイルが正常に書き出しされました")
    }
});
*/


class View3D extends React.Component<LayerProps> {


    constructor(props: LayerProps, context: any) {
        super(props, context);

        this.handleMount = this.handleMount.bind(this);

    }


    refs: {

    }

    state: State = {

        openColor: false,

    }

    componentWillMount() {


        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            const container = document.querySelector('#view-container');
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth , container.clientHeight);
        }

        onWindowResize();

    }

    handleMount() {


        console.log('更新！')

        scene = new THREE.Scene();

        // var geometry = new THREE.CircleGeometry(0.16, 4);

        var geometry = new THREE.PlaneGeometry(0.16, 0.16);
        
        for (const layer of this.props.layers) {


            var material = new THREE.MeshBasicMaterial({ color: layer.color });

            // 横幅
            const tx = layer.tiles[0].length;
            // 縦幅
            const ty = layer.tiles.length;


            const l = (tx / 2) * 0.2 - 0.1;
            const t = (ty / 2) * 0.2 - 0.1;

            for (let x = 0; x < tx; ++x) {
                for (let y = 0; y < ty; ++y) {

                    // タイルが存在しない
                    if (!layer.tiles[y][x]) continue;

                    var mesh: NS_THREE.Mesh = new THREE.Mesh(geometry, material);

                    mesh.position.setX(x * 0.2 - l);
                    mesh.position.setZ(y * 0.2 - t);


                    mesh.rotation.x = -Math.PI / 2;
                    
                    scene.add(mesh);
                    
                }
            }



        }



        scene.background = new THREE.Color('#333');

        var axis = new THREE.AxesHelper(1000);
        axis.position.set(0, 0, 0);
        scene.add(axis);

        var grid = new THREE.GridHelper(0.2 * 10, 10); // size, step
        scene.add(grid);

        document.querySelector('#ww').appendChild(renderer.domElement);
    }

    render() {

        return (
            <div>




                <div style={{}}>


                    <div id="ww" ref={() => this.handleMount()} style={{ background: '#f0f', width: '500px', height: '500px' }}></div>

                </div>

            </div>

        );
    }

}



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';
import { InputAdornment } from 'material-ui/Input';


export default connect<{}, {}, any>((state: IState) => ({
    layers: state.layers,
}), (dispatch: Dispatch<typeof actions>) => ({
    actions: bindActionCreators(actions, dispatch)
}))(View3D);
