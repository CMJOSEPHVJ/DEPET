const { app, BrowserWindow, ipcMain, Menu, screen } = require('electron');
const path = require('path');
let petWindow;
const WIDTH = 260, HEIGHT = 245;
function createPet() {
  const area = screen.getPrimaryDisplay().workArea;
  petWindow = new BrowserWindow({
    width: WIDTH, height: HEIGHT,
    x: area.x + Math.max(0, area.width - WIDTH - 80),
    y: area.y + Math.max(0, area.height - HEIGHT - 80),
    frame: false, transparent: true, resizable: false,
    maximizable: false, fullscreenable: false,
    alwaysOnTop: true, skipTaskbar: false,
    hasShadow: false, backgroundColor: '#00000000',
    webPreferences: { preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, contextIsolation: true, sandbox: false }
  });
  petWindow.setMenuBarVisibility(false);
  petWindow.loadFile(path.join(__dirname, 'index.html'));
  petWindow.webContents.on('context-menu', () => {
    Menu.buildFromTemplate([
      { label: 'Keep on top', type: 'checkbox', checked: petWindow.isAlwaysOnTop(), click: item => petWindow.setAlwaysOnTop(item.checked) },
      { type: 'separator' },
      { label: 'Quit Desktop Pet', click: () => app.quit() }
    ]).popup({ window: petWindow });
  });
  petWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
}
app.whenReady().then(() => {
  ipcMain.on('pet-move', (event, dx, dy) => {
    if (!petWindow || event.sender !== petWindow.webContents) return;
    if (![dx,dy].every(n => typeof n === 'number' && Number.isFinite(n) && Math.abs(n) < 1000)) return;
    const [x,y] = petWindow.getPosition();
    const a = screen.getDisplayNearestPoint({ x, y }).workArea;
    petWindow.setPosition(Math.max(a.x, Math.min(a.x + a.width-WIDTH, Math.round(x+dx))),
                          Math.max(a.y, Math.min(a.y + a.height-HEIGHT, Math.round(y+dy))));
  });
  createPet();
});
app.on('window-all-closed', () => app.quit());
