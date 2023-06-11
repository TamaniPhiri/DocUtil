let express = require('express');
let bodyparser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();

app.use(express.static('./uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/docxtopdf', (req, res) => {}); 

app.listen(5000,()=>{
    console.log('listening on port 5000');
});