/*
Note:
file->quit will close all window opened
window->close will close only focused window
*/



console.log('main process working');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');


let parentWin, childWin;

function createWindow() {
    //with out rendering the electron produces the browser window

    //normal window loading initialisation it takes object as parameter.
    parentWin = new BrowserWindow({title:"parent Window"});

    /*window with startup size defined
    dimWindow=new BrowserWindow({width:400,height:400});
    Restrict the BrowserWindow size by giving maxwidth and maxsize dimWindow and it takes integer as parameter.
    backgroundColor defines windows background color and it takes values as HEX generally
    frame defines the presence of framebar and it takes values as boolean
    parent repesents the parent of child process and it takes parent's object as value
    title defines the title of a browser window it takes string as value by default all window created has npm package's name's value if title not specified
    modal is a way to force user to restrict to child window (it act like alert unless click ok you can't go inside),it takes values as boolean
    */
    childWin=new BrowserWindow({width:400,height:400,maxWidth:400,maxHeight:400,backgroundColor:'grey',frame:false,title:"child Window",parent:parentWin,modal:false});

    //specifing a url link can make app like browser and load the page to the windows
    childWin.loadURL("http://www.w3schools.com");

    //give access to chrome developer tools
    // win.webContents.openDevTools();

    //once the url is full loaded ready-to-show event is thrown then show function displays the child window.
    childWin.once('ready-to-show',()=>{
      childWin.show();
    });

    //onclose clear memory
    parentWin.on("closed", () => {
        parentWin = null;
        childWin=null;
    })
    childWin.on("closed", () => {
        parentWin = null;
        childWin=null;
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
    //if (win === null)
    if(parentWin === null||childWin ===null)
     {
        createWindow();
    }
});
