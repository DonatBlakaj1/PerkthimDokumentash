document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Menu Toggling
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon between open/close (X) state
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                // Hamburger icon path
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            } else {
                // Close (X) icon path
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            });
        });
    }


    // ==========================================
    // 2. FAQ Accordion Logic (Smooth Transition)
    // ==========================================
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const content = item.querySelector('.accordion-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.accordion-content');
                        if (otherContent) {
                            otherContent.style.maxHeight = '0';
                            otherContent.style.paddingTop = '0';
                            otherContent.style.paddingBottom = '0';
                        }
                    }
                });

                // Toggle active state for current item
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = '0';
                    content.style.paddingTop = '0';
                    content.style.paddingBottom = '0';
                } else {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 40 + 'px'; // padding offset
                    content.style.paddingTop = '0.5rem';
                    content.style.paddingBottom = '1.25rem';
                }
            });
        }
    });


    // ==========================================
    // 3. File Upload Interaction
    // ==========================================
    const fileUploader = document.getElementById('file-uploader');
    const fileNameBadge = document.getElementById('file-name-badge');
    const fileNameText = document.getElementById('file-name-text');
    const removeFileBtn = document.getElementById('remove-file-btn');
    const uploadStatusTitle = document.getElementById('upload-status-title');

    if (fileUploader) {
        fileUploader.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                const file = files[0];
                
                // Show badge & file name
                fileNameText.textContent = file.name;
                fileNameBadge.classList.remove('hidden');
                
                // Update uploader text
                uploadStatusTitle.textContent = "Dokumenti u ngarkua me sukses!";
                uploadStatusTitle.classList.add('text-amber-700');
                uploadStatusTitle.classList.remove('text-primary');
            }
        });
    }

    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent triggering input click
            
            // Clear input value
            if (fileUploader) {
                fileUploader.value = "";
            }
            
            // Hide badge
            fileNameBadge.classList.add('hidden');
            
            // Reset uploader text
            uploadStatusTitle.textContent = "Klikoni këtu për të ngarkuar skedarin";
            uploadStatusTitle.classList.remove('text-amber-700');
            uploadStatusTitle.classList.add('text-primary');
        });
    }


    // ==========================================
    // 4. Quote Calculator Interaction
    // ==========================================
    const submitQuoteBtn = document.getElementById('submit-quote-btn');
    const fromLangSelect = document.getElementById('from-lang');
    const toLangSelect = document.getElementById('to-lang');
    const docTypeSelect = document.getElementById('doc-type');

    if (submitQuoteBtn) {
        submitQuoteBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const fromLang = fromLangSelect.options[fromLangSelect.selectedIndex].text;
            const toLang = toLangSelect.options[toLangSelect.selectedIndex].text;
            const docType = docTypeSelect.options[docTypeSelect.selectedIndex].text;
            const hasFile = fileUploader && fileUploader.files.length > 0;

            // Generate localized alert for demonstration
            let priceMsg = "";
            let basePrice = 35; // base price

            if (docTypeSelect.value === 'contract' || docTypeSelect.value === 'court') {
                basePrice = 45; // corporate/legal contracts are slightly higher
            }

            if (hasFile) {
                priceMsg = `Llogaritja fillestare: Çmimi i vlerësuar për përkthimin zyrtar të ${docType} nga gjuha ${fromLang} në gjuhën ${toLang} është afërsisht ${basePrice} € për faqe.\n\nEkipi ynë sapo ka pranuar skedarin tuaj dhe do t'ju dërgojë ofertën zyrtare fikse me email brenda pak minutave!`;
            } else {
                priceMsg = `Llogaritja fillestare: Çmimi i vlerësuar për përkthimin zyrtar të ${docType} nga gjuha ${fromLang} në gjuhën ${toLang} është afërsisht ${basePrice} € për faqe.\n\nPër të marrë një ofertë fikse zyrtare dhe të saktë, ju lutemi ngarkoni skedarin tuaj të dokumentit në formular ose na kontaktoni në info@perkthime-expert.al.`;
            }

            alert(priceMsg);
        });
    }

});

// ==========================================
// 5. Document Tabbed Filter Explorer
// ==========================================
window.filterCatalog = function(category, btnElement) {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('[data-category]');

    // Hide or show depending on selected category
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    // Toggle styling on the active button
    if (btnElement) {
        const buttons = btnElement.parentElement.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.className = "px-5 py-2.5 rounded-lg border border-stone-200 text-stoneText hover:border-primary transition-all focus:outline-none";
        });
        btnElement.className = "px-5 py-2.5 rounded-lg border border-primary bg-primary text-white transition-all focus:outline-none";
    }
}
