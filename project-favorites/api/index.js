const http = require('http');
const data = require('./urls.json');
const URL = require('url');
const fs = require('fs');
const path = require('path');

function writeFile(cb) {
  fs.writeFile(
    path.join(__dirname, 'urls.json'),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err;
      cb('Operação realizada com sucesso!');
    }
  );
}

http.createServer((req, res) => {
  const { name, url, del, updateName, updateURL } = URL.parse(req.url, true).query;

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });

  if (!name || !url) {
    if (del) {
      data.urls = data.urls.filter((item) => item.url !== url);
      return writeFile((message) => res.end(JSON.stringify({ message })));
    }
    return res.end(JSON.stringify(data));
  }

  if (updateName && updateURL) {
    const itemIndex = data.urls.findIndex((item) => item.name === name && item.url === url);
    if (itemIndex !== -1) {
      data.urls[itemIndex].name = updateName;
      data.urls[itemIndex].url = updateURL;
      return writeFile((message) => res.end(JSON.stringify({ message })));
    }
  }

  data.urls.push({ name, url });
  return writeFile((message) => res.end(JSON.stringify({ message })));
}).listen(3000, () => console.log('API rodando...'));



// /?name=John&url=http://example.com
// /?name=John&url=http://example.com&del=true