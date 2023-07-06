const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')

// Função que carrega o conteúdo da API.
async function load(nome = '', url = '', del = false) {
    const res = await fetch(`http://localhost:3000/?name=${nome}&url=${url}&del=${del}`)
      .then(data => data.json());
  
    ul.innerHTML = '';
  
    res.urls.forEach(({ name, url }) => addElement({ name, url }));
  }

load()

function addElement({ name, url }) {
  const listItem = document.createElement('li');//cria uma lista não ordenada
  const link = document.createElement('a'); //cria um link
  const linkText = document.createTextNode(name); //coloca  texto dentro da tag li

  link.classList.add('format') //classe para formatar

  link.appendChild(linkText); //adicionar o li como filho do link
  link.href = url; //adicionar uma url dentro do link
  link.target = '_blank'; //vai para uma outra aba

  const removeButton = document.createElement('button'); //criação de um botão remover
  removeButton.classList.add("remover") //formatação do botão
  removeButton.innerHTML = 'Remover'; //formatação do botão

  removeButton.addEventListener('click', () => { //evento para pode excluir 
        removeElement(listItem,name,url);
  });

  listItem.appendChild(link); //adiciona o link como filho da li
  listItem.appendChild(removeButton); //adiciona o botão remover como filho da li 

  document.getElementById('links').appendChild(listItem);
  load(nome, url);
}

function removeElement(element,name,url) {
    element.parentNode.removeChild(element);
   load(name,url,true)
}


form.addEventListener('submit', (event) => {
    
    event.preventDefault();

    let { value } = input

    if (!value)
        return alert('Preencha o campo!')

    const [name, url] = value.split(',')

    if (!url)
        return alert('O texto não está formatado da maneira correta.')

    if (!/^http/.test(url))
        return alert('Digite a url da maneira correta.')

    addElement({ name, url });

    input.value = ''

})