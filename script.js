document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    // Select all sections that are NOT the 'projects' section, as it's currently commented out in index.html
    const sections = document.querySelectorAll('section:not([id="projects"])');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Function to load HTML content into sections
    const loadSectionContent = async (sectionId, filePath) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            document.getElementById(sectionId).innerHTML = content;
        } catch (error) {
            console.error(`Could not load ${filePath}:`, error);
            document.getElementById(sectionId).innerHTML = `<div class="text-center text-red-500">Error loading content for ${sectionId}. Please check the file path.</div>`;
        }
    };

    // Load content for each section
    loadSectionContent('home', 'home.html');
    loadSectionContent('about', 'about.html');
    loadSectionContent('skills', 'skills.html');
    // loadSectionContent('experience', 'experience.html'); // Load Experience section content
    loadSectionContent('education', 'education.html');   // Load Education section content
    // loadSectionContent('projects', 'projects.html'); // Commented out as the projects section is commented out in index.html
    loadSectionContent('contact', 'contact.html');

    // Function to update active navigation link
    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            // Ensure the section has content loaded before checking offsetTop
            if (section.innerHTML.trim() === '') return;

            const sectionTop = section.offsetTop - 100; // Adjust for fixed header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };

    // Initial call and event listener for scroll, delayed to ensure content is loaded
    // Increased delay slightly to account for more content loading
    setTimeout(updateActiveLink, 700);
    window.addEventListener('scroll', updateActiveLink);
});
