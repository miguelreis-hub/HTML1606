// Aguarda o HTML carregar por segurança
document.addEventListener("DOMContentLoaded", () => {
    
    const minutosInput = document.getElementById('minutosInput');
    const btnConverter = document.getElementById('btnConverter');
    const resultadoDiv = document.getElementById('resultado');

    // Ao clicar no botão...
    btnConverter.addEventListener('click', () => {
        const minutos = Number(minutosInput.value);

        // Valida se o campo está vazio
        if (minutosInput.value === '') {
            resultadoDiv.innerHTML = '<p style="color: red; text-align:center;">Digite um número!</p>';
            return;
        }

        // Faz o cálculo
        const segundos = minutos * 60;

        // Troca o texto "Nenhum valor convertido ainda" pelo resultado real
        resultadoDiv.innerHTML = `
            <div style="font-size: 1.2rem; text-align: center; color: #333; margin-top: 15px;">
                <strong>${minutos} min</strong> = <span style="color: #28a745; font-weight: bold;">${segundos} seg</span>
            </div>
        `;
    });
});