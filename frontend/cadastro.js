const API_URL = "http://localhost:3333/filmes"
const form = document.querySelector("#form-cadastro")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const novoFilme = {
        titulo: document.querySelector("#titulo").value,
        genero: document.querySelector("#genero").value,
        classificacao_indicativa: document.querySelector("#classificacao").value,
        duracao: Number(document.querySelector("#duracao").value)
    }

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoFilme)
        })

        if (resposta.ok) {
            alert("Filme cadastrado com sucesso!")
            // Redireciona para a página do catálogo após o cadastro
            window.location.href = "index.html"
        } else {
            alert("Erro ao cadastrar o filme.")
        }
    } catch (error) {
        console.error("Erro na requisição:", error)
        alert("Erro ao conectar com o servidor.")
    }
})