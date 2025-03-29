const EXCLUDED_REPOS = ['sankeer28', 'sankeer28.github.io', 'Blender-Donut'];

async function fetchAllGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/sankeer28/repos?per_page=100');
        const repos = await response.json();
        
        const filteredRepos = repos
            .filter(repo => !EXCLUDED_REPOS.includes(repo.name))
            .map(repo => ({
                title: repo.name,
                description: repo.description || 'No description available',
                technologies: [repo.language || 'Other'],
                link: repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                created_at: repo.created_at
            }))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        return filteredRepos;
    } catch (error) {
        console.log('Error fetching GitHub repos:', error);
        return [{
            title: "New Portfolio",
            description: "If you see only this project, website link has changed",
            technologies: ["JavaScript"],
            link: "https://sankeer.vercel.app/",
            stars: 0,
            forks: 0,
            created_at: new Date().toLocaleDateString()
        }];
    }
}
function typeWriter() {
    const text = "Sankeerthikan Nimalathas";
    const typedTextElement = document.querySelector('.typed-text');
    let i = 0;
    const speed = 150;

    function type() {
        if (i < text.length) {
            typedTextElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

document.addEventListener('DOMContentLoaded', typeWriter);



async function loadProjects() {
    const container = document.getElementById('project-container');
    try {
        const projects = await fetchAllGitHubRepos();
        console.log('Fetched Projects:', projects); 
        container.innerHTML = projects.map(project => createProjectCard(project)).join('');
        handleMouseMove(); 
    } catch (error) {
        console.log('Error details:', error);
        container.innerHTML = '<div class="col-12"><p>Loading repositories...</p></div>';
    }
}


function createProjectCard(project) {
    const statsElements = [];
    
    if (project.stars > 0) {
        statsElements.push(`<span>⭐ ${project.stars}</span>`);
    }
    
    if (project.forks > 0) {
        statsElements.push(`<span>🔱 ${project.forks}</span>`);
    }
    
    return `
        <div class="project-card" onclick="window.open('${project.link}', '_blank')">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span class="badge bg-secondary">${tech}</span>`).join('')}
            </div>
            <div class="stats">
                ${statsElements.join('')}
            </div>
        </div>
    `;
}



document.addEventListener('DOMContentLoaded', loadProjects);

function initGlitchingNumbers() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        // Initialize all 5 line numbers
        for (let i = 1; i <= 10; i++) {
            section.setAttribute(`data-line-number-${i}`, i.toString().padStart(2, '0'));
        }
    });
    
    setInterval(() => {
        sections.forEach(section => {
            // Randomly glitch each line number independently
            for (let i = 1; i <= 10; i++) {
                if (Math.random() > 0.6) {
                    const glitchNum = Math.floor(Math.random() * 99) + 1;
                    section.setAttribute(`data-line-number-${i}`, glitchNum.toString().padStart(2, '0'));
                    
                    setTimeout(() => {
                        section.setAttribute(`data-line-number-${i}`, i.toString().padStart(2, '0'));
                    }, 50);
                }
            }
        });
    }, 100);
}

document.addEventListener('DOMContentLoaded', initGlitchingNumbers);


class CodeAnimation {
    constructor() {
        this.initTypewriterEffect();
        this.initMatrixBackground();
        this.handleResize();
    }

    handleResize() {
        window.addEventListener('resize', () => {
            const canvas = document.querySelector('canvas');
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        });
    }

    initTypewriterEffect() {
        const codeElements = document.querySelectorAll('.code-type');
        codeElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                }
            };
            type();
        });
    }

    initMatrixBackground() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.05';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const chars = 'アイウエオカキクケコサシスセソタチツテト'.split('');
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(26, 27, 38, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#7aa2f7';
            ctx.font = fontSize + 'px monospace';

            drops.forEach((drop, i) => {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drop * fontSize);
                if (drop * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        }

        setInterval(draw, 33);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    new ParticleEffect();
    new CodeAnimation();
    initThemeSwitcher(); // Initialize theme switcher
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const btn = document.getElementById('contactBtn');
    const span = document.getElementsByClassName('close')[0];

    btn.addEventListener('click', () => {
        modal.style.display = 'block';
        console.log('Modal opened'); 
    });

    span.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Add this function to track mouse movement
function handleMouseMove() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Theme Switcher Functionality
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const storedTheme = localStorage.getItem('theme') || 'tokyo';
    
    // Apply stored theme on page load
    document.body.className = storedTheme !== 'tokyo' ? `theme-${storedTheme}` : '';
    
    // Update active button
    themeButtons.forEach(button => {
        const btnTheme = button.id.split('-')[1];
        button.classList.toggle('active', btnTheme === storedTheme);
    });
    
    // Add click event to each button
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.id.split('-')[1];
            
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply theme
            if (theme === 'tokyo') {
                document.body.className = '';
            } else {
                document.body.className = `theme-${theme}`;
            }
            
            // Store theme preference
            localStorage.setItem('theme', theme);
        });
    });
}

class ParticleEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.mouse = { x: null, y: null, radius: 100 };
        
        this.setupCanvas();
        this.createParticles();
        this.addMouseListeners();
        this.animate();
    }

    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.pointerEvents = 'none';
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        document.body.appendChild(this.canvas);
    }

    addMouseListeners() {
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });
        
        document.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                density: (Math.random() * 30) + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Regular movement
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // Mouse interaction
            if (this.mouse.x != null) {
                let dx = this.mouse.x - particle.x;
                let dy = this.mouse.y - particle.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (this.mouse.radius - distance) / this.mouse.radius;
                    
                    particle.x -= forceDirectionX * force * particle.density;
                    particle.y -= forceDirectionY * force * particle.density;
                }
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(122, 162, 247, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}
