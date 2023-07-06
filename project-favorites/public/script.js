const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')

// Função que carrega o conteúdo da API.
async function load(nome="", url="", del=false) {
    // fetch está como await para evitar que entre num esquema de promisse e só devolva o conteúdo após a iteração qua acontece em seguida.
    const res = await fetch('http://localhost:3000/?nome='+nome+'&url='+url+'&del='+del)
        .then(data => data.json())
    // Iterando no vetor com o conteúdo (JSON) que está vindo da API e adicionando-os no frontend.
    res.urls.map(({name, url}) => addElement({name, url}))
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

  load(nome,url)

  document.getElementById('links').appendChild(listItem);
}

function removeElement(element,nome,url) {
    load(nome,url, true)
    element.parentNode.removeChild(element);
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

    addElement({ name, url })

    input.value = ''

})