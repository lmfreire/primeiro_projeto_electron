const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
function createWindow(){
    const win = new BrowserWindow({
      width: 800,
      height: 800,
      autoHideMenuBar: true,
      backgroundColor: "#CCC",
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    const child = new BrowserWindow({
        parent: win,
        modal: true,
        show: false,
    })
  
    child.loadURL("https:google.com")

    child.once("ready-to-show", () => {
        child.show()
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.handle("ping", () => "pong,pong")
    ipcMain.handle("username", (event,nome) => {
        console.log("NOME RECEBIDO: ", nome);

        return nome
        
    })

    if (BrowserWindow.getAllWindows().length == 0) {
        createWindow();
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})