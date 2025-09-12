const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector);
    const tabs = document.querySelectorAll(tabSelector); // Переименовал для ясности
    const contents = document.querySelectorAll(contentSelector); // Переименовал для ясности

    function hideTabContent() {
        contents.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        if (contents[i]) { // Проверка существования элемента
            contents[i].style.display = 'block';
        }
        if (tabs[i]) { // Проверка существования элемента
            tabs[i].classList.add(activeClass);
        }
    }

    // Проверка существования header перед добавлением обработчика
    if (header) {
        hideTabContent();
        showTabContent();

        header.addEventListener('click', (e) => {
            const target = e.target; 
            if (!target) return;

            // Ищем ближайший родительский элемент таба
            const potentialTab = target.closest(tabSelector);

            if (potentialTab) {
                tabs.forEach((item, i) => {
                    if (potentialTab === item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    } else {
        console.warn(`Header with selector "${headerSelector}" not found.`);
    }

    console.log('Tabs initialized for:', headerSelector);
};

export default tabs;