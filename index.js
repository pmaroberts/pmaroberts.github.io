"use strict";
//Functions to run on load:
display(dartBoard);
updateTable();
bigNumbers()



function display(array)
{
    let numberButtonsRef = document.getElementById("numberButtons");
    let output = "";
    let hardCodeButtons =`<div class="mdl-grid">
                                                    <div class="mdl-cell mdl-cell--2-col">
                                                        
                                                    </div>
                                                    <div class="mdl-cell mdl-cell--2-col">
                                                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" id="button0" onclick = "buttonPress(0)">
                                                                0    
                                                        </button>
                                                    </div>
                                                    <div class="mdl-cell mdl-cell--2-col">
                                                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" id="button25" onclick = "buttonPress(25)">
                                                                25    
                                                        </button>
                                                    </div>
                                                    <div class="mdl-cell mdl-cell--2-col">
                                                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" id="button50" onclick = "buttonPress(50)">
                                                                50    
                                                        </button>
                                                    </div>
                                                    <div class="mdl-cell mdl-cell--2-col">
                                                        
                                                    </div>
                                                </div>
                                
                            `;


    for(let i = 0; i < 20; i++)
    {
        if((i)%5 === 0)
        {
            output += `<div class="mdl-grid">`
        }
        output += `
                    <div class="mdl-cell mdl-cell--2-col">
                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" id="button${array[i]}" onclick = "buttonPress(${array[i]})">
                                ${array[i]}    
                        </button>
                    </div>`
        if((i+1)%5 === 0)
        {
            output += `</div>`
        }
    }
    output += hardCodeButtons;
    //console.log(output);
    numberButtonsRef.innerHTML = output;
}

function updateSwitches()
{
    let doublesRef = document.getElementById("switch-1");
    let triplesRef = document.getElementById("switch-2");
    if(doublesRef.checked && triplesRef.checked)
    {
        location.reload()
    }
}

function updateTable()
{
    let playerOneTotals = [];
    let playerOneRemain = [gameData[2]];
    let playerTwoTotals = [];
    let playerTwoRemain = [gameData[2]];
    let doublesRef = document.getElementById("switch-1");
    let bullTrue = (throwsArray.slice(-1)[0] == 50 || throwsArray.slice(-1)[0] == 25);
    //Players' Names
    document.getElementById("playerOne").innerHTML = gameData[0];
    document.getElementById("playerTwo").innerHTML = gameData[1];

    //Loops for the player totals
        //Player 1 Totals For Loop
        for(let i = 0; i < throwsArray.length;i = i + 6)
        {
            let total = 0;
            for(let j = 0; j < 3; j++)
            {
                if(throwsArray[i+j] == undefined || isNaN(throwsArray[i+j]))
                {
                    console.log("meme")
                }
                else
                {
                    total += throwsArray[i+j];
                }
                
            }
            playerOneTotals.push(total)
            
        }
        //Player 1 Remaining For loop
        for(let i = 0; i < playerOneTotals.length; i++)
        {
            if(playerOneRemain[i] - playerOneTotals[i] == undefined || isNaN(playerOneRemain[i] - playerOneTotals[i]))
            {
                console.log("meme")
            }
            else if(playerOneRemain[i] - playerOneTotals[i] == 0 && (doublesRef.checked || bullTrue))
            {
                alert("Player 1 wins! Press ok to start a new game")
                newGame()
            }
            else if(playerOneRemain[i] - playerOneTotals[i] <= 0)
            {
                isBust();
            }
            else
            {
                playerOneRemain.push(playerOneRemain[i] - playerOneTotals[i]);
            }
            
        }

        //Player 2 Totals For Loop
        for(let i = 3; i < throwsArray.length;i = i + 6)
        {
            let total = 0;
            for(let j = 0; j < 3; j++)
            {
                if(throwsArray[i+j] == undefined || isNaN(throwsArray[i+j]))
                {
                    console.log("meme")
                }
                else
                {
                    total += throwsArray[i+j];
                }
                
            }
            playerTwoTotals.push(total)
            
        }
        //Player 2 Remaining For loop
        for(let i = 0; i < playerTwoTotals.length; i++)
        {
            if(playerTwoRemain[i] - playerTwoTotals[i] == undefined || isNaN(playerTwoRemain[i] - playerTwoTotals[i]))
            {
                console.log("meme")
            }
            else if(playerTwoRemain[i] - playerTwoTotals[i] == 0 && (doublesRef.checked || bullTrue))
            {
                alert("Player 2 wins! Press ok to start a new game")
                newGame()
            }
            else if(playerTwoRemain[i] - playerTwoTotals[i] <= 0)
            {
                isBust();
            }
            else
            {
                playerTwoRemain.push(playerTwoRemain[i] - playerTwoTotals[i]);

            }
        }
    
    //Adding to the HTML
    let tableBodyRef = document.getElementById("tableBody")
    let output = ''
    for(let i = 0; i < playerOneRemain.length; i++)
    {
        let p1Rem = "";
        let p1Tot = "";
        let p2Rem = "";
        let p2Tot = "";

        if(playerOneRemain[i] != undefined)
        {
            p1Rem += `${playerOneRemain[i]}`
        }
        if(playerOneTotals[i] != undefined)
        {
            p1Tot += `${playerOneTotals[i]}`
        }
        if(playerTwoRemain[i] != undefined)
        {
            p2Rem += `${playerTwoRemain[i]}`
        }
        if(playerTwoTotals[i] != undefined)
        {
            p2Tot += `${playerTwoTotals[i]}`
        }      
        output += `
                    <tr>
                        <td>${p1Rem}</td>
                        <td>${p1Tot}</td>
                        <td>${p2Rem}</td>
                        <td>${p2Tot}</td>
                    </tr>
                    `
    }

    tableBodyRef.innerHTML = output
    
}

function bigNumbers()
{
    let bigFirstRef = document.getElementById("bigFirst");
    let bigSecondRef = document.getElementById("bigSecond");
    let bigThirdRef = document.getElementById("bigThird");
    let instructionsRef = document.getElementById("instructions");
    let length = throwsArray.length;

    if(length == 0)
    {
        instructionsRef.innerHTML = `<p style = "font-size: 20px">Welcome to the online darts scoreboard! <br><br>
        To start, press new game. <br><br>
        To enter scores, press the button corresponding to the dart thrown.<br><br>
        Use the switches to enter double and triple scores. <br><br>
        The back button is there in case you make a mistake entering the scores.
        </p>`
        bigFirstRef.innerHTML = "";
        bigSecondRef.innerHTML = "";
        bigThirdRef.innerHTML = "";
    }
    else if(length%3 == 0)
    {
        instructionsRef.innerHTML = "";
        bigFirstRef.innerHTML = throwsArray.slice(-3)[0];
        bigSecondRef.innerHTML = throwsArray.slice(-2)[0];
        bigThirdRef.innerHTML = throwsArray.slice(-1)[0];
    }
    else if(length%3 == 2)
    {
        instructionsRef.innerHTML = "";
        bigFirstRef.innerHTML = throwsArray.slice(-2)[0];
        bigSecondRef.innerHTML = throwsArray.slice(-1)[0];
        bigThirdRef.innerHTML = "";
    }
    else if(length%3 == 1)
    {
        instructionsRef.innerHTML = "";
        bigFirstRef.innerHTML = throwsArray.slice(-1)[0];
        bigSecondRef.innerHTML = "";
        bigThirdRef.innerHTML = "";
    }


}

function buttonPress(value)
{
    let doublesRef = document.getElementById("switch-1");
    let triplesRef = document.getElementById("switch-2");
    if(value == 50 || value == 25 || value == 0)
    {
        throwsArray.push(value);
    }
    else if(doublesRef.checked)
    {
        throwsArray.push(2*value);
    }
    else if(triplesRef.checked)
    {
        throwsArray.push(3*value);
    }
    else
    {
        throwsArray.push(value)
    }

    updateLocalStorage(throwsArray,throwsArrayKey);
    updateTable()
    bigNumbers()
}

function isBust()
{
    let length = throwsArray.length;
    alert("You have gone bust! It is now the next player's turn")
    if(length%3 == 0) //Third Throw
    {
        throwsArray.pop();
        throwsArray.pop();
        throwsArray.pop();
        throwsArray.push(0);
        throwsArray.push(0);
        throwsArray.push(0);
    }
    else if(length%3 == 2) //Second Throw
    {
        throwsArray.pop();
        throwsArray.pop();
        throwsArray.push(0);
        throwsArray.push(0);
        throwsArray.push(0);
    }
    else if(length%3 == 1) //First Throw
    {
        throwsArray.pop();
        throwsArray.push(0);
        throwsArray.push(0);
        throwsArray.push(0);
    }
    updateTable()
}

function backButton()
{
    throwsArray.pop()
    bigNumbers();
    updateTable()
}