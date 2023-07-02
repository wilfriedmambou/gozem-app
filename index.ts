const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const PORT = 4000;
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});
app.use(cors());
// app.use((req:any, res:any, next:any) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const auth =require('./routers/auth')
const user = require('./routers/user')
const deleveryRouter =require('./routers/delivery')(io)
const packageRouter =require('./routers/package')(io)
app.use('/api/delivery',deleveryRouter);
app.use('/api/package',packageRouter);
app.use('/api/auth',auth);
app.use('/api/user',user);


const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect(
    'mongodb+srv://wilfried:Guitar1234@cluster0.kyfmum6.mongodb.net/?retryWrites=true&w=majority',

    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log(`Connexion à MongoDB échouée `));

  
  http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


