const mongoose = require('mongoose')

mongoose.connect(process.env.DB_HOST,  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(res => console.log('conected to DB'))
  .catch(err => console.log(`'could not connect to DB ': ${err}`))