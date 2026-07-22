/**
 * Premium ERP SaaS - About Page JS
 * Specific GSAP animations for the complex About layouts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        return; // GSAP not loaded
    }

    const isMobile = window.innerWidth < 1024;

    /* --------------------------------------------------------------------------
       Section 1: Who We Are
       -------------------------------------------------------------------------- */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Text & Stats
    if (!isMobile) {
        heroTl.from('.abt-hero-content h1', { y: 30, opacity: 0, duration: 1 })
              .from('.hero-story', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
              .from('.hero-stats .stat-box', { y: 20, opacity: 0, stagger: 0.2, duration: 0.6 }, '-=0.4');
    }

    // Desktop Visuals
    if (!isMobile) {
        heroTl.from('.desktop-visual .layer-1', { scale: 0.9, opacity: 0, duration: 1, ease: 'back.out(1.2)' }, '-=0.8')
              .from('.desktop-visual .layer-2', { x: 40, opacity: 0, duration: 0.8 }, '-=0.5')
              .from('.desktop-visual .layer-3', { y: -40, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.6');
              
        // Continuous float
        gsap.to('.desktop-visual .layer-2', { y: -15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.desktop-visual .layer-3', { y: 15, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
    }

    // Counters
    const counters = document.querySelectorAll('.abt-hero-content .counter');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        
        gsap.to(counter, {
            innerHTML: target,
            duration: 2.5,
            snap: { innerHTML: isDecimal ? 0.01 : 1 },
            ease: 'power2.out',
            onUpdate: function() {
                if(isDecimal) {
                    counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(2);
                }
            }
        });
    });

    /* --------------------------------------------------------------------------
       Section 2: Our ERP Journey
       -------------------------------------------------------------------------- */
    // Draw timeline line
    gsap.to('.timeline-progress', {
        scrollTrigger: {
            trigger: '.timeline-wrapper',
            start: 'top center',
            end: 'bottom center',
            scrub: 1
        },
        height: '100%',
        ease: 'none'
    });

    // Reveal items
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!isMobile) {
        timelineItems.forEach((item, i) => {
            const direction = item.classList.contains('left') ? -50 : 50;
            
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    onEnter: () => item.classList.add('active'),
                    onLeaveBack: () => item.classList.remove('active')
                },
                x: direction,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    /* --------------------------------------------------------------------------
       Section 3: How We Operate
       -------------------------------------------------------------------------- */
    const opTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.operate-hub',
            start: 'top 70%'
        }
    });

    if (!isMobile) {
        opTl.from('.hub-center', { scale: 0.5, opacity: 0, duration: 1, ease: 'back.out(1.5)' });

        // Animate SVG Lines
        opTl.from('.hub-line', { strokeDashoffset: 800, duration: 1.5, stagger: 0.1, ease: 'power2.inOut' }, '-=0.5');
        // Pop in nodes
        opTl.from('.hub-node', { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, '-=1');
        
        // Gentle float for nodes
        gsap.to('.hub-node', {
            y: 'random(-10, 10)',
            x: 'random(-10, 10)',
            duration: 'random(3, 5)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { amount: 2, from: "random" }
        });
    }

    /* --------------------------------------------------------------------------
       Section 4: How Enterprises Run With ERP (Live Business Flow)
       -------------------------------------------------------------------------- */
    const flowTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.abt-flow',
            start: 'top 75%'
        }
    });

    if (!isMobile) {
        flowTl.from('.f-left .flow-card', { x: -30, opacity: 0, duration: 0.6, stagger: 0.15, clearProps: 'transform' })
              .from('.f-line', { strokeDashoffset: 1000, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.2')
              .from('.flow-engine', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.5')
              .from('.f-right .flow-card', { x: 30, opacity: 0, duration: 0.6, stagger: 0.15, clearProps: 'transform' }, '-=0.3');
    }

    /* --------------------------------------------------------------------------
       Section 5: Our Approach
       -------------------------------------------------------------------------- */
    const approachTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.abt-approach',
            start: 'top 75%'
        }
    });

    if (!isMobile) {
        approachTl.from('.t-node', { 
            scale: 0.8, 
            opacity: 0, 
            duration: 0.6, 
            stagger: 0.2, 
            ease: 'back.out(1.5)' 
        });
        
        // Node float animation removed per request
    }

    /* --------------------------------------------------------------------------
       Section 6: Built For The Future
       -------------------------------------------------------------------------- */
    const futureTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.abt-future',
            start: 'top 75%'
        }
    });

    if (!isMobile) {
        futureTl.from('.f-hero', { scale: 0.95, opacity: 0, duration: 0.8, ease: 'power2.out' })
                .from('.f-badge', { y: 20, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.4')
                .from('.f-item', { x: -30, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.2');
    }

    // Feature Hover Image change
    const fHeroImg = document.getElementById('f-hero-img');
    const fItems = document.querySelectorAll('.f-item');
    if (fHeroImg && fItems.length > 0 && !isMobile) {
        fItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const newSrc = item.getAttribute('data-img');
                if (newSrc && fHeroImg.src !== newSrc) {
                    fHeroImg.style.opacity = 0;
                    setTimeout(() => {
                        fHeroImg.src = newSrc;
                        fHeroImg.onload = () => {
                            fHeroImg.style.opacity = 1;
                        };
                    }, 150);
                }
            });
        });
    }

    /* --------------------------------------------------------------------------
       Section 7: Our Commitment
       -------------------------------------------------------------------------- */
    const commitTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.abt-commitment',
            start: 'top 75%'
        }
    });

    if (!isMobile) {
        commitTl.from('.c-hero', { scale: 0.9, opacity: 0, duration: 0.8, ease: 'power2.out' })
                .from('.c-node', { 
                    scale: 0.8, 
                    opacity: 0, 
                    duration: 0.5, 
                    stagger: 0.2, 
                    ease: 'back.out(1.5)' 
                }, '-=0.4');
    }
    
    /* --------------------------------------------------------------------------
       Premium CTA Section
       -------------------------------------------------------------------------- */
    const ctaTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.premium-cta',
            start: 'top 75%'
        }
    });

    // Background image slow zoom (parallax-like)
    gsap.fromTo('.cta-bg-img img', 
        { scale: 1.15 },
        {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.premium-cta',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        }
    );

    // Grid parallax effect
    gsap.fromTo('.cta-overlay-grid', 
        { backgroundPosition: '0px 0px' },
        {
            backgroundPosition: '0px 200px',
            ease: 'none',
            scrollTrigger: {
                trigger: '.premium-cta',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        }
    );

    if (!isMobile) {
        ctaTl.from('.cta-content-box', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' })
             .from('.cta-stats .stat-box', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4');
    }

    // Particle floating animation
    gsap.to('.cta-particles .particle', {
        y: 'random(-50, 50)',
        x: 'random(-50, 50)',
        opacity: 'random(0.2, 0.8)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: 'sine.inOut'
    });

    // Number counters
    const ctaStats = document.querySelectorAll('.cta-num');
    ctaStats.forEach(stat => {
        const text = stat.innerText;
        const endNum = parseFloat(text.replace(/,/g, ''));
        let finalNum = endNum;
        if(endNum === 99.99) finalNum = 9999;
        
        gsap.from(stat, {
            scrollTrigger: {
                trigger: '.premium-cta',
                start: 'top 60%'
            },
            innerHTML: 0,
            duration: 2.5,
            snap: { innerHTML: 1 },
            onUpdate: function() {
                const val = Math.round(this.targets()[0].innerHTML);
                let formatted = val.toLocaleString();
                if (endNum === 1500) formatted = val + '+';
                if (endNum === 99.99) formatted = (val / 100).toFixed(2) + '%';
                if (endNum === 50000000) formatted = Math.round(val / 1000000) + 'M+';
                stat.innerHTML = formatted;
            }
        });
        
        // Initial setup for the 99.99% stat
        if(endNum === 99.99) stat.innerHTML = "9999"; 
    });
});
