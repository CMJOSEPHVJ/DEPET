const api=window.bunnyAPI;const input=document.getElementById('input'),reply=document.getElementById('reply'),send=document.getElementById('send');
async function run(text){if(!text.trim())return;send.disabled=true;reply.textContent='Working on it…';try{const result=await api.command(text);reply.textContent=result.message;}catch(_){reply.textContent='Something went wrong. Please try again.';}finally{send.disabled=false;}}
document.getElementById('form').addEventListener('submit',e=>{e.preventDefault();run(input.value);});
document.querySelectorAll('[data-cmd]').forEach(el=>el.addEventListener('click',()=>{input.value=el.dataset.cmd;run(input.value);}));
document.getElementById('min').addEventListener('click',()=>api.minimize());document.getElementById('close').addEventListener('click',()=>api.quit());
let dragging=false,sx=0,sy=0;
const bar=document.getElementById('drag');bar.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('button'))return;dragging=true;sx=e.screenX;sy=e.screenY;bar.setPointerCapture(e.pointerId);});
bar.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.screenX-sx,dy=e.screenY-sy;if(dx||dy){api.move(dx,dy);sx=e.screenX;sy=e.screenY;}});
bar.addEventListener('pointerup',()=>dragging=false);bar.addEventListener('pointercancel',()=>dragging=false);
const bunny=document.getElementById('bunny'),speech=document.getElementById('speech');let timer;
bunny.addEventListener('click',()=>{bunny.classList.remove('bounce');void bunny.offsetWidth;bunny.classList.add('bounce');speech.textContent=['Hi, friend! 🐰','Ready to help! 💜','Carrots, please! 🥕','You got this! ✨'][Math.floor(Math.random()*4)];speech.style.display='block';clearTimeout(timer);timer=setTimeout(()=>speech.style.display='none',1700);});
