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
            accept: 'image/svg+xml'
        }
    };

    const URLapi = `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${selecionado}`;
    consultaMalha(URLapi, options); 
}

async function consultaMalha(URLapi, options) {
    try {
        const resp = await fetch(URLapi, options);  
        if (resp.status === 200) {
            const svgURL = await resp.url;
            exibirSVG(svgURL);  
        } else {
            console.log('Erro na API');
        }
    } catch (error) {
        console.log('Erro de rede ou na solicitação', error);
    }
}

function exibirSVG(svgURL) {

    var svgObject = document.getElementById("svgObject");
    
    svgObject.setAttribute("data", svgURL);
}
