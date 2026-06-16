// Mapeando os elementos do HTML
const numInput = document.getElementById('numInput');
const btnGerar = document.getElementById('btnGerar');
const resultadoArea = document.getElementById('resultado');

// Função que calcula e renderiza a tabuada
function gerarTabuada() {
    const numero = Number(numInput.value);

    // Validação básica caso o campo esteja vazio
    if (numInput.value === '') {
        alert('Por favor, digite um número antes de gerar!');
        return;
    }

    // Limpa o conteúdo anterior da área de resultado
    resultadoArea.innerHTML = '';

    // Loop para gerar de 1 a 10
    for (let i = 1; i <= 10; i++) {
        // Cria um elemento de parágrafo <p> para cada linha
        const linha = document.createElement('p');
        linha.className = 'linha-tabuada';
        
        // Insere o texto da multiplicação (ex: 7 x 1 = 7)
        linha.innerHTML = `${numero} &times; ${i} = <strong>${numero * i}</strong>`;
        
        // Adiciona a linha criada dentro do container de resultados
        resultadoArea.appendChild(linha);
    }
}

// Dispara a função ao clicar no botão
btnGerar.addEventListener('click', gerarTabuada);

// Atalho extra: Dispara a função também ao apertar a tecla "Enter" dentro do input
numInput.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        gerarTabuada();
    }
});