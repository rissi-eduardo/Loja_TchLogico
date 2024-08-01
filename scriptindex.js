   // Estamos efetuando a alteração do texto do cabeçalho quando for clicado
   const header = document.querySelector('header h1');
   header.addEventListener('click', function() {
       header.textContent = 'Bem-vindos e muito obrigado por acessar à Loja do Rissi Eduardo!';
   });

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
    const resultado = document.querySelector('.resultado');
    const termoBusca = input.value;

/* Estamos adicionando a URL da API do Mercado Livre */
    const apiUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';

    /* Agora estamos utilizando a função fetch(apiUrl) para retornar o resultado dos produtos procurados a partir do arquivo json */
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const produtosEncontrados = data.results; 
            results.innerHTML = `<p>Resultados para "${termoBusca}":</p>`;
            
            /* Etamos usando a função map() para criar uma lista de produtos */
            const produtosHTML = produtosEncontrados.map(produto => `<p>${produto.title}</p>`).join('');
            results.innerHTML += produtosHTML;
        })
        .catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
}
