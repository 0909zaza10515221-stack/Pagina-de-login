const SUPABASE_URL =
'https://aajblmuulvztjhstomlg.supabase.co';

const SUPABASE_ANON_KEY =
'sb_publishable_l8k3tU3fmN0S4LE6-mxAHA_-eKdzz1Q';

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

document.addEventListener('DOMContentLoaded', () => {

    // VIEWS
    const welcomeView =
        document.getElementById('welcome-view');

    const registerView =
        document.getElementById('register-view');

    const loginView =
        document.getElementById('login-view');

    // BOTÕES
    const btnShowRegister =
        document.getElementById('btn-show-register');

    const btnShowLogin =
        document.getElementById('btn-show-login');

    const btnsBack =
        document.querySelectorAll('.btn-back');

    // FORMS
    const registerForm =
        document.getElementById('register-form');

    const loginForm =
        document.getElementById('login-form');

    // TROCAR TELAS
    function betterSwitchView(hideView, showView) {

        hideView.classList.remove('active');

        setTimeout(() => {

            hideView.style.display = 'none';

            showView.style.display = 'block';

            void showView.offsetWidth;

            showView.classList.add('active');

        }, 400);

    }

    // ABRIR CADASTRO
    btnShowRegister.addEventListener('click', () => {

        betterSwitchView(
            welcomeView,
            registerView
        );

    });

    // ABRIR LOGIN
    btnShowLogin.addEventListener('click', () => {

        betterSwitchView(
            welcomeView,
            loginView
        );

    });

    // VOLTAR
    btnsBack.forEach(btn => {

        btn.addEventListener('click', () => {

            const currentView =
                btn.closest('.view');

            betterSwitchView(
                currentView,
                welcomeView
            );

        });

    });

    // CADASTRO
    registerForm.addEventListener('submit',
    async (e) => {

        e.preventDefault();

        const formData =
            new FormData(registerForm);

        const data =
            Object.fromEntries(
                formData.entries()
            );

        console.log(data);

        const submitBtn =
            registerForm.querySelector(
                'button[type="submit"]'
            );

        const originalText =
            submitBtn.textContent;

        submitBtn.textContent =
            'Criando conta...';

        // AUTH
        const {
            data: authData,
            error
        } = await supabaseClient.auth.signUp({

            email: data.email,

            password: data.password

        });

        // ERRO
        if (error) {

            alert(error.message);

            submitBtn.textContent =
                originalText;

            return;
        }

        // USUÁRIO
        const user =
            authData.user;

        // SALVA PERFIL
        const {
            error: profileError
        } = await supabaseClient
            .from('profiles')
            .insert([
                {
                    id: user.id,

                    nome: data.nome,

                    telefone: data.telefone
                }
            ]);

        // ERRO PERFIL
        if (profileError) {

            alert(profileError.message);

            return;
        }

        submitBtn.textContent =
            'Conta criada!';

        setTimeout(() => {

            registerForm.reset();

            betterSwitchView(
                registerView,
                loginView
            );

            submitBtn.textContent =
                originalText;

        }, 1500);

    });

    // LOGIN
    loginForm.addEventListener('submit',
    async (e) => {

        e.preventDefault();

        const formData =
            new FormData(loginForm);

        const data =
            Object.fromEntries(
                formData.entries()
            );

        const submitBtn =
            loginForm.querySelector(
                'button[type="submit"]'
            );

        const originalText =
            submitBtn.textContent;

        submitBtn.textContent =
            'Entrando...';

        // LOGIN REAL
        const {
            data: loginData,
            error
        } = await supabaseClient
            .auth
            .signInWithPassword({

                email: data.email,

                password: data.password

            });

        // ERRO LOGIN
        if (error) {

            alert(
                'Email ou senha incorretos'
            );

            submitBtn.textContent =
                originalText;

            return;
        }

        console.log(loginData);

        submitBtn.textContent =
            'Login realizado!';

        // REDIRECIONA
        setTimeout(() => {

            window.location.href =
                'dashboard.html';

        }, 1000);

    });

});