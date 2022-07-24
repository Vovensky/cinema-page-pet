
const express = require('express');
const filmsInfo = require('./filmsInfo')
const fileFunctions = require('./changeFiles')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.get('/films', (req, res) => {
  res.send(filmsInfo)
})

app.get('/users', (req, res) => {
});

app.post('/users/signIn', async(req, res) => {
  let data = await fileFunctions.readFileAsync(path.resolve(__dirname, 'registredUsers.txt'))
  let obj = JSON.parse(data)
  let validData = false;
  let body = req.body;
  let login = body.login
  let password = String(body.password)
  let object = {};
    if(obj[login] && obj[login]==password) {
      validData = true;
      object[login] = password
    }
  if(validData) {
    res.writeHead(200, {
        'Content-Type': 'application/JSON; charset=utf-8'})
    res.write(JSON.stringify(object))
    res.end()
  } else {
    res.status(401).send('Неверно указаны логин или пароль')
  }
})
  
app.post('/users/signUp', async (req, res) => {
  let data = await fileFunctions.readFileAsync(path.resolve(__dirname, 'registredUsers.txt'))
  let obj = JSON.parse(data)
  // let validData = false;
  let body = req.body;
  let login = body.login
  let object = {};
  let password = body.password
  //   if(obj[login]) {
  //     validData = true;
  // }
  if(!obj[login]) {
    res.writeHead(200, {
        'Content-Type': 'application/JSON; charset=utf-8'})
    obj[login] = password
    object[login] = password
    fileFunctions.writeFileAsync(path.resolve(__dirname, 'registredUsers.txt'), JSON.stringify(obj))
    res.write(JSON.stringify(object))
    res.end()
  } else {
    res.status(401).send('Пользователь уже существует, epta')
  }
})

app.post('/film/postCommentaries', async (req, res) => {
  let filmId = req.body.filmId
  let object = {
    userName: req.body.userName,
    commentValue: req.body.commentValue,
    time: req.body.time,
    fullDate: req.body.fullDate,
  }
  let data = await fileFunctions.readDataAsync(path.resolve(__dirname, `${filmId}.txt`))

  res.writeHead(200, {
    'Content-Type': 'application/JSON; charset=utf-8'})
  if(!data) {
    let array = []
    array[0] = object
    fileFunctions.writeFileAsync(path.resolve(__dirname, `${filmId}.txt`), JSON.stringify(array))
    let response = await fileFunctions.readFileAsync(path.resolve(__dirname, `${filmId}.txt`))
    res.write(response)
    res.end()
  } else {
    let array = await fileFunctions.readFileAsync(path.resolve(__dirname, `${filmId}.txt`))
    let parsedArray = JSON.parse(array)
    parsedArray.push(object)
    fileFunctions.writeFileAsync(path.resolve(__dirname, `${filmId}.txt`), JSON.stringify(parsedArray))
    res.write(JSON.stringify(parsedArray))
    res.end()
  }
})


app.post('/film/getCommentaries', async (req, res) => {
  let filmId = req.body.filmId
  let data = await fileFunctions.readFileAsync(path.resolve(__dirname, `${filmId}.txt`)).catch(err => console.log(`ERROROROROROR: ${err}`))
  
  if(!data) {
    res.status(200).send('Никто еще не написал комметарии')
  } else {
    res.writeHead(200, {
      'Content-Type': 'application/JSON; charset=utf-8'})
    res.write(data)
    res.end()
  }
})

app.post('/boughtTicket', async(req,res) => {
  let filmName = req.body.filmName
  let time = req.body.time
  let date = req.body.date
  let seats = req.body.seats
  
  let obj = {}
  let data = await fileFunctions.readDataAsync(path.resolve(__dirname, `boughtTickets.txt`))
  console.log(`body ${req}`)
  
  if(!data) {
    let data = {}
    data[filmName] = {}
    data[filmName][date] = {}
    data[filmName][date][time] = seats
  } else {
    data = JSON.parse(data)
    if(data[filmName]) {
      let filmNameArea = data[filmName]
      if(filmNameArea[date]) {
        let dateArea = filmNameArea[date]
        if(dateArea[time]) {
          timeArea = dateArea[time]
          let keys = Object.keys(seats)
          for(let key of keys) {
            if(timeArea[key]) {
              timeArea[key].push(...seats[key])
            } else {
              timeArea[key] = seats[key]
            }
          }
        } else {
          data[filmName][date][time] = seats
        }
      } else {
        data[filmName][date] = {}
        data[filmName][date][time] = seats
      }
    } else {
      data[filmName] = {}
      data[filmName][date] = {}
      data[filmName][date][time] = seats
    }
  }
  fileFunctions.writeFileAsync(path.resolve(__dirname, `boughtTickets.txt`), JSON.stringify(data))
})

app.post('/getBoughtTickets', async(req,res) => {
  let filmName = req.body.filmName
  let time = req.body.time
  let date = req.body.date
  
  let obj = {}
  let data = await fileFunctions.readFileAsync(path.resolve(__dirname, `boughtTickets.txt`)).catch(err => console.log`ошибка: ${err}`)
  
  if(!data) {
    obj = {}
    res.writeHead(200, {
      'Content-Type': 'application/JSON; charset=utf-8'})
    res.write(obj)
    res.end()
  } else {
    // data = JSON.parse(data)
    let obj = JSON.parse(data)
    try {
    // obj = data[filmName][date][time]
    
    console.log(`STATUS: SEND`)
    let sendedObj = obj[filmName][date][time]
    res.writeHead(200, {
      'Content-Type': 'application/JSON; charset=utf-8'})
    if(sendedObj) {
      res.write(JSON.stringify(sendedObj))
      res.end()
    } else {
        res.write(JSON.stringify({})),
        res.end()
      }
    } catch(err) {
      console.log(`ERROOOOOOOR ${err}`)
      res.write(JSON.stringify({}))
      res.end()
    }
  }
})

app.listen(port, () => {
  console.log(`server started at the PORT ${port}`)
});





//let usersList = {};