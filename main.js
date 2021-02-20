"use strict"
let throwsArrayKey = "Vrr5LoXEz6TqYtP6";
let gameDataKey = "TXSZyWx57FNp4x91"
let throwsArray = [];
let gameData = [];
let dartBoard = [];

for(let i = 1; i <=20; i++)
{
    dartBoard.push(i);
}

function updateLocalStorage(data,key)
{
    // If the data is an object
    if (typeof(data) === "object")
    {
        data = JSON.stringify(data); // Stringifying the data first
    }
    
    localStorage.setItem(key,data); // Setting the item into local storage
}

function checkIfDataExistsLocalStorage(key)
{
    let data = localStorage.getItem(key); // Getting the the data using the key
    
    // If the data is not an empty string, not undefined and not null
    if(data != "" && typeof data != "undefined" && data != null) 
    {
        return true;
    }
    else
    {
        return false;
    }
}

function getDataLocalStorage(key)
{
    let data = localStorage.getItem(key); // Initialising the data by getting item using its key
    try
    {
        data = JSON.parse(data); // Parsing the data
    }
    catch(e)
    {
        console.log(e)
    }
    finally
    {
        return data; // Returning the data 
    }
}

function newGame()
{
    if(confirm("Are you sure? This will delete the current game"))
    {
        let playerOne = prompt("Enter the name of the player throwing first");
        let playerTwo = prompt("Enter the name of the player throwing second");
        let startScore = parseInt(prompt("Enter the starting score","501"),10);
        throwsArray = [];
        gameData = [];
        gameData.push(playerOne)
        gameData.push(playerTwo)
        gameData.push(startScore)
        updateLocalStorage(gameData,gameDataKey);
        updateLocalStorage(throwsArray,throwsArrayKey);
    }
    location.reload();
    
}


if(checkIfDataExistsLocalStorage(throwsArrayKey))
{
    throwsArray = getDataLocalStorage(throwsArrayKey);
    gameData = getDataLocalStorage(gameDataKey);
}
else
{
    throwsArray = [];
    gameData = ["Player 1","Player 2",""];
}