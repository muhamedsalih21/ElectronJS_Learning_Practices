console.log('main process working');
console.log('main.js');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');


let win1,win2;

function createWindow() {
    //window 1
    win1 = new BrowserWindow();
    win1.loadURL(url.format({
        pathname: path.join(__dirname, 'index1.html'), //load index files
        protocol: "file", //specify protocol
        slashes: true
    }));

    //window 2
    win2 = new BrowserWindow();
    win2.loadURL(url.format({
        pathname: path.join(__dirname, 'index2.html'), //load index files
        protocol: "file", //specify protocol
        slashes: true
    }));
    //give access to chrome developer tools
    // win.webContents.openDevTools();


    //onclose clear memory
    win1.on("closed", () => {
        win1 = null;
    });

    win2.on("closed", () => {
        win2 = null;
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
