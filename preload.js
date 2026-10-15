const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('bunnyAPI',Object.freeze({
 command:(text)=>ipcRenderer.invoke('assistant-command',text),
 move:(dx,dy)=>ipcRenderer.send('assistant-move',dx,dy),
 minimize:()=>ipcRenderer.send('assistant-minimize'),
 quit:()=>ipcRenderer.send('assistant-quit')
}));
