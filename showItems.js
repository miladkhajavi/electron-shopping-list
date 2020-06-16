let electron = require('electron')

let {
    ipcRenderer
} = electron

//show list in main window
const ul = document.querySelector('ul');
ipcRenderer.on('item:add', (e, item) => {
    const li = document.createElement('li');
    const itemText = document.createTextNode(item);
    li.appendChild(itemText);
    ul.appendChild(li)
})