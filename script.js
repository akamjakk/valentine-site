let musicStarted = false;
const urlParams =new URLSearchParams(window.location.search);
const senderName = urlParams.get('from');
const senderPhone = urlParams.get('phone');


window.onload =()=> {
 if(!senderName) {
    document.getElementById('phone-input-area').style.display="block";
    document.getElementById('auth-title').innerText= "Create Your Link";
 } else {
    document.getElementById('auth-desc').innerText = `${senderName} sent you a message...`;
 }
};

function playMusic() {
  const music = document.getElementById("bgMusic");
  if (!musicStarted && music) {
    music.play().catch(() => {});
    musicStarted = true;
  }
}

const yesMessages = [
  "You just made my heart race ❤️‍🔥\n\nI’m really glad I asked.\nLet’s make this Valentine unforgettable 💕",
  "This smile on my face is because of you 😊\n\nThank you for saying yes 💖",
  "I’ve been hoping for this moment 💫\n\nYou just made today special ❤️",
  "My heart feels lighter knowing you said yes 💕\n\nHappy Valentine 💖"
];

const noMessages = [
  "Thank you for being honest 💔\n\nSome feelings are still beautiful,\neven when they’re not returned 💫",
  "It’s okay.\n\nI’m still glad I had the courage to ask ❤️",
  "I respect your answer.\nThank you for listening 💕",
  "Not every story ends the same way,\nbut this moment still mattered 🌙"
];

function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// --- START APP LOGIC ---
function startApp() {
  const name = document.getElementById('userName').value.trim();
  if (!name) return alert("Please enter your name!");

  if (!senderName) {
    // Logic for USER A (The Creator)
    const phone = document.getElementById('userPhone').value.replace(/\D/g,'');
    if (!phone) return alert("Enter your phone number!");
    
    // Create link: Handles local files, Live Server, and real domains
    const baseUrl = window.location.href.split('?')[0];
    const finallink = `${baseUrl}?from=${encodeURIComponent(name)}&phone=${phone}`;
    
    // Show the copy container and update text
    
    document.getElementById('linkText').innerText = finallink;
    document.getElementById('link-container').style.display = "block";
    
    // Update button UI
    const btn = document.getElementById('mainActionBtn');
    btn.innerText = "Link Generated! ✨";
    btn.style.backgroundColor = "#4caf50";

  } else {
    // Logic for USER B (The Receiver)
    document.getElementById('auth-screen').style.display = "none";
    document.getElementById('main-screen').style.display = "block";
    document.getElementById('title').innerText = `Hey ${name} 💕`;
  }
}


function copyToClipboard() {
  const text = document.getElementById('linkText').innerText;
  const btn =document.getElementById('copyBtn')

  if(!text) return;

  const el = document.createElement('textarea');
  el.value= text;
  document.body.appendChild(el);
  el.setAttribute('readonly','');
  el.style.postion='adsolute';
  el.style.left='-9999px';
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0,99999);

  try {
    document.execCommand('copy');
    btn.innerText= "copied!";
    btn.style.backgroundColor="#4caf50";
    setTimeout(() => {
      btn.innerText ="Copy";
      btn.style.backgroundColor= "#ff4d6d";

    },2000);
  } catch (err) {
    alert("Copy failed, please select and copy the link manually.");

  }
  document.body.removeChild(el);
}
	



function sayYes() {
    const visitor =document.getElementById('userName').value;
  const msg = getRandom(yesMessages);
    
    const text =`Its official! ${senderName} & ${visitor} are Valentine dates!❤️`;
    const waUrl=`https://wa.me/${senderPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl,'_blank');

  
  window.location.href=`result.html?status=yes&msg=${encodeURIComponent(msg)}`;
}
  


function sayNo() {
    const visitor= document.getElementById('userName').value;
  const msg = getRandom(noMessages);


const text =`Hey ${senderName}, ${visitor} viewed your request but isnt ready yet💔`;
const waUrl =`https://wa.me/${senderPhone}?text=${encodeURIComponent(text)}`;
window.open(waUrl,'_blank');


  
  window.location.href = `result.html?status=no&msg=${encodeURIComponent(msg)}`;
}