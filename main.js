/**
 * ÓPPUS Advocacia — main.js
 * Animações de scroll, FAQ accordion, WhatsApp float
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Scroll Reveal Animation ──────────────────────────────
    const animateTargets = document.querySelectorAll('[data-animate]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    animateTargets.forEach(el => {
        revealObserver.observe(el);
    });

    // ── 2. Stagger children animation ──────────────────────────
    const staggerContainers = document.querySelectorAll('[data-animate="stagger"]');
    staggerContainers.forEach(container => {
        const children = container.querySelectorAll('[data-animate="fade-up"]');
        children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 80}ms`;
        });
    });

    // ── 3. FAQ Accordion ────────────────────────────────────────
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.faq-item');
            const body = item.querySelector('.faq-body');
            const isOpen = item.classList.contains('faq-open');

            // Close all others
            document.querySelectorAll('.faq-item.faq-open').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('faq-open');
                    openItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                    openItem.querySelector('.faq-body').style.maxHeight = '0';
                }
            });

            // Toggle current
            if (isOpen) {
                item.classList.remove('faq-open');
                trigger.setAttribute('aria-expanded', 'false');
                body.style.maxHeight = '0';
            } else {
                item.classList.add('faq-open');
                trigger.setAttribute('aria-expanded', 'true');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // ── 4. WhatsApp float pulse on load ──────────────────────────
    const waFloat = document.getElementById('whatsapp-float');
    if (waFloat) {
        setTimeout(() => {
            waFloat.style.animation = 'wa-pulse 2s ease-in-out 3';
        }, 3000);
    }

    // ── 5. Smooth parallax on hero particles (subtle) ───────────
    const heroParticles = document.querySelectorAll('.hero-particles span');
    if (heroParticles.length && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            heroParticles.forEach((p, i) => {
                const factor = (i + 1) * 0.15;
                p.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        });
    }

    // ── 6. Map fallback (if API key fails, show static link) ────
    const mapIframe = document.querySelector('.contato-map iframe');
    if (mapIframe) {
        mapIframe.addEventListener('error', () => {
            const fallback = document.createElement('a');
            fallback.href = 'https://www.google.com/maps/search/?api=1&query=Rua+Perobas,+561,+Colonial,+Contagem+-+MG';
            fallback.target = '_blank';
            fallback.rel = 'noopener';
            fallback.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:center;height:100%;
                background:rgba(42,59,90,0.5);color:#C5A059;flex-direction:column;gap:12px;
                font-family:'Montserrat',sans-serif;text-decoration:none;padding:32px;text-align:center;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span style="font-size:0.9rem;font-weight:600;letter-spacing:1px;">Rua Perobas, 561, Colonial<br>Contagem – MG</span>
                    <span style="font-size:0.75rem;opacity:0.7;letter-spacing:1px;text-transform:uppercase;">Clique para ver no Maps</span>
                </div>
            `;
            mapIframe.parentElement.replaceChild(fallback, mapIframe);
        });
    }
});

// ── CSS for WhatsApp pulse (injected) ─────────────────────────
const style = document.createElement('style');
style.textContent = `
@keyframes wa-pulse {
    0%, 100% { box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4); }
    50% { box-shadow: 0 8px 40px rgba(37, 211, 102, 0.7), 0 0 0 12px rgba(37,211,102,0.1); }
}
`;
document.head.appendChild(style);
