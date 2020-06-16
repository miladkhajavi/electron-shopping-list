let electron = require('electron')

let {ipcRenderer} = electron

// add window 
document.querySelector('form').addEventListener('submit', submitForm);
function submitForm(e) {
    e.preventDefault();
    const item = document.querySelector('#item').value;
    console.log(ipcRenderer);
    
    ipcRenderer.send('item:add', item);            
}