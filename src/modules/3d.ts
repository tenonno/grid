
import NS_THREE from 'three';
import { ILayer, IState } from 'types/state';

console.warn(NS_THREE);

const THREE = require('three');

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500);

let scene: NS_THREE.Scene = null;

// OBJ を保存するためのシーン
let objScene: NS_THREE.Scene = null;

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



export function mount3D() {

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        const container = document.querySelector('#view-container');
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    onWindowResize();
}


export function update3D(layers: ILayer[], w: number, h: number) {

    scene = new THREE.Scene();
    objScene = new THREE.Scene();

    let a = 0;

    for (const layer of layers) {

        if (!layer.visibility) continue;

        const material = new THREE.MeshBasicMaterial({ color: layer.color });

        // 横幅
        const tx = layer.tiles[0].length;
        // 縦幅
        const ty = layer.tiles.length;


        const l = (tx / 2) * 0.2 - 0.1;
        const t = (ty / 2) * 0.2 - 0.1;


        var texture = new THREE.TextureLoader().load(layer.background);

        // immediately use the texture for material creation
        var material2 = new THREE.MeshBasicMaterial({ map: texture });


        var geometry = new THREE.PlaneGeometry(5, 20, 32);

        var plane = new THREE.Mesh(geometry, material2);
        scene.add(plane);

        for (let x = 0; x < tx; ++x) {
            for (let y = 0; y < ty; ++y) {

                // タイルが存在しない
                if (!layer.tiles[y][x]) continue;

                // OBJExporter はメッシュの回転などを見てくれないのでジオメトリから作る
                var geometry = new THREE.Geometry();

                const _x = x * 0.2 - l;
                const _y = y * 0.2 - t;

                const ss = ++a * 0.01;

                const s = 0.08;

                geometry.vertices.push(new THREE.Vector3(_x - s, layer.height + ss, _y - s));
                geometry.vertices.push(new THREE.Vector3(_x + s, layer.height + ss, _y - s));
                geometry.vertices.push(new THREE.Vector3(_x + s, layer.height + ss, _y + s));
                geometry.vertices.push(new THREE.Vector3(_x - s, layer.height + ss, _y + s));

                geometry.faces.push(new THREE.Face3(3, 2, 1));
                geometry.faces.push(new THREE.Face3(3, 1, 0));

                const mesh: NS_THREE.Mesh = new THREE.Mesh(geometry, material);

                scene.add(mesh);
                objScene.add(mesh.clone());

            }
        }
    }

    scene.background = new THREE.Color('#333');

    const axes = new THREE.AxesHelper(1000);
    axes.position.set(0, 0, 0);
    scene.add(axes);

    // グリッド数
    const size = Math.max(w, h);

    const grid = new THREE.GridHelper(0.2 * size, size);
    scene.add(grid);

    const domContainer = document.querySelector('#ww');
    if (domContainer) domContainer.appendChild(renderer.domElement);

}


const OBJExporter = require('three-obj-exporter');
const exporter = new OBJExporter();

import { remote } from 'electron';
const Dialog = remote.dialog;

const fs = require('fs');


/**
 * OBJ ファイルを出力する
 */
export function exportOBJ(state: IState) {

    // 更新する
    update3D(state.layers, state.grid.width, state.grid.height);

    var result = exporter.parse(objScene);
    console.log(result);

    Dialog.showSaveDialog(remote.getCurrentWindow(), {
        title: '保存',
        // defaultPath: '.',
        filters: [
            { name: 'OBJ ファイル', extensions: ['obj'] }
        ]
    }, (filePath: string) => {

        if (!filePath) return;

        fs.writeFile(filePath, result, (err: any) => {
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
    });

}