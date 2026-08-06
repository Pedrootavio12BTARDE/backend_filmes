import express from "express"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())

// Configuração da Conexão com o Banco de Dados
const database = mysql2.createPool({
  host: "benserverplex.ddns.net",
  user: "aluno_projetos",
  password: "aluno@projeto",
  database: "todo_03mc"
})

// Rota principal
app.get("/", (request, response) => {
    return response.json({
        message: "API de Catálogo de Filmes online!"
    })
})

// Rota para cadastrar filmes
app.post("/filmes", (request, response) => {
  // 1. Recebe os dados do filme
  const { titulo, genero, classificacao_indicativa, duracao } = request.body

  // 2. Comando SQL atualizado com a sua tabela
  const insertCommand = "INSERT INTO filmes_PedroOtavio (titulo, genero, classificacao_indicativa, duracao) VALUES (?, ?, ?, ?)"

  // 3. Executa a query no banco
  database.query(insertCommand, [titulo, genero, classificacao_indicativa, duracao], (error) => {
      if (error) {
          console.log(error)
          return response.status(500).json({
              error: "Erro ao cadastrar o filme no banco de dados."
          })
      } else {
          return response.status(201).json({
              message: "Filme criado com sucesso!"
          })
      }
  })
})

// Ligando o servidor
app.listen(3333, () => {
    console.log("Servidor rodando em http://localhost:3333")
})