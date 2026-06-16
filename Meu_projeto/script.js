/**
 * Calculadora Modular - Lógica de Interação
 * Escrito com foco em manutenibilidade e prevenção de erros.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleção de elementos usando IDs e classes BEM
    const visor = document.getElementById('visor');
    const botoesNum = document.querySelectorAll('.btn--num');
    const botoesOp = document.querySelectorAll('.btn--operator');
    const btnLimpar = document.getElementById('limpar');
    const btnApagar = document.getElementById('apagar');
    const btnIgual = document.getElementById('igual');

    // Array de controle para os operadores permitidos
    const operadoresPermitidos = ['+', '-', '*', '/'];

    // Função auxiliar para verificar se o último caractere do visor é um operador
    const isUltimoCaractereOperador = () => {
        if (!visor.value) return false;
        return operadoresPermitidos.includes(visor.value.slice(-1));
    };

    // 2. Lógica dos Números e Ponto Decimal
    botoesNum.forEach(botao => {
        botao.addEventListener('click', () => {
            const valor = botao.innerText;

            // Se o visor estiver mostrando erro, limpa antes de iniciar nova digitação
            if (visor.value === 'Erro') visor.value = '';

            // Lógica avançada para o ponto decimal
            if (valor === '.') {
                // Divide a expressão atual pelos operadores para analisar apenas o número atual
                const partes = visor.value.split(/[\+\-\*\/]/);
                const ultimoNumero = partes[partes.length - 1];
                
                // Se o número atual já tem um ponto, ignora o clique
                if (ultimoNumero.includes('.')) return; 
                
                // Se começar com ponto (ex: clicou em '.' no visor vazio ou após um '+')
                if (visor.value === '' || isUltimoCaractereOperador()) {
                    visor.value += '0.'; 
                    return;
                }
            }

            visor.value += valor;
        });
    });

    // 3. Lógica dos Operadores
    botoesOp.forEach(botao => {
        botao.addEventListener('click', () => {
            // Pega o operador do atributo data-op (mais seguro que ler o texto do botão)
            const operador = botao.getAttribute('data-op');

            if (visor.value === '' || visor.value === 'Erro') return;

            // Se o último caractere já for um operador, apenas substitui pelo novo
            if (isUltimoCaractereOperador()) {
                visor.value = visor.value.slice(0, -1) + operador;
            } else {
                visor.value += operador;
            }
        });
    });

    // 4. Lógica de Limpar tudo (C)
    btnLimpar.addEventListener('click', () => {
        visor.value = '';
    });

    // 5. Lógica de Apagar último caractere (DEL)
    btnApagar.addEventListener('click', () => {
        if (visor.value === 'Erro') {
            visor.value = '';
        } else {
            visor.value = visor.value.slice(0, -1);
        }
    });

    // 6. Lógica de Calcular o Resultado (=)
    btnIgual.addEventListener('click', () => {
        try {
            if (visor.value === '' || visor.value === 'Erro') return;
            
            // Se a conta terminar em um operador (ex: "5+"), remove o "+" antes de calcular
            if (isUltimoCaractereOperador()) {
                visor.value = visor.value.slice(0, -1);
            }

            // A função 'new Function' é uma alternativa mais limpa e isolada ao 'eval()'
            // Ela cria uma função anônima que retorna o resultado da expressão matemática
            const calculo = new Function('return ' + visor.value)();

            // Tratamento: Divisão por zero no JS retorna Infinity
            if (!isFinite(calculo) || Number.isNaN(calculo)) {
                visor.value = 'Erro';
                return;
            }

            // Formatação: parseFloat + toFixed(8) corrige as falhas de ponto flutuante do JS
            // mantendo os números inteiros limpos e limitando casas decimais excessivas.
            visor.value = parseFloat(calculo.toFixed(8));

        } catch (erro) {
            console.error('Erro na expressão matemática:', erro);
            visor.value = 'Erro';
        }
    });
});