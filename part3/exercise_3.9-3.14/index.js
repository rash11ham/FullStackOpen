require('dotenv').config()
const express = require('express')
const app = express()
//exercise 3.9
const cors = require('cors')
app.use(cors())


//exercise 3.13
const Person = require('./models/person')


//exercise 3.10
app.use(express.static("dist"));

//exercise 3.7
var morgan = require('morgan')
morgan.token('req-body', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :req-body")
);
//excersie 3.5 post
app.use(express.json())


app.get('/', (req,res) => {
    res.send('<h1>Hello</h1>')
})
//exercise 3.1
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    })
    
})

//exercise 3.2
// app.get('/info', (req, res) => {
//     res.send(`<h3>Phonebook has info for ${persons.length} people</h3>
//         <br/>
//         ${Date()}`)
// })

//exercise 3.3
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
      // if (!person) {
      //   res.status(404).send("no such person exist");
      // }
      res.json(person);
    }) 
    
    
})

//exercise 3.4
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    
    res.status(204).end()
})

//exercise 3.5
// function generateId() {
//     const maxId = persons.length > 0
//         ? Math.max(...persons.map(p => Number(p.id)))
//         : 0
//     return String(maxId+1)
// }
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name) {
      return res.status(400).json({
        error: "name can not be empty",
      });
    }


    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person.save().then((newPerson) => {
      res.json(newPerson);
    });
})

app.listen(process.env.PORT, () => {
    console.log('app is connected')
})

