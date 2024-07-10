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
    
        players.forEach((player) =>
        {
            const div = document.createElement("div");
            div.classList.add("card");
            div.dataset.playerId = player.idPlayer;
            const playerImage = player.strThumb ? player.strThumb : 'unknown.jpg';
            div.innerHTML = `
                <img class = "card-img" src=${playerImage} alt = "${player.strPlayer}" />
                <h3>${player.strPlayer}</h3>
            `;
            playerContainer.appendChild(div);
        });
    };

loadALLPlayer('')