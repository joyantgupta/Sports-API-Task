const loadALLPlayer = () =>
{
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p')
    .then(res => res.json())
    .then(data => {
        console.log(data)
    });
}

loadALLPlayer()