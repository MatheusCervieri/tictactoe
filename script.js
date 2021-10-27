const container = document.getElementById("ctn");
const display = document.getElementById("display");
const buttonsdiv = document.getElementById("buttonsdiv");
const resetbutton = document.createElement('button');


function reset(player1name, player2name){
    for(i = 0 ; i < 9 ; i++){
        GameBoard.gameboardarray[i].gameboardsquare.symbol = "";
        GameBoard.gameboardarray[i].gameboardsquare.isused = false;
        GameBoard.setsquareintoarraygameboard(i, "");
        display.textContent = "";
        }
        GameBoard.writeplayernames(player1name,player2name);
        let player1 = Player("x", newgame, 1, player1name);
        let player2 = Player("O", newgame, 2, player2name);
        newgame.getplayer1id(player1.playerproperties.playerid);
        newgame.getplayer2id(player2.playerproperties.playerid);
        newgame.getplayer1symbol(player1.playerproperties.symbol);
        newgame.getplayer2symbol(player2.playerproperties.symbol);
        buttonsdiv.appendChild(resetbutton);
        resetbutton.textContent = "RESTART";
        resetbutton.addEventListener('click', () => {
        reset(player1name,player2name);
})
}

function calculatewinner (squares) {
    console.log(squares);
    let winnerlines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (i =0 ; i < winnerlines.length ; i++){
    const [a,b,c] = winnerlines[i];
    console.log("A: " + a  + " b: " + b + " c: " + c)
    console.log("Squares a " + squares[a] + " Squares b " + squares[b] + " Squares c " + squares[c])
   if(squares[a] && squares[a] == squares[b] && squares[b] == squares[c])
   {
        //wining! 
        display.textContent = squares[a].toUpperCase() + " Wins The Game";
        GameBoard.lockgameboard();
           
    } 
    else {
        console.log("the game continue");
    }
  
   
}


}

const GameBoard = (() => {
    let gameboardarray = [];
    
    function makegameboardsquare (id){
        let gameboardsquare = {
            id: id,
            isused: false,
            symbol: "",
            div: document.createElement('div'),
        }
        container.appendChild(gameboardsquare.div);
        
        gameboardsquare.div.className = "square";
        gameboardsquare.div.id = "i" + id;
        gameboardsquare.div.addEventListener('click', () => {
           
            newgame.playround(gameboardsquare.id, gameboardsquare.isused);
           
       
        });
        return {gameboardsquare};
    }
  
    const getsymbolsofsquares = () => {
        let a = [];
        for (i = 0; i < 9; i++){
            a.push(GameBoard.gameboardarray[i].gameboardsquare.symbol);
        }
        return a;
    }
    const writeplayernames = (player1name,player2name) => {
        let playernamesdiv = document.getElementById('playernames');
        playernamesdiv.textContent = player1name + " Against " + player2name;
    }
    const makegameboard = () => {
        for (i = 0; i <= 8; i++){
            gameboardarray.push(new makegameboardsquare(i));
            
        }
  
    };
  const removegameboard = () => {
        container.innerHTML = "";
    }
    const setsquareintoarraygameboard = (position,symbol) => {
        
        gameboardarray[position].gameboardsquare.symbol = symbol;
        gameboardarray[position].gameboardsquare.div.textContent = gameboardarray[position].gameboardsquare.symbol;
       
    }

    const lockgameboard = () =>{
        for (i = 0; i  < 9 ; i++){
            gameboardarray[i].gameboardsquare.isused = true;
        }
    }
   
    return {gameboardarray, writeplayernames, makegameboard, removegameboard, lockgameboard, setsquareintoarraygameboard, makegameboardsquare, getsymbolsofsquares};
})();

const Game = () => {
    let gameproperties = {
        gameturnplayerid: 1,
        player1id: 0,
        player2id: 0,
        player1symb: "",
        player2symb: "",
    }
    const getplayer1id = (player1id) => {
        gameproperties.player1id =  player1id;
      
    }
    const getplayer2id = (player2id) =>{
        gameproperties.player2id = player2id;
    }

    const getplayer1symbol = (player1symbol) => {
        gameproperties.player1symb = player1symbol;
        
    }
    const getplayer2symbol = (player2symbol) => {
        gameproperties.player2symb = player2symbol;
    }
    const playround = (position, isused) => {
        if(GameBoard.gameboardarray[position].gameboardsquare.isused == true){
            console.log("This position is used");
        }
        else{
        
        if(gameproperties.gameturnplayerid == gameproperties.player1id){
            GameBoard.setsquareintoarraygameboard(position, gameproperties.player1symb);
            gameproperties.gameturnplayerid = gameproperties.player2id;
        }
        else {
            GameBoard.setsquareintoarraygameboard(position, gameproperties.player2symb);
            gameproperties.gameturnplayerid = gameproperties.player1id;
        }
        GameBoard.gameboardarray[position].gameboardsquare.isused = true;
        calculatewinner(GameBoard.getsymbolsofsquares());
    }
    }
    const changeround = () => {
        if(gameproperties.gameturnplayerid == gameproperties.player1id){
            gameproperties.gameturnplayerid = gameproperties.player2id;
        }
        else {
            gameproperties.gameturnplayerid = gameproperties.player1id;

        }
    }
    return {gameproperties, getplayer1id, getplayer2id, changeround, playround, getplayer1symbol, getplayer2symbol}; 
}



const Player = (symboll, game, id,name) => {
    let playerproperties = {
        playerid: id,
        symbol: symboll,
        name: name,
    }
  

    return {playerproperties};
    
    }

const MainMenu = () => {
    const MainMenuHtmlItens = {
    menucontainer: document.createElement('div'),
    player1text: document.createElement('p'),
    inputplayer1name: document.createElement('input'),
    player2text: document.createElement('p'),
    inputplayer2name: document.createElement('input'),
    btnstartgame: document.createElement('button'),
    }
    
    const makemenu = (() => {
        container.appendChild(MainMenuHtmlItens.menucontainer);
        MainMenuHtmlItens.menucontainer.id = "menucontainer";
        MainMenuHtmlItens.menucontainer.appendChild(MainMenuHtmlItens.player1text);
        MainMenuHtmlItens.menucontainer.appendChild(MainMenuHtmlItens.inputplayer1name);
        MainMenuHtmlItens.menucontainer.appendChild(MainMenuHtmlItens.player2text);
        MainMenuHtmlItens.menucontainer.appendChild(MainMenuHtmlItens.inputplayer2name);
        MainMenuHtmlItens.menucontainer.appendChild(MainMenuHtmlItens.btnstartgame);
        MainMenuHtmlItens.player1text.textContent = "What is the Player 1 name?";
        MainMenuHtmlItens.inputplayer1name.type = "input";
        MainMenuHtmlItens.player2text.textContent = "What is the Player 2 name?";
        MainMenuHtmlItens.inputplayer2name.type = "input";
        MainMenuHtmlItens.btnstartgame.textContent = "Start the Game";
    })();
    const removemenu = () => {
        container.removeChild(MainMenuHtmlItens.menucontainer);
    }
    MainMenuHtmlItens.btnstartgame.addEventListener('click', ()=> {
        console.log("start the game");
        removemenu();
        GameBoard.makegameboard();
        reset(MainMenuHtmlItens.inputplayer1name.value, MainMenuHtmlItens.inputplayer2name.value);
    })
    return {MainMenuHtmlItens, removemenu};
}    



let newgame = Game();
let newmainmenu = MainMenu();

console.log(newmainmenu.MainMenuHtmlItens);


