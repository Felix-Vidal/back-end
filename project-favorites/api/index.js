const http = require('http'); // Importar o módulo http para criar o servidor
const data = require('./urls.json'); // Importar os elementos do arquivo JSON 'urls.json'
const URL = require('url'); // Importar o módulo URL para manipulação de requisições
const fs = require('fs'); // Importar o módulo fs para operações de arquivo
const path = require('path'); // Importar o módulo path para manipulação de caminhos de arquivo

function writeFile(cb) {
    fs.writeFile(
        path.join(__dirname, 'urls.json'), // Caminho absoluto para o arquivo urls.json
        JSON.stringify(data, null, 2), // Converter o objeto 'data' em uma string JSON formatada com 2 espaços de indentação
        err => {
            if (err) throw err; // Lançar um erro caso ocorra algum problema na escrita do arquivo
            cb('Operação realizada com sucesso!'); // Executar a função de retorno de chamada (callback) com uma mensagem de sucesso
        }
    );
}

http.createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query; // Extrair os elementos 'name', 'url' e 'del' dos parâmetros da URL da requisição

    if (!name || !url) return res.end(JSON.stringify(data)); // Se 'name' ou 'url' estiverem ausentes, retornar os dados atuais em formato JSON

    if (del) {
        // Se 'del' estiver presente na URL
        data.urls = data.urls.filter(item => item.url != url); // Filtrar os elementos do objeto 'data.urls' removendo aquele que tem a mesma URL do parâmetro
        return writeFile(message => res.end(message)); // Escrever os dados atualizados no arquivo e retornar uma mensagem de sucesso em formato JSON
    }

    data.urls.push({ name, url }); // Adicionar um novo objeto com 'name' e 'url' ao array 'data.urls'
    return writeFile(message => res.end(message)); // Escrever os dados atualizados no arquivo e retornar uma mensagem de sucesso em formato JSON

}).listen(3000, () => console.log('API rodando...')); // Criar o servidor HTTP na porta 3000 e exibir uma mensagem no console quando estiver rodando


// /?name=John&url=http://example.com
// /?name=John&url=http://example.com&del=true