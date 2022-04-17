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

    //percorrer os valores para ver se são válidos
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
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

    if(despesa.validarDados()){
        //função que vai armazenar no local storage
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
        document.getElementById('modal_btn').innerHTML = 'voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
        

        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show')   
    } else{
        //dialog de erro

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação,verifique se os campos foram preenchidos'
        document.getElementById('modal_btn').innerHTML = 'voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        $('#modalRegistraDespesa').modal('show')
    }

}


