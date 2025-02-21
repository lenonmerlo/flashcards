import { flashcards as flashcards1 } from './cards-1.js';
import { flashcards as flashcards2 } from './cards-2.js';
import { flashcards as flashcards3 } from './cards-3.js';
import { flashcards as flashcards4 } from './cards-4.js';
import { flashcards as flashcards5 } from './cards-5.js';

// Unindo os módulos corretamente
const flashcards = {
    1: flashcards1[1] || flashcards1,
    2: flashcards2[2] || flashcards2,
    3: flashcards3[3] || flashcards3,
    4: flashcards4[4] || flashcards4,
    5: flashcards5[5] || flashcards5
};

// Função para carregar os flashcards do módulo selecionado
function carregarModulo(modulo) {
    const container = document.getElementById("flashcards-container");
    const tituloModulo = document.getElementById("titulo-modulo");
    const graficoContainer = document.getElementById("grafico-container");

    // Oculta os gráficos ao carregar um módulo
    graficoContainer.innerHTML = "";

    const titulos = [
        "",
        "Introdução à Visualização de Dados",
        "Métricas e abordagens de apresentação de dados",
        "Pré-processamento e qualidade dos dados para visualização",
        "PRÁTICA PYTHON... PRÁTICA",
        "Efeitos visuais para apresentação dos dados"
    ];
    tituloModulo.textContent = titulos[modulo];

    // Limpa os flashcards anteriores
    container.innerHTML = "";

    // Verifica se há flashcards no módulo
    if (!flashcards[modulo] || flashcards[modulo].length === 0) {
        container.innerHTML = "<p>Nenhum flashcard encontrado para este módulo.</p>";
        return;
    }

    // Criar os flashcards dinamicamente
    flashcards[modulo].forEach(card => {
        const flashcard = document.createElement("div");
        flashcard.classList.add("flashcard");

        flashcard.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${card.pergunta}</div>
                <div class="card-back">${card.resposta}</div>
            </div>
        `;

        // Adiciona efeito de virar ao clicar
        flashcard.addEventListener("click", () => {
            flashcard.classList.toggle("flipped");
        });

        container.appendChild(flashcard);
    });
}

// Função para carregar exemplos de gráficos
function carregarGrafico(tipo) {
    const container = document.getElementById("grafico-container");
    const flashcardContainer = document.getElementById("flashcards-container");

    // Oculta os flashcards ao carregar um gráfico
    flashcardContainer.innerHTML = "";

    const graficos = {
        pizza: {
            titulo: "Gráfico de Pizza",
            imagem: "https://venngage-wordpress.s3.amazonaws.com/uploads/2021/09/ed8e678d-f7b7-43f4-ab4d-ce34c6bc4f70.png",
            indicado: "Comparação de proporções entre categorias.",
            naoIndicado: "Muitas categorias ou valores muito próximos."
        },
        barras: {
            titulo: "Gráfico de Barras",
            imagem: "https://wikiciencias.casadasciencias.org/wiki/images/2/26/Diagrama_de_barras_MEug%C3%A9nia_3_1.png",
            indicado: "Comparação de valores discretos entre categorias.",
            naoIndicado: "Representação de dados contínuos ao longo do tempo."
        },
        linhas: {
            titulo: "Gráfico de Linhas",
            imagem: "https://www.jaspersoft.com/content/dam/jaspersoft/images/graphics/infographics/line-chart-example.svg",
            indicado: "Análise de tendências ao longo do tempo.",
            naoIndicado: "Comparação entre muitas categorias diferentes."
        },
        dispersao: {
            titulo: "Gráfico de Dispersão",
            imagem: "https://blog.proffernandamaciel.com.br/wp-content/uploads/2022/02/Capturar-768x430.png",
            indicado: "Relação entre duas variáveis numéricas.",
            naoIndicado: "Dados categóricos ou com poucas observações."
        },
        heatmap: {
            titulo: "Heatmap",
            imagem: "https://www.techtarget.com/rms/onlineimages/example_of_a_color_coded_heat_map-f_mobile.png",
            indicado: "Análise de padrões e correlações em grandes volumes de dados.",
            naoIndicado: "Pequenos conjuntos de dados sem muitas variáveis."
        }
    };

    if (!graficos[tipo]) {
        container.innerHTML = "<p>Gráfico não encontrado.</p>";
        return;
    }

    container.innerHTML = `
        <h2>${graficos[tipo].titulo}</h2>
        <img src="${graficos[tipo].imagem}" alt="${graficos[tipo].titulo}">
        <p><strong>Indicado para:</strong> ${graficos[tipo].indicado}</p>
        <p><strong>Não indicado para:</strong> ${graficos[tipo].naoIndicado}</p>
    `;
}

// Adiciona evento para garantir que os módulos e gráficos carreguem ao clicar no menu
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("aside ul li").forEach((item, index) => {
        if (item.hasAttribute("data-grafico")) {
            item.addEventListener("click", () => carregarGrafico(item.getAttribute("data-grafico")));
        } else {
            item.addEventListener("click", () => carregarModulo(index + 1));
        }
    });

    // Carregar primeiro módulo por padrão
    carregarModulo(1);
});
