async function buscarFilmes() {
    // Busca os filmes da rota GET local e mostra na tela
    const resposta = await fetch("http://localhost:3333/filmes")
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")

    sectionFilmes.innerHTML = "" // Limpa a tela antes de listar

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.titulo}</h2>
                <p><strong>Gênero:</strong> ${filme.genero}</p>
                <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classificacao_indicativa}</p>
            </div>
        `
    })
}

buscarFilmes()