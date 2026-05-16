document.addEventListener('DOMContentLoaded', () => {
    // Referências das Views
    const welcomeView = document.getElementById('welcome-view');
    const registerView = document.getElementById('register-view');
    const loginView = document.getElementById('login-view');

    // Referências dos Botões
    const btnShowRegister = document.getElementById('btn-show-register');
    const btnShowLogin = document.getElementById('btn-show-login');
    const btnsBack = document.querySelectorAll('.btn-back');

    // Referências dos Formulários
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Função para alternar telas com transição suave
    function switchView(viewToShow) {
        // Encontra a view atualmente ativa
        const activeView = document.querySelector('.view.active');
        
        if (activeView) {
            // Remove a classe active e oculta a tela atual
            activeView.classList.remove('active');
            
            // Aguarda o fim da animação de saída (opcional, dependendo do design CSS)
            setTimeout(() => {
                activeView.style.display = 'none';
                
                // Prepara e exibe a nova tela
                viewToShow.style.display = 'block';
                // Um pequeno delay para garantir que o display block foi aplicado antes da animação
                requestAnimationFrame(() => {
                    viewToShow.classList.add('active');
                });
            }, 300); // tempo menor que a transição CSS para não bugar, ou igual a 0 se display for modificado antes
        } else {
            // Fallback caso não tenha view ativa
            viewToShow.style.display = 'block';
            requestAnimationFrame(() => {
                viewToShow.classList.add('active');
            });
        }
    }

    // Como o CSS lida com display:none de forma um pouco complexa com animações
    // Uma abordagem melhor é alterar o display e logo em seguida adicionar a classe active.
    function betterSwitchView(hideView, showView) {
        hideView.classList.remove('active');
        
        setTimeout(() => {
            hideView.style.display = 'none';
            showView.style.display = 'block';
            
            // Força um reflow para garantir que a transição CSS ocorra
            void showView.offsetWidth; 
            
            showView.classList.add('active');
        }, 400); // 400ms = tempo da transição no CSS (--transition-speed)
    }

    // Event Listeners de Navegação
    btnShowRegister.addEventListener('click', () => {
        betterSwitchView(welcomeView, registerView);
    });

    btnShowLogin.addEventListener('click', () => {
        betterSwitchView(welcomeView, loginView);
    });

    btnsBack.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentView = btn.closest('.view');
            betterSwitchView(currentView, welcomeView);
            
            // Opcional: Limpar os formulários ao voltar
            if(currentView.id === 'register-view') registerForm.reset();
            if(currentView.id === 'login-view') loginForm.reset();
        });
    });

    // Manipulação do Formulário de Cadastro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Captura os dados usando FormData
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        // Loga os dados como JSON no console
        console.log('--- DADOS DE CADASTRO ---');
        console.log(JSON.stringify(data, null, 2));

        // Feedback visual (opcional)
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviado com sucesso!';
        submitBtn.style.background = 'var(--accent-secondary)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            registerForm.reset();
            betterSwitchView(registerView, welcomeView);
        }, 2000);
    });

    // Manipulação do Formulário de Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Captura os dados usando FormData
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        // Loga os dados como JSON no console
        console.log('--- DADOS DE LOGIN ---');
        console.log(JSON.stringify(data, null, 2));

        // Feedback visual (opcional)
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Acessando...';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            loginForm.reset();
            alert('Dados capturados no console. Confira o console do desenvolvedor (F12).');
        }, 1000);
    });
});
