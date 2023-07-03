const http = require('http');
const fs = require('fs');
const path = require('path');



http.createServer((req, res) => {
    const file = (req.url === '/') ? 'index.html'
    : req.url //sistema de rota dinamico 

    console.log(file)
    const pathFile = path.join(__dirname,'public', file)
         
    fs.readFile(pathFile, (err, content)=>{
        if (err) throw err

            res.end(content)
         });
}).listen(5000, () => {console.log('servidor rodando...')});
