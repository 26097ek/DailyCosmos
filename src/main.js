import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY

document.querySelector("#app").innerHTML = `<span style="font-size: 10rem;"><h1 id="loading">Stealing data from NASA...</h1></span>`

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
.then(response => response.json())
.then(data => {console.log(data); return data;})
.then(data => {
    let img;
    if (data.media_type === "image") {
        img = `<img src="${data.url}" id="img">`
    } else if (data.url.includes("youtube")) {
        img = `<iframe 
        width="560" 
        height="315" 
        src="${data.url}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
        allowfullscreen>
        </iframe>`
    } else {
        img = `<video controls src="${data.url}" id="img"></video>`
    }
    document.querySelector('#app').innerHTML = `
    <h2>The Daily Cosmos</h2>
    <h1>${data.title}</h1>
    ${img}
    ${data.copyright ? `<p>${"Copyright " + data.copyright}</p>` : ""}
    <br>
    <p>${data.explanation}</p>
    `
})
