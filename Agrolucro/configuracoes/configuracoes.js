// Seleciona o formulario de configuracoes
let formulario = document.getElementById("formConfiguracoes");

// Seleciona os campos do formulario
let campoPropriedade = document.getElementById("propriedade");
let campoResponsavel = document.getElementById("responsavel");

// Seleciona as mensagens
let mensagem = document.getElementById("mensagem");

let mensagemPreferencias =
    document.getElementById("mensagemPreferencias");

let mensagemExclusao =
    document.getElementById("mensagemExclusao");

// Seleciona a opcao de boas-vindas
let boasVindas = document.getElementById("boasVindas");

// Busca as configuracoes salvas anteriormente
let configuracoes = JSON.parse(
    localStorage.getItem("configuracoes")
) || {};

// Preenche os campos com os dados salvos
campoPropriedade.value = configuracoes.propriedade || "";
campoResponsavel.value = configuracoes.responsavel || "";

// Verifica se a preferencia estava ativada
boasVindas.checked = configuracoes.boasVindas || false;


// =====================================
// SALVAR DADOS DA PROPRIEDADE
// =====================================

// Detecta quando o formulario e enviado
formulario.addEventListener("submit", function(evento) {

    // Impede que a pagina recarregue
    evento.preventDefault();

    // Pega os valores digitados
    let propriedade = campoPropriedade.value;
    let responsavel = campoResponsavel.value;

    // Atualiza os dados das configuracoes
    configuracoes.propriedade = propriedade;
    configuracoes.responsavel = responsavel;

    // Salva os dados no navegador
    localStorage.setItem(
        "configuracoes",
        JSON.stringify(configuracoes)
    );

    // Mostra mensagem de sucesso
    mensagem.textContent =
        "Informações salvas com sucesso!";
});


// =====================================
// SALVAR PREFERENCIAS
// =====================================

// Seleciona o botao de preferencias
let botaoPreferencias =
    document.getElementById("salvarPreferencias");

// Detecta o clique no botao
botaoPreferencias.addEventListener("click", function() {

    // Verifica se a opcao esta marcada
    configuracoes.boasVindas = boasVindas.checked;

    // Salva as preferencias
    localStorage.setItem(
        "configuracoes",
        JSON.stringify(configuracoes)
    );

    // Mostra mensagem de confirmacao
    mensagemPreferencias.textContent =
        "Preferências salvas com sucesso!";
});


// =====================================
// APAGAR MOVIMENTACOES
// =====================================

// Seleciona o botao de apagar
let botaoApagar = document.getElementById("apagarDados");

// Detecta o clique no botao
botaoApagar.addEventListener("click", function() {

    // Pergunta se o usuario deseja apagar
    let confirmar = confirm(
        "Tem certeza que deseja apagar todas as movimentações?"
    );

    // Se o usuario confirmar
    if (confirmar) {

        // Remove apenas as movimentacoes salvas
        localStorage.removeItem("movimentacoes");

        // Mostra mensagem de confirmacao
        mensagemExclusao.textContent =
            "Todas as movimentações foram apagadas!";
    }
});
