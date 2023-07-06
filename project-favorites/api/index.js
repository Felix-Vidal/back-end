const http = require('http'); //criar o servidor
const data = require('./urls.json'); //pegar os elementos do json
const URL = require('url'); //requisições
const fs = require('fs');
const path = require('path')

function writeFile(cb){
    fs.writeFile(
        path.join(__dirname, 'urls.json'),
        JSON.stringify(data, null, 2),
        err => {
            if (err) throw err
            cb('Operação realizada com sucesso!')
        }
    )
}

http.createServer((req,res) => {
    const {name, url, del} = URL.parse(req.url, true).query //declarar os elementos da requisição

    res.writeHead(200, {
        'Access-Control-Allow-Origin':'*'
    })

    if(!name || !url) return res.end(JSON.stringify(data)); //se não tiver nenhum elemento ele faz a requisição dos dados 

    
    if(del){
        data.urls = data.urls.filter(item => item.url != url)
        return writeFile(message => res.end(message))
    } 
        
    data.urls.push({name, url})
    return writeFile(message => res.end(message))
    
}).listen(3000, () => console.log('API rodando...'));


// /?name=John&url=http://example.com
// /?name=John&url=http://example.com&del=true