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
    recuperarTodosRegistros(){

        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++){

            //recuperar a despesa transformando de JSON para obj literal
            let despesa = JSON.parse(localStorage.getItem(i))

            //se existe a possibilidade de haver índices pulados
            if(despesa === null){
                continue
            }


            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa){

        //criando um array com as despesas de atribuindo a uma variável
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()


        //filtros
        //ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }        
        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }        
        //descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }        
        //valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }  
        console.log(despesasFiltradas)  
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
        
        //zerando as caixas após receber valor
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

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

//função que vai carregar a lista de despesas para ficar visível ao usuário
function carregaListaDespesas(){

    //recuperar os valores e colocá-los em uma variável
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()
    
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    /* 
    <tr>
        <td>15/03/2018</td>
        <td>alimentação</td>
        <td>compras do mês</td>
        <td>556</td>
    </tr> 
    */

    //percorrer o array despesas,listando cada despesa de forma dinâmica
    despesas.forEach(function(d){
        
        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criar colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${ d.ano}`
        //ajustar o tipo
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$${d.valor}`
    })
}

//filtrar despesas
function pesquisarDespesa(){

    //resgatando os valores e atribuindo eles a uma variável
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

    bd.pesquisar(despesa)
}

