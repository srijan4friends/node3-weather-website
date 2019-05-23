const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

const app = express()

//Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to setup
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        header: 'Weather app',
        name: 'Srijan Khan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        header: 'Everything you want to know about me!',
        name: 'Srijan Khan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        header: 'I am here to help you!!',
        name: 'Srijan Khan'
    })
})

// app.get('', (req, resp) => {
//     resp.send('<h1>Welcome to the home page!</h1>')
// })

// app.get('/help', (req, resp) => {
//     resp.send([
//         {
//             name: 'Srijan'
//         },
//         {
//             name: 'Anwesa'
//         }
//     ])
// })

// app.get('/about', (req, resp) => {
//     resp.send('<h1>This is the about page!</h1>')
// })

app.get('/weather', (req, resp) => {

    const userLocation = req.query.address
    if(!userLocation){
        return resp.send({
            error: 'Please provide address!'
        })
    }

    geocode(userLocation,(error, {latitude, longitude, location} = {})=>{ //destructuring locationData
        if(error){
            return resp.send({error})
        }
        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return resp.send({error})
            }
            resp.send({
                location,
                address: userLocation,
                forecast
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, resp) => {
    resp.render('errorPage',{
        header: 'Error occurred!',
        message: 'Help article not found!',
        name: 'Srijan Khan'
    })
})

app.get('*', (req, resp) => {
    resp.render('errorPage',{
        header: 'Error occurred!!',
        message: 'Page not found!',
        name: 'Srijan Khan'
    })
})

app.listen(3000, () => {
    console.log('Starting the application on port 3000!')
})