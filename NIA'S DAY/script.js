let currentSlide = 1;

function showSlide(n){
  document.querySelectorAll('.slide').forEach(s=>s.classList.remove('active'));
  if(n===4){ document.getElementById('end').classList.add('active'); }
  else { document.getElementById(`slide-${n}`).classList.add('active'); }
}

function nextSlide(){
  if(currentSlide<3){
    currentSlide++;
    showSlide(currentSlide);
    if(currentSlide===3) spawnBalloons();
  }
}

function endMessage(){ currentSlide=4; showSlide(currentSlide); }

function toggleMusic(){ const m=document.getElementById("bg-music"); m.paused?m.play():m.pause(); }

// Floating hearts
for(let i=0;i<20;i++){
  const h=document.createElement('div');
  h.className='heart';
  h.style.left=Math.random()*100+'vw';
  h.style.animationDuration=(5+Math.random()*5)+'s';
  document.body.appendChild(h);
}

// Balloons + wishes + confetti
const wishes=[
  "You deserve the sweetest happiness 💗",
  "May your heart always feel loved 💞",
  "Keep shining bright ✨",
  "You are priceless and appreciated 🎀",
  "Your smile is my favorite 💘",
  "May all your dreams come true 🌸"
];

let clickedBalloons = 0;

function spawnBalloons(){
  clickedBalloons=0;
  const area=document.querySelector('.balloon-area');
  area.innerHTML='';

  for(let i=0;i<20;i++){
    const b=document.createElement('div');
    b.className='balloon';
    const size=40+Math.random()*30;
    b.style.width=size+'px';
    b.style.height=(size*1.4)+'px';
    b.style.left=Math.random()*80+'%';
    b.style.top='300px';
    b.style.background=`linear-gradient(135deg,#ff9bd6,#ff3e8d)`;
    b.style.animation=`fly ${4+Math.random()*3}s linear infinite`;
    b.onclick=()=>{ popBalloon(b); };
    area.appendChild(b);
  }
}

function popBalloon(b){
  const popSound=new Audio("https://www.fesliyanstudios.com/play-mp3/387");
  popSound.play();
  b.remove();
  const w=wishes[Math.floor(Math.random()*wishes.length)];
  document.getElementById('wish-text').innerText=w;

  clickedBalloons++;
  if(clickedBalloons>=20) showConfetti();
}

function showConfetti(){
  const confettiColors=['#ff80c7','#ff3e8d','#ffd7ea','#ffb6d9'];
  for(let i=0;i<50;i++){
    const conf=document.createElement('div');
    conf.style.position='absolute';
    conf.style.width='10px'; conf.style.height='10px';
    conf.style.background=confettiColors[Math.floor(Math.random()*confettiColors.length)];
    conf.style.left=Math.random()*100+'vw';
    conf.style.top=Math.random()*-50+'vh';
    conf.style.borderRadius='50%';
    conf.style.animation=`confettiFall ${3+Math.random()*2}s linear forwards`;
    document.body.appendChild(conf);
  }
}

const style=document.createElement('style');
style.innerHTML=`@keyframes fly {0% {transform: translateY(0);} 100% {transform: translateY(-350px);}} @keyframes confettiFall{0%{transform:translateY(0);}100%{transform:translateY(110vh);opacity:0;}}`;
document.head.appendChild(style);
