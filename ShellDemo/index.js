const openBtn = document.getElementById('openBtn');
const shell = require('electron').shell;

openBtn.addEventListener('click', () => {
    shell.showItemInFolder('/Users/muhamedsalih/Desktop/ElectronJS/ShellDemo/data/1.jpg');
    shell.openItem('/Users/muhamedsalih/Desktop/ElectronJS/ShellDemo/data/1.jpg');
    shell.openExternal('http://www.google.com');
});