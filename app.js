const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const port = 3000
const cors = require('cors');


app.use(cors());


app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Définir la route pour récupérer les fictions d'un utilisateur
app.get('/user/:id/checkfictions', async (req, res) => {
  const idUtilisateur = req.params.idUtilisateur;
  try {
    const fictions = await User.findAll({
      where: { id: idUtilisateur },
      include: [{ model: Fiction }],
    });
    res.json(fictions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des fictions' });
  }
});

const userRouter = require('./routes/userRoute')
const fanficsRouter = require('./routes/fanficRoute')
const commentsRouter = require('./routes/commentsRoute')

app.use('/api/users', userRouter)
app.use('/api/fanfics', fanficsRouter)
app.use('/api/comments', commentsRouter)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})