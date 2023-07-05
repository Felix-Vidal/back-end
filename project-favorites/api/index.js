const http = require('http'); //criar o servidor
const data = require('./urls.json'); //pegar os elementos do json
const URL = require('url'); //requisições


http.createServer((req,res) => {
    const {name, url, del} = URL.parse(req.url, true).query //declarar os elementos da requisição

    if(!name || !url) return res.end("show");

    if(del) return res.end('delete');

    return res.end('create');
    
}).listen(3000, () => console.log('API rodando...'));


// /?name=John&url=http://example.com
// /?name=John&url=http://example.com&del=true