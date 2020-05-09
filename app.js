// include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generatePassword = require('./generatePassword')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// using body-parser to pre-process incoming requirements
app.use(bodyParser.urlencoded({ extented: true }))

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const reqBody = req.body
  password = generatePassword(reqBody)
  res.render('index', { password: password, reqBody: reqBody })
})

app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}.`)
})