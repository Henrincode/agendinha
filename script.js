const BANCO_CONTATOS = 'contatos'
const contatosDados = dadosCarregar(BANCO_CONTATOS, [])

function dadosCarregar(banco, err) {
    if (!banco) {
        console.error('Banco de dados não informado')
        return err
    }
    const dados = localStorage.getItem(banco)
    return dados ? JSON.parse(dados) : err
}

function dadosSalvar(dados, banco) {
    if (!dados) {
        console.error('Dados não informado')
        return
    } else if (!banco) {
        console.error('Banco de dados não informada')
        return
    }
    dados = JSON.stringify(dados)
    localStorage.setItem(banco, dados)
}

function contatosAdicionar(contato) {
    contatosDados.push(contato)
    dadosSalvar(contatosDados, BANCO_CONTATOS)
}

function contatosAlterar(contato) {
    const indice = contatosDados.findIndex(c => c.id === contato.id)
    contatosDados[indice] = contato
    dadosSalvar(contatosDados, BANCO_CONTATOS)
}

function contatosApagar(contato) {
    const indice = contatosDados.findIndex(c => c.id == contato.id)
    contatosDados.splice(indice, 1)
    dadosSalvar(contatosDados, BANCO_CONTATOS)
}