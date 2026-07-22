/**
 * Premium ERP SaaS Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Apply creative staggered AOS animations to headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading, index) => {
        if (!heading.hasAttribute('data-aos') && !heading.closest('.hero-content, .abt-hero-content, .sol-hero, .hero-section')) {
            // Apply different animations based on heading level
            let anim = 'fade-up';
            if (heading.tagName === 'H2') anim = 'zoom-in-up';
            else if (heading.tagName === 'H3' || heading.tagName === 'H4') anim = 'fade-up';
            else anim = 'zoom-in';
            
            heading.setAttribute('data-aos', anim);
            // Create a staggered wave effect by applying a varied delay (0, 100, 200ms)
            heading.setAttribute('data-aos-delay', (index % 3) * 100);
        }
    });

    // Add generic fade-up AOS animation to paragraphs
    document.querySelectorAll('p').forEach(p => {
        if (!p.hasAttribute('data-aos') && !p.closest('.hero-content, .abt-hero-content, .sol-hero, .hero-section')) {
            p.setAttribute('data-aos', 'fade-up');
        }
    });

    // Initialize AOS for scroll reveals
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            disable: function() {
                return window.innerWidth < 1024;
            }
        });
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger on window load to fix any offset/caching issues
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    /* ----------------------------------------------------------------------
       1. Header & Mobile Menu
       ---------------------------------------------------------------------- */
    const header = document.querySelector('.header');
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobileDrawer');
    
    // Handle Header Scroll State
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Handle Mobile Menu Toggle
    if (hamburger && mobileDrawer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileDrawer.classList.toggle('open');
            document.body.classList.toggle('no-scroll', mobileDrawer.classList.contains('open'));
            // Remove any old inline styles just in case
            document.body.style.overflow = '';
        });

        // Close drawer when clicking a link
        const mobileLinks = mobileDrawer.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileDrawer.classList.remove('open');
                document.body.classList.remove('no-scroll');
            });
        });

        // Ensure overflow is restored if window is resized to desktop while drawer is open
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                hamburger.classList.remove('active');
                mobileDrawer.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    /* ----------------------------------------------------------------------
       2. Swiper Testimonial / Success Slider Initialization
       ---------------------------------------------------------------------- */
    const sliderSelector = document.querySelector('.success-slider') ? '.success-slider' : '.testimonial-slider';
    if(document.querySelector(sliderSelector)) {
        new Swiper(sliderSelector, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 }
            }
        });
    }

    /* ----------------------------------------------------------------------
       3. GSAP Animations
       ---------------------------------------------------------------------- */

    // Check if it's a mobile device to reduce animation intensity
    const isMobile = window.innerWidth < 1024;

    // --- Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const isDecimal = counter.getAttribute('data-decimal') === 'true';
                
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power3.out',
                    onUpdate: () => {
                        if (isDecimal) {
                            counter.innerText = obj.val.toFixed(1);
                        } else {
                            counter.innerText = Math.floor(obj.val);
                        }
                    }
                });
            }
        });
    });

    // --- Hero Section (Preserved) ---
    const heroTl = gsap.timeline();
    
    if (!isMobile) {
        heroTl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' })
              .from('.hero-content h1', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
              .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
              .from('.hero-buttons', { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
              .from('.hero-trust-stats .h-stat', { y: 15, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.2');

        // Dashboard entrance
        heroTl.from('.command-center', { 
            y: 40, 
            opacity: 0, 
            duration: 1, 
            ease: 'back.out(1.2)' 
        }, '-=0.8');

        // Dashboard inner elements stagger
        heroTl.from('.cc-panel', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.5')
              .from('.cc-chart-line path', { strokeDasharray: 200, strokeDashoffset: 200, duration: 1.5, ease: 'power2.inOut' }, '-=0.5')
              .from('.cc-ai-banner', { scale: 0.9, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.5');
    }

    // Floating Glass Cards (Desktop only)
    if (!isMobile) {
        heroTl.from('.fc-card', { 
            scale: 0.8, 
            opacity: 0, 
            y: 20,
            stagger: 0.15, 
            duration: 0.6, 
            ease: 'back.out(1.5)' 
        }, '-=0.8');
        
        // Continuous float animation for cards
        gsap.to('.fc-top', { y: -10, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.fc-bottom', { y: 10, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
        gsap.to('.fc-left', { x: -10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
        gsap.to('.fc-right', { x: 10, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
    }

    // --- Section 2: ERP Ecosystem ---
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
        gsap.from('.erp-core', {
            scrollTrigger: { trigger: '.ecosystem-section', start: 'top 70%' },
            scale: 0.8, opacity: 0, duration: 1, ease: 'back.out(1.2)'
        });
        
        gsap.from('.erp-module', {
            scrollTrigger: { trigger: '.ecosystem-section', start: 'top 60%' },
            y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out'
        });
    });

    mm.add("(max-width: 767px)", () => {
        // Disabled per user request on mobile
    });

    // --- Section 3: Interactive ERP Workspace ---
    const moduleGroups = document.querySelectorAll('.iw-module-group');
    
    // Entrance Animation
    if (!isMobile) {
        gsap.from('.iw-nav-card', {
            scrollTrigger: { trigger: '.interactive-workspace-section', start: 'top 60%' },
            x: -30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
        });
    }
    
    // Interaction Logic
    if (!isMobile) {
        // Desktop / Tablet: Hover triggers active state
        moduleGroups.forEach(group => {
            const navCard = group.querySelector('.iw-nav-card');
            navCard.addEventListener('mouseenter', () => {
                moduleGroups.forEach(g => g.classList.remove('active'));
                group.classList.add('active');
            });
        });
    } else {
        // Mobile: Click triggers accordion
        moduleGroups.forEach(group => {
            const navCard = group.querySelector('.iw-nav-card');
            navCard.addEventListener('click', () => {
                const isActive = group.classList.contains('active');
                moduleGroups.forEach(g => g.classList.remove('active'));
                if (!isActive) {
                    group.classList.add('active');
                    setTimeout(() => { group.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
                }
            });
        });
    }

    // --- Section 4: Control Center ---
    const fdTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.control-center-section',
            start: 'top 60%',
        }
    });

    if (!isMobile) {
        fdTl.from('.full-dashboard', { scale: 0.95, y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
            .from('.kpi-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.4')
            .from('.mock-large-bar-chart', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3');
    }

    if (!isMobile) {
        fdTl.from('.fd-notif', { 
            scale: 0.8, 
            opacity: 0, 
            duration: 0.5, 
            stagger: 0.15,
            ease: 'back.out(1.2)' 
        }, '-=0.2');
    }

    // --- Section 5: How it Works (Timeline) ---
    // Progress line fills as we scroll
    gsap.to('.journey-progress', {
        scrollTrigger: {
            trigger: '.process-journey',
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 1, // Smooth scrubbing
        },
        height: isMobile ? '100%' : '2px',
        width: isMobile ? '100%' : '100%',
        ease: 'none'
    });

    // Nodes activate
    const jSteps = document.querySelectorAll('.j-step');
    jSteps.forEach((step, i) => {
        gsap.to(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                onEnter: () => step.classList.add('active'),
                onLeaveBack: () => step.classList.remove('active'),
            }
        });
        
        gsap.from(step.querySelector('.j-card'), {
            scrollTrigger: {
                trigger: step,
                start: 'top 85%',
            },
            y: 20,
            opacity: 0,
            duration: 0.5
        });
    });

    // --- Section 6: Industry Solutions ---
    // Switched to AOS for more reliable triggering

    // --- Section 7: AI Business Command Center ---
    // Number Counters
    const aiCounters = document.querySelectorAll('.ai-command-center-section .counter');
    aiCounters.forEach(counter => {
        ScrollTrigger.create({
            trigger: '.ai-command-center-section',
            start: 'top 75%',
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power1.out'
                });
            }
        });
    });

    // Floating Particles
    const particlesContainer = document.getElementById('aiParticles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            let p = document.createElement('div');
            p.style.width = Math.random() * 4 + 2 + 'px';
            p.style.height = p.style.width;
            p.style.background = 'rgba(37, 99, 235, 0.5)';
            p.style.position = 'absolute';
            p.style.borderRadius = '50%';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.boxShadow = '0 0 10px rgba(37, 99, 235, 0.8)';
            particlesContainer.appendChild(p);
            
            gsap.to(p, {
                y: `random(-150, 150)`,
                x: `random(-50, 50)`,
                opacity: `random(0.1, 0.8)`,
                duration: `random(4, 10)`,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }
    
    // --- Section 8: Integrations ---
    gsap.from('.int-hub', {
        scrollTrigger: { trigger: '.integrations-section', start: 'top 70%' },
        scale: 0, rotation: 180, opacity: 0, duration: 1, ease: 'back.out(1.2)'
    });
    gsap.from('.int-app', {
        scrollTrigger: { trigger: '.integrations-section', start: 'top 65%' },
        scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)'
    });

    // --- Section 9: Success Stories Slider ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.success-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                }
            }
        });
    }

    // --- Section 10: Environments ---
    gsap.from('.env-card', {
        scrollTrigger: { trigger: '.environments-section', start: 'top 75%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
    });

    // --- Section 11: CTA ---
    gsap.from('.cta-command-panel', {
        scrollTrigger: { trigger: '.cta-section', start: 'top 75%' },
        scale: 0.95, opacity: 0, duration: 0.8, ease: 'power2.out'
    });

    // --- Footer Accordion ---
    const accToggles = document.querySelectorAll('.acc-toggle');
    accToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                const content = toggle.nextElementSibling;
                content.classList.toggle('open');
                
                // Toggle icon if needed
                const icon = toggle.querySelector('i');
                if(icon) {
                    icon.classList.toggle('fa-chevron-down');
                    icon.classList.toggle('fa-chevron-up');
                }
            }
        });
    });

    // --- AI Chat Logic ---
    const aiChatInput = document.getElementById('aiChatInput');
    const aiChatSubmit = document.getElementById('aiChatSubmit');
    const aiChatHistory = document.getElementById('aiChatHistory');

    if (aiChatInput && aiChatSubmit && aiChatHistory) {
        const handleChatSubmit = () => {
            const val = aiChatInput.value.trim();
            if (!val) return;

            // Add user message
            const userMsgHTML = `
                <div class="chat-msg user-msg">
                    <div class="msg-bubble">${val}</div>
                </div>
            `;
            aiChatHistory.insertAdjacentHTML('beforeend', userMsgHTML);
            aiChatInput.value = '';
            aiChatHistory.scrollTop = aiChatHistory.scrollHeight;

            // Add AI typing indicator after brief delay
            const typingId = 'typing-' + Date.now();
            const aiTypingHTML = `
                <div class="chat-msg ai-msg" id="${typingId}">
                    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-bubble ai-typing-bubble">
                        <span class="typing-text">Analyzing request...</span><span class="cursor">|</span>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                aiChatHistory.insertAdjacentHTML('beforeend', aiTypingHTML);
                aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
                
                // Replace typing indicator with actual response
                setTimeout(() => {
                    const typingEl = document.getElementById(typingId);
                    if (typingEl) typingEl.remove();
                    
                    const responseHTML = `
                        <div class="chat-msg ai-msg">
                            <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                            <div class="msg-bubble">I have processed your request. Based on real-time ERP data, all systems are operating optimally and your metrics look strong!</div>
                        </div>
                    `;
                    aiChatHistory.insertAdjacentHTML('beforeend', responseHTML);
                    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
                }, 1500);

            }, 400);
        };

        aiChatSubmit.addEventListener('click', handleChatSubmit);
        aiChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });
        
        // Make suggestion chips clickable
        const suggestionChips = document.querySelectorAll('.suggestion-chip');
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                aiChatInput.value = chip.textContent;
                handleChatSubmit();
            });
        });
    }

    // --- Contact Form Submission ---
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission / page reload
            
            const submitBtn = demoForm.querySelector('button[type="submit"]');
            const statusDiv = document.getElementById('formStatus');
            
            if (submitBtn && statusDiv) {
                // Change button state to loading
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate network request delay
                setTimeout(() => {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    statusDiv.style.display = 'block';
                    statusDiv.style.color = '#34d399';
                    statusDiv.innerHTML = '<i class="fa-solid fa-check-circle"></i> Thank you! Your demo request has been successfully submitted.';
                    
                    // Reset form fields
                    demoForm.reset();
                    
                    // Hide message after a few seconds
                    setTimeout(() => {
                        statusDiv.style.display = 'none';
                    }, 6000);
                }, 1500);
            }
        });
    }

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // --- Clear newsletter form on submit so it's empty on back navigation ---
    const newsletterForms = document.querySelectorAll('.f-newsletter');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', () => {
            setTimeout(() => form.reset(), 10);
        });
    });

});

