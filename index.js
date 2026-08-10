import express from "express"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())

// 1. CONFIGURAÇÃO DO BANCO DE DADOS (Posicionado no topo para evitar erros)
const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MC"
})

// 2. BUSCAR TODOS OS FILMES
app.get("/filmes", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_PedroOtavio"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao buscar filmes." })
        } else {
            return response.json(data)
        }
    })
})

// 3. CADASTRAR UM NOVO FILME
app.post("/filmes", (request, response) => {
    const { titulo, genero, classificacao_indicativa, duracao } = request.body

    const insertCommand = "INSERT INTO filmes_PedroOtavio (titulo, genero, classificacao_indicativa, duracao) VALUES (?, ?, ?, ?)"

    database.query(insertCommand, [titulo, genero, classificacao_indicativa, duracao], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao cadastrar filme." })
        } else {
            return response.status(201).json({
                message: "Filme cadastrado com sucesso!"
            })
        }
    })
})

// 4. DELETAR UM FILME PELO ID
app.delete("/filmes/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_PedroOtavio WHERE id = ?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao deletar filme." })
        } else {
            return response.json({
                message: "Filme apagado com sucesso!"
            })
        }
    })
})

// 5. BUSCAR APENAS FILMES DE AÇÃO (Adaptado da rota de tarefas concluídas)
app.get("/filmes/acao", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_PedroOtavio WHERE genero = 'Ação'"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao buscar filmes de Ação." })
        } else {
            return response.json(data)
        }
    })
})

// 6. BUSCAR APENAS FILMES COM CLASSIFICAÇÃO LIVRE (Adaptado da rota de tarefas pendentes)
app.get("/filmes/livre", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_PedroOtavio WHERE classificacao_indicativa = 'Livre'"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao buscar filmes com classificação Livre." })
        } else {
            return response.json(data)
        }
    })
})

// 7. INICIAR O SERVIDOR (Sempre a última linha do arquivo)
app.listen(3333, () => {
    console.log("Servidor online rodando em http://localhost:3333")
})