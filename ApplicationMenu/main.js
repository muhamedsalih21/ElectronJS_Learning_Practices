console.log('main process working');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

//menu from electron
const Menu = electron.Menu;

let win;

function createWindow() {
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'), //load index files
        protocol: "file", //specify protocol
        slashes: true
    }));

    //give access to chrome developer tools
    //win.webContents.openDevTools();


    //onclose clear memory
    win.on("closed", () => {
        win = null;
    })
}

//create app on initilisation
app.on('ready', function() {
    createWindow();

    const template = [{
            //the apps base menu
        }, {
            label: 'Demo1',
            submenu: [{
                label: 'submenu1',
                click: function() {
                    console.log('clicked submenu 1');
                }
            }, {
                //separator to separate menues
                type: 'separator'
            }, {
                label: 'submenu2',
                click: function() {
                    console.log('clicked submenu 2');
                }
            }]
        }, {
            label: 'Edit',
            submenu: [
                { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
                { role: 'cut' }, { role: 'copy' }, { role: 'paste' },
                { role: 'pasteandmatchstyle' }, { role: 'delete' }, { role: 'selectall' }
            ]
        },
        {
            label: 'Setings',
            submenu: [{
                label: 'Help',
                click: function() {
                    electron.shell.openExternal("http://electron.atom.io")
                }
            }, ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
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
        createWindow();
    }
});