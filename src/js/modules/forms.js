const forms = () => {
    const forms = document.querySelectorAll('form'); 
    const input = document.querySelectorAll('input');
    const phoneInputs = document.querySelectorAll('input[name="user_phone"]'); 

    phoneInputs.forEach(item =>{
        item.addEventListener('input', ()=>{
            item.value = item.value.replace(/\D/,'');
        })
    })
    const message = {
        loading: 'Загрузка ...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    };

    const newData = (item) => {
        let data = new FormData(item);
        return data;
    };

    const clearInputs = () => {
        input.forEach(item => { 
            item.value = '';
        });
    };

    forms.forEach(item => { 
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            

            item.appendChild(statusMessage);
            
            statusMessage.textContent = message.loading;

            const formData = newData(item);
            postData('assets/server.php', formData) 
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000); 
                });
        });
    });
};

export default forms;