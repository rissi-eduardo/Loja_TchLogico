document.getElementById('cepForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const cep = document.getElementById('cepInput').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  
  if(cep) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data.erro){
          document.getElementById('resultado').textContent = 'Não foi encontrado o CEP.';
        } else {
          document.getElementById('resultado').textContent = `Cidade: ${data.localidade}`;
        }  
      })
      .catch(error => {
        document.getElementById('resultado').textContent = 'Erro ao buscar dados.';
      })
  } else {
     document.getElementById('resultado').textContent = 'Digite um CEP válido.';
  }
});
