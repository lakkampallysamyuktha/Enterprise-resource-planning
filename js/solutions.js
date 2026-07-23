document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    const isMobile = window.innerWidth < 1024;

    /* --------------------------------------------------------------------------
       Section 1: Hero Animation
       -------------------------------------------------------------------------- */
    const heroTl = gsap.timeline();
    
    if (!isMobile) {
        // Animate hero text
        heroTl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' })
              .from('.sol-hero-content h1', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
              .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
              .from('.hero-actions', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
              .from('.mobile-sol-tags .sol-tag', { y: 10, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.4');

        // Animate transformation scene
        heroTl.from('.broken-sys', { 
                scale: 0.8, 
                opacity: 0, 
                duration: 0.5, 
                stagger: 0.15,
                ease: 'power2.out'
              }, '-=0.5')
              .from('.transformation-arrow', {
                  opacity: 0,
                  scale: 0.5,
                  duration: 0.5,
                  ease: 'back.out(2)'
              }, '-=0.2')
              .from('.solution-state', {
                  x: 50,
                  y: 0,
                  opacity: 0,
                  duration: 0.8,
                  ease: 'power3.out'
              }, '-=0.2')
              .from('.node', {
                  scale: 0,
                  opacity: 0,
                  duration: 0.4,
                  stagger: 0.1,
                  ease: 'back.out(1.5)'
              }, '-=0.4');
    }

    // Interactive Click Handlers for Problem States
    const problemCards = document.querySelectorAll('.broken-sys');
    const solutionTitle = document.querySelector('.solution-state h3');
    
    const transformationContent = {
        's1': 'Automated Workflows',
        's2': 'Unified Data Hub',
        's3': 'Real-Time Insights'
    };

    problemCards.forEach(card => {
        card.addEventListener('click', () => {
            problemCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            let newTitle = 'Smart ERP Process';
            if (card.classList.contains('s1')) newTitle = transformationContent['s1'];
            if (card.classList.contains('s2')) newTitle = transformationContent['s2'];
            if (card.classList.contains('s3')) newTitle = transformationContent['s3'];
            
            gsap.to(solutionTitle, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                onComplete: () => {
                    solutionTitle.textContent = newTitle;
                    gsap.to(solutionTitle, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
                }
            });
            
            gsap.fromTo('.node', 
                { scale: 0.8, boxShadow: '0 0 5px rgba(37,99,235,0.2)' },
                { scale: 1, boxShadow: '0 0 20px rgba(37,99,235,0.8)', duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)' }
            );
        });
    });

    /* --------------------------------------------------------------------------
       Section 2: Solution Journey Map
       -------------------------------------------------------------------------- */
    if (!isMobile) {
        gsap.from('.j-path', {
            scrollTrigger: {
                trigger: '.journey-map',
                start: 'top 80%'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }

    /* --------------------------------------------------------------------------
       Section 3: Industry Split Scenarios
       -------------------------------------------------------------------------- */
    const splits = document.querySelectorAll('.scenario-split');
    if (!isMobile) {
        splits.forEach(split => {
            gsap.from(split.querySelector('.split-image'), {
                scrollTrigger: {
                    trigger: split,
                    start: 'top 75%'
                },
                scale: 0.95,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            
            gsap.from(split.querySelectorAll('.sd-block'), {
                scrollTrigger: {
                    trigger: split,
                    start: 'top 65%'
                },
                x: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.15,
                ease: 'power2.out'
            });
        });
    }

    /* --------------------------------------------------------------------------
       Section 4: Solution Configurator
       -------------------------------------------------------------------------- */
    if (!isMobile) {
        gsap.from('.config-interface-split', {
            scrollTrigger: {
                trigger: '.sol-configurator',
                start: 'top 75%'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    const indSelect = document.getElementById('config-industry');
    const chalSelect = document.getElementById('config-challenge');
    const outTitle = document.getElementById('config-output');
    const outDesc = document.getElementById('config-desc');
    const resultBox = document.querySelector('.config-result');
    const uiPreviewImg = document.getElementById('ui-preview-img');

    const solutions = {
        'manufacturing-inventory': { 
            title: "Manufacturing Operations Suite", 
            desc: "End-to-end operational control with advanced forecasting and real-time stock tracking for manufacturing.",
            img: "Images/unsplash-1581091226825.webp"
        },
        'manufacturing-finance': { 
            title: "Manufacturing Financial Cloud", 
            desc: "Unified financial management, automated compliance, and real-time ledger visibility for factories.",
            img: "Images/unsplash-1551288049.webp"
        },
        'manufacturing-hr': { 
            title: "Manufacturing Workforce Hub", 
            desc: "Digital workforce tools, automated payroll, and intelligent capacity planning for plant workers.",
            img: "Images/unsplash-1581092160562.webp"
        },
        'retail-inventory': { 
            title: "Retail Operations Suite", 
            desc: "Omnichannel inventory control with live stock tracking across all retail branches.",
            img: "Images/unsplash-1556742049.webp"
        },
        'retail-finance': { 
            title: "Retail Financial Cloud", 
            desc: "Automated POS reconciliation, multi-store financial reporting, and margin analysis.",
            img: "Images/unsplash-1556742111.webp"
        },
        'retail-hr': { 
            title: "Retail Workforce Hub", 
            desc: "Shift scheduling, performance tracking, and automated payroll for retail staff.",
            img: "Images/unsplash-1522071820081.webp"
        },
        'services-inventory': { 
            title: "Services Operations Suite", 
            desc: "Resource management, asset tracking, and utilization forecasting for professional services.",
            img: "Images/unsplash-1454165804606.webp"
        },
        'services-finance': { 
            title: "Services Financial Cloud", 
            desc: "Project-based accounting, automated invoicing, and real-time profitability tracking.",
            img: "Images/unsplash-1460925895917.webp"
        },
        'services-hr': { 
            title: "Services Workforce Hub", 
            desc: "Talent management, skill tracking, and performance analytics for professional teams.",
            img: "Images/unsplash-1600880292089.webp"
        }
    };

    function updateConfigurator() {
        const indValue = indSelect.value;
        const chalValue = chalSelect.value;
        const comboKey = `${indValue}-${chalValue}`;
        const solution = solutions[comboKey] || solutions['manufacturing-inventory'];
        
        // Animate out Text
        gsap.to(resultBox, { 
            opacity: 0, 
            y: 10, 
            duration: 0.3, 
            onComplete: () => {
                outTitle.textContent = solution.title;
                outDesc.textContent = solution.desc;
                // Animate in Text
                gsap.to(resultBox, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
            }
        });
        
        // Swap image with transition
        gsap.to(uiPreviewImg, {
            opacity: 0.5,
            scale: 0.95,
            filter: 'blur(4px)',
            duration: 0.3,
            onComplete: () => {
                if (solution.img) uiPreviewImg.src = solution.img;
                gsap.to(uiPreviewImg, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(1.5)' });
            }
        });
    }

    indSelect.addEventListener('change', updateConfigurator);
    chalSelect.addEventListener('change', updateConfigurator);

    /* --------------------------------------------------------------------------
       Section 5: Business Impact Center
       -------------------------------------------------------------------------- */
    let mmImpact = gsap.matchMedia();
    
    mmImpact.add("(min-width: 768px)", () => {
        gsap.fromTo('.impact-panel', 
            { y: 40, opacity: 0 },
            {
                scrollTrigger: { trigger: '.impact-stage', start: 'top 75%' },
                y: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: 'power3.out', clearProps: 'all'
            }
        );

        gsap.fromTo('.c-beam-horizontal', 
            { width: '0%' },
            {
                scrollTrigger: { trigger: '.impact-stage', start: 'top 70%' },
                width: '100%', duration: 1, stagger: 0.3, ease: 'power2.out', delay: 0.4, clearProps: 'width'
            }
        );
        
        gsap.fromTo('.fa-arrow-right.desktop-only', 
            { scale: 0, opacity: 0 },
            {
                scrollTrigger: { trigger: '.impact-stage', start: 'top 70%' },
                scale: 1, opacity: 1, duration: 0.5, stagger: 0.3, delay: 1.2, ease: 'back.out(2)', clearProps: 'all'
            }
        );
    });

    mmImpact.add("(max-width: 767px)", () => {
        const panels = gsap.utils.toArray('.impact-panel');
        panels.forEach((panel) => {
            gsap.fromTo(panel, 
                { y: 20, opacity: 0 },
                {
                    scrollTrigger: { trigger: panel, start: 'top 85%' },
                    y: 0, opacity: 1, duration: 0.6, clearProps: 'all'
                }
            );
        });

        const beams = gsap.utils.toArray('.c-beam-vertical');
        beams.forEach((beam) => {
            gsap.fromTo(beam, 
                { scaleY: 0 },
                {
                    scrollTrigger: { trigger: beam, start: 'top 80%' },
                    scaleY: 1, transformOrigin: 'top center', duration: 0.8, ease: 'power2.out', clearProps: 'all'
                }
            );
        });
        
        const arrows = gsap.utils.toArray('.fa-arrow-down.mobile-only');
        arrows.forEach((arrow) => {
            gsap.fromTo(arrow, 
                { scale: 0, opacity: 0 },
                {
                    scrollTrigger: { trigger: arrow, start: 'top 85%' },
                    scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', clearProps: 'all'
                }
            );
        });
    });

    // Progress Timeline Fill (scrubbed on scroll)
    const tlScroll = gsap.timeline({
        scrollTrigger: {
            trigger: '.impact-timeline',
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: 1
        }
    });
    tlScroll.to('.t-fill', { width: '100%', ease: 'none' }, 0)
            .to('.t-indicator', { left: '100%', ease: 'none' }, 0);

    /* --------------------------------------------------------------------------
       Section 6: A Day With ERP
       -------------------------------------------------------------------------- */
    gsap.from('.day-step', {
        scrollTrigger: {
            trigger: '.day-steps-container',
            start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    gsap.to('.day-timeline-progress', {
        scrollTrigger: {
            trigger: '.day-steps-container',
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1
        },
        height: isMobile ? '100%' : '2px', // Handle both mobile (height) and desktop (width via CSS override?)
        width: isMobile ? '100%' : '100%', // On desktop we actually animate width.
        ease: 'none'
    });

    tlScroll.to('.t-fill', { width: '100%', ease: 'none' }, 0)
            .to('.t-indicator', { left: '100%', ease: 'none' }, 0);

    /* --------------------------------------------------------------------------
       Section 7: Business Challenge Center (Interactive Control Panel)
       -------------------------------------------------------------------------- */
    const ccpTabs = document.querySelectorAll('.ccp-tab');
    const ccpPanels = document.querySelectorAll('.ccp-panel');

    ccpTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs and panels
            ccpTabs.forEach(t => t.classList.remove('active'));
            ccpPanels.forEach(p => p.classList.remove('active'));

            // Add active to clicked tab
            tab.classList.add('active');

            // Show corresponding panel
            const targetId = 'panel-' + tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    gsap.from('.challenge-control-panel', {
        scrollTrigger: {
            trigger: '.challenge-center-section',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    /* --------------------------------------------------------------------------
       Section 7: Final CTA
       -------------------------------------------------------------------------- */
    gsap.from('.cta-grid', {
        scrollTrigger: {
            trigger: '.sol-cta',
            start: 'top 80%'
        },
        scale: 0.95,
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});
