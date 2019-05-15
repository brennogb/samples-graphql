const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type Usuario {
       id: ID
       nome: String!
       email: String!
       idade: Int
       salario: Float
       vip: Boolean 
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float!
    }

    # Pontos de entrada da sua API!
    type Query {
        ola: String
        horaAtual: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
    }
`

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return (produto.preco * (1 - produto.desconto)).toFixed(2)
            } else {
                return produto.preco
            }
        }
    },
    Query: {
        ola() {
            return 'Hello World'
        },
        horaAtual() {
            return new Date()
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Ana da Web',
                email: 'anadaweb@email.com',
                idade: 23,
                salario_real: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Curso COD3R',
                preco: 129.99,
                desconto: 0.50
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})