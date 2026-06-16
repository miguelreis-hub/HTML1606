// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // Captura os elementos do HTML pelos IDs
    const celsiusInput = document.getElementById('celsiusInput');
    const btnConverter = document.getElementById('btnConverter');
    const resultadoDiv = document.getElementById('resultado');

    // Escuta o clique no botão
    btnConverter.addEventListener('click', () => {
        const valorTexto = celsiusInput.value.trim();

        // Validação: se o campo estiver vazio
        if (valorTexto === '') {
            resultadoDiv.innerHTML = '<p style="color: #dc3545; font-weight: bold; text-align: center;">Por favor, digite uma temperatura!</p>';
            return;
        }

        // Converte o texto digitado para número decimal
        const celsius = parseFloat(valorTexto);

        // Aplica a fórmula matemática: (C * 1.8) + 32
        const fahrenheit = (celsius * 1.8) + 32;

        // Limpa o texto antigo e renderiza o novo bloco de resultado com CSS
        resultadoDiv.innerHTML = `
            <div class="resultado-box">
                <strong>${celsius}°C</strong> equivale a 
                <span class="destaque-temp">${fahrenheit.toFixed(1)}°F</span>
            </div>
        `;
    });
});