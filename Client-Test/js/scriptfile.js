let url = "http://localhost:4000/test";

async function getFromServer() {
    let toReturn;
    try {
        await fetch(url)
        .then(response => response.json())
        .then(response => toReturn = response);
    } catch (e) {
        console.warn(e);
    }
    return toReturn;
}

getFromServer().then((e) => console.log(e));