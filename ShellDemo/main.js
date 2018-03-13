console.log('main process working');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');


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
app.on('ready', createWindow);

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