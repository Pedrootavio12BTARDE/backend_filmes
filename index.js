import express from "express"
import mysql2 from "mysql2"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())


 const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MC"
})

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




app.put("/filmes/:id", (request, response) => {
    const { id } = request.params
    const { titulo, genero, classificacao_indicativa, duracao } = request.body

    const updateCommand = `
        UPDATE filmes_PedroOtavio 
        SET titulo = ?, genero = ?, classificacao_indicativa = ?, duracao = ? 
        WHERE id = ?
    `

    database.query(updateCommand, [titulo, genero, classificacao_indicativa, duracao, id], (error, result) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao atualizar o filme." })
        }

         if (result.affectedRows === 0) {
            return response.status(404).json({ message: "Filme não encontrado." })
        }

        return response.json({
            message: "Filme atualizado com sucesso!"
        })
    })
})

 app.listen(3333, () => {
    console.log("Servidor online rodando em http://localhost:3333")
})