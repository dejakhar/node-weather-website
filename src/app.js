const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Defines path for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set-up Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set-up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'weather',
        name: 'Deepak Jakhar'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me: ',
        name: 'Deepak Jakhar'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        name: 'DJ',
        title: 'Help',
        desc: 'Weather Realted Information Services'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send('You must provide an address')
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) =>{
    
        if(error){
            return res.send({error: error})
            
        }   
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
        
    })
    // res.send({
    //     forecast: 'it is raining',
    //     location: 'Not Delhi',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404_page', {
        error_msg: 'Help article not found'
    })
    //res.send('Help Article not found')
})

app.get('*', (req, res)=>{
    res.render('404_page', {
        error_msg: 'Page you are searching for not found'
    })
})

// App listenig to 3000 port
app.listen(port, () => {
    console.log('Server is up on port', port)
})


// command doe nodemon to restart on saving changes in hbs files
// nodemon app.js -e js,hbs
