const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//console.log(__dirname) // C:\Users\YoCheN\Desktop\NODE-COURSE\web-server\src
//console.log(__filename) // C:\Users\YoCheN\Desktop\NODE-COURSE\web-server\src\app.js
//console.log(path.join(__dirname, '../public')) // C:\Users\YoCheN\Desktop\NODE-COURSE\web-server\public

const app = express()

// Define paths for Express config
const publicDirectoryPath =path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engin and views location
app.set('view engine', 'hbs') // "handlebars" set up -> 製作動態網頁
app.set('views', viewsPath) //告訴Express 更改veiws資料夾的路徑+重新命名
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //執行public 裡面的文件


// app.get('', (req, res) => { // 當有人進入這個網頁時 要執行的內容 
//     res.send('<h1>Hello Express<h1>') // res.send() 讓網頁顯示()裡面的內容 藉由送HTML內容來渲染網頁
// })

app.get('', (req, res) => {
    res.render('index', {  //對應view資料夾裡面的index.hbs 不需要加副檔名
        title: 'Weather App',
        name: 'Mark Chen'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Penny Wu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Mark & Hsuan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    //geocode
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //使用解構: {latitude, longitude, location} //設定default
        if (error) {
            return res.send({ error }); //{ error: error }的縮寫 = { error } 
        }
        //forecast
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({ //return之後就會直接結束函式
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//*代表wildcard(通用符)
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help404',
        name: 'Mark',
        error: 'Help article not found'
    })
})

//建立404 找不到資料 *代表wildcard(通用符)
//一定要放在最後面 因為會從前面開始找符合的 about help ...
app.get('*', (req, res) => { 
    res.render('404', {
        title: '404',
        name: 'YoCheN',
        error: 'My 404 page'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})