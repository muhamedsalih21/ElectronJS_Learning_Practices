console.log('main process working');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
const dialog = electron.dialog;

//listen to ipc events
ipc.on('open-error-dialog', function(event) {

    //showErrorBox (title ,body ) of alert 
    dialog.showErrorBox('An Error message', 'Demo of an error message');

    //send (event ,message)
    event.sender.send('opened-error-dialog', 'Main process opened the error dialog')
});

//ipc in async
ipc.on('async-message', function(event) {
    event.sender.send('async-reply', 'Main process opened the error dialog')
});

//sync method 
ipc.on('sync-message', function(event) {
    event.returnValue = 'sync-reply';
});


let win;

function createWindow() {
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'), //load index files
        protocol: "file", //specify protocol
        slashes: true
    }));

    //give access to chrome developer tools
    // win.webContents.openDevTools();


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