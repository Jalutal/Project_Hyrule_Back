const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const port = 3000
const cors = require('cors');

// Configuration des packages
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

// Configuration des routes
const userRouter = require('./routes/userRoute')
const fanficsRouter = require('./routes/fanficRoute')
const commentsRouter = require('./routes/commentsRoute')

// Configuration des routes
app.use('/api/users', userRouter)
app.use('/api/fanfics', fanficsRouter)
app.use('/api/comments', commentsRouter)

// Démarrage du serveur Express
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

