document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos
  const carousel = document.querySelector(".carousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Verifica se tudo existe
  if (!carousel || !prevBtn || !nextBtn) {
    return;
  }

  // --- INICIALIZAÇÃO MELHORADA ---
  // Função para centralizar no item do meio ao carregar
  const setInitialPosition = () => {
    // Só executa se estiver em modo mobile
    if (window.innerWidth <= 650) {
      // Define o índice inicial (0 = primeiro, 1 = segundo/meio)
      const initialIndex = 1;

      // Pega a largura do container visível do carrossel
      const itemWidth = carousel.clientWidth;

      // Calcula a posição de scroll
      const initialScroll = itemWidth * initialIndex;

      // 'auto' faz a rolagem ser instantânea, sem animação
      carousel.scrollTo({ left: initialScroll, behavior: "auto" });
    }
  };

  // Chama a função de inicialização.
  // Colocar isso no final do 'DOMContentLoaded' é mais seguro que o setTimeout.
  setInitialPosition();

  // Bônus: Recalcula se o usuário redimensionar a tela
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setInitialPosition, 100);
  });
  // --- FIM DA INICIALIZAÇÃO ---

  // Função para rolar o carrossel (COM LÓGICA DE TOLERÂNCIA)
  const scrollCarousel = (direction) => {
    // Pega a largura exata de um item (que é a largura do container)
    const itemWidth = carousel.clientWidth;

    // Posição atual do scroll
    const currentScroll = carousel.scrollLeft;

    // Posição máxima de scroll
    const maxScroll = carousel.scrollWidth - itemWidth;

    // Define uma "tolerância" de 5 pixels para erros de arredondamento
    const tolerance = 5;

    if (direction === 1) {
      // --- CLICOU EM "PRÓXIMO" (>) ---
      // Se está a 5px (ou menos) do fim, vai para o começo
      if (currentScroll >= maxScroll - tolerance) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Senão, apenas rola para o próximo
        carousel.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    } else if (direction === -1) {
      // --- CLICOU EM "ANTERIOR" (<) ---
      // Se está a 5px (ou menos) do começo, vai para o fim
      if (currentScroll <= tolerance) {
        carousel.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        // Senão, apenas rola para o anterior
        carousel.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    }
  };

  // Adiciona os cliques nos botões
  nextBtn.addEventListener("click", () => scrollCarousel(1));
  prevBtn.addEventListener("click", () => scrollCarousel(-1));
});
