const express = require('express')
const fs = require('fs')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
let data = JSON.parse(fs.readFileSync('./data.json'));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/test', function (req, res) {
    res.send(data.test)
})

app.get('/test/:id', function (req, res) {
    const {id} = req.params;
    const findData = data.test.find(obj=>obj.id==id)
    res.send(findData)
})

app.post('/test', function (req, res) {
    // console.log(req.body)
    // const body = JSON.stringify({...data,test:[...data.test, req.body]})
    //너무 복잡함
    data.test.push(req.body)
    const body = JSON.stringify(data);
    const dataInsert = fs.writeFileSync('./data.json', body)
    res.send(data.test)
})

app.delete('/test/:id', function (req, res) {
    const {id} = req.params;
    data.test = data.test.filter(obj=>obj.id != id)
    const body = JSON.stringify(data)
    fs.writeFileSync('./data.json',body)
    res.send(data.test)
})

app.put('/test/', function (req, res) {
    const updateBody = req.body;
    data.test = data.test.map(obj=>{
        if(obj.id == updateBody.id){
            obj = updateBody;
        }
        return obj;
    })
    const body = JSON.stringify(data)
    fs.writeFileSync('./data.json',body)
    res.send(data.test)
})



const PORT = 3030;
app.listen(PORT, ()=>{
console.log(`Server is running... ${PORT}`)})

// http://localhost:3030/test
