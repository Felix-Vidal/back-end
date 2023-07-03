const links = document.querySelector("ul#links");

fetch("http://jsonplaceholder.typicode.com/users") //mudar para onde ta o arquivo JSON
  .then(resposta => {
    if (!resposta.ok) {
      throw new Error("Erro ao obter os links.");
    }
    return resposta.json();
  })
  .then(data => {
    data.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = 'https://chat.openai.com/'; // add link do site `{link.link}
      // usar {link.name} e {link.link}
      li.textContent = `${link.name} - ${link.email}`;
      a.appendChild(li);
      links.appendChild(a);
    });
  })
  .catch(error => {
    console.log(error);
    const li = document.createElement("li");
    li.textContent = "Erro ao obter os links.";
    links.appendChild(li);
});