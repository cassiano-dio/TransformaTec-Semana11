'use-strict'

const cep = document.getElementById("cep")
const pesquisar = document.getElementById("pesquisar")
const limpar = document.getElementById("limpar")

// Validar o CEP



const validarCep = (cep) => {
    //returna verdadeiro ou falso - true or false
    //Expressão regular verifica se os caracteres são numéricos e tem 8 de comprimento
    return cep.length == 8 && /^[0-9]+$/.test(cep)
    //NÃO ESQUECER DO RETURN EM CASO DE FUNÇÃO COM MAIS DE UMA LINHA!!!
}

const preencherDados = async (endereco) => {

    const div_resposta = document.createElement("div")
    div_resposta.setAttribute("class", "container")
    div_resposta.setAttribute("id","div_resposta")

    const logradouro = document.createElement("p")
    logradouro.setAttribute("class","resposta")
    logradouro.setAttribute("id","logradouro")
    logradouro.innerHTML = endereco.logradouro

    const bairro = document.createElement("p")
    bairro.setAttribute("class", "resposta")
    bairro.setAttribute("id", "bairro")
    bairro.innerHTML = endereco.bairro

    const localidade = document.createElement("p")
    localidade.setAttribute("class", "resposta")
    localidade.setAttribute("id","localidade")
    localidade.innerHTML = endereco.localidade

    div_resposta.appendChild(logradouro)
    div_resposta.appendChild(bairro)
    div_resposta.appendChild(localidade)

    document.body.appendChild(div_resposta)

}

const pesquisarCep = async () => {
    const cep_valor = cep.value
    try {
        if(validarCep(cep_valor)){
        
            const viacep_url = `https://viacep.com.br/ws/${cep_valor}/json/`
            const cep_dados = await fetch(viacep_url)
            const cep_json = await cep_dados.json()

            console.log(cep_json)

            if (cep_json.hasOwnProperty('erro')) {
                throw {
                    "name":"ErroCEP",
                    "message": "Não foi possível consultar o CEP"
                }
            } else {
                await preencherDados(cep_json)
            }
        }else{
            throw {
                "name":"ErroCEP",
                "message":"CEP inválido"
            }
        }
    } catch (erro) {

        const erro_cep = document.createElement("p")
        erro_cep.setAttribute("id","erro_cep")
        erro_cep.setAttribute("class","erro_cep")
        erro_cep.innerHTML = erro.message

        document.body.appendChild(erro_cep)
    }
}

const limparDados = () => {

    const div_resposta = document.getElementById("div_resposta")

    const erro = document.getElementById("erro_cep")

    document.getElementById("cep").value = ""

    if(div_resposta){
        document.body.removeChild(div_resposta)
    }else{
        document.body.removeChild(erro)
    }

}

pesquisar.addEventListener('click', pesquisarCep)
limpar.addEventListener('click',limparDados)
cep.addEventListener('focus',limparDados)