const form = document.querySelector("#form");


form.addEventListener('submit', function(event){
    event.preventDefault();  
    let dadosForm = new FormData(form);  
    const nomePessoa = dadosForm.get('nome');  
    console.log(nomePessoa);
    buscarNome(nomePessoa);  
});

function buscarNome(nomePessoa){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    const URLapi = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nomePessoa}`;
    consultaNome(URLapi, options); 
}


async function consultaNome(URLapi, options){
    try {
        const resp = await fetch(URLapi, options);  
        if (resp.status === 200) {
            const obj = await resp.json();  
            console.log(obj);  
            exibirDados(obj);  
        } else {
            console.log('Erro na API');
        }
    } catch (error) {
        console.log('Erro de rede ou na solicitação', error);
    }
}


function exibirDados(data) {
    let resultados = document.querySelector("#resultados");
    resultados.innerHTML = ""; 

    data.forEach(entry => {
        let nome = entry.nome;
        let localidade = entry.localidade;
        
        entry.res.forEach(item => {
            let periodo = item.periodo;
            let frequencia = item.frequencia;
           
             

   
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

        
            divItem.appendChild(divNome);
            divItem.appendChild(divPeriodo);
            divItem.appendChild(divFrequencia);
            divItem.appendChild(divLocalidade);

            resultados.appendChild(divItem);
        });
    });
}
