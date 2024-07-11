const loadALLPlayer = (playerName) =>
    {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
        .then(res => res.json())
        .then(data => {
            displayPlayer(data.player);
        })
        .catch(error => {
            console.error('Error Fetching data:', error);
            displayPlayer([]);
        });
    };
    
const displayPlayer = (players) =>
    {
        const playerContainer = document.getElementById("player-container");
        playerContainer.innerHTML = '';

        if(players == null || players.length == 0)
        {
            const div = document.createElement("div");
            div.classList.add("comment");
            div.innerHTML = `
                <h1>No players found</h1>
            `
            playerContainer.appendChild(div);
            return;
        }

        players.forEach((player) =>
        {
            const div = document.createElement("div");
            div.classList.add("card");
            div.dataset.playerId = player.idPlayer;
            const playerImage = player.strThumb ? player.strThumb : 'unknown.jpg';
            const playerDescription = player.strDescriptionEN ? player.strDescriptionEN.split(' ').slice(0,10).join(' ') + '...' : '';
            div.innerHTML = `
                <img class = "card-img" src=${playerImage} alt = "${player.strPlayer}" />
                <h3>${player.strPlayer}</h3>
                <div class="first-line">
                    <div class="line-item">
                        <h6 class="nation-one">Nationality</h6>
                        <h6 class="nation-two">${player.strNationality}</h6>
                    </div>
                    <div class="line-item">
                        <h6 class="nation-one">Team</h6>
                        <h6 class="nation-two">${player.strTeam}</h6>
                    </div>
                    <div class="line-item">
                        <h6 class="nation-one">Sport</h6>
                        <h6 class="nation-two">${player.strSport}</h6>
                    </div>
                    <p>${playerDescription}</p>
                    <div class="btn">
                        <button>Add to group</button>
                        <button>Details</button>
                    </div>
                </div>
                
            `;
            playerContainer.appendChild(div);
        });
    };

document.getElementById("srch").addEventListener("click", () =>
{
    const playerContainer = document.getElementById("player-container");
    playerContainer.innerHTML = '';

    const inputValue = document.getElementById("srch-box").value.trim();
    if(inputValue)
    {
        loadALLPlayer(inputValue)
    }
    else
    {
        const div = document.createElement("div");
        div.classList.add("no-srch");
        div.innerHTML = `
            <h2>Please enter a search item</h2>
        `
        playerContainer.appendChild(div);
        return;
    }
    document.getElementById("srch-box").value = "";
})

loadALLPlayer('')