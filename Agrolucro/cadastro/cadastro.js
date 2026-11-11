// Seleciona o formulario
let formulario = document.getElementById("formCadastro");

// Seleciona a tabela
let tabela = document.getElementById("listaProdutores");

// Busca os produtores que ja foram cadastrados
let produtores = JSON.parse(
    localStorage.getItem("produtores")
) || [];

// Funcao para mostrar os produtores na tabela
function mostrarProdutores() {

    // Limpa a tabela antes de atualizar
    tabela.innerHTML = "";

    // Percorre a lista de produtores
    for (let i = 0; i < produtores.length; i++) {

        let produtor = produtores[i];

        // Cria uma linha
        let linha = document.createElement("tr");

        // Organiza os dados do produtor
        let dados = [
            produtor.nome,
            produtor.email,
            produtor.telefone,
            produtor.propriedade
        ];

        // Cria uma coluna para cada informacao
        for (let j = 0; j < dados.length; j++) {

            let coluna = document.createElement("td");

            coluna.textContent = dados[j];

            linha.appendChild(coluna);
        }

        // Adiciona a linha na tabela
        tabela.appendChild(linha);
    }
}

// Quando o formulario for enviado
formulario.addEventListener("submit", function(evento) {

    // Impede que a pagina recarregue
    evento.preventDefault();

    // Pega os valores digitados
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let propriedade = document.getElementById("propriedade").value;

    // Cria um objeto com os dados
    let produtor = {
        nome: nome,
        email: email,
        telefone: telefone,
        propriedade: propriedade
    };

    // Adiciona o produtor na lista
    produtores.push(produtor);

    // Salva os dados no navegador
    localStorage.setItem(
        "produtores",
        JSON.stringify(produtores)
    );

    // Atualiza a tabela
    mostrarProdutores();

    // Mostra uma mensagem
    document.getElementById("mensagem").textContent =
        "Produtor cadastrado com sucesso!";

    // Limpa o formulario
    formulario.reset();
});

// Mostra os produtores ao abrir a pagina
mostrarProdutores();