// Seleciona o formulário pelo ID
const form = document.querySelector("#form");

// Adiciona um listener para o evento de submissão do formulário
form.addEventListener('submit', function(event){
    event.preventDefault();  // Previne o comportamento padrão de submissão do formulário
    let dadosForm = new FormData(form);  // Cria um novo FormData a partir do formulário
    const nomePessoa = dadosForm.get('nome');  // Obtém o valor do campo 'nome'
    console.log(nomePessoa);
    buscarNome(nomePessoa);  // Chama a função buscarNome com o nome da pessoa
});

// Função para buscar o nome na API
function buscarNome(nomePessoa){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    const URLapi = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nomePessoa}`;
    consultaNome(URLapi, options);  // Chama a função consultaNome com a URL e as opções
}

// Função assíncrona para consultar a API
async function consultaNome(URLapi, options){
    try {
        const resp = await fetch(URLapi, options);  // Faz a requisição à API
        if (resp.status === 200) {
            const obj = await resp.json();  // Converte a resposta para JSON
            console.log(obj);  // Inspeciona a estrutura do JSON retornado
            exibirDados(obj);  // Chama a função para exibir os dados no HTML
        } else {
            console.log('Erro na API');
        }
    } catch (error) {
        console.log('Erro de rede ou na solicitação', error);
    }
}

// Função para exibir os dados no HTML
function exibirDados(data) {
    let resultados = document.querySelector("#resultados");
    resultados.innerHTML = "";  // Limpa os resultados anteriores, se houver

    data.forEach(entry => {
        let nome = entry.nome;

        entry.res.forEach(item => {
            let periodo = item.periodo;
            let frequencia = item.frequencia;
            let localidade = item.localidade;  // Acessa o campo localidade corretamente

            // Criação dos elementos div
            let divItem = document.createElement('div');
            divItem.className = 'item mb-3 p-2 border';

            let divNome = document.createElement('div');
            divNome.className = 'nome';
            divNome.textContent = `Nome: ${nome}`;

            let divPeriodo = document.createElement('div');
            divPeriodo.className = 'periodo';
            divPeriodo.textContent = `Período: ${periodo}`;

            let divFrequencia = document.createElement('div');
            divFrequencia.className = 'frequencia';
            divFrequencia.textContent = `Frequência: ${frequencia}`;

            let divLocalidade = document.createElement('div');
            divLocalidade.className = 'localidade';
            divLocalidade.textContent = `Localidade: ${localidade || 'Não disponível'}`;

            // Adiciona os divs ao div principal
            divItem.appendChild(divNome);
            divItem.appendChild(divPeriodo);
            divItem.appendChild(divFrequencia);
            divItem.appendChild(divLocalidade);

            // Adiciona o div principal ao contêiner de resultados
            resultados.appendChild(divItem);
        });
    });
}
