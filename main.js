const electron = require('electron');
const url = require('url')
const path = require('path')

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;



let mainWindow;
let addWindow;
//listen to app to be ready
app.on('ready', () => {
    //create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    //load html 
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
    //Quit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    })

    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // insert menu
    Menu.setApplicationMenu(mainMenu)
})


// create add window
createAddWindow = () => {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'افزودن لیست',
        webPreferences: {
            nodeIntegration: true
        }
    })
    //load html 
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
    // garbage collection handle
    addWindow.on('closed', () => {
        addWindow = null
    })
}
// catch item:add

ipcMain.on('item:add', (e, item) => {
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
})
// create menu template 
const mainMenuTemplate = [{
    label: 'امکانات',
    submenu: [{
            label: 'افزودن',
            click() {
                createAddWindow()
            }
        },
        {
            label: 'حذف ایتم'
        },
        {
            label: 'خروج',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click() {
                app.quit();
            }
        }
    ]
}]

// if (mac) return add empty object to menu

if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({})
}
// ****************************************

//add developer tools item if not in prod
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'ابزار توسعه دهندگان',
        submenu: [{
            label: 'باز کردن',
            accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }, {
            role: 'reload'
        }]
    })
}