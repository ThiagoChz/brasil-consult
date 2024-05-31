function pegarSelecionado() {
    event.preventDefault();
    var selectElement = document.querySelector(".form-select");
    var selecionado = selectElement.value;
    console.log("Selecionado:", selecionado);
    buscarMalha(selecionado);
}

function buscarMalha(selecionado) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'aplication/json'
        }
    };

    const URLapi = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selecionado}/regioes-metropolitanas`;
    consultaMalha(URLapi, options); 
}

async function consultaMalha(URLapi, options){
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


                   
            let divItem = document.createElement('div');
            divItem.className = 'item mb-3 p-2 border';

            let divNome = document.createElement('div');
            divNome.className = 'nome';
            divNome.textContent = `Nome: ${nome}`;


            divItem.appendChild(divNome);
           

            resultados.appendChild(divItem);
        });
    };
