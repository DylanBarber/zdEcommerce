const express = require('express');
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())

dotenv.config()

app.use(express.static(path.join(__dirname, 'client/build')))
// // create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });

//Catchall handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(port, () => console.log(`Listening on port ${port}`));