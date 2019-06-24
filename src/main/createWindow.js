import { BrowserWindow } from "electron";

let window;
function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadURL(`file://${__dirname}/../../index.html`);
    // window.webContents.openDevTools();
    window.on("close", () => {
        window = null;
    });
}

export default createWindow;