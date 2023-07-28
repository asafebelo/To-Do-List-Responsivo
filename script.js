const button = document.querySelector('.button-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let lista = []

function adicionarTarefa() {
    let tarefa = input.value.trim()

    if (tarefa === '') {
        return
    }
    lista.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''

    mostrarTarefa()
}

function deletarTarefa(posicao) {
    lista.splice(posicao, 1)
    mostrarTarefa()
}

function concluirTarefa(posicao) {
    lista[posicao].concluida = !lista[posicao].concluida
    mostrarTarefa()
}

function mostrarTarefa() {
    let novaLi = ''
    lista.forEach((item, posicao) => {
        novaLi = novaLi + `

        <li class="task ${item.concluida && "done"}">
            <img  src="./img/checked.png" alt="Check" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="Trash" onclick="deletarTarefa(${posicao})">
        </li>

        `
    })
    listaCompleta.innerHTML = novaLi
    localStorage.setItem('ToDoList', JSON.stringify(lista))
}

function recarregarTarefas() {
    const tarefasLocalStorage = localStorage.getItem('ToDoList')

    if(tarefasLocalStorage) {
    lista = JSON.parse(tarefasLocalStorage)
    }
    mostrarTarefa()
}
recarregarTarefas()
button.addEventListener('click', adicionarTarefa)