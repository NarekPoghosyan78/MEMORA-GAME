import { initSettings } from "./settings.js";
const modes = {
  _4x4: [
    "arrows-shield.jpg",
    "arrows-up.jpg",
    "diploma.jpg",
    "drink-horn.jpg",
    "fire-gun.jpg",
    "Galea.jpg",
    "logarius-wheel.jpg",
    "lorica.jpg"
  ],
  _6x6: [
    "arrows-shield.jpg",
    "arrows-up.jpg",
    "diploma.jpg",
    "drink-horn.jpg",
    "fire-gun.jpg",
    "Galea.jpg",
    "logarius-wheel.jpg",
    "lorica.jpg",
    "mace.jpg",
    "medieval-catapult.jpg",
    "padlock.jpg",
    "scepter.jpg",
    "shield.jpg",
    "spears.jpg",
    "SPQR.jpg",
    "surgical-instruments.jpg",
    "eagle-pugio.png",
    "tessera.png"
  ],
  _8x8:[
    "tessera.png",
    "arrows-up.jpg",
    "diploma.jpg",
    "drink-horn.jpg",
    "fire-gun.jpg",
    "Galea.jpg",
    "logarius-wheel.jpg",
    "lorica.jpg",
    "mace.jpg",
    "medieval-catapult.jpg",
    "padlock.jpg",
    "scepter.jpg",
    "shield.jpg",
    "spears.jpg",
    "SPQR.jpg",
    "surgical-instruments.jpg",
    "pilum.png",
    "caligae.png",
    "cornu.png",
    "ballista-bolt.png",
    "falx.png",
    "gladius.jpg",
    "scorpiones.jpg",
    "aegis-plaque.jpg",
    "glandes.jpg",
    "tribulnus.jpg",
    "military-pay-bag.png",
    "phalera.png",
    "dolabra.png",
    "signum.png",
    "cestus.png",
    "classic-pugio.png"
  ]
};
switch(localStorage.getItem('mode')){
  case 'easy-mode': {
    document.documentElement.style.setProperty('--grid-column', 'repeat(4, 80px)')
    document.documentElement.style.setProperty('--card-size', '80px');
    document.documentElement.style.setProperty('--tab-size', '340px');
    break;
  }case 'medium-mode': {
    document.documentElement.style.setProperty('--grid-column', 'repeat(6, 80px)')
    document.documentElement.style.setProperty('--card-size', '80px');
    document.documentElement.style.setProperty('--tab-size', '510px');
    break;
  }case 'hard-mode': {
    document.documentElement.style.setProperty('--grid-column', 'repeat(8, 60px)')
    document.documentElement.style.setProperty('--card-size', '60px');
    document.documentElement.style.setProperty('--tab-size', '520px');
    break;
  }
}
const imgArr = localStorage.getItem('mode') == 'easy-mode' ? modes._4x4 : localStorage.getItem('mode') == 'medium-mode' ? modes._6x6 : localStorage.getItem('mode') == 'hard-mode' ? modes._8x8 : modes._6x6;
const cards = [...imgArr, ...imgArr];
cards.sort(() => Math.random() - 0.5);
const gameTab = document.querySelector(".game-tab");
let gameHtml = "";
cards.forEach((img, index) => {
  gameHtml += `
        <div class="flip-card" data-image="${img}" id="card-${index}">
            <div class="flip-card-inner">

                <div class="flip-card-front"></div>

                <div class="flip-card-back"
                style="background-image:url('./images/${img}')">
                </div>

            </div>
        </div>
    `;
});

gameTab.innerHTML = gameHtml
const flipCards = document.querySelectorAll(".flip-card");
const flipCardInner = document.querySelectorAll('.flip-card-inner');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;
const restartGame = document.querySelector('.reload-btn');
const soundtrack = new Audio("./audios/Memora_soundtrack.mp3");
soundtrack.loop = true;
soundtrack.volume = 1;
soundtrack.play();



flipCards.forEach((card) => {
  card.addEventListener("click", () => {
    const flipCardInner = card.querySelector(".flip-card-inner");
    if(localStorage.getItem('animation') == 'true'){
      flipCardInner.style.transition = 'transform 0.6s'
    }else{
      flipCardInner.style.transition = 'none'
    }
    if (lockBoard || card === firstCard) return;
    flipCardInner.classList.add("rotate");
    if (!firstCard) {
      firstCard = card;
      return;
    }
    secondCard = card;
    checkMatch();
  });
});

function checkMatch() {
  let firstImage = firstCard.dataset.image;
  let secondImage = secondCard.dataset.image;
  if (firstImage === secondImage && firstCard.id !== secondCard.id) {
    disableCards();
  } else {
    unFlipCards();
  }
}

function disableCards() { 
  firstCard.style.pointerEvents = 'none';
  secondCard.style.pointerEvents = 'none';
  firstCard.removeEventListener("click", () => {});
  secondCard.removeEventListener("click", () => {});
  firstCard = null;
  secondCard = null;
  matchedCards += 2;
  if (matchedCards === cards.length) {
    setTimeout(() => {
      alert("You win!");
      location.reload()
    }, 500);
  }
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.querySelector(".flip-card-inner").classList.remove("rotate");
    secondCard.querySelector(".flip-card-inner").classList.remove("rotate");
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }, 1000);
}


restartGame.addEventListener('click', ()=>{
    restartGame.style.transform = 'rotateZ(360deg)';
    setTimeout(()=>{
        location.reload();
    }, 500)

});


// panel

const navLinks = document.querySelectorAll("nav a");
const panel = document.querySelector(".info-panel");
const panelContent = panel.querySelector('.panel-content')
const closePanel = panel.querySelector('.panel-close-btn');
const pages = {
  Menu : {
      title: "Menu",
      text: ["Welcome to Memora.", "Choose your next action and begin your adventure. Start a new game, challenge your memory, or explore the available options. Every match improves your focus, concentration, and observation skills.", "<b><big>Available Options</big></b>", "<a href='#' class='menu-link' id='panel-menu-newGame'>New Game</a> - Start a fresh game with a newly shuffled board.", "<a href='#' class='menu-link' id='panel-menu-continue'>Continue</a> – Resume your current game.", "<a href='#' class='menu-link to-nav-link' id='panel-menu-settings'>Settings</a> - Customize sound, theme, and gameplay preferences.", "<a href='#' class='menu-link to-nav-link' id='panel-menu-aboutGame'>About Game</a> - Learn more about Memora and its development.", "<a href='#' class='menu-link to-nav-link' id='panel-menu-contact'>Contact</a> - Get in touch with the developer for feedback or questions.", "Good luck, and enjoy your journey through Memora!"],
  },
  "About Game" : {
      title: "About Memora",
      text: ["Memora is a classic memory matching game designed to challenge your concentration, visual memory, and attention to detail. Flip the cards, remember their positions, and match every pair using as few moves and as little time as possible.", "This project was fully designed and developed from scratch using HTML, SCSS (CSS), and Vanilla JavaScript. Every part of the game—including the interface, animations, game logic, and interactions—was handcrafted without using external game engines or frameworks.", "Developer: Narek Poghosyan", "Thank you for playing Memora. We hope you enjoy the experience and challenge yourself to achieve the best possible score!"]
  },
  Contact: {
      title: "Contact",
      text: ["Thank you for playing Memora!", "If you have any questions, suggestions, or feedback, feel free to get in touch. Every idea helps improve the game and create a better experience for all players.", "<b><big>Contact Information</big></b>", "<i>Developer</i>: &nbsp; Narek Poghosyan", "<i><i class='fa-solid fa-at'></i> Email</i>: &nbsp; <a href='https://mail.google.com/mail/?view=cm&fs=1&to=poghosyannarek78@gmail.com' target='_blank'>poghosyannarek78@gmail.com</a>", "<i><i class='fa-brands fa-github'></i> GitHub: &nbsp;</i><a href='https://github.com/NarekPoghosyan78' target='_blank'> github.com/NarekPoghosyan78</a>", "Whether you'd like to report a bug, suggest a new feature, or simply share your thoughts, your feedback is always welcome.", "Thank you for your support, and enjoy playing Memora!"]
  },
  Settings: {
      title: "Settings",
      text: ["Customize your Memora experience to match your preferences.", "<b><big>Game Settings</big></b>", "<i>Difficulty</i>&nbsp; - Choose between <label for='easy-mode'>Easy (4x4)</label><input type='radio' id='easy-mode' name='difficulty'/>, <label for='medium-mode'>Medium (6x6)</label><input type='radio' id='medium-mode' name='difficulty'/> or  <label for='hard-mode'>Hard (8x8)</label><input type='radio' id='hard-mode' name='difficulty'/> .", "Sound Effects - <input type='range' id='volume' class='settings-volume-range'/><label id='volumeLabel' for='volume'><span id='volumePercentage'>50</span>%<i class='fa-solid fa-volume'></i></label>", "Animations - Enable or disable card flip animations. <input type='checkbox' id='animation' class='settings-checkbox'/>", "Theme - Switch between Dark and Light mode (coming soon).", "Restart Game - Start a new game with a freshly shuffled board. <button id='restartAll-game-btn' type='button' class='settings-restart-btn settings-btn'>Restart</button>", "Your settings help create a more comfortable and enjoyable gameplay experience.", "Save Changes - <button type='button' id='saveChangesBtn' class='settings-btn'>Save</button>"]
  }
};

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      createPanelContent(link.textContent, e);
        document.getElementById('panel-menu-continue')?.addEventListener('click', (e) => {
          e.preventDefault();
          panel.classList.remove("active")
        });
        document.getElementById('panel-menu-newGame')?.addEventListener('click', (e)=>{
          location.reload()
        });
        document?.querySelectorAll('.to-nav-link').forEach(toLink=>{
          toLink.addEventListener('click', e=>{
            createPanelContent(toLink.textContent, e)
          })
        })

    });
});

function createPanelContent(name, e) {
    e.preventDefault();
    panelContent.innerHTML = `
          <h2 class="panel-title">${pages[name].title}</h2>
        `
    for (let i = 0; i < pages[name].text.length; i++) {
        const p = document.createElement('p');
        p.className = 'panel-description';
        p.innerHTML = pages[name].text[i];
        panelContent.append(p);
    };
    panel.classList.add("active");
    if(name == "Settings"){
      initSettings(soundtrack, flipCardInner)
    }
}

function removePanel(){
  panel.classList.remove("active");
};


closePanel.addEventListener('click', removePanel);

