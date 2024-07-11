const loadALLPlayer = (playerName, limit = 10) => // Added default limit parameter
{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
    .then(res => res.json())
    .then(data => {
        if(data.player)
        {
            if(playerName == '')
            {
                const limitedPlayers = data.player.slice(0, limit); // Limiting players if playerName is empty
                displayPlayer(limitedPlayers);
            }
            else
            {
                displayPlayer(data.player);
            }
        }
        else
        {
            displayPlayer([]);
        }
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
        `;
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
                    <button class="add-to-group">Add to group</button>
                    <button>Details</button>
                </div>
            </div>
        `;
        playerContainer.appendChild(div);

        div.querySelector('.add-to-group').addEventListener('click', () => {
            handleAddToGroup(player.strThumb, player.strPlayer, player.strSport, player.idPlayer);
        });
    });
};

document.getElementById("srch").addEventListener("click", () =>
{
    const playerContainer = document.getElementById("player-container");
    playerContainer.innerHTML = '';

    const inputValue = document.getElementById("srch-box").value.trim();
    if(inputValue)
    {
        loadALLPlayer(inputValue, null); // Pass null as limit to load all players matching the search
    }
    else
    {
        const div = document.createElement("div");
        div.classList.add("no-srch");
        div.innerHTML = `
            <h2>Please enter a search item</h2>
        `;
        playerContainer.appendChild(div);
        return;
    }
    document.getElementById("srch-box").value = "";
});

const addedPlayers = [];
const handleAddToGroup = (image, name, sport, playerId) => 
{
    if (addedPlayers.includes(playerId)) {
        alert("Player already added to the group.");
        return;
    }
    addedPlayers.push(playerId);
    
    const playerCount = document.getElementById("count").innerText;
    let convertedCount = parseInt(playerCount);
    convertedCount += 1;
    if (convertedCount > 11 )
    {
        alert("Selection exceeded");
        return;
    }
    document.getElementById("count").innerText = convertedCount;

    const container = document.getElementById("group-main-container");
    const div = document.createElement("div");
    div.classList.add("group-info");
    const playerImage = image ? image : 'unknown.jpg';
    div.innerHTML = `
        <img class="group-img" src=${playerImage} alt="${name}" />
        <div class="group-player-name">
            <p>${name}</p>
            <p>${sport}</p>
        </div>
    `;
    container.appendChild(div);

    const addButton = document.querySelector(`[data-player-id="${playerId}"] .add-to-group`);
    addButton.disabled = true;
    addButton.innerText = "Added";
    addButton.classList.add("added");
};

window.onload = () => 
{
    loadALLPlayer('', 10); // Load 10 players when the page loads
};
