

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const captionText = document.getElementById('caption');
        const closeBtn = lightbox.querySelector('.close-lightbox');
        const prevBtn = lightbox.querySelector('.lightbox-nav.prev-btn');
        const nextBtn = lightbox.querySelector('.lightbox-nav.next-btn');
        const counter = lightbox.querySelector('.lightbox-counter');

        if (!lightboxImg || !captionText || !closeBtn || !prevBtn || !nextBtn || !counter) return;

        let currentImages = [];
        let currentIndex = 0;

        const updateLightbox = () => {
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = currentImages[currentIndex];
                lightboxImg.style.opacity = '1';
                counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex === currentImages.length - 1;
                prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
                nextBtn.style.opacity = currentIndex === currentImages.length - 1 ? '0.3' : '1';
            }, 200);
        };

        document.addEventListener('click', (event) => {
            const item = event.target.closest('.gallery-image-container');
            if (!item) return;

            const imagesData = item.getAttribute('data-images');
            if (imagesData) {
                try {
                    currentImages = JSON.parse(imagesData);
                } catch (e) {
                    currentImages = [item.querySelector('img').src];
                }
            } else {
                currentImages = [item.querySelector('img').src];
            }

            currentIndex = 0;

            lightbox.style.display = "flex";
            const pillBar = document.querySelector('.top-pill-bar');
            if (pillBar) pillBar.style.display = 'none';
            captionText.textContent = item.nextElementSibling.querySelector('.project-title').textContent;
            document.body.style.overflow = 'hidden';

            updateLightbox();
        });

        const closeLightbox = () => {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
            const pillBar = document.querySelector('.top-pill-bar');
            if (pillBar) pillBar.style.display = '';
        };

        const showNext = (e) => {
            e.stopPropagation();
            if (currentIndex < currentImages.length - 1) {
                currentIndex++;
                updateLightbox();
            }
        };

        const showPrev = (e) => {
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                updateLightbox();
            }
        };

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === "flex") {
                if (e.key === "Escape") closeLightbox();
                if (e.key === "ArrowRight") {
                    if (currentIndex < currentImages.length - 1) {
                        currentIndex++;
                        updateLightbox();
                    }
                }
                if (e.key === "ArrowLeft") {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateLightbox();
                    }
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
