console.log('main process working');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

//import tray
const Tray = electron.Tray;
const iconPath = path.join(__dirname + '/Icons', '1.png');
const Menu = electron.Menu;
let tray = null;

let win;

//tray not need create function

//create app on initilisation
app.on('ready', function() {
    //tray add instead of create 
    tray = new Tray(iconPath);
    const template = [{
        label: 'Audio',
        submenu: [{
            label: 'low',
            type: 'radio',
            checeked: true
        }, {
            label: 'High',
            type: 'radio'
        }]
    }, {
        label: 'video',
        submenu: [{
            label: '1280x720',
            type: 'radio',
            checked: true
        }, {
            label: '1920x1080',
            type: 'radio'
        }]
    }];

    const ctxMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(ctxMenu);
    tray.setToolTip('Tray Demo');
});

//mac specific closing syntax
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


//recreate an app window
app.on('activate', () => {
    if (win === null) {
        //createWindow();
    }
});