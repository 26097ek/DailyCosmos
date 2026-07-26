import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
.then(response => response.json())
.then(data => {console.log(data); return data;})
.then(data => {
    document.querySelector('#app').innerHTML = `
    <h1>${data.title}</h1>
    ${data.media_type === "video" ? `<video controls src="${data.url}"></video>` : `<img src="${data.url}">`}
    ${data.copywright ? `<p>${data.copywright}</p>` : ""}
    <br>
    <p>${data.explanation}</p>
    `
})
