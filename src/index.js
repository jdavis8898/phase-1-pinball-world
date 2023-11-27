const gameListElement = document.querySelector("div.container nav.game-list")
const detailImageElement = document.querySelector("div.container section.game-details img#detail-image")
const detailTitleElement = document.querySelector("div.container section.game-details h2#detail-title")
const detailHighScoreElement = document.querySelector("div.container section.game-details span#detail-high-score")

const highScoreForm = document.getElementById("high-score-form")
const highScoreInput = document.getElementById("score-input")

let currentGame

function getGames()
{
    fetch ("http://localhost:3000/games")
        .then(resp => resp.json())
        .then(gameData => {
            gameData.forEach(game => makeGameList(game))

            displayMainGame(gameData[0])

            addHighScore()
        })
}

function makeGameList(game)
{   
    const gameTitleNavElement = document.createElement("h5")
    gameTitleNavElement.textContent = `${game.name} (${game.manufacturer_name})`
    gameListElement.appendChild(gameTitleNavElement)

    gameTitleNavElement.addEventListener("click", () => displayMainGame(game))
}

function displayMainGame(game)
{
    currentGame = game

    detailImageElement.src = currentGame.image
    detailTitleElement.textContent = currentGame.name
    detailHighScoreElement.textContent = currentGame.high_score
}

function addHighScore()
{
    highScoreForm.addEventListener("submit", (event) => {
        event.preventDefault()

        currentGame.high_score = highScoreInput.value
        displayMainGame(currentGame)

        highScoreForm.reset()
    })
}

getGames()