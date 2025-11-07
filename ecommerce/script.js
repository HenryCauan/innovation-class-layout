// Dados mocados para simular produtos. Em uma aplicação real, viriam de uma API.
const products = [
  {
    id: 1,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
  {
    id: 2,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
  {
    id: 3,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
  {
    id: 4,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
  {
    id: 5,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
  {
    id: 6,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
  {
    id: 7,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
  {
    id: 8,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
  {
    id: 9,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
  {
    id: 10,
    category: "NOVO",
    src: "./src/man.png",
    title: "Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit",
    priceoff: "R$ 100,00",
    price: "R$79,90",
  },
];

// Dados mocados para o mega menu, simulando departamentos e categorias.
const menuData = Array.from({ length: 20 }, (_, i) => ({
  department: `Departamento ${i + 1}`,
  categories: Array.from({ length: 24 }, () => `Categoria`),
}));

/**
 * Função para criar e inicializar um carrossel de produtos.
 * @param {string} carouselId - ID do elemento do carrossel.
 * @param {string} prevButtonId - ID do botão de voltar.
 * @param {string} nextButtonId - ID do botão de avançar.
 * @param {string} dotsContainerId - ID do container dos indicadores de página (bolinhas).
 */
function createCarousel(carouselId, prevButtonId, nextButtonId, dotsContainerId) {
  const carousel = document.getElementById(carouselId);
  const prevButton = document.getElementById(prevButtonId);
  const nextButton = document.getElementById(nextButtonId);
  const dotsContainer = document.getElementById(dotsContainerId);

  if (!carousel || !prevButton || !nextButton || !dotsContainer) {
    console.error("Elementos do carrossel não encontrados para os IDs:", carouselId, prevButtonId, nextButtonId, dotsContainerId);
    return;
  }

  // Limpa o conteúdo existente antes de popular.
  carousel.innerHTML = '';
  dotsContainer.innerHTML = '';

  // Cria e insere os cards de produto no carrossel.
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "flex flex-col shrink-0 grow-0 justify-between w-[238px] h-[409px] p-2 border-2 border-gray-50 overflow-x-auto rounded-[10px]";
    card.style.scrollSnapAlign = "start";
    card.style.scrollBehavior = "smooth";
    card.innerHTML = `
      <img class="cover object-contain" src="${product.src}" alt="${product.title}">
      <div class="flex flex-col justify-center gap-2 w-full h-full">
        <h2 class="text-[14px]">${product.title}</h2>
        <div class="flex items gap-2">
          <div class="flex flex-col text-[16px]">
            <s class="text-[12px]">${product.priceoff}</s>
            <p class="font-bold">${product.price}</p>
          </div>
          <div class="flex items-center justify-center text-[11px] text-white font-bold">
            <span class="bg-[#5EC0BE] rounded-[4px] px-1.5 py-1">10% OFF</span>
          </div>
        </div>
        <p class="text-[12px]">Ou em até 10x de R$ 7,90</p>
      </div>
      <div class="absolute bg-[#00264E] text-white font-bold text-[10px] rounded-[4px] px-2 py-1.5">${product.category}</div>
      <button class="w-full text-white font-bold py-2 bg-[#005cff] rounded-[8px]">Comprar</button>
    `;
    carousel.appendChild(card);
  });

  const cardWidth = 238 + 16; // Largura do card + gap
  const totalItems = products.length;

  // Configura o carrossel com base no tamanho da tela.
  const setupCarousel = () => {
    const screenWidth = window.innerWidth;
    let itemsPerPage;

    if (screenWidth >= 1280) {
      itemsPerPage = 5;
    } else if (screenWidth >= 1024) {
      itemsPerPage = 4;
    } else if (screenWidth >= 768) {
      itemsPerPage = 3;
    } else {
      itemsPerPage = 2;
    }

    carousel.style.overflowX = "scroll";
    carousel.style.scrollBehavior = "smooth";
    carousel.style.display = "flex";
    carousel.style.gap = "16px";
    carousel.style.width = `calc(${itemsPerPage} * (238px + 16px))`;
    carousel.scrollLeft = 0;

    // Cria os indicadores de página (bolinhas).
    const visibleDots = totalItems > itemsPerPage ? totalItems - itemsPerPage + 1 : 1;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < visibleDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'w-3 h-3 rounded-full';
      dot.style.backgroundColor = i === 0 ? '#303030' : '#838383';
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
      dot.addEventListener('click', () => {
          carousel.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
      });
    }
  }

  setupCarousel();
  window.addEventListener('resize', setupCarousel); // Reconfigura em redimensionamento.

  // Implementa a funcionalidade de arrastar para rolar (drag-to-scroll).
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.style.cursor = 'grab';

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
    carousel.style.cursor = 'grab';
  });
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
    carousel.style.cursor = 'grab';
  });
  carousel.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para acelerar a rolagem.
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Eventos de toque para dispositivos móveis.
    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchend', () => {
        isDown = false;
    });

    carousel.addEventListener('touchmove', (e) => {
        if(!isDown) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

  // Eventos dos botões de navegação.
  prevButton.addEventListener("click", () => carousel.scrollBy({ left: -cardWidth, behavior: "smooth" }));
  nextButton.addEventListener("click", () => carousel.scrollBy({ left: cardWidth, behavior: "smooth" }));

  // Atualiza o estado dos botões e indicadores durante a rolagem.
  carousel.addEventListener("scroll", () => {
    const currentIndex = Math.round(carousel.scrollLeft / cardWidth);
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, index) => {
        dot.style.backgroundColor = index === currentIndex ? '#303030' : '#838383';
    });
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    prevButton.disabled = carousel.scrollLeft <= 0;
    nextButton.disabled = carousel.scrollLeft >= maxScrollLeft - 1;
    prevButton.style.opacity = prevButton.disabled ? "0.5" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0.5" : "1";
  });

  // Estado inicial dos botões.
  prevButton.disabled = true;
  prevButton.style.opacity = "0.5";
  if (carousel.scrollWidth <= carousel.clientWidth) {
      nextButton.disabled = true;
      nextButton.style.opacity = "0.5";
  }
}

/**
 * Inicializa a funcionalidade do Mega Menu para a navegação de desktop.
 */
function initMegaMenus() {
    const megaMenuContainer = document.getElementById('mega-menu');
    if (!megaMenuContainer) return;

    // Injeta CSS para animações do menu, se ainda não existir.
    const injectCss = () => {
        const styleId = 'mega-menu-animations';
        if (document.getElementById(styleId)) return;
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .anim-fade-in { animation: fadeIn 0.3s ease-out; }`;
        document.head.appendChild(style);
    };
    injectCss();

    // Estilização e posicionamento inicial do container do mega menu.
    megaMenuContainer.style.height = '329px';
    megaMenuContainer.style.width = '1150px';
    megaMenuContainer.style.padding = '16px';
    megaMenuContainer.style.overflow = 'hidden';
    megaMenuContainer.style.left = '50%';
    megaMenuContainer.style.transform = 'translateX(-50%)';
    megaMenuContainer.classList.add('hidden', 'fixed', 'top-0', 'bg-white', 'shadow-lg', 'z-50');
    megaMenuContainer.style.display = 'none';
    
    let menuTimeout;
    // Mostra o menu, posicionando-o abaixo do cabeçalho.
    const showMenu = () => {
        clearTimeout(menuTimeout);
        megaMenuContainer.style.display = 'flex';
        megaMenuContainer.classList.remove('hidden');
        const header = document.querySelector('header');
        if (header) {
            const headerRect = header.getBoundingClientRect();
            megaMenuContainer.style.top = `${headerRect.bottom}px`;
        }
    };
    // Esconde o menu após um pequeno atraso para permitir que o mouse se mova para dentro dele.
    const hideMenu = () => {
        menuTimeout = setTimeout(() => {
            megaMenuContainer.classList.add('hidden');
            megaMenuContainer.style.display = 'none';
        }, 200);
    };

    // Gera o conteúdo principal do mega menu (visão de "Todas as Categorias").
    const generateMainMegaMenuContent = () => {
        const wrapper = document.createDocumentFragment();
        
        const departmentsList = document.createElement('div');
        departmentsList.id = 'departments-list';
        departmentsList.style.width = '234px';
        departmentsList.style.flexShrink = '0';
        departmentsList.style.overflowY = 'auto';

        const categoriesGrid = document.createElement('div');
        categoriesGrid.id = 'categories-grid';
        
        const newArrivals = document.createElement('div');
        newArrivals.className = 'relative w-[236px] h-[298px] rounded-[10px] bg-cover bg-center shrink-0';
        newArrivals.style.backgroundImage = "url('./src/header-avanti.png')";
        newArrivals.innerHTML = `<div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 bg-black bg-opacity-50 rounded-[10px]"><p class="text-xl font-bold leading-tight">Confira os<br>Produtos<br>Que acabaram<br>De chegar</p><button class="mt-6 bg-white text-[#005cff] py-2 px-6 rounded-md font-bold text-sm">Ver todos</button></div>`;

        let currentDepartmentIndex = -1;
        // Atualiza a grade de categorias quando o mouse passa sobre um departamento.
        const updateCategories = (departmentIndex) => {
            const department = menuData[departmentIndex];
            if (!department) return;
            categoriesGrid.innerHTML = '';
            categoriesGrid.style.overflow = 'hidden';
            const grid = document.createElement('div');
            grid.className = 'grid grid-cols-3 gap-x-16 gap-y-3';
            department.categories.forEach(name => {
                const item = document.createElement('div');
                item.className = 'p-2 hover:text-[#005cff] cursor-pointer text-[14px]';
                item.textContent = name;
                grid.appendChild(item);
            });
            categoriesGrid.appendChild(grid);
            const firstItems = grid.children;
            for (let i = 0; i < Math.min(3, firstItems.length); i++) {
                firstItems[i].classList.add('font-bold', 'text-[#005cff]');
            }
            categoriesGrid.classList.remove('anim-fade-in');
            void categoriesGrid.offsetWidth; // Força o repaint para a animação funcionar.
            categoriesGrid.classList.add('anim-fade-in');
        };

        // Cria a lista de departamentos.
        menuData.forEach((item, index) => {
            const deptItem = document.createElement('div');
            deptItem.className = 'flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer text-[14px]';
            deptItem.innerHTML = `<span>${item.department}</span><i class="fas fa-chevron-right text-xs text-black"></i>`;
            deptItem.addEventListener('mouseenter', () => {
                if (index === currentDepartmentIndex) return;
                currentDepartmentIndex = index;
                updateCategories(index);
                document.querySelectorAll('#departments-list > div').forEach(d => d.classList.remove('bg-gray-200', 'font-bold', 'text-[#005cff]'));
                deptItem.classList.add('bg-gray-200', 'font-bold', 'text-[#005cff]');
            });
            departmentsList.appendChild(deptItem);
        });

        // Inicializa com o primeiro departamento selecionado.
        currentDepartmentIndex = 0;
        updateCategories(0);
        if (departmentsList.children[0]) {
            departmentsList.children[0].classList.add('bg-gray-200', 'font-bold', 'text-[#005cff]');
        }
        
        wrapper.appendChild(departmentsList);
        wrapper.appendChild(categoriesGrid);
        wrapper.appendChild(newArrivals);
        return wrapper;
    };

    // Gera o conteúdo do menu para um departamento específico.
    const generateDepartmentMenuContent = (departmentName) => {
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'flex justify-between w-full';

        const categoriesWrapper = document.createElement('div');

        const title = document.createElement('h2');
        title.className = 'text-lg font-bold mb-2';
        title.textContent = departmentName;
        categoriesWrapper.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-3 gap-x-24 gap-y-1';
        for (let i = 0; i < 24; i++) {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'p-1 hover:text-[#005cff] cursor-pointer text-[14px]';
            categoryItem.textContent = 'Categoria';
            grid.appendChild(categoryItem);
        }
        const firstItems = grid.children;
        for (let i = 0; i < 3; i++) {
            if (firstItems[i]) firstItems[i].classList.add('font-bold', 'text-[#005cff]');
        }
        categoriesWrapper.appendChild(grid);
        contentWrapper.appendChild(categoriesWrapper);

        const newArrivals = document.createElement('div');
        newArrivals.className = 'relative w-[236px] h-[298px] rounded-[10px] bg-cover bg-center shrink-0';
        newArrivals.style.backgroundImage = "url('./src/header-avanti.png')";
        newArrivals.innerHTML = `<div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 bg-black bg-opacity-50 rounded-[10px]"><p class="text-xl font-bold leading-tight">Confira os<br>Produtos<br>Que acabaram<br>De chegar</p><button class="mt-6 bg-white text-[#005cff] py-2 px-6 rounded-md font-bold text-sm">Ver todos</button></div>`;
        contentWrapper.appendChild(newArrivals);

        return contentWrapper;
    };

    // Adiciona os event listeners para os botões que abrem os menus.
    const categoriesButton = document.getElementById('categories-button');
    if (categoriesButton) {
        categoriesButton.addEventListener('mouseenter', () => {
            megaMenuContainer.innerHTML = '';
            megaMenuContainer.style.justifyContent = 'space-between';
            megaMenuContainer.appendChild(generateMainMegaMenuContent());
            showMenu();
        });
        categoriesButton.addEventListener('mouseleave', hideMenu);
    }

    const departmentsContainer = document.getElementById('departaments');
    if (departmentsContainer) {
        for (const deptEl of departmentsContainer.children) {
            if (deptEl.id !== 'categories-button') {
                deptEl.addEventListener('mouseenter', () => {
                    megaMenuContainer.innerHTML = '';
                    megaMenuContainer.style.justifyContent = 'flex-start';
                    const content = generateDepartmentMenuContent(deptEl.textContent.trim());
                    content.classList.add('anim-fade-in');
                    megaMenuContainer.appendChild(content);
                    showMenu();
                });
                deptEl.addEventListener('mouseleave', hideMenu);
            }
        }
    }

    // Mantém o menu aberto se o mouse estiver sobre ele.
    megaMenuContainer.addEventListener('mouseenter', () => clearTimeout(menuTimeout));
    megaMenuContainer.addEventListener('mouseleave', hideMenu);
}

/**
 * Inicializa a funcionalidade de acordeão para o rodapé em telas móveis.
 */
function initFooterAccordion() {
  const accordionButtons = document.querySelectorAll('.footer-accordion-content');

  accordionButtons.forEach(button => {
    button.previousElementSibling.addEventListener('click', () => {
      // Apenas ativa o acordeão em telas menores (mobile).
      if (window.matchMedia('(max-width: 767px)').matches) {
        const content = button;
        const svg = button.previousElementSibling.querySelector('svg');
        const isHidden = content.classList.contains('hidden');

        // Fecha todos os outros acordeões para manter apenas um aberto.
        document.querySelectorAll('.footer-accordion-content').forEach(c => {
          if (c !== content) {
            c.classList.add('hidden');
            const otherSvg = c.previousElementSibling.querySelector('svg');
            if (otherSvg) {
                otherSvg.style.transform = '';
            }
          }
        });

        // Alterna a visibilidade do conteúdo do acordeão clicado.
        content.classList.toggle('hidden');
        if (svg) {
            svg.style.transform = isHidden ? 'rotate(180deg)' : '';
        }
      }
    });
  });

  // Garante que os menus do rodapé estejam visíveis em telas maiores.
  const setFooterAccordionResponsive = () => {
    document.querySelectorAll('.footer-accordion-content').forEach(function(content){
      if (window.matchMedia('(min-width: 768px)').matches) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });
    document.querySelectorAll('.footer-accordion-section button svg').forEach(svg => {
      if (svg) {
        svg.style.transform = '';
      }
    });
  }
  window.addEventListener('resize', setFooterAccordionResponsive);
  setFooterAccordionResponsive();
}

/**
 * Gera o conteúdo do menu de navegação para dispositivos móveis.
 * @returns {DocumentFragment} - Um fragmento de documento com o conteúdo do menu.
 */
function generateMobileMenuContent() {
    const wrapper = document.createDocumentFragment();

    // Função auxiliar para criar um item de acordeão.
    const createAccordionItem = (title, content, isSubItem = false) => {
        const item = document.createElement('div');
        item.className = isSubItem ? 'border-t' : 'border-b';

        const button = document.createElement('button');
        button.className = 'w-full text-left py-4 px-4 flex justify-between items-center font-semibold text-gray-700 hover:bg-gray-100';
        button.innerHTML = `<span>${title}</span><i class="fas fa-chevron-down text-xs transform transition-transform"></i>`;

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'hidden pl-8 bg-gray-50';
        contentWrapper.appendChild(content);

        button.addEventListener('click', () => {
            contentWrapper.classList.toggle('hidden');
            button.querySelector('i').classList.toggle('rotate-180');
        });

        item.appendChild(button);
        item.appendChild(contentWrapper);
        return item;
    };

    // Seção "Todas as Categorias"
    const allCategoriesContent = document.createElement('div');
    const departmentsList = document.createElement('ul');
    departmentsList.className = 'py-2';
    menuData.forEach(item => {
        const li = document.createElement('li');
        li.className = 'py-2 px-4 hover:bg-gray-100';
        li.textContent = item.department;
        departmentsList.appendChild(li);
    });
    allCategoriesContent.appendChild(departmentsList);
    wrapper.appendChild(createAccordionItem('Todas as Categorias', allCategoriesContent));

    // Seções de Departamentos
    menuData.forEach(item => {
        const categoriesList = document.createElement('ul');
        categoriesList.className = 'py-2';
        item.categories.forEach(cat => {
            const li = document.createElement('li');
            li.className = 'py-2 px-4 hover:bg-gray-100';
            li.textContent = cat;
            categoriesList.appendChild(li);
        });
        wrapper.appendChild(createAccordionItem(item.department, categoriesList, true));
    });

    return wrapper;
}

/**
 * Gera resultados de busca simulados com base na consulta.
 * @param {string} query - O termo de busca.
 * @returns {HTMLDivElement} - Um elemento div com os resultados da busca.
 */
function generateDummySearchResults(query) {
    const results = document.createElement('div');
    results.className = 'grid grid-cols-1 gap-2';

    if (!query) {
        results.innerHTML = '<p>Nenhum termo de busca fornecido.</p>';
        return results;
    }

    // Filtra os produtos com base no título ou categoria.
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProducts.length > 0) {
        filteredProducts.slice(0, 5).forEach(product => { // Limita a 5 resultados.
            const resultItem = document.createElement('a');
            resultItem.href = '#'; // Link para a página do produto.
            resultItem.className = 'flex items-center gap-2 p-2 hover:bg-gray-100 rounded';
            resultItem.innerHTML = `
                <img src="${product.src}" alt="${product.title}" class="w-10 h-10 object-cover rounded">
                <div>
                    <p class="text-sm font-medium">${product.title}</p>
                    <p class="text-xs text-gray-500">${product.price}</p>
                </div>
            `;
            results.appendChild(resultItem);
        });
        if (filteredProducts.length > 5) {
            const viewAll = document.createElement('div');
            viewAll.className = 'text-center mt-2';
            viewAll.innerHTML = `<a href="#" class="text-blue-600 hover:underline">Ver todos os ${filteredProducts.length} resultados</a>`;
            results.appendChild(viewAll);
        }
    } else {
        results.innerHTML = `<p>Nenhum resultado encontrado para \"${query}\".</p>`;
    }

    return results;
}

// Ponto de entrada principal: executa o código quando o DOM estiver totalmente carregado.
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa os carrosséis da página.
  createCarousel("first-carrosel", "prev", "next", "first-dots-container");
  createCarousel("second-carrosel", "prev2", "next2", "second-dots-container");
  
  // Inicializa os menus e o acordeão do rodapé.
  initMegaMenus();
  initFooterAccordion();

  // Configura o menu de hambúrguer para mobile.
  const hamburgerButton = document.getElementById('hamburger-button-mobile');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMobileMenu = document.getElementById('close-mobile-menu');
  const mobileMenuContent = document.getElementById('mobile-menu-content');

  if (hamburgerButton && mobileMenu && closeMobileMenu && mobileMenuContent) {
    hamburgerButton.addEventListener('click', () => {
      mobileMenuContent.innerHTML = '';
      mobileMenuContent.appendChild(generateMobileMenuContent());
      mobileMenu.classList.remove('hidden');
    });

    closeMobileMenu.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  // Seleciona os elementos da busca para desktop e mobile.
  const desktopSearchInput = document.getElementById('desktop-search-input');
  const desktopSearchButton = document.getElementById('desktop-search-button');
  const desktopSearchResultsModal = document.getElementById('desktop-search-results-modal');
  const desktopSearchQueryModal = desktopSearchResultsModal ? desktopSearchResultsModal.querySelector('.search-query-modal') : null;
  const desktopSearchResultsBody = desktopSearchResultsModal ? desktopSearchResultsModal.querySelector('.search-results-body') : null;

  const mobileSearchInput = document.getElementById('mobile-search-input');
  const mobileSearchButton = document.getElementById('mobile-search-button');
  const mobileSearchResultsModal = document.getElementById('mobile-search-results-modal');
  const mobileSearchQueryModal = mobileSearchResultsModal ? mobileSearchResultsModal.querySelector('.search-query-modal') : null;
  const mobileSearchResultsBody = mobileSearchResultsModal ? mobileSearchResultsModal.querySelector('.search-results-body') : null;

  const closeSearchModalButtons = document.querySelectorAll('.close-search-modal');

  // Função para lidar com a lógica de busca.
  const handleSearch = (inputElement, resultsModal, querySpan, resultsBody) => {
    const query = inputElement.value;
    if (query) {
      querySpan.textContent = query;
      resultsBody.innerHTML = ''; // Limpa resultados anteriores.
      resultsBody.appendChild(generateDummySearchResults(query));
      resultsModal.classList.remove('hidden');
    } else {
      resultsModal.classList.add('hidden');
    }
  };

  // Adiciona listeners para a busca em desktop.
  if (desktopSearchButton && desktopSearchInput && desktopSearchResultsModal && desktopSearchQueryModal && desktopSearchResultsBody) {
    desktopSearchButton.addEventListener('click', () => handleSearch(desktopSearchInput, desktopSearchResultsModal, desktopSearchQueryModal, desktopSearchResultsBody));
    desktopSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSearch(desktopSearchInput, desktopSearchResultsModal, desktopSearchQueryModal, desktopSearchResultsBody);
      }
    });
  }

  // Adiciona listeners para a busca em mobile.
  if (mobileSearchButton && mobileSearchInput && mobileSearchResultsModal && mobileSearchQueryModal && mobileSearchResultsBody) {
    mobileSearchButton.addEventListener('click', () => handleSearch(mobileSearchInput, mobileSearchResultsModal, mobileSearchQueryModal, mobileSearchResultsBody));
    mobileSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSearch(mobileSearchInput, mobileSearchResultsModal, mobileSearchQueryModal, mobileSearchResultsBody);
      }
    });
  }

  // Adiciona listener para os botões de fechar o modal de busca.
  closeSearchModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const modalToClose = e.target.closest('[id$="-search-results-modal"]');
      if (modalToClose) {
        modalToClose.classList.add('hidden');
      }
    });
  });

  // Fecha o modal de busca ao clicar fora dele.
  document.addEventListener('click', (e) => {
    if (desktopSearchResultsModal && !desktopSearchResultsModal.contains(e.target) && !desktopSearchInput.contains(e.target) && !desktopSearchButton.contains(e.target)) {
      desktopSearchResultsModal.classList.add('hidden');
    }
    if (mobileSearchResultsModal && !mobileSearchResultsModal.contains(e.target) && !mobileSearchInput.contains(e.target) && !mobileSearchButton.contains(e.target)) {
      mobileSearchResultsModal.classList.add('hidden');
    }
  });
});