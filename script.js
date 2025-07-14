// =====================================================
// 🌍 VARIÁVEIS GLOBAIS
// =====================================================

const BANCO_CONTATOS = 'contatos'
const contatosDados = dadosCarregar(BANCO_CONTATOS, [])

// =====================================================
// 📌 SELETORES DOM
// =====================================================

const contatos = document.querySelector('#contatos')

// =====================================================
// 🎯 EVENTOS
// =====================================================

contatos.innerHTML = `
            <div class="contato">
                <i class="foto bi bi-person-circle"></i>
                <ul>
                    
                    <li class="nome">
                        ${capitalize(maxString('aRTHr mArson', 13))}
                    </li>
                </ul>
            </div>
            <div class="contato">a</div>
            <div class="contato">a</div>
            <div class="contato">a</div>
`

// =====================================================
// 🛠️ FUNÇÕES
// =====================================================

// CONEXÃO COM BANCO
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

// FUNÇÕES DE CONTATOS
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
    if (indice !== -1) {
        contatosDados.splice(indice, 1)
        dadosSalvar(contatosDados, BANCO_CONTATOS)
    }
}

// =====================================================
// 🛠️ FUNÇÕES UTILITÁRIAS
// =====================================================

// Máximo de caracteres
function maxString(string, max) {
    return string.length <= max ? string : string.slice(0, max) + '...'
}

// CAIXA ALTA NA PRIMEIRA LETRA DE CADA PALAVRA
function capitalize(string = '') {
    return string.toLowerCase()
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ')
}