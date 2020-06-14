const electron = require('electron');
const url = require('url')
const path = require('path')

const {app , BrowserWindow , Menu} = electron;



let mainWindow;

//listen to app to be ready
app.on('ready' , ()=>{
    //create new window
    mainWindow = new BrowserWindow({})
        //load html 
        mainWindow.loadURL(url.format({
            pathname:path.join(__dirname, 'mainWindow.html'),
            protocol:'file:',
            slashes:true
        }))
        //Quit app when closed
        mainWindow.on('closed' , ()=>{
            app.quit();
        })

        //build menu from template
        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
        // insert menu
        Menu.setApplicationMenu(mainMenu)
})


// create add window
createAddWindow = ()=>{
    addWindow = new BrowserWindow({
        width:300,
        height:200,
        title:'افزودن لیست'
    })
        //load html 
        addWindow.loadURL(url.format({
            pathname:path.join(__dirname, 'addWindow.html'),
            protocol:'file:',
            slashes:true
        }))
        // garbage collection handle
        addWindow.on('closed', ()=>{
            addWindow=null
        })
}

// create menu template 
const mainMenuTemplate = [
    {
        label:'امکانات',
        submenu:[
            {
                label:'افزودن',
                click(){
                    createAddWindow()
                }
            },
            {
                label:'حذف ایتم'
            },
            {
                label:'خروج',
                accelerator:process.platform == 'darwin'? 'Command+Q': 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]