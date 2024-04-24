const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const {DB_URI, PORT } = require('./config');

const app = express();


async function main(){
  await mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log(err));
}

app.use(express.json());
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/api/user', userRoutes);

// app.get('/', (req, res) => {
//   res.send('Servidor no Docker!!teste teste');
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

main();
