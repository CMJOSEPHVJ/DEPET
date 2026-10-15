'use strict';
const {app, BrowserWindow, ipcMain, Menu, screen, shell} = require('electron');
const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
let win;
const WIDTH=430, HEIGHT=540;
function openProgram(filename, args=[]) {
  return new Promise(resolve => {
    try {
      const child=spawn(filename,args,{detached:true,stdio:'ignore',windowsHide:false,shell:false});
      let settled=false;
      child.once('error',()=> {if(!settled){settled=true;resolve(false);}});
      child.once('spawn',()=> {if(!settled){settled=true;child.unref();resolve(true);}});
    } catch (_) {resolve(false);}
  });
}
function findChrome() {
  const env=process.env;
  const base=[env['PROGRAMFILES'],env['PROGRAMFILES(X86)'],env['LOCALAPPDATA']].filter(Boolean);
  for(const b of base){const p=path.join(b,'Google','Chrome','Application','chrome.exe');if(fs.existsSync(p))return p;}
  return 'chrome.exe';
}
const aliases={
  'chrome':'chrome','google chrome':'chrome','browser':'chrome',
  'notepad':'notepad','text editor':'notepad',
  'calculator':'calculator','calc':'calculator',
  'paint':'paint','ms paint':'paint',
  'explorer':'explorer','file explorer':'explorer','files':'explorer','my computer':'explorer',
  'cmd':'unsupported','command prompt':'unsupported','powershell':'unsupported'
};
async function handleCommand(value){
  if(typeof value!=='string'||value.length>200) return {ok:false,message:'Please enter a shorter command.'};
  const c=value.trim().toLowerCase().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
  if(!c)return {ok:false,message:'Type a command to start.'};
  if(['help','commands','what can you do'].includes(c))return {ok:true,message:'Try: open chrome, open notepad, open calculator, open paint, open files, open youtube, or open google.'};
  if(['hi','hello','hey'].includes(c))return {ok:true,message:'Hi there! 🐰 What shall I open for you?'};
  const urlMap={youtube:'https://www.youtube.com/',google:'https://www.google.com/',gmail:'https://mail.google.com/'};
  const target=c.replace(/^(please\s+)?(open|launch|start|run|show)\s+/,'').replace(/^(the|my)\s+/,'').trim();
  if(Object.prototype.hasOwnProperty.call(urlMap,target)){
    try {await shell.openExternal(urlMap[target]);return {ok:true,message:`Opening ${target} in your default browser…`};}
    catch (_) {return {ok:false,message:`Could not open ${target}.`};}
  }
  const appName=aliases[target];
  if(appName==='unsupported')return {ok:false,message:'For your safety, system terminals are not available as pet commands.'};
  if(!appName)return {ok:false,message:'I do not know that command yet. Type “help” to see supported commands.'};
  const paths={chrome:findChrome(),notepad:'notepad.exe',calculator:'calc.exe',paint:'mspaint.exe',explorer:'explorer.exe'};
  const ok=await openProgram(paths[appName]);
  return {ok,message:ok?`Opening ${target}…`:`Could not find ${target} on this PC.`};
}
function createWindow(){
 const a=screen.getPrimaryDisplay().workArea;
 win=new BrowserWindow({width:WIDTH,height:HEIGHT,x:a.x+Math.max(0,a.width-WIDTH-45),y:a.y+Math.max(0,a.height-HEIGHT-55),frame:false,transparent:true,resizable:false,alwaysOnTop:true,skipTaskbar:false,hasShadow:false,backgroundColor:'#00000000',webPreferences:{preload:path.join(__dirname,'preload.js'),nodeIntegration:false,contextIsolation:true,sandbox:false}});
 win.loadFile('index.html');win.setMenuBarVisibility(false);
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',e=>e.preventDefault());
 win.webContents.on('context-menu',()=>Menu.buildFromTemplate([{label:'Always on top',type:'checkbox',checked:win.isAlwaysOnTop(),click:i=>win.setAlwaysOnTop(i.checked)},{type:'separator'},{label:'Quit Bunny Assistant',click:()=>app.quit()}]).popup({window:win}));
}
app.whenReady().then(()=>{
 ipcMain.handle('assistant-command',async(e,s)=>e.sender===win.webContents?handleCommand(s):{ok:false,message:'Not allowed'});
 ipcMain.on('assistant-quit',e=>{if(e.sender===win.webContents)app.quit();});
 ipcMain.on('assistant-minimize',e=>{if(e.sender===win.webContents)win.minimize();});
 ipcMain.on('assistant-move', (e,dx,dy)=>{
  if(e.sender!==win.webContents||![dx,dy].every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<1000))return;
  const [x,y]=win.getPosition();const a=screen.getDisplayNearestPoint({x,y}).workArea;
  win.setPosition(Math.max(a.x,Math.min(a.x+a.width-WIDTH,Math.round(x+dx))),Math.max(a.y,Math.min(a.y+a.height-HEIGHT,Math.round(y+dy))));
 });
 createWindow();
});
app.on('window-all-closed',()=>app.quit());
