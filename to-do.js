const { select, input } = require('@inquirer/prompts')

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let tarefas = [
    { nome: 'Comprar leite', prioridade: 'Urgente' },
    { nome: 'Finalizar relatório', prioridade: 'Alta' },
    { nome: 'Ir à academia', prioridade: 'Normal' },
    { nome: 'Ligar para cliente', prioridade: 'Alta' },
    { nome: 'Reunião com equipe', prioridade: 'Normal' }
]

const menu = async () => {
    while(true) {
        let escolha = await select({
            message: 'Qual operação gostaria de realiar?',
            choices: [
                { name: 'Adicionar novo item', value: 'adicionar' },
                { name: 'Remover item', value:'remover' },
                { name: 'Visualizar lista', value: 'listar' },
                { name: 'Sair', value:'sair' }
            ]
        })
    
        switch(escolha) {
            case 'adicionar':
                console.log()
                await addTarefa()
                break
            case 'remover':
                console.log()
                await deletaTarefa()
                break
            case 'listar':
                console.log()
                await listaTarefas()
                break
            case 'sair':
                return
        }
        console.log()
    }
}

const addTarefa = async () => {
    const nome = await input({message: 'Nome da tarefa: '})
    const prioridade = await select({
        message: 'Prioridade da tarefa:',
        choices: [
            {name: 'Urgente', value: 'Urgente'},
            {name: 'Alta', value: 'Alta'},
            {name: 'Normal', value: 'Normal'}
        ]
    })

    tarefas.push({nome, prioridade})
    console.log('Tarefa adicionada com sucesso.')
    await sleep(1500)
}

const deletaTarefa = async () => {
    const indexDelete = await select({
        message: 'Qual tarefa deseja remover?',
        choices: tarefas.map((tarefa, index) => ({name: `${index+1} - ${tarefa.nome}`, value: index}))
    })
    tarefas = tarefas.filter((tarefa, index) => index !== indexDelete)
    console.log('Tarefa removida com sucesso.')
    await sleep(1500)
}

const listaTarefas = async () => {
    const filtro = await select({
        message: 'Como deseja que a lista seja mostrada?',
        choices: [
            {name: 'Padrão', value: ''},
            {name: 'Mais recentes', value: 'recentes'},
            {name: 'Por prioridade', value: 'prioridade'},
            {name: 'Por nome', value: 'nome'}
        ]
    })

    switch (filtro) {
        case 'recentes':
            tarefasRecentes = tarefas.reverse()
            tarefasRecentes.forEach(tarefa => {
                console.log(`Tarefa: ${tarefa.nome}\nPrioridade: ${tarefa.prioridade}\n-------------------------`)
            })
            break
        case 'prioridade':
            tarefasPrio = [
                ...tarefas.filter((tarefa) => tarefa.prioridade == 'Urgente'),
                ...tarefas.filter((tarefa) => tarefa.prioridade == 'Alta'),
                ...tarefas.filter((tarefa) => tarefa.prioridade == 'Normal')
            ]

            tarefasPrio.forEach(tarefa => {
                console.log(`Tarefa: ${tarefa.nome}\nPrioridade: ${tarefa.prioridade}\n-------------------------`)
            })
            break
        case 'nome':
            tarefasNome = tarefas.sort((a, b) => a.nome.localeCompare(b.nome))
            tarefasNome.forEach(tarefa => {
                console.log(`Tarefa: ${tarefa.nome}\nPrioridade: ${tarefa.prioridade}\n-------------------------`)
            })
            break
        default:
            tarefas.forEach(tarefa => {
                console.log(`Tarefa: ${tarefa.nome}\nPrioridade: ${tarefa.prioridade}\n-------------------------`)
            })
            break
    }
    await input({message: "Pressione ENTER para continuar."})
}

menu()