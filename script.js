let musicPlayed = false;
function playMusic(){
    if (!musicPlayed){ 
        document.getElementById("bgMusic").play();
        musicPlayed = true;
    }
}
/*Message lists*/

const yesMessages=[
    "You just made my heart race ❤️‍🔥\n\n I'm so glad I asked.\n Let's make this Valentine unforgettable 💕",
    "This smile on my face is because of you😊\n\n Thank you for saying yes💖 ",
    "I've been hoping for this moment💫\n\nYou just made today special❤️",
    "My heart feels lighter knowing you said yes💕\n\nHappy Valentine💖",
];

const noMessages=[ 
    "thanks you for being honest💔\n\nsome feelings are still beautiful\neven when they're not returned💫",
    "It's okay.\n\nI'm still gald I had the courage to ask❤️",
    "I respect your answer.\nThank you taking your time💕",
    "Not every story ends the same way,\n but this moment still mattered🌙"



];
function randomMessage(list) {
    return list[Math.floor(Math.random()* list.length)];
}


/* unified response handler */
function showResponse(titleText, messageText) {
    const title    =document.getElementById("title");
    const question =document.getElementById("question");
    const buttons  =document.getElementById("buttons");
   const response  = document.getElementById("response");
   // reset response animation 
   response.classList.remove("fade-in");
   response.style.opacity="0";
   response.style.transform="translateY(20px)";

   //fade out question 
    question.classList.add("fade-out");
    buttons.classList.add("fade-out");

  setTimeout(()=>{
    title.innerText = titleText;
    question.style.display ="none";
    buttons.style.display ="none";

     response.innerText= messageText;

        //force animation 
     response.offsetHeight;
     response.classList.add("fade-in"); }
    , 600);}
    /*button actions*/
    function sayYes() {
        showResponse(" You just made my heart race ❤️‍🔥\n\n I'm so glad I asked.\n Let's make this Valentine unforgettable 💕",randomMessage(yesMessages));
    }
    function sayNo() {
        showResponse("Thanks you for being honest💔\n\nsome feelings are still beautiful\neven when they're not returned💫",randomMessage(noMessages));
    }

     
