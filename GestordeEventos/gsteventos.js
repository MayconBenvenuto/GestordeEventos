let participantes = [{
    nome: 'Maycon Benvenuto',
    email: 'benvenutomaycon@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
}, {
    nome: 'Lorenzo Santos',
    email: 'santoslorenzo@gmail.com',
    dataInscricao: new Date(2023, 1, 22, 15, 20),
    dataCheckIn: new Date(2024,1, 22, 23, 0)
}, {
    nome: 'Maria Silva',
    email: 'mariasilva@gmail.com',
    dataInscricao: new Date(2024, 1, 10, 12, 30),
    dataCheckIn: null
}, {
    nome: 'João Oliveira',
    email: 'joao.oliveira@gmail.com',
    dataInscricao: new Date(2024, 0, 5, 9, 45),
    dataCheckIn: new Date(2024, 2, 1, 14, 0)
}, {
    nome: 'Ana Souza',
    email: 'anasouza@gmail.com',
    dataInscricao: new Date(2024, 4, 15, 17, 10),
    dataCheckIn: new Date(2024, 6, 20, 8, 30)
}, {
    nome: 'Pedro Carvalho',
    email: 'pedro.carvalho@gmail.com',
    dataInscricao: new Date(2024, 5, 28, 20, 5),
    dataCheckIn: null
}, {
    nome: 'Juliana Ramos',
    email: 'juliana.ramos@gmail.com',
    dataInscricao: new Date(2024, 4, 3, 14, 55),
    dataCheckIn: new Date(2024, 5, 6, 9, 45)
}, {
    nome: 'Lucas Pereira',
    email: 'lucas.pereira@gmail.com',
    dataInscricao: new Date(2024, 3, 19, 11, 20),
    dataCheckIn: null
}, {
    nome: 'Mariana Costa',
    email: 'mariana.costa@gmail.com',
    dataInscricao: new Date(2024, 2, 8, 8, 0),
    dataCheckIn: null
}, {
    nome: 'Rafaela Oliveira',
    email: 'rafaela.oliveira@gmail.com',
    dataInscricao: new Date(2024, 1, 14, 15, 40),
    dataCheckIn: new Date(2024, 2, 18, 11, 20)
}];


const criarNovoParticipante = (participante) =>{
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    //adicionei let pois é uma variável que vai deixar de ser constante
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
//condicional
    if(participante.dataCheckIn === null) {
dataCheckIn = `<button onclick = "fazerCheckin(event)"
                data-email="${participante.email}"
               >
                Confirmar check-in
                </button>
                `
    } else{
        
    }
        return `    
 <tr>
    <td> 
        <strong>
            ${participante.nome}
        </strong>
             <br> 
            <small>${participante.email}
            </small>
        </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
 </tr>
        `
};    

const atualizarLista = (participantes) => {
    let output = ""
    //estrutura de repetição - loop
    for(let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }
document.querySelector('tbody').innerHTML = output
}; //arrow function

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    
    const participante = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const emailNovoParticipante = formData.get('email');

if (!emailNovoParticipante || participantes.some(participante => participante.email === emailNovoParticipante)) {
    alert('Por favor, forneça um email válido e único.');
    return;
}

//verificar se o participante já existe
const participanteExiste = participantes.find((p) => 
     p.email == participante.email
)
    if(participanteExiste){
        alert('Email já cadastrado! ')
    }
participantes = [participante, ...participantes]
 atualizarLista(participantes)
 
};


const fazerCheckin = (event) =>{

    //confirmar se realmente quer fazer checkin
    const mensagemConfirmação = 'Tem certeza que deseja fazer o check-in?'
    if(confirm (mensagemConfirmação) == false){
        return 
    }
    
    //encontrar o participante dentro da lista
    const participanteEmail = event.target.getAttribute('data-email');
    const participante = participantes.find((p) => p.email === participanteEmail);
        

    //após isso , atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    //atualizar a lista de participantes
    atualizarLista(participantes);
}