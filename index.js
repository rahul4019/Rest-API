const express = require('express')
const studentRoutes = require('./src/students/routes')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1/students', studentRoutes)

app.listen(port, () => {
    console.log(`app listining on port ${port}`)
})