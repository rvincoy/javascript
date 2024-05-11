document.addEventListener("DOMContentLoaded", (e) => {
  console.log(e);
  cardGenerator();
  board();
});

const playMovesCount = document.querySelector("h2");
let playMoves=0;

playMovesCount.textContent = "Moves Count: " + playMoves;

const cardGenerator = () => {
  //card images
  let cardData = [
    { imgSrc: "./cards/ClubAce.jpg", id: 1, name: "ClubAce" },
    { imgSrc: "./cards/ClubKing.jpg", id: 2, name: "ClubKing" },
    { imgSrc: "./cards/DiamondAce.jpg", id: 3, name: "DiamondAce" },
    { imgSrc: "./cards/DiamondQueen.jpg", id: 4, name: "DiamondQueen" },
    { imgSrc: "./cards/HeartJack.jpg", id: 5, name: "HeartJack" },
    { imgSrc: "./cards/HeartKing.jpg", id: 6, name: "HeartKing" },
    { imgSrc: "./cards/SpadeJack.jpg", id: 7, name: "SpadesJack" },
    { imgSrc: "./cards/SpadeQueen.jpg", id: 8, name: "SpadeQueen" },
    { imgSrc: "./cards/ClubAce.jpg", id: 9, name: "ClubAce" },
    { imgSrc: "./cards/ClubKing.jpg", id: 10, name: "ClubKing" },
    { imgSrc: "./cards/DiamondAce.jpg", id: 11, name: "DiamondAce" },
    { imgSrc: "./cards/DiamondQueen.jpg", id: 12, name: "DiamondQueen" },
    { imgSrc: "./cards/HeartJack.jpg", id: 13, name: "HeartJack" },
    { imgSrc: "./cards/HeartKing.jpg", id: 14, name: "HeartKing" },
    { imgSrc: "./cards/SpadeJack.jpg", id: 15, name: "SpadesJack" },
    { imgSrc: "./cards/SpadeQueen.jpg", id: 16, name: "SpadeQueen" },
  ];

  //shuffle the cards randomly
  cardData.sort(() => Math.random() - 0.5);

  console.log("The order of the cards are: ");
  cardData.forEach(myCheat); // satisfies ES6 function requirement

  //cheat by going to the console
  function myCheat(value) {
    console.log(value.id + " " + value.name);
  }

  //assign the cards on the screen
  cardData.forEach((item) => {
    const section = document.querySelector("section");
    const card = document.createElement("div");
    card.classList = "card";

    card.setAttribute("id", item.id);
    card.setAttribute("name", item.name);

    const face = document.createElement("img");
    face.classList = "face";
    face.src = item.imgSrc;
    const back = document.createElement("div");
    back.classList = "back";

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      console.log(e);
      //animate the flipping of card
      face.classList.toggle("toggleCard");
      card.classList.toggle("toggleCard");
      compareCards(e);
    });
  });

  //
};

const board = () => {
  console.log("Memory game");
};

//Compare Cards
let gameMessage="";
const compareCards = (e) => {
  const activeCard = e.target;
  activeCard.classList.add("flipped");
  activeCard.style.pointerEvents = "none";
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === 2) {
    playMoves += 1;
    playMovesCount.textContent = "Moves Count: " + playMoves;
    if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
      console.log("matched");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
      });
      console.log(document.querySelectorAll(".toggleCard"));
      const toggleCards = document.querySelectorAll(".toggleCard");
      if (toggleCards.length === 32 && gameMessage=="") {
        try { //this is the error handling part of the program
          gameMessage=resultGame(" You finished in " + playMoves + " moves. Refresh to restart the game. ", 5);
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      console.log("not matched");
      flippedCards.forEach((card) => {
        card.style.pointerEvents="all";
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
          card.childNodes[0].classList.remove("toggleCard");
        },1000);
      });
    }
  }

}

// recursion requirement of the program
function resultGame(gameMessage, starCount) {
  if (starCount>0) {
    starCount--;
    gameMessage = "*" + gameMessage + "*";
    resultGame(gameMessage,starCount);
  } else {
    alert(gameMessage);
    return gameMessage;
  }
}