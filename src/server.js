const express = require('express')
const server = express()

const db = require('./database/db.js')

server.use(express.static('public'))

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.get('/', (req, res) => {
    res.render('index.html')
})

server.get('/create-point', (req, res) => {
    res.render('create-point.html')
})

server.get('/search', (req, res) => {
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        return res.render('search-results.html', { places: rows, total: total})
    })
})

server.listen(3000)
