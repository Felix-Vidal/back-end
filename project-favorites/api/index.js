// const http = require('http'); // Importa o módulo 'http' do Node.js
// const data = require('./urls.json'); // Importa o arquivo 'urls.json' como objeto de dados
// const URL = require('url'); // Importa o módulo 'url' do Node.js
// const fs = require('fs'); // Importa o módulo 'fs' do Node.js para lidar com operações de arquivo
// const path = require('path'); // Importa o módulo 'path' do Node.js para lidar com caminhos de arquivo

// function writeFile(cb) {
//   fs.writeFile(
//     path.join(__dirname, 'urls.json'), // Caminho para o arquivo 'urls.json'
//     JSON.stringify(data, null, 2), // Converte os dados em formato JSON e formata com 2 espaços de indentação
//     (err) => {
//       if (err) throw err; // Lança um erro caso ocorra algum problema na escrita do arquivo
//       cb('Operação realizada com sucesso!'); // Chama a função de retorno com a mensagem de sucesso
//     }
//   );
// }

// http.createServer((req, res) => { // Cria um servidor HTTP
//   const { name, url, del, updateName, updateURL } = URL.parse(req.url, true).query; // Extrai os parâmetros da URL da requisição

//   res.writeHead(200, { // Define o cabeçalho da resposta HTTP
//     'Access-Control-Allow-Origin': '*', // Permite todas as origens (CORS)
//     'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
//   });

//   if (!name || !url) { // Verifica se name e url estão ausentes
//     if (del === 'true') { // Verifica se a operação é de exclusão
//       const updatedData = data.urls.filter((item) => item.name !== name || item.url !== url); // Filtra os itens para excluir o item específico
//       if (updatedData.length < data.urls.length) { // Verifica se houve alteração nos dados
//         data.urls = updatedData; // Atualiza os dados com o novo conjunto de itens
//         return writeFile((message) => res.end(JSON.stringify({ message }))); // Escreve os dados atualizados no arquivo e envia a resposta com a mensagem de sucesso
//       }
//     }
//     return res.end(JSON.stringify(data)); // Retorna os dados como resposta caso não haja name ou url
//   }

//   if (updateName && updateURL) { // Verifica se os parâmetros de atualização estão presentes
//     const itemIndex = data.urls.findIndex((item) => item.name === name && item.url === url); // Encontra o índice do item a ser atualizado
//     if (itemIndex !== -1) { // Verifica se o item foi encontrado
//       data.urls[itemIndex].name = updateName; // Atualiza o nome do item
//       data.urls[itemIndex].url = updateURL; // Atualiza a URL do item
//       return writeFile((message) => res.end(JSON.stringify({ message }))); // Escreve os dados atualizados no arquivo e envia a resposta com a mensagem de sucesso
//     }
//   }

//   if (del === 'true') { // Verifica se a operação é de exclusão
//     const itemIndex = data.urls.findIndex((item) => item.name === name && item.url === url); // Encontra o índice do item a ser excluído
//     if (itemIndex !== -1) { // Verifica se o item foi encontrado
//       data.urls.splice(itemIndex, 1); // Remove o item da lista
//       return writeFile((message) => res.end(JSON.stringify({ message }))); // Escreve os dados atualizados no arquivo e envia a resposta com a mensagem de sucesso
//     }
//   }

//   data.urls.push({ name, url }); // Adiciona um novo item aos dados
//   return writeFile((message) => res.end(JSON.stringify({ message }))); // Escreve os dados atualizados no arquivo e envia a resposta com a mensagem de sucesso
// }).listen(3000, () => console.log('API rodando...')); // Inicia o servidor na porta 3000 e exibe uma mensagem de confirmação

// // Exemplos de URLs para diferentes operações:
// // /?name=John&url=http://example.com
// // /?name=John&url=http://example.com&del=true
// // /?name=John&url=http://example.com&updateName=NewName&updateURL=http://newurl.com
