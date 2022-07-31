const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
var mongoose = require('mongoose')

app.use(cors())
let urlencodedParser = bodyParser.urlencoded({ extended:false })

var mongoDB = 'mongoserverlink'
mongoose.connect(mongoDB, { useNewUrlParser: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

var Schema = mongoose.Schema;
var usersSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})
var UsersModel = mongoose.model('users', usersSchema )


// Routes

app.post('/login', urlencodedParser, (req, res) => {
    UsersModel.findOne({ username: req.body.username, password: req.body.password }).then((user) => {
        if (user) return res.status(200).send('Logado!')
        else {
          return res.status(400).send('Usuário ou senha incorretos.')
        }
    })
})

app.post('/register', urlencodedParser, (req, res) => {
    if(req.body.email != "" && req.body.username != "" && req.body.password != ""){
        UsersModel.findOne({ email: req.body.email }).then((user) => {
          if (user) return res.status(400).send('Este e-mail já está em uso.')
          else {
              UsersModel.findOne({ username: req.body.username }).then((user) => {
                  if (user) return res.status(400).send('Este nome de usuário já está em uso.')
                  else {
                      const newUser = new UsersModel({
                          email: req.body.email,
                          username: req.body.username,
                          password: req.body.password,
                      })
                      newUser.save()
                      return res.status(200).send('Registrado!')
                  }
              })
          }
      })
    } else if(req.body.email == "" && req.body.username != "" && req.password != "") {
        res.status(300).send('E-mail inválido.')
    } else if(req.body.username == "" && req.body.email != "" && req.password != "") {
        res.status(300).send('Nome de usuário inválido.')
    } else if(req.body.password == "" && req.body.email != "" && req.username != "") {
        res.status(300).send('Por favor insira uma senha válida!')
    } else res.status(300).send('Por favor preencha os campos!')
})

app.listen(port)
