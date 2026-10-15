const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktopPet', { moveBy: (x, y) => { if (Number.isFinite(x) && Number.isFinite(y)) ipcRenderer.send('pet-move', x, y); } });
