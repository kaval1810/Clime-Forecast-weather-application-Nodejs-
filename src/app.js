const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Path for Express Config
const publicDirecotryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirecotryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : "About Us"
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Help'
    })
})


app.get('/help/*',(req,res) => {
    res.render('404', {
        title : '404',
        errorMessage : "Help artical not found"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
     {
       return  res.send({
             error: 'Opps! Enter valid Location'
         })
     }
    
     geocode(req.query.address, (error, { latitude, longitude, location} = {} ) => {          //here we use Destructuring Data { latitude, longitude, location}

     if(error)
     {
       return res.send({ error });
     }
 
     forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
            return res.send({ error });
        }
 
         res.send({
             forecast : forecastData,
             location,
             address : req.query.address
         })
     })
 
   })
})

app.get('/products',(req,res) => {
    if(!req.query.search)
     {
       return  res.send({
             error: 'You must provide a search term'
         })
     }
    
    console.log(req.query.search) 
    res.send({
        products : []
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title : '404',
        errorMessage : "Page not found"
    })
})

app.listen(3000, () => {
   console.log('Server is Up on port 3000.');
})
