/* Vamos criar um script para ser utilizado para manipular o arquivo cart.html */

/* Estamos criando a função que carrega a fonte da imagem logotipo do Mercado Livre */
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

/* Estamos selecionando o primeiro elemento com a classe 'search' e também estamos selecionando o primeiro elemento com a classe 'btn-search' e podemos notar que adicionamos [0] para acessar o primeiro elemento com a classe especificada */
const inputC = document.getElementsByClassName('search')[0];
const buttonInfo = document.getElementsByClassName('btn-search')[0];
const resultado = document.getElementsByClassName('resultado-search')[0];

function buscarProduto() {
  const input = document.querySelector('.search');
  const results = document.querySelector('.resultado');
  const termoBusca = input.value;

  /* Estamos adicionando a URL da API do Mercado Livre */
  const apiUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';

  /* Agora estamos utilizando a função fetch(apiUrl) para retornar o resultado dos produtos procurados a partir do arquivo json */
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const produtosEncontrados = data.results;
      results.innerHTML = `<p>Resultados para "${termoBusca}":</p>`;

      /* Estamos usando a função map() para criar uma lista de produtos */
      const produtosHTML = produtosEncontrados.map(produto => `<p>${produto.title}</p>`).join('');
      results.innerHTML += produtosHTML;
    })
    .catch(error => {
      console.error('Erro ao buscar produtos:', error);
    });
}

/* Estamos pegando os elementos html do arquivo cart.html */
document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('products');
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  let cart = [];

/* Uma Função para buscar os produtos da API do Mercado Livre a onde têmos os dados que recebem ou ficam aguardando a resposta do arquivo ponto json então retornam os dados resultante  */
  async function fetchProducts() {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=notebooks');
    const data = await response.json();
    return data.results;
  }

/* Função para renderizar os produtos na tela, modificando o cabeçalho h, o parágrafo p, a imagem e acionando o botão "Adicionar ao Carrinho" */
function renderProducts(products) {
  products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
          <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="${product.thumbnail}" alt="${product.title}">
              <div class="card-body">
                  <h3 class="card-title">${product.title}</h3>
                  <p class="card-text">R$ ${product.price}</p>
                  <a href="#" class="btn"><button data-id="${product.id}">Adicionar ao Carrinho</button></a>
              </div>
          </div>`;
      productsContainer.appendChild(productElement);
  });
}

/* Agora temos a Função para adicionar os produto ao carrinho dependendo de uma condição se produto então dentro das chaves têmos a fórmula quantidade+=1, ou seja, estamos obtendo a quantidade sendo igual a quantidade somada com 1, e um se não o elemento produto que recebe uma seleção de consulta com um botão contendo a igualdade entre o ID de dados e ID do produto fazendo com que no cabeçário h tenha um novo produto que é adicionado ao carrinho e o resultado de renderizar esse carrinho aparece quando chamamos a função */
  function addToCart(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
      product.quantity += 1;
    } else {
      const productElement = document.querySelector(`button[data-id="${productId}"]`).parentElement;
      const newProduct = {
        id: productId,
        title: productElement.querySelector('h3').innerText,
        price: parseFloat(productElement.querySelector('p').innerText.replace('R$ ', '')),
        quantity: 1
      };
      cart.push(newProduct);
    }
    renderCart();
  }

    /* Por fim na Função para renderizar o carrinho com o Recipiente de itens no carrinho poderá modificar o HTML interno recebendo o total inicial em zero e para cada itens do carrinho será criado uma linha de lista na lista geral, assim têmos a modificação dessa lista nos elementos internos do html utilizando o botão remover e pela forma total += item.price * item.quantity nos pocibilita visualizar o preço final */
  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const cartItemElement = document.createElement('li');
      cartItemElement.innerHTML = `
        ${item.title} - R$ ${item.price} x ${item.quantity}
        <button data-id="${item.id}">Remover</button>
      `;
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price * item.quantity;
    });
    totalPriceElement.innerText = `R$ ${total.toFixed(2)}`;
  }

    // Função para criar o botão de compra
function criarBotaoDeCompra(productId) {
  const button = document.createElement('button');
  button.innerText = 'Comprar'; // Texto do botão

  // Quando o botão for clicado, chamamos a função para adicionar o produto ao carrinho
  button.addEventListener('click', () => {
    adicionarProdutoAoCarrinho(productId);
  });

  return button;
}
 
/* Função para remover o produto do carrinho utilizando o o ID do produto e dentro das chaves temos o carrinho recebendo um filtro de items que são renovados pelo ID do produto quando ele é diferente do iten expecifico, assim o carrinho pode ser renderizado */
  function removeFromCart(productId) {
        /* Estamos filtrando os itens do carrinho, mantendo apenas aqueles com IDs diferentes do produto a ser removido */
    cart = cart.filter(item => item.id !== productId);
        /* Estamos chamando a função para renderizar o carrinho novamente, isso porque já vimos essa função anteriormente no nosso código */
    renderCart();
  }

/* Temos um Recipiente de produtos que sofre um click ou é selecionado, e com o se então pocibilita o evento alvo que faz referencia ao botão e ainda contêm o ID do produto com o evento alvo que pega o atributo ID de dados para adicionar ao carrinho pelo ID do produto */
  productsContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const productId = event.target.getAttribute('data-id');
      addToCart(productId);
    }
  });

/* O Recipiente dos Itens do carrinho contendo um se então com o evento alvo com uma marcação nomeada que recebe o botão na obtendo o ID do produto que recebe o evento alvo para pegar o atributo ID de dados para remover o produto do carrinho */
  cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const productId = event.target.getAttribute('data-li');
      / Agora estamos  chamando a função para remover o produto do carrinho */
      removeFromCart(productId);
    }
  });

/* Inicialização da busca de produtos para serem vendidos */
  fetchProducts().then(products => renderProducts(products));
});


