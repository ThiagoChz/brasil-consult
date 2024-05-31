let form = document.getElementById("form")
form.addEventListener("submit", function(event){
    event.preventDefault()
    let dadosForm = new FormData(form)
    console.log(dadosForm.get('filme'))
    buscarFilmes(dadosForm.get('filme'))
})

function buscarFilmes(nomeFilme){
    const options = {
        method : 'GET',
        headers: {
            accept: 'application/json',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZhYzk1NTFjMTAxNGNmYzg1MzQ4ZjJhNTI5MWYzMiIsInN1YiI6IjY1MzkyOWNhMGZiMTdmMDBlMTE2M2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lJCg_oE2doRNH7VVrJHk1iZ44eNMdXfDkMCb5mPtySM'
        }
    }
    }

    let urlApi = new URL ("https://api.themoviedb.org/3/search/movie")
    urlApi.searchParams.append('query',nomeFilme)
    urlApi.searchParams.append('include_adult',true)
    urlApi.searchParams.append('language',"pt-BR")
    fetch(urlApi, options)
        .then(Response => {
            if(Response.ok==true){
                console.log("Cantou")
                return Response.json()
            }
            else{
                console.log("Deu ruim")
                let resultado = document.getElementById('resultado')
                resultado.innerText = "Deu merda ai brother"
            }
        })

        .then(data=>{
            let filmes = data.results
            filmes.forEach(filme => {
                console.log(filme.title)
                console.log(filme.overview)
                console.log("https://image.tmdb.org/t/p/w500/"+filme.poster_path)

                let divFilme = Document.createElement('div')
                let divImagem = Document.createElement('div')
                let divConteudo = Document.createElement('div')
                

            })
        })