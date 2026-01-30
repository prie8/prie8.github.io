// --- Dark Mode Toggle ---
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const root = document.documentElement;

    if (!toggleButton) return;

    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        root.classList.add('dark-mode');
        const icon = toggleButton.querySelector('span');
        if (icon) icon.textContent = '☀';
    }

    toggleButton.addEventListener('click', () => {
        root.classList.toggle('dark-mode');
        const isDark = root.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        const icon = toggleButton.querySelector('span');
        if (icon) icon.textContent = isDark ? '☀' : '☾';
    });
});

// --- Intro Animation & Content Reveal ---
const introText = document.getElementById('intro-text');
const introOverlay = document.getElementById('intro-overlay');
const finalHeader = document.getElementById('final-title');

const revealContent = () => {
    // Activate all slide/fade transitions
    // Panels
    document.querySelectorAll('.slide-hidden-left, .slide-hidden-right, .construct-hidden').forEach(el => {
        el.classList.add('construct-active');
        el.classList.remove('slide-hidden-left', 'slide-hidden-right', 'construct-hidden');
        el.style.opacity = '1';
        el.style.transform = 'translate(0, 0)';
    });

    // Ensure all panel columns are visible
    document.querySelectorAll('.panel-column').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translate(0, 0)';
    });

    // Footer
    const footer = document.querySelector('.index-footer');
    if (footer) {
        footer.classList.remove('construct-hidden');
        footer.style.opacity = '1';
    }

    // Remove overlay if redundant
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.style.display = 'none';
        }, 500);
    }
};

const runIntroAnimation = () => {
    if (!introText || !introOverlay || !finalHeader) return;

    const text = "hi, i'm priya";
    let i = 0;

    // Typewriter
    function typeWriter() {
        if (i < text.length) {
            introText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // After typing, wait then FLIP
            setTimeout(startFlipAnimation, 800);
        }
    }

    function startFlipAnimation() {
        // FLIP Logic
        const firstRect = introText.getBoundingClientRect();
        const lastRect = finalHeader.getBoundingClientRect(); // The hidden h1 on the page

        const deltaX = lastRect.left - firstRect.left;
        const deltaY = lastRect.top - firstRect.top;
        const scale = lastRect.width / firstRect.width; // Approximate scale if needed, or just font size

        // We are actually moving the entire intro text to the position of the final header
        // But since we want to simply reveal the page, let's keep it robust:
        // Animate the introText to the position

        introText.style.transformOrigin = 'top left';
        introText.style.transition = 'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1)';
        introText.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        // At the end of transition, hide overlay and reveal content
        setTimeout(() => {
            introOverlay.style.opacity = '0';
            revealContent();
            sessionStorage.setItem('introPlayed', 'true');
        }, 1000);
    }

    typeWriter();
};

document.addEventListener('DOMContentLoaded', () => {
    // init modal listeners
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('click', window.closeProjectModal);
    }

    // init intro
    if (introText) {
        // We are on home page
        if (!sessionStorage.getItem('introPlayed')) {
            runIntroAnimation();
        } else {
            // Skip animation
            introOverlay.style.display = 'none';
            revealContent();
        }
    } else {
        // Not on home page, reveal immediately just in case
        revealContent();
    }
});


// --- Projects Data & Modal Logic ---

const projectsData = [
    {
        id: 'diabetic-wound',
        title: 'Personalized Diabetic Wound Healing',
        date: 'Oct 2024 - Feb 2025',
        image: 'images/project-diabetic/title.png',
        description: 'A CRISPR-Based Synthetic Biology Approach using engineered probiotics to dynamically detect and treat chronic diabetic foot ulcers. Features a smart AND-gate genetic circuit sensing pH and glucose.',
        slides: [
            {
                title: 'Background',
                type: 'split',
                text: 'My research addresses the critical failure of current antibiotic treatments for Diabetic Foot Ulcers (DFUs), which are complication by chronic inflammation and Staphylococcus aureus biofilms. Witnessing my grandfather\'s struggle, I hypothesized that a static chemical treatment is insufficient for such a dynamic biological problem. This personalized approach aims to adaptively respond to the wound environment in real-time, providing targeted therapy only when necessary to minimize off-target effects and resistance development.',
                images: ['images/project-diabetic/process-flow.png']
            },
            {
                title: 'Design',
                type: 'split',
                text: 'I designed the genetic circuit in silico on a pUC19 backbone with a dual-sensing mechanism. A PcadA promoter was engineered to trigger DNase I production only in acidic conditions (pH < 6.0), while a PglTA/CRP system coupled with CRISPR activation drives IL-10 expression when glucose levels exceed 8.0 mM.<br><br>I simulated the system using PhysiCell to model the complex interactions between the probiotic, the biofilm, and the molecular gradients within the wound.',
                images: ['images/project-diabetic/plasmids.png']
            },
            {
                title: 'Results',
                type: 'double-image',
                text: 'My simulations demonstrated that the engineered system achieved a 50-70% reduction in biofilm mass, significantly outperforming the standard Vancomycin benchmark (~30%) while maintaining high safety standards with a modeled kill switch.',
                images: ['images/project-diabetic/results-graphs.png', 'images/project-diabetic/efficacy-chart.png']
            },
            {
                title: 'Conclusion',
                type: 'split-reverse',
                text: 'This project presents a viable design for a smart probiotic that dynamically responds to patient-specific wound conditions. By targeting both the physical biofilm barrier and the underlying inflammation, my approach offers a significant leap forward in personalized wound care.<br><br>Future work will focus on wet-lab validation of the genetic circuit.',
                images: ['images/project-diabetic/simulation-grids.png']

            }
        ]
    },
    {
        id: 'alphafold-covid',
        title: 'AI-Driven Protein Interaction',
        date: 'Aug 2023 - Jan 2024',
        image: 'images/project-covid/protein-models.png',
        description: 'Applying AlphaFold2 to model Spike Protein-Collectrin binding as a mechanism for Long COVID.',
        slides: [
            {
                title: 'Background',
                type: 'split',
                text: 'The persistence of Long COVID symptoms, particularly kidney dysfunction, suggests viral mechanisms beyond simple ACE2 binding. I hypothesized that the SARS-CoV-2 Spike Protein may bind to Collectrin, a protein structurally similar to ACE2 and abundant in the kidney.<br><br>I utilized AlphaFold2 for structure prediction and ClusPro 2.0 for molecular docking to investigate this potential interaction.',
                images: ['images/project-covid/method-flowchart.png']
            },
            {
                title: 'Design',
                type: 'split',
                text: 'I began by generating high-confidence 3D models of both Collectrin and the Spike Protein using AlphaFold2 via ColabFold. These structures served as inputs for molecular docking simulations in ClusPro 2.0.<br><br>I analyzed the resulting binding affinities and orientations, comparing them against the well-established Spike-ACE2 interaction to determine the likelihood of a biological effect.',
                images: ['images/project-covid/protein-models.png']
            },
            {
                title: 'Results',
                type: 'double-image',
                text: 'Docking scores and visual analysis revealed that the Spike Protein binds to Collectrin with an affinity comparable to ACE2, inserting itself into a distinct pocket that suggests a stable, function-disrupting interaction.',
                images: ['images/project-covid/docking-scores.png', 'images/project-covid/lddt-graph-1.png']
            },
            {
                title: 'Conclusion',
                type: 'split-reverse',
                text: 'My findings support the hypothesis that Collectrin serves as a non-target receptor for SARS-CoV-2, potentially explaining kidney-related pathologies in Long COVID.<br><br>This study demonstrates the power of AI-driven structural biology to uncover novel disease mechanisms and identifies a potential target for future therapeutic intervention.',
                images: ['images/project-covid/binding-site.png']
            }
        ]
    },
    {
        id: 'long-covid-collectrin',
        title: 'Non-Target Proteins of SARS-CoV-2',
        date: 'Nov 2022 - Mar 2023',
        image: 'images/project-covid/lddt-graph-2.png',
        description: 'Bioinformatics research identifying Collectrin as a potential binding target for SARS-CoV-2, explaining organ-specific symptoms in Long COVID.',
        slides: [
            {
                title: 'Background',
                type: 'split',
                text: 'As the pandemic evolved, the enduring effects of Long COVID remained a puzzle. I aimed to identify "non-target" receptors—proteins structurally similar to ACE2—that the virus might exploit, potentially explaining multi-organ dysfunction.<br><br>I focused my investigation on Collectrin, a homolog of ACE2, to determine its role in the systemic impact of the virus.',
                images: ['images/project-covid/method-flowchart.png']
            },
            {
                title: 'Design',
                type: 'split',
                text: 'I mined data from NCBI Gene and Protein databases to find potential candidates. Using BLAST (Basic Local Alignment Search Tool), I compared amino acid sequences and analyzed structural homology.<br><br>Furthermore, I analyzed RPKM gene expression data to map the tissue distribution of candidate proteins across the human body.',
                images: ['images/project-covid/lddt-graph-2.png']
            },
            {
                title: 'Results',
                type: 'double-image',
                text: 'Collectrin shares 40.87% sequence identity with ACE2 but is predominantly expressed in the kidney, liver, and stomach, aligning closely with common organ-specific Post-COVID symptoms.',
                images: ['images/project-covid/binding-site.png', 'images/project-covid/docking-scores.png']
            },
            {
                title: 'Conclusion',
                type: 'split-reverse',
                text: 'I identified Collectrin as a likely candidate for off-target viral binding. This finding provides a molecular basis for the kidney and liver damage observed in Long COVID patients.<br><br>It highlights the importance of looking beyond the primary ACE2 receptor to understand the full systemic impact of cellular infection.',
                images: ['images/project-covid/protein-models.png']
            }
        ]
    },
    {
        id: 'keratin-elasticity',
        title: 'Keratin Fiber Elasticity',
        date: 'June 2025 - Dec 2025',
        image: '',
        description: 'Quantifying the effects of thermal vs. chemical denaturation on the tensile strength and elasticity of alpha-keratin fibers.',
        slides: [
            {
                title: 'Background',
                type: 'split',
                text: 'Hair damage is ubiquitous, but the specific structural breakdown caused by distinct stressors varies. I investigated to what extent thermal and chemical denaturation agents impact the elasticity and tensile strength of alpha-keratin.<br><br>I hypothesized that chemical agents would target the covalent disulfide bonds (strength), while thermal agents would disrupt the non-covalent hydrogen bonds (elasticity).',
                images: []
            },
            {
                title: 'Design',
                type: 'split',
                text: 'I subjected human hair fibers to varying concentrations of hydrogen peroxide or heated water baths. I built a custom Arduino-based tensile tester with a 5kg load cell to pull the fibers to failure.<br><br>I recorded Stress-Strain curves to calculate Young\'s Modulus (elasticity) and Ultimate Tensile Strength.',
                images: []
            },
            {
                title: 'Results',
                type: 'double-image',
                text: 'Chemical treatment caused a massive ~50% drop in tensile strength due to covalent bond cleavage, while thermal treatment primarily reduced elasticity by uncoiling the hydrogen-bonded alpha-helices.',
                images: []
            },
            {
                title: 'Conclusion',
                type: 'split-reverse',
                text: 'I validated that failure mechanisms in keratin are distinct. Chemical stress leads to structural strength failure due to covalent breakdown, while thermal stress causes elastic failure due to secondary structure uncoiling.<br><br>This quantitative framework helps predict protein stability under different environmental conditions.',
                images: []
            }
        ]
    },
    {
        id: 'sweet-potato-osmosis',
        title: 'Sweet Potato Osmolarity',
        date: 'Dec 2024 - Feb 2025',
        image: '',
        description: 'Investigating the impact of NaCl concentration on the mass change of Ipomoea Batatas to determine cellular osmolarity.',
        slides: [
            {
                title: 'Background',
                type: 'split',
                text: 'Osmosis varies based on the solute potential of the environment. I aimed to determine the isotonic point (cellular osmolarity) of sweet potato cells by measuring mass change in varying salt solutions.<br><br>I hypothesized that mass would increase in hypotonic solutions and decrease in hypertonic solutions, following a predictable linear trend.'
            },
            {
                title: 'Design',
                type: 'split',
                text: 'I prepared five molar concentrations of NaCl ranging from 0.2M to 1.0M. I cut sweet potatoes into uniform 1cm³ cubes and recorded their initial mass. After 24 hours of submersion, I dried and weighed them again.<br><br>I calculated the percentage mass change and used linear regression to determine the x-intercept (isotonic point).'
            },
            {
                title: 'Results',
                type: 'double-image',
                text: 'The data showed a strong negative linear correlation between salt concentration and mass change, allowing me to determine the isotonic point of the cells to be approximately 0.30 M NaCl.'
            },
            {
                title: 'Conclusion',
                type: 'split-reverse',
                text: 'I successfully identified the osmolarity of sweet potato cells to be approximately 0.30 M. The experiment validated the principles of water potential, demonstrating that higher solute concentration drives osmotic flow out of the cell.<br><br>This quantitative approach allows for precise characterization of plant tissue properties.'
            }
        ]
    },

];

let currentProject = null;
let currentSlideIndex = 0;

window.openProjectModal = function (index) {
    currentProject = projectsData[index];
    currentSlideIndex = 0;
    renderModal();
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeProjectModal = function (e) {
    if (!e || e.target.id === 'project-modal' || e.target.closest('.close-modal') || e.target.classList.contains('modal-close-btn')) {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            currentProject = null;
        }
    }
}

window.nextSlide = function () {
    if (!currentProject) return;
    if (currentSlideIndex < currentProject.slides.length - 1) {
        currentSlideIndex++;
        renderSlide();
    }
}

window.prevSlide = function () {
    if (!currentProject) return;
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
    }
}

function renderModal() {
    renderSlide();
}

function renderSlide() {
    if (!currentProject) return;
    const slide = currentProject.slides[currentSlideIndex];
    const container = document.getElementById('modal-content-area');

    if (!container) return;

    let html = `
        <button class="modal-close-btn" onclick="window.closeProjectModal()">×</button>
        <div class="modal-header">
            <h2 class="modal-slide-title">${slide.title}</h2>
        </div>
        <div class="modal-body ${slide.type}">
    `;

    // Updated Image Helper - Now checks for image paths
    const getImg = (idx) => {
        if (slide.images && slide.images[idx]) {
            return `<img src="${slide.images[idx]}" alt="Project Image" class="slide-img" />`;
        }
        return '<div class="slide-placeholder-img"></div>';
    };

    if (slide.type === 'split' || slide.type === 'split-reverse') {
        html += `
            <div class="modal-left">
                ${getImg(0)}
            </div>
            <div class="modal-right">
                <p>${slide.text}</p>
            </div>
        `;
    } else if (slide.type === 'double-image') {
        html += `
            <div class="modal-center-images">
                ${getImg(0)}
                ${getImg(1)}
            </div>
            <div class="modal-center-text">
                <p>${slide.text}</p>
            </div>
        `;
    } else if (slide.type === 'text-only') {
        html += `
            <div class="modal-full-text">
                <p>${slide.text}</p>
            </div>
        `;
    }

    html += `</div>`; // Close body

    // CONDITIONALLY RENDER ARROWS

    // Left Arrow (Back) - Show if NOT first slide
    if (currentSlideIndex > 0) {
        html += `<button class="modal-nav-arrow prev" onclick="window.prevSlide()"></button>`;
    }

    // Right Arrow (Next) - Show if NOT last slide
    if (currentSlideIndex < currentProject.slides.length - 1) {
        html += `<button class="modal-nav-arrow next" onclick="window.nextSlide()"></button>`;
    }

    container.innerHTML = html;
}

// --- Blog Logic ---
const blogData = [
    {
        title: "Enemy of an Enemy",
        date: "July 2025",
        desc: "A deep dive into phage therapy: how the 'enemy of our enemy'—the bacteriophage—might save us in the post-antibiotic era.",
        path: "blog/post_enemy.html",
        content: `
            <h1>Enemy of an Enemy</h1>

            <p>On a daily basis, millions of people worldwide face bruises, surgeries, and regular medical procedures that are the norm of our world today. However, have you ever wondered the ironic nature of a world in which a mere knee scrap results in death? Tough luck, that is the reality we may soon face: the post antibiotic era.</p>

            <p>We’ve relied on antibiotics for decades as a sole medication to ward off bacteria. However, we may be soon beaten in the race. Bacteria have caught up and antibiotic resistance has become a bigger monster under our bed. The United Nations has predicted that by 2050, the number of drug resistance infections will be killing approximately 10 million people per year.</p>

            <p>Scientists are turning to new technologies to counter this. Or rather our closest friends…the ones right in our own bodies. An enemy of our enemy: the bacteriophage.</p>

            <p>A bacteriophage is a virus that specifically infects bacteria and, at the same time, has no harm on humans. Bacteriophages are microscopic little creatures with geometric heads carrying their DNA and legs that land and move on the surface of a bacteria. The difference between antibiotics and bacteriophages comes from their level of precision and accuracy within our body. Antibiotics are a big mop essentially sweeping away bad bacteria but also good bacteria.</p>

            <p>However, bacteriophages prove themselves to act like a lock and key (Lin et al., 2017) as they are precisely engineered to fit to a certain bacteria. For example, if one was specifically designed towards an E. Coli Bacterium, the bacteriophage would go directly towards that bacteria rather than anything else.</p>

            <p>After the bacteriophage is able to find its appropriate target, it latches onto the bacteria and injects its own genetic material to hijack and overpower the bacteria to produce more of the bacteriophage itself. Afterwards, the bacteria undergoes a process of lysis, in which it bursts itself open. Millions of bacteriophages flood out and continue the process.</p>

            <p>Now, you may be coming to a point of fascination. That’s great, but if bacteriophages have been within us, then why haven’t we been using them?</p>

            <p>Phage therapy originated in the 1920s and 1930s, but became very irritating to work with as phages needed immense technical ability and precision for their effectiveness. Later in the 1940s, another discovery grew. Penicillin, the first major antibiotic.</p>

            <p>Antibiotics were significantly easier to manufacture, produce, and sell in masses, resulting in the push back of phage therapy (Kortright et al., 2019). However, the resurgence of phage therapy can be seen with key cases and notable instances where antibiotics failed.</p>

            <p>One such case is of Tom Patterson, an American Professor who contracted a pancreatic infection in Egypt that no antibiotics were able to help with. As a result, researchers around the world attempted to utilize phage therapy. After a combination of phages, three days later, Patterson woke up (Strathdee and Patterson, 2019).</p>

            <p>The beast awoke. Phage therapy was back and the enemy of our enemy has never been sweeter. Now, due to the increasing technological advancements, phage therapy faces rapid enhancements.</p>

            <p>For instance, the big challenge towards finding the right match of phages to potential implications, as there are more phages than all the sand grains combined on Earth, now becomes ever so easy because of AI (Nature Biotechnology, 2023).</p>

            <p>Computational biology utilizes computer-based methods to allow matches to be found accurately within a matter of hours. In addition with emerging biotechnological methods, scientists are also able to make phages more effective (for instance CRISPR).</p>

            <p>As of now, phage therapy isn’t being seen as entirely replacing antibiotics, but the potential that they have working in tandem together is astronomical. By advancing phage therapy, we utilize a better advancement against every developing bacteria.</p>

            <p>Although this may be a terrifying fight, by utilizing the enemy of our enemy, the era of modernized precise healing is just starting.</p>

            <hr style="margin: 2rem 0; border: 0; border-top: 1px solid rgba(0,0,0,0.1);">

            <h3>References</h3>
            <ul style="font-size: 0.9em; line-height: 1.6; color: var(--text-secondary); list-style: none; padding: 0;">
                <li style="margin-bottom: 0.5rem;">Kortright, K. E., Chan, B. K., Koff, J. L., & Turner, P. E. (2019). Phage therapy: A renewed approach to combat antibiotic-resistant bacteria. Cell Host & Microbe, 25(2), 219–232.</li>
                <li style="margin-bottom: 0.5rem;">Lin, D. M., Koskella, B., & Lin, H. C. (2017). Phage therapy: An alternative to antibiotics in the age of multi-drug resistance. World Journal of Gastrointestinal Pharmacology and Therapeutics, 8(3), 162–173.</li>
                <li style="margin-bottom: 0.5rem;">Nature Biotechnology. (2023). AI and the search for the next generation of bacteriophage therapeutics. Nature Biotechnology, 41, 151.</li>
                <li style="margin-bottom: 0.5rem;">Strathdee, S. A., & Patterson, T. (2019). The perfect predator: A scientist’s race to save her husband from a deadly superbug. Hachette Books.</li>
                <li style="margin-bottom: 0.5rem;">United Nations. (2021). Reporting on the silent pandemic: Antibiotic resistance and the global health threat. UN Environment Programme.</li>
            </ul>
        `
    },
    {
        title: "Paper Cuts and Micro Wars",
        date: "June 2025",
        desc: "The deadly politics of a tiny wound. How a simple paper cut triggers a microscopic war against biofilms and bacterial fortresses.",
        path: "blog/post_papercuts.html",
        content: `
            <h1>Paper Cuts and Micro Wars: The Deadly Politics of a Tiny Wound</h1>

            <p>Picture this: you grab a piece of paper, ready to write to your heart’s content. But as you begin, you start bleeding over the paper. You have a paper cut.</p>

            <p>For us, the process is tedious and straightforward: sigh, grab that bandage from the drawer, slap it on, and go back to the usual.</p>

            <p>However, it’s anything BUT simple for the microbiome within your skin. It’s a bloodthirsty, savage, wrecking battlefield of microbacteria fighting for their place at the top of the hill. It’s just like survival of the fittest: bacteria style.</p>

            <p>A break in one’s skin invites pathogenic bacteria. One of the most common invaders is Staphylococcus aureus. It’s a close relative of the harmless S. epidermis, but is well known for its ability to cause serious infections. After it enters the wound, immediate conflict begins. Additionally, these individual bacteria invaders are able to team up and build their ultimate formation — a biofilm.</p>

            <p>A biofilm is a bacterial matrix composed of extracellular polymeric substances (EPS). The EPS is a combination of polysaccharides (sugars), proteins, lipids, and the bacteria’s eDNA (extracellular DNA) (Otto, 2018). The S. aureus cells are then able to secrete these materials and create a 3D scab based structure that can then encase and protect the entire bacterial community. Studies that use scanning electron microscopes actually reveal these mini structures forming within hours of the infection. (Thurlow et al., 2011)</p>

            <p>The biological fortress itself has several advantages for the invading bacteria. It first acts as a physical barrier that prevents larger immune cells like neutrophils and macrophages from reaching and engulfing the bacteria (Thurlow et al., 2011). The dense matrix also slows down the breakdown from antibiotics. A study that was published in the journal of Antimicrobial Agents and Chemotherapy demonstrated that bacteria that are in biofilms can actually be up to 1000 times more resistant to antibiotics compared to free floating (planktonic) counterparts (Stewart & Costerton, 2001). Last, the biofilm environment alters the metabolism of the bacteria within. Basically, it allows them to be less detected by drugs that target its growth. Score!</p>

            <p>Within this bacterial biofilm, S aureus bacteria are able to continuously multiply while releasing harmful toxins and enzymes. The substances damage the surrounding host tissues and lead to inflammation, which is the body’s attempt to fight off the threat. However, the immune system can’t effectively reach the bacteria in the biofilm and the inflammatory response works against itself (Thurlow et al., 2011).</p>

            <p>The persistent inflammation makes it so that rather than clearing the infection and promoting healing, there’s more damage to cells and tissues, hindering the wound process. In addition, other growth factors and signals within molecules for repair become disrupted and the wound becomes stuck in this state of panic with no escape.</p>

            <p>Long story short….that minor cut could lead to very serious complications.</p>

            <p>Currently, scientists are exploring innovative strategies to effectively kill and disrupt biofilms. For example, bacteriophages are viruses that can specifically target and kill bacteria. Research in this field is aiming to potentially engineer phages that can effectively disrupt those biofilms. In addition, enzymes can break down the EPS matrix and are currently being seen as a way to deconstruct the biofilm, allowing for antimicrobial agents to reach the bacteria.</p>

            <p>So, the next time you dismiss a minor cut with a ‘Seriously?’ Just remember that beneath that surface is a brutal battle. That small breach can create this war that rages on, potentially creating life threatening implications. Understanding strategies and continuing research is critical to the quest for effective healing.</p>

            <hr style="margin: 2rem 0; border: 0; border-top: 1px solid rgba(0,0,0,0.1);">

            <h3>References</h3>
            <ul style="font-size: 0.9em; line-height: 1.6; color: var(--text-secondary); list-style: none; padding: 0;">
                <li style="margin-bottom: 0.5rem;">Otto M. (2018). Staphylococcal Biofilms. Microbiology spectrum, 6(4).</li>
                <li style="margin-bottom: 0.5rem;">Stewart, P. S., & Costerton, J. W. (2001). Antibiotic resistance of bacteria in biofilms. Lancet (London, England), 358(9276), 135–138.</li>
                <li style="margin-bottom: 0.5rem;">Thurlow, L. R., et al. (2011). Staphylococcus aureus biofilms prevent macrophage phagocytosis and attenuate inflammation in vivo. Journal of immunology, 186(11), 6585–6596.</li>
            </ul>
        `
    },
    {
        title: "The Art of Modeling Biology",
        date: "June 2025",
        desc: "Coding nature isn't just about equations; it's about capturing the chaos. How using PhysiCell and NetLogo taught me that biology is the ultimate 'spaghetti code' ... and how to debug it.",
        path: "blog/post2.html",
        content: `
            <span class="meta-info">June 2025 | Computational Biology</span>
            <h1 style="margin-top: 1rem;">The Art of Modeling Biology</h1>

            <p class="journal-excerpt">
                Why I fell in love with computational biology. It's the "spaghetti code" of life: messy,
                redundant, and beautiful. How simulation allows us to understand what we cannot easily
                observe.
            </p>

            <p>
                Biology is messy. It's redundant. It's resilient. It's the ultimate spaghetti code, written over
                billions of years of evolution with no comments and plenty of legacy features.
            </p>
            <p>
                When I first started learning about simulation tools like PhysiCell and NetLogo, I thought the goal was
                perfection—to create a clean, mathematical representation of life. But as I debugged my agent-based
                models, watching simulated cells act in unpredictable ways, I realized something important.
            </p>
            <p>
                The chaos isn't a bug; it's a feature.
            </p>
            <p>
                In my diabetic wound healing project, I'm not just solving equations. I'm trying to capture the behavior
                of thousands of individual agents—bacteria, immune cells, probiotics—each making decisions based on their
                local environment. It taught me that to understand a complex system, you can't just look at the average.
                You have to look at the individual.
            </p>
            <p>
                That's why I code. Not to simplify nature, but to embrace its complexity. To build a sandbox where I can
                ask "what if?" and watch the answer unfold in real-time.
            </p>
        `
    },
    {
        title: "Rhythms of Discipline",
        date: "May 2025",
        desc: "From the pool lane to the flute section, discipline is muscle memory. Exploring how my 12 years of competitive swimming and music shape the resilience I need for 120-hour lab simulations.",
        path: "blog/post5.html",
        content: `
            <span class="meta-info">May 2025 | Personal Growth</span>
            <h1 style="margin-top: 1rem;">Rhythms of Discipline</h1>

            <p class="journal-excerpt">
                Connecting the rigor of competitive swimming and music to the scientific process. How
                staring at the black line in the pool taught me to push through experimental failures.
            </p>

            <p>
                People often ask how I manage 120-hour simulation runs while juggling school and research. The answer
                usually surprises them: competitive swimming and the flute.
            </p>
            <p>
                I've spent 12 years staring at the black line at the bottom of a pool. Swimming is monotonous. It's
                painful. It's lonely. But it teaches you something vital: the ability to endure discomfort for a future
                outcome. When your lungs are burning on the last lap, you don't stop. You rely on muscle memory and
                discipline.
            </p>
            <p>
                Research is strikingly similar. There are days when the code won't compile, when the data looks like
                noise, when you just want to quit. That's when the "swimmer mindset" kicks in. You just keep going. You
                trust the process.
            </p>
            <p>
                Music adds another layer. In an orchestra, you have to listen. You have to be precise. You have to understand your role in the larger harmony. Science is the same—it's a collaborative symphony of ideas, data, and peer review.
            </p>
            <p>
                These disciplines—sport and art—aren't distractions from my science. They are the foundation of my
                resilience.
            </p>
        `
    },
    {
        title: "Global Health, Local Action",
        date: "April 2025",
        desc: "Leading a team in Nigeria from my bedroom in Bellevue. The lessons I learned about Hepatitis awareness, fundraising, and the power of remote student advocacy.",
        path: "blog/post4.html",
        content: `
            <span class="meta-info">April 2025 | Global Health</span>
            <h1 style="margin-top: 1rem;">Global Health, Local Action</h1>

            <p class="journal-excerpt">
                My work with public health initiatives in Nigeria. Learning that communication strategies
                are just as vital as medical interventions when addressing community health.
            </p>

            <p>
                Can a high school student in Bellevue really make a difference in Bauchi, Nigeria? That was the question
                I asked myself when I started leading a remote chapter for a Hepatitis awareness campaign.
            </p>
            <p>
                We weren't doctors. We couldn't fly there to administer vaccines. But we had something else: digital
                literacy and a voice. We organized fundraising drives, designed educational pamphlets, and coordinated
                with local leaders on the ground via WhatsApp.
            </p>
            <p>
                The biggest lesson wasn't about the biology of the virus. It was about communication. We realized early
                on that simply translating facts wasn't enough; we had to understand the cultural context. We had to
                listen to the community leaders who told us that stigma was a bigger barrier than cost.
            </p>
            <p>
                It shifted my perspective on "global health." It's not just about shipping medicine over borders. It's
                about building bridges of trust and empowering local communities to take charge of their own health
                narrative.
            </p>
        `
    },
    {
        title: "The Human Side of Medicine",
        date: "March 2025",
        desc: "A personal story from my time as a hospital ambassador. Witnessing loss, comforting families, and realizing that medicine is as much about empathy as it is about science.",
        path: "blog/post_human_side.html",
        content: `
            <span class="meta-info">March 2025 | Hospital Volunteer</span>
            <h1>The Human Side of Medicine</h1>

            <p>
                Over the past year, I’ve had the opportunity to volunteer at a hospital and be a pillar of support for
                numerous patients and visitors. But there is one experience and moment throughout that has forever
                marked me. One day during the regular shift, after coming back from taking a visitor to visit their
                family, I came back to my manager on a phone call with a stern face. As she ended the call and looked at
                me with a sorrowful face. She asked me if I would be comfortable helping this woman whose husband had
                just passed while waiting for family to arrive.
            </p>
            <p>
                Although I was relatively new to this, I took up the opportunity because personally I’ve seen how hard
                it is for a loved one to pass while your family isn’t there. It happened to my great-grandfather, while
                his wife passed, my dad flew to India to go and support him and fellow family members, and that
                definitely made a lasting impact for him. Similarly, I wanted to make a lasting impact for the recent
                widow.
            </p>
            <p>
                I went up to the room and saw her very emotionally, offering her tissues and just to be a listening ear.
                She explained to me how she didn’t really know much of what to do, as her husband just died, she was
                relatively new to everything. Her husband had originally been hospitalized from a heart attack but was
                presumed to also be impacted from a likely cause of cancer. The cause made her worry more, if he ever
                had a chance outside of the heart attack, and how long he would’ve even been alive. She talked about how
                she wished she had those extra days and that the heart attack didn’t beat cancer to death of him,
                although him having cancer was worse.
            </p>
            <p>
                She said in a way, maybe it was better for him to go now rather than to have to go through all that
                pain. But for me it made me wonder, what if cancer was the true silent killer that propelled that heart
                attack because that was definitely a possibility. The widow continued to cry and I continued to be next
                to her, listening to her stories and reminiscing of his past. Knowing her life was changed forever in
                that moment, created the same for me.
            </p>
            <p>
                From this moment, my life was forever changed. This made me realize that this is the story and the
                emotional rollercoaster of millions and millions of families all over the world, losing their closest
                and most beloved loved ones to cancer. It helped me realize a passion for support within healthcare, but
                it made me more intrigued and driven to want to do something, to discover something and truly fight the
                beast of cancer from its origin. Tied in with my passionate learning at school with genetic material of
                DNA and RNA, I hope that potentially understanding the impact and combination of these two at its core
                can truly make a difference.
            </p>
        `
    },
    {
        title: "My Origin Story",
        date: "February 2025",
        desc: "The speech I gave at ISEF. How my grandparents' struggle with diabetes in India ignited a spark that led me to design 'smart bacteria'.",
        path: "blog/post_origin.html",
        content: `
            <span class="meta-info">February 2025 | ISEF</span>
            <h1 style="margin-top: 1rem;">My Origin Story</h1>

            <p class="journal-excerpt">
                The personal experience that drove me toward diabetic wound healing research. Witnessing the
                gaps in standard care and the "maybes" that families face.
            </p>

            <p>
                My journey into research began with a phone call from India. My grandmother, who had lived with type 2
                diabetes for decades, had developed a foot ulcer that wouldn't heal. Thousands of miles away, I listened
                as my parents discussed the options: antibiotics, debridement, potential amputation.
            </p>
            <p>
                I felt helpless. Here we were, in the 21st century, and the best we could offer was "wait and see" or
                drastic surgery. I started reading. I learned about biofilms—these stubborn fortresses that bacteria
                build to protect themselves from antibiotics. I learned that for millions of people, a simple cut can
                become a life sentence.
            </p>
            <p>
                That helplessness turned into curiosity, then determination. I realized that the problem wasn't just the
                bacteria; it was the delivery system. We needed a treatment that could adapt, that could sense the
                environment, that could fight back on the bacteria's own terms.
            </p>
            <p>
                That was the spark for my project on engineered probiotics. I wanted to create a living medicine—a "smart bacteria"—that could navigate the wound, sense the infection, and release therapeutics exactly where they were needed. It wasn't just a science fair project anymore; it was a mission.
            </p>
        `
    },
    {
        title: "Navigating Identity",
        date: "January 2025",
        desc: "Growing up between cultures as a first-generation Indian American. Finding my place not in a specific box, but in the diverse and curious community of science fairs.",
        path: "blog/post_identity.html",
        content: `
            <span class="meta-info">January 2025 | Identity</span>
            <h1 style="margin-top: 1rem;">Navigating Identity</h1>

            <p class="journal-excerpt">
                Overcoming the "imposter syndrome" and the noise of external expectations. Why keeping your
                own scorecard is the most important metric in research.
            </p>

            <p>
                For a long time, I felt like I was straddling two worlds but belonged to neither. At school, I was the
                "science kid." At community gatherings, I was the "Americanized" daughter. I felt the pressure to fit a
                mold—to be the perfect student, the dutiful daughter, the successful researcher.
            </p>
            <p>
                Science fairs actually became my sanctuary. Walking through the halls of ISEF, surrounded by students
                from 80 countries, I realized that curiosity doesn't have a nationality. I met kids who were researching
                algae in their garage and coding AI in internet cafes. We spoke different languages, but we all spoke
                the language of "why?"
            </p>
            <p>
                I realized that my identity as a young woman in STEM isn't a hurdle; it's a perspective. I bring a
                different set of questions to the table. I bring the resilience of my grandmother and aunt, who faced
                their own systemic barriers.
            </p>
            <p>
                Navigating this identity means building a "Community of Peers," finding others who share that drive to
                "nerd out" on science regardless of background. It means understanding that failure is data, not a
                definition of worth. I'm building my confidence one experiment, one line of code, and one blog post at a
                time.
            </p>
        `
    }
];

function renderBlogGrid() {
    const container = document.getElementById('blog-grid');
    if (!container) return;

    container.innerHTML = blogData.map((post, index) => `
        <div class="blog-panel" onclick="openBlogModal(${index})">
            <div class="blog-panel-left">
                <h3 class="blog-panel-title">${post.title}</h3>
                <p class="blog-panel-desc">${post.desc}</p>
            </div>
            <div class="blog-panel-date">${post.date}</div>
        </div>
    `).join('');
}

window.openBlogModal = function (index) {
    const post = blogData[index];
    const modal = document.getElementById('blog-modal');
    const body = document.getElementById('blog-modal-body');
    if (!modal || !body) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    // Render content immediately from JS object
    // This avoids fetch() errors on local file system previews
    body.innerHTML = post.content || '<p>Content not available.</p>';
};

window.closeBlogModal = function (e) {
    // If e is passed (click event), check target. If not, just close.
    if (e && e.target.id !== 'blog-modal' && !e.target.classList.contains('blog-close-btn') && !e.target.closest('.blog-close-btn')) {
        // If click was inside modal content, do nothing
        if (e.target.closest('.blog-modal-content')) return;
    }

    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Initialize Blog Logic
document.addEventListener('DOMContentLoaded', () => {
    renderBlogGrid();

    // Modal close listeners
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.addEventListener('click', window.closeBlogModal);
    }
});
