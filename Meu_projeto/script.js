// 1. Selecionando os elementos do HTML
const visor = document.getElementById('visor');
const botoesNumeros = document.querySelectorAll('.numero');
const botoesOperadores = document.querySelectorAll('.operador');
const botaoIgual = document.getElementById('igual');
const botaoLimpar = document.getElementById('limpar');
const botaoApagar = document.getElementById('apagar');

// 2. Função para adicionar números e pontos ao visor
botoesNumeros.forEach(botao => {
    botao.addEventListener('click', () => {
        // Evita colocar mais de um ponto no visor se já houver um no último número
        if (botao.innerText === '.' && visor.value.includes('.')) {
            // Uma verificação simples: se o visor já tem ponto e o último caractere não é um operador, ignoramos.
            // (Para uma calculadora perfeita, a lógica do ponto é mais complexa, mas essa serve para começar!)
        }
        visor.value += botao.innerText;
    });
});

// 3. Função para adicionar operadores (+, -, *, /)
botoesOperadores.forEach(botao => {
    botao.addEventListener('click', () => {
        if (visor.value === '') return; // Não adiciona operador se o visor estiver vazio

        const ultimoCaractere = visor.value.slice(-1);
        const operadores = ['+', '-', '*', '/'];

        // Se o último caractere digitado já for um operador, nós o substituímos pelo novo
        if (operadores.includes(ultimoCaractere)) {
            visor.value = visor.value.slice(0, -1) + botao.innerText;
        } else {
            visor.value += botao.innerText;
        }
    });
});

// 4. Função para o botão "C" (Limpar tudo)
botaoLimpar.addEventListener('click', () => {
    visor.value = '';
});

// 5. Função para o botão "DEL" (Apagar o último caractere)
botaoApagar.addEventListener('click', () => {
    visor.value = visor.value.slice(0, -1);
});

// 6. Função para o botão "=" (Calcular o resultado)
botaoIgual.addEventListener('click', () => {
    try {
        if (visor.value !== '') {
            // A função eval() executa a string como código matemático. 
            // Exemplo: eval("2+2") retorna 4.
            let resultado = eval(visor.value);
            
            // Verifica se o resultado é infinito (ex: divisão por zero) ou inválido
            if (!isFinite(resultado) || isNaN(resultado)) {
                visor.value = "Erro";
            } else {
                visor.value = resultado;
            }
        }
    } catch (erro) {
        // Se houver algum erro na conta (ex: 5++5), mostra "Erro"
        visor.value = "Erro";
    }
});