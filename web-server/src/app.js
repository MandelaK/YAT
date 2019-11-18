const express = require('express');

const app = express()

app.get('', (request, response) => {
    response.send('Hello there!')
})

app.get('/help', (request, response) => {
    response.send('This is the help page.')
})

app.get('/about', (request, response)=>{
    response.send('About us.')
})

app.get('/weather', (request, response)=>{
    response.send('Here is the weather report.')
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
