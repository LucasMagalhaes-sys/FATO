document.addEventListener('DOMContentLoaded', () => {
    // Atualiza o ano no rodapé automaticamente
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Configurações de tema e idioma
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');

    const translations = {
        pt: {
            'nav.home': 'Início',
            'nav.games': 'Jogos',
            'nav.about': 'Sobre Nós',
            'nav.contact': 'Contato',
            'hero.title': 'Crie Mundos, Conte Histórias, Jogue o Futuro.',
            'hero.subtitle': 'FATO std é um estúdio de jogos dedicado a experiências imersivas e inovadoras.',
            'hero.cta': 'Explore Nossos Jogos',
            'games.title': 'Nosso Jogo',
            'games.card.title': 'IES Simulator',
            'games.card.description': 'Viva a vida de um técnico de TI aprendendo um pouco cada dia sobre o mundo da tecnologia e informação.',
            'games.card.cta': 'Saiba Mais',
            'about.title': 'Sobre Nós',
            'about.text': 'Na FATO std, somos apaixonados por criar experiências de jogo inovadoras e memoráveis. Nossa equipe de desenvolvedores, artistas e designers talentosos trabalha incansavelmente para dar vida a mundos imaginativos e histórias cativantes. Acreditamos que os jogos têm o poder de inspirar, conectar e entreter, e nos esforçamos para superar os limites da criatividade em cada projeto que assumimos.',
            'contact.title': 'Entre em Contato',
            'contact.name': 'Nome:',
            'contact.namePlaceholder': 'Seu Nome',
            'contact.email': 'Email:',
            'contact.emailPlaceholder': 'seu.email@exemplo.com',
            'contact.message': 'Mensagem:',
            'contact.messagePlaceholder': 'Sua mensagem...',
            'contact.submit': 'Enviar Mensagem',
            'footer.privacy': 'Privacidade',
            'footer.terms': 'Termos',
            'footer.rights': 'Todos os direitos reservados.',
            'thanks.title': 'Obrigado!',
            'thanks.message': 'Sua mensagem foi enviada com sucesso para a FATO std. Entraremos em contato em breve!',
            'thanks.button': 'Voltar para a Página Inicial',
            'aria.themeToggle': 'Alterar tema',
            'aria.langToggle': 'Alterar idioma'
        },
        en: {
            'nav.home': 'Home',
            'nav.games': 'Games',
            'nav.about': 'About',
            'nav.contact': 'Contact',
            'hero.title': 'Create Worlds, Tell Stories, Play the Future.',
            'hero.subtitle': 'FATO std is an indie game studio focused on immersive and innovative experiences.',
            'hero.cta': 'Explore Our Games',
            'games.title': 'Our Game',
            'games.card.title': 'IES Simulator',
            'games.card.description': 'Live the life of an IT technician learning a little each day about the world of technology and information.',
            'games.card.cta': 'Learn More',
            'about.title': 'About Us',
            'about.text': 'At FATO std, we are passionate about creating innovative and memorable game experiences. Our team of developers, artists and designers works tirelessly to bring imaginative worlds and captivating stories to life. We believe games have the power to inspire, connect and entertain, and we strive to push the limits of creativity in every project we take on.',
            'contact.title': 'Get in Touch',
            'contact.name': 'Name:',
            'contact.namePlaceholder': 'Your Name',
            'contact.email': 'Email:',
            'contact.emailPlaceholder': 'your.email@example.com',
            'contact.message': 'Message:',
            'contact.messagePlaceholder': 'Your message...',
            'contact.submit': 'Send Message',
            'footer.privacy': 'Privacy',
            'footer.terms': 'Terms',
            'footer.rights': 'All rights reserved.',
            'thanks.title': 'Thank you!',
            'thanks.message': 'Your message has been successfully sent to FATO std. We will contact you shortly!',
            'thanks.button': 'Back to Home',
            'aria.themeToggle': 'Toggle theme',
            'aria.langToggle': 'Toggle language'
        }
    };

    function applyTranslations(lang) {
        const dictionary = translations[lang] || translations.pt;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = dictionary[key];
            if (typeof value === 'string') {
                el.textContent = value;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const value = dictionary[key];
            if (typeof value === 'string') {
                el.setAttribute('placeholder', value);
            }
        });

        document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

        const langButtonText = lang === 'en' ? 'EN' : 'PT';
        if (langToggle) langToggle.textContent = langButtonText;
        if (langToggleMobile) langToggleMobile.textContent = langButtonText;

        if (langToggle) langToggle.setAttribute('aria-label', dictionary['aria.langToggle']);
        if (langToggleMobile) langToggleMobile.setAttribute('aria-label', dictionary['aria.langToggle']);
    }

    function setTheme(theme) {
        const root = document.documentElement;
        const isDark = theme === 'dark';

        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

        const icon = isDark ? '☀️' : '🌙';
        if (themeToggleIcon) themeToggleIcon.textContent = icon;
        if (themeToggleMobileIcon) themeToggleMobileIcon.textContent = icon;

        const currentLang = document.documentElement.lang.startsWith('en') ? 'en' : 'pt';
        const dictionary = translations[currentLang] || translations.pt;
        const ariaLabel = dictionary['aria.themeToggle'] || 'Toggle theme';
        if (themeToggle) themeToggle.setAttribute('aria-label', ariaLabel);
        if (themeToggleMobile) themeToggleMobile.setAttribute('aria-label', ariaLabel);
    }

    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const themeToggleMobileIcon = document.getElementById('theme-toggle-mobile-icon');

    function getSavedTheme() {
        return localStorage.getItem('theme');
    }

    function getSavedLanguage() {
        return localStorage.getItem('lang');
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(theme);
    }

    function initLanguage() {
        const savedLang = getSavedLanguage();
        const browserLang = navigator.language && navigator.language.startsWith('en') ? 'en' : 'pt';
        const lang = savedLang || browserLang;
        localStorage.setItem('lang', lang);
        applyTranslations(lang);
    }

    function toggleTheme() {
        const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    }

    function toggleLanguage() {
        const current = document.documentElement.lang.startsWith('en') ? 'en' : 'pt';
        const next = current === 'en' ? 'pt' : 'en';
        localStorage.setItem('lang', next);
        applyTranslations(next);
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
    if (langToggle) langToggle.addEventListener('click', toggleLanguage);
    if (langToggleMobile) langToggleMobile.addEventListener('click', toggleLanguage);

    initTheme();
    initLanguage();

    // JavaScript para rolagem suave da navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Permite que links genéricos (href="#") funcionem normalmente
            if (!targetId || targetId === '#') {
                return;
            }

            e.preventDefault();

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Fecha o menu mobile após clicar em um link (se estiver aberto)
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('flex')) {
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // JavaScript para alternar o menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');

            mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
        });

        // Fecha o menu mobile ao clicar fora dele
        document.addEventListener('click', function (event) {
            const isClickInside = mobileMenu.contains(event.target) || mobileMenuButton.contains(event.target);
            if (!isClickInside && mobileMenu.classList.contains('flex')) {
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
