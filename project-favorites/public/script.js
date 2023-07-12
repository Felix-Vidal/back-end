const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

async function load() {
  const res = await fetch('http://localhost:3000');
  const data = await res.json();

  ul.innerHTML = '';

  data.urls.forEach(({ name, url }) => addElement({ name, url }));
}

async function save({ name, url }) {
  const res = await fetch(`http://localhost:3000/?name=${name}&url=${url}`);
  const data = await res.json();
}

async function removeElement(element, name, url) {
  const res = await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=true`);
  const data = await res.json();

  if (data.message === 'Operação realizada com sucesso!') {
    element.parentNode.removeChild(element);
  } else {
    alert('Ocorreu um erro ao excluir o item.');
  }
}

async function updateElement(element, name, url) {
  const newUrl = prompt('Digite a nova URL:');

  if (newUrl) {
    const res = await fetch(`http://localhost:3000/?name=${name}&url=${url}&updateName=${name}&updateURL=${newUrl}`);
    const data = await res.json();

    if (data.message === 'Operação realizada com sucesso!') {
      const link = element.querySelector('a');
      link.href = newUrl;
    } else {
      alert('Ocorreu um erro ao atualizar o item.');
    }
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert('Preencha o campo!');

  const [name, url] = value.split(',');

  if (!url) return alert('O texto não está formatado corretamente.');

  if (!/^http/.test(url)) return alert('Digite a URL corretamente.');

  await save({ name, url });
  addElement({ name, url });

  input.value = '';
});

function addElement({ name, url }) {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  const linkText = document.createTextNode(name);

  link.classList.add('format');
  link.appendChild(linkText);
  link.href = url;
  link.target = '_blank';

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const removeButton = document.createElement('button');
  removeButton.classList.add('remover');
  removeButton.innerHTML = 'Remover';

  removeButton.addEventListener('click', () => {
    removeElement(listItem, name, url);
  });

  const updateButton = document.createElement('button');
  updateButton.classList.add('atualizar');
  updateButton.innerHTML = 'Atualizar';

  updateButton.addEventListener('click', () => {
    updateElement(listItem, name, url);
  });

  buttonContainer.appendChild(removeButton);
  buttonContainer.appendChild(updateButton);

  listItem.appendChild(link);
  listItem.appendChild(buttonContainer);

  ul.appendChild(listItem);
}


load();
