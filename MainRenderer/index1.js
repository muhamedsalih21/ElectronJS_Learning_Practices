console.log('index.js file1');
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');

const newWindowBtn=document.getElementById('newWindowBtn');
newWindowBtn.addEventListener('click', function(e){
  let win3 = new BrowserWindow();
  win3.loadURL(url.format({
      pathname: path.join(__dirname, 'index3.html'), //load index files
      protocol: "file", //specify protocol
      slashes: true
  }));
  win3.webContents.openDevTools();
})
