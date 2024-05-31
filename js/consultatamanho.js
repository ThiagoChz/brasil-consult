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

    const URLapi = `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${selecionado}/metadados`;
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
        let area = entry.area.dimensao; 
        let divItem = document.createElement('div');
        divItem.className = 'item mb-3 p-2 border';

        let divArea = document.createElement('div');
        divArea.className = 'area';
        divArea.textContent = `Área do respectivo estado é KM2: ${area}`;

        divItem.appendChild(divArea);
        resultados.appendChild(divItem); 
    });
}