// Seleção de elementos
let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');
const qtdIdsDisponiveis = Number.MAX_VALUE;

//Eventos
inputNovaTarefa.addEventListener('keypress', (e) => { //Adicionando um evento se apertar a tecla enter(13) 

    if (e.keyCode == 13 && validacaoVazio(inputNovaTarefa)) {
        criarTarefa();    
    }
});

btnAddTarefa.addEventListener('click', (e) => {
    if (validacaoVazio(inputNovaTarefa)) {

        criarTarefa();
    }
});


janelaEdicaoBtnFechar.addEventListener('click', (e) => {   // Add envento do botão de fechar janela de edição 
    alternarJanelaEdicao();
});
btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();    //prevenindo ação defaul

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');  //recuperando id da tarefa

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById('' + idTarefa + '');
    
    if (validacaoVazio(inputTarefaNomeEdicao)) {
        if (tarefaAtual) {  // Se a atarefaAtual for encontrada faça...
            let li = criarTagLI(tarefa);
            listaTarefas.replaceChild(li, tarefaAtual); // trocando tafera atual pela nova tarefa
            alternarJanelaEdicao();
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }

});


//Funções
function validacaoVazio(input) { //Verificando se o campo está vazio.
    if (input.value == "") {
        alert('Oops, insira uma tarefa para continuar :)')
        return false
    } else {
        return true
    }
}

function gerarId() {
    return Math.floor(Math.random() * qtdIdsDisponiveis); //  Math.floor retorna um numero entre 0 e 3000 e Math.random arredonda.
}

function gerarIdV2() {
    return gerarIdUnico();
}

function gerarIdUnico() {

    // debugger;
    let itensDaLista = document.querySelector('#listaTarefas').children;
    let idsGerados = [];

    for (let i = 0; i < itensDaLista.length; i++) {
        idsGerados.push(itensDaLista[i].id);
    }

    let contadorIds = 0;
    let id = gerarId();

    while (contadorIds <= qtdIdsDisponiveis &&
        idsGerados.indexOf(id.toString()) > -1) {
        id = gerarId();
        contadorIds++;

        if (contadorIds >= qtdIdsDisponiveis) {
            alert("Oops, ficamos sem IDS :/");
            throw new Error("Acabou os IDs :/");
        }
    }

    return id;
}
// Criar o HTML
function adicionarTarefa(tarefa) {  // Função que recebe o objeto tarefa e adiciona (Li)
    let li = criarTagLI(tarefa);  
    listaTarefas.appendChild(li); // Adiciona ao listaTarefas o elemento Li
    inputNovaTarefa.value = ''; 
}

function criarTarefa() { //Gerando o objeto tarefa
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarIdV2(),
    }
    adicionarTarefa(tarefa);
}

function criarTagLI(tarefa) { //Criando toda a tag Li do HTML

    let li = document.createElement('li'); // Tag Li
    li.id = tarefa.id; // Criando um id para a tag li, para usar nos botões

    let span = document.createElement('span'); // Criando tag span
    span.classList.add('textoTarefa'); //Adicionando a classe textoTafera
    span.innerHTML = tarefa.nome; // Alterando o conteudo da tag span para o objeto tarefa emostrar o nome da tarefa

    let div = document.createElement('div'); // Criando Tag div

    let btnEditar = document.createElement('button');  // Criando Tag button Editar
    btnEditar.classList.add('btnAcao'); //adicionando a classe btnAcao
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>'; //adicionando conteudo HTML ao btnEdita
    btnEditar.setAttribute('onclick', 'editar(' + tarefa.id + ')');  // Adicionando onclick no btnEditar. No atributo onclick chamamos a função editar que tera o parametro o ID DA TAREFA que queremos editar

    let btnExcluir = document.createElement('button'); // Criando Tag button Excluir
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir(' + tarefa.id + ')');

    div.appendChild(btnEditar); // Adicionando os buttons na div
    div.appendChild(btnExcluir);

    li.appendChild(span); // Adicionando tag span e div a tag Li
    li.appendChild(div);
    return li;
}

function editar(idTarefa) { //Função para editar tarefa
    let li = document.getElementById('' + idTarefa + ''); //chamando tag li
    if (li) {
        idTarefaEdicao.innerHTML = '#' + idTarefa; //recuperando id da tarefa
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }
}

function excluir(idTarefa) { // Função para excluir item 
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if (confirmacao) { //Se ouver confirmação ...
        let li = document.getElementById('' + idTarefa + '');
        if (li) { // Se recuperar o li
            listaTarefas.removeChild(li);  // Removendo do listaTarefas o elemento li
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}