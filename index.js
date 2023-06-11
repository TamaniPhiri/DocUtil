let express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(5000,()=>{
    console.log('listening on port 5000');
});