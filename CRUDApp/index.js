const fs = require('fs'),
    path = require('path');

const btnCreate = document.getElementById('btnCreate'),
    btnRead = document.getElementById('btnRead'),
    btnDelete = document.getElementById('btnDelete'),
    FileName = document.getElementById('FileName'),
    FileContents = document.getElementById('FileContents');

let pathName = path.join(__dirname, 'data');
btnCreate.addEventListener('click', () => {
    let file = path.join(pathName, FileName.value),
        contents = FileContents.value;
    fs.writeFile(file, contents, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('The file was created')
    })
});


btnRead.addEventListener('click', () => {
    let file = path.join(pathName, FileName.value);
    fs.readFile(file, (err, data) => {
        if (err) {
            return console.log(err);
        }
        FileContents.value = data;
        console.log('The file was read');
    })
});


btnDelete.addEventListener('click', () => {
    let file = path.join(pathName, FileName.value);
    fs.unlink(file, (err) => {
        if (err) {
            return console.log(err);
        }
        FileName.value = '';
        FileContents.value = ''
        console.log('The file was deleted')
        alert('The file Deleted')
    })
});