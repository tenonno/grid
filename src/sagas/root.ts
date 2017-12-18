import { fork, put, take, call } from "redux-saga/effects";


import { loadProjectSuccess } from 'actions/actionCreators';


async function loadProject2() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 1234;
}


import { loadProject } from 'reducers/json';


function* handleRequestUser() {
    while (true) {
        const action = yield take('LOAD_PROJECT');

        const data = yield call(loadProject);

        console.log(data);

        yield put(loadProjectSuccess(data));

        /*
        const { payload, error } = yield call(loadProject2, action.payload);
        if (payload && !error) {
            yield put(loadProjectSuccess(payload));
        } else {
            yield put(loadProjectSuccess(error));
        }
        */
    }
}


import { remote } from 'electron';
const fs = require('fs');
const Dialog = remote.dialog;



const mime = require('mime');
const util = require('util');

function uploadBackground() {
    return new Promise((resolve) => {

        Dialog.showOpenDialog(remote.getCurrentWindow(), {
            title: 'プロジェクトを開く',
            // defaultPath: '.',
            filters: [
                { name: 'JSONファイル', extensions: ['png', 'jpg'] }
            ]
        }, (filePaths: string[]) => {

            const filePath = filePaths[0];

            if (!filePath) return;

            fs.readFile(filePath, 'base64', (err: any, data: string): void => {

                //エラーの場合はエラーを投げてくれる
                if (err) {
                    // throw err;

                    resolve(null);

                    return null;
                }

                const url = util.format('data:%s;base64,%s', mime.lookup(filePath), data);

                resolve(url);

            });

        });
    });
}


import { uploadBackgroundSuccess, uploadBackgroundFailure } from 'actions/actionCreators';

function* handleUploadBackground() {
    while (true) {
        const action = yield take('BACKGROUND_UPLOAD');

        const data = yield call(uploadBackground);

        console.log(data);

        yield put(uploadBackgroundSuccess(data));


    }
}


export default function* rootSaga() {
    yield fork(handleRequestUser);
    yield fork(handleUploadBackground);
};