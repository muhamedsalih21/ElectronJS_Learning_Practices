const electron = require('electron');
const ipc = electron.ipcRenderer;

const errBtn = document.getElementById('errBtn');

//invoke native alert
errBtn.addEventListener('click', function() {
    ipc.send('open-error-dialog');
});

ipc.on('opened-error-dialog', function(event, arg) {
    console.log('Args: ' + arg);
});

const asyncBtn = document.getElementById('asyncBtn');
asyncBtn.addEventListener('click', function() {
    console.log('async msg 1');
    ipc.send('async-message');
    console.log('async msg 2');

});

ipc.on('async-reply', function(event, arg) {
    console.log(arg);
});



const syncBtn = document.getElementById('syncBtn');
syncBtn.addEventListener('click', function() {
    console.log('sync msg 1');
    //sync reply method
    const reply = ipc.sendSync('sync-message');
    console.log(reply)
    console.log('sync msg 2');

});



//syncronous interprocess start remote browser are only synchronous and mainprocss ipc is asynchronous 

const BrowserWindow = electron.remote.BrowserWindow;
let window = new BrowserWindow();
window.loadURL('http://www.github.com');