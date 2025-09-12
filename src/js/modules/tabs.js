const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector);
    const tabs = document.querySelectorAll(tabSelector); 
    const contents = document.querySelectorAll(contentSelector); 

    function hideTabContent() {
        contents.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        if (contents[i]) { 
            contents[i].style.display = 'block';
        }
        if (tabs[i]) { 
            tabs[i].classList.add(activeClass);
        }
    }


    if (header) {
        hideTabContent();
        showTabContent();

        header.addEventListener('click', (e) => {
            const target = e.target; 
            if (!target) return;

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