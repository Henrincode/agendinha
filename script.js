// =====================================================
// 🌍 VARIÁVEIS GLOBAIS
// =====================================================

const BANCO_CONTATOS = 'contatos'
const contatosDados = dadosCarregar(BANCO_CONTATOS, [])

// =====================================================
// 📌 SELETORES DOM
// =====================================================

// Seletores fixos no DOM - podem ficar no topo
const novoContato = {
    nome: document.querySelector('#novo-contato .nome'),
    contato: document.querySelector('#novo-contato .contato'),
    botao: document.querySelector('#novo-contato button')
}

const contatos = document.querySelector('#contatos')

// =====================================================
// 🎯 EVENTOS
// =====================================================

// QUANDO UMA LIXEIRA FOR CLICADA
contatos.addEventListener('click', e => {
    const clicado = e.target

    if (clicado.classList.contains('lixeira')) {
        const id = clicado.dataset.id // usar dataset para pegar o id
        contatosApagar(id)
        listarContatos()
    }
})

// QUANDO O BOTÃO DE ADICIONAR CONTATO FOR CLICADO
novoContato.botao.addEventListener('click', e => {
    const nome = tratarNome(novoContato.nome.value)
    const contato = Number(novoContato.contato.value)

    if (!nome || !contato) return

    const novo = { nome, contato }
    contatosAdicionar(novo)
    limparForm()
    listarContatos()
})

// ATUALIZA LISTA DE CONTATOS
listarContatos()

// =====================================================
// 🛠️ FUNÇÕES
// =====================================================

function listarContatos() {
    contatos.innerHTML = ''

    if (contatosDados.length === 0) {
        contatos.innerHTML = 'Sem contatos cadastrados'
        return
    }

    contatosDados
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }))
        .forEach(contato => {
            const id = contato.id
            const nome = maxString(contato.nome, 13)
            const tel = telefone(contato.contato)

            contatos.innerHTML += `
        <div class="contato">
          <i class="foto bi bi-person-circle"></i>
          <ul>
            <li class="nome">${nome}</li>
            <li class="tel">${tel}</li>
            <i data-id="${id}" class="lixeira bi bi-trash3-fill"></i>
          </ul>
        </div>
      `
    })
}

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
        console.error('Banco de dados não informado')
        return
    }
    dados = JSON.stringify(dados)
    localStorage.setItem(banco, dados)
}

// FUNÇÕES DE CONTATOS
function contatosAdicionar(contato) {
    contato.id = gerarID()
    contatosDados.push(contato)
    dadosSalvar(contatosDados, BANCO_CONTATOS)
}

function contatosAlterar(contato) {
    const indice = contatosDados.findIndex(c => c.id === contato.id)
    contatosDados[indice] = contato
    dadosSalvar(contatosDados, BANCO_CONTATOS)
}

function contatosApagar(id) {
    const indice = contatosDados.findIndex(c => c.id == id)
    if (indice !== -1) {
        contatosDados.splice(indice, 1)
        dadosSalvar(contatosDados, BANCO_CONTATOS)
    }
}

// =====================================================
// 🛠️ FUNÇÕES UTILITÁRIAS
// =====================================================

// MÁXIMO DE CARACTERES
function maxString(string = '', max = 10) {
    return string.length <= max ? string : string.slice(0, max) + '...'
}

// CAIXA ALTA NA PRIMEIRA LETRA DE CADA PALAVRA
function capitalize(string = '') {
    return string.toLowerCase()
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ')
}

// REMOVE ESPAÇOS NO INICIO E FIM, E REMOVE ESPAÇOS DUPLICADOS
function tratarNome(nome) {
    return capitalize(nome.trim().replace(/\s+/g, ' '))
}

// FAZ UM AUTOINCLEMENT NAS IDs
function gerarID() {
    let id = dadosCarregar('contatosID', 0)
    ++id
    dadosSalvar(id, 'contatosID')
    return id
}

// LIMPA O FORMULÁRIO DE NOVO CONTATO
function limparForm() {
    novoContato.nome.value = ''
    novoContato.contato.value = ''
}

// MÁSCARA PARA NÚMERO DE TELEFONE
function telefone(numero) {
    numero = numero.toString()
    const ddd = numero.substring(0, 2)
    const parte1 = numero.substring(2, 7)
    const parte2 = numero.substring(7)
    return `${ddd} ${parte1}-${parte2}`
}