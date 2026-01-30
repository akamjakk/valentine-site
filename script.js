let musicStarted = false;
const urlParams =new URLSearchParams(window.location.search);
const senderName = urlParams.get('from');
const senderPhone = urlParams.get('phone');


window.onload =()=> {
 if(!senderName) {
    document.getElementById('phone-input-area').style.display="block";
    document.getElementById('auth-title').innerText= "Create Your Link";
 } else {
    document.getElementById('auth-desc').innerText = '${senderName} sent you a message...';
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

function startApp() {
  const name = document.getElementById('userName').value.trim();
  if (!name) return alert("Please enter your name!");

  if (!senderName) {
    // Logic for USER A (The Creator)
    const phone = document.getElementById('userPhone').value.replace(/\D/g,'');
    if (!phone) return alert("Enter your phone number!");
    
    // Fallback for local testing if origin is null
    const base = window.location.origin !== "null" ? window.location.origin : "";
    const path = window.location.pathname;
    const link = `${base}${path}?from=${encodeURIComponent(name)}&phone=${phone}`;
    
    // Show the copy container and set the text
    document.getElementById('link-container').style.display = "block";
    document.getElementById('linkText').innerText = link;
    
    // Change the button text to show success
    const mainBtn = document.querySelector('#auth-screen .yes');
    mainBtn.innerText = "Link Generated! ✨";
    mainBtn.style.backgroundColor = "#4caf50";
  } else {
    // Logic for USER B (The Receiver)
    document.getElementById('auth-screen').style.display = "none";
    document.getElementById('main-screen').style.display = "block";
    document.getElementById('title').innerText = `Hey ${name} 💕`;
  }
}

function copyLink(){
  const linkText =document.getElementById('linkText').innerText;
  const btn = document.getElementById('copyBtn');
  navigator.clipboard.writeText(linkText).then(() => {
    btn.innerText = "Copied";
    btn.classList.add('copied');
    setTimeout(()=> {
      btn.innerText="Copy";
      btn.classList.remove('copied');
    }, 2000);
  });
}

function sayYes() {
    const visitor =document.getElementById('userName').value;
  const msg = getRandom(yesMessages);
    
  if(senderPhone) {
    const text ='Its official! ${senderName} & ${visitor} are Valentine dates!❤️';
    window.open('https://wa.me/${senderPhone}?text=${encodeURIComponent(text)}','_blank');

  }
  window.location.href='result.html?status=yes&msg=${encodeURIComponent(msg)}';
}
  


function sayNo() {
    const visitor= document.getElementById('userName').value;
  const msg = getRandom(noMessages);

  if (senderPhone) {
const text ='Hey ${senderName}, ${visitor} viewed your request but isnt ready yet💔';
 window.open('https://wa.me/${senderPhone}?text=${encodeURIComponent(text)}','_blank');


  }
  window.location.href = `result.html?status=no&msg=${encodeURIComponent(msg)}`;
}