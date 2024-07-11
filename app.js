const loadALLPlayer = (playerName, limit = 10) =>
    {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
        .then(res => res.json())
        .then(data => {
            if(data.player)
            {
                if(playerName == '')
                {
                    const limitedPlayers = data.player.slice(0, limit);
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
                        <button id="myBtn" class="myBtn">Details</button>
                    </div>
                </div>
            `;
            playerContainer.appendChild(div);

            div.querySelector('.add-to-group').addEventListener('click', () => {
                handleAddToGroup(player.strThumb, player.strPlayer, player.strSport, player.idPlayer);
            });

            div.querySelector('.myBtn').addEventListener('click', () => {
                openModal(player);
            })
        });
    };
    const openModal = (player) => {
        const modal = document.getElementById("playerModal");
        const playerImage = document.getElementById("playerImage");
        const playerName = document.getElementById("playerName");
        const playerNationality = document.getElementById("playerNationality");
        const playerTeam = document.getElementById("playerTeam");
        const playerSport = document.getElementById("playerSport");
        const playerDescription = document.getElementById("playerDescription");
    
        modal.style.display = "block";
    
        playerImage.src = player.strThumb ? player.strThumb : 'unknown.jpg';
        playerName.textContent = player.strPlayer;
        playerNationality.textContent = player.strNationality;
        playerTeam.textContent = player.strTeam;
        playerSport.textContent = player.strSport;

        if (player.strDescriptionEN && player.strDescriptionEN.trim() !== '') 
        {
            const truncatedDescription = player.strDescriptionEN.split(' ').slice(0, 100).join(' ');
            playerDescription.textContent = truncatedDescription + (player.strDescriptionEN.split(' ').length > 100 ? '...' : '');
        } 
        else 
        {
            playerDescription.textContent = 'Description not available.';
        }
    };
    
    const closeModal = () => {
        const modal = document.getElementById("playerModal");
        modal.style.display = "none";
    };
    
    document.querySelector(".close").addEventListener('click', closeModal);
    
    window.addEventListener('click', (event) => {
        const modal = document.getElementById("playerModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

document.getElementById("srch").addEventListener("click", () =>
{
    const playerContainer = document.getElementById("player-container");
    playerContainer.innerHTML = '';

    const inputValue = document.getElementById("srch-box").value.trim();
    if(inputValue)
    {
        loadALLPlayer(inputValue, null);
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
});

const handleAddToGroup = (image, name, sport, playerId) => 
{
    const playerCount = document.getElementById("count").innerText;
    let convertedCount = parseInt(playerCount);
    convertedCount += 1;
    if(convertedCount > 11 )
    {
        alert("Selection exceeded");
        return;
    }
    document.getElementById("count").innerText = convertedCount;

    const container = document.getElementById("group-main-container")
    const div = document.createElement("div");
    div.classList.add("group-info")
    const playerImage = image ? image : 'unknown.jpg';
    div.innerHTML = `
        <img class="group-img" src=${playerImage} alt="${name}" />
        <div class="group-player-name">
            <p>${name}</p>
            <p>${sport}</p>
        </div>
    `
    container.appendChild(div);

    const addButton = document.querySelector(`[data-player-id = "${playerId}"] .add-to-group`);
    addButton.disabled = true;
    addButton.innerText = "Added";
    addButton.classList.add("added");
};


window.onload = () => 
{
    loadALLPlayer('', 10);
};
