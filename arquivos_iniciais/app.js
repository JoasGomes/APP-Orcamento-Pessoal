//criando um objeto despesa
class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}

//colocando os dados no localStorage e transformando o dado em JSON
class Bd {

    //verificando se o id no local storage é null
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            //se o id não existir,será setado um no indice 0
            localStorage.setItem('id',0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id , JSON.stringify(d))

        localStorage.setItem('id', id)
    }
}

let bd = new Bd()


function cadastrarDespesa(){
    
    //resgatando os valores e atribuindo eles a uma variável
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //criando um novo objeto com base nos valores informados
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    //função que vai armazenar no local storage
    bd.gravar(despesa)
}


