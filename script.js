
const revealItems = document.querySelectorAll('.reveal');
const progressBar = document.querySelector('.scroll-progress span');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		entry.target.classList.add('is-visible');
		observer.unobserve(entry.target);
	});
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

const updateProgress = () => {
	const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
	const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
	progressBar.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

menuToggle.addEventListener('click', () => {
	const isOpen = siteNav.classList.toggle('is-open');
	menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		siteNav.classList.remove('is-open');
		menuToggle.setAttribute('aria-expanded', 'false');
	});
});
