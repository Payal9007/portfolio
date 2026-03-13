// Scrollable Portfolio — Interactivity

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.getElementById('logo');
    const sections = ['home', 'work', 'skills', 'about'];

    // ── Smooth scroll on nav link click ──
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');
            const target = document.getElementById(targetId);
            if (target) {
                const offset = header.offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Logo → scroll to top
    logo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Active nav link on scroll ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    const href = link.getAttribute('href').replace('#', '');
                    link.classList.toggle('active', href === id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // ── Scroll reveal animation ──
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── Project Modal Logic ──
    const modal = document.getElementById('project-modal');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');

    const projectData = {
        'weather-card': {
            badge: '2025',
            title: 'Weather Dashboard',
            content: `
                <div class="modal-section">
                    <h3>Overview</h3>
                    <p>Developed a comprehensive weather dashboard providing real-time meteorological data for any location.</p>
                </div>
                <div class="modal-section">
                    <h3>Key Features</h3>
                    <ul>
                        <li>Developed using <strong>HTML, CSS and JavaScript</strong> for a responsive and intuitive UI.</li>
                        <li>Integrated <strong>OpenWeather API</strong> to fetch and display precise real-time weather data.</li>
                        <li>Used <strong>Geolocation API</strong> to automatically detect the user's current location for instant localized updates.</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h3>Technical Stack</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-value">JS</span>
                            <span class="stat-label">Logic</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">API</span>
                            <span class="stat-label">Data</span>
                        </div>
                    </div>
                </div>
            `
        },
        'sms-spam-card': {
            badge: '2024',
            title: 'SMS Spam Detection',
            content: `
                <div class="modal-section">
                    <h3>Summary</h3>
                    <p>Application for SMS spam detection that classifies SMS messages as spam or ham (non-spam).</p>
                </div>
                <div class="modal-section">
                    <h3>Technical Details</h3>
                    <p>Developed two machine learning models including <strong>Support Vector Classifier (SVC)</strong> for message classification.</p>
                </div>
                <div class="modal-section">
                    <h3>Application Domain</h3>
                    <p>Telecommunications, security, and messaging platforms.</p>
                </div>
                <div class="modal-section">
                    <h3>Performance</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-value">99.2%</span>
                            <span class="stat-label">Training Accuracy</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">98.30%</span>
                            <span class="stat-label">Test Accuracy</span>
                        </div>
                    </div>
                </div>
            `
        }
    };

    function openModal(projectId) {
        const data = projectData[projectId];
        if (data && modal) {
            modalBadge.textContent = data.badge;
            modalTitle.textContent = data.title;
            modalBody.innerHTML = data.content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    document.querySelectorAll('#weather-card, #sms-spam-card').forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.id);
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
