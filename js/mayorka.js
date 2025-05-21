// Mobile menu toggle
const menuToggle = document.querySelector('.header__menu-toggle')
const navLinks = document.querySelector('.header__nav-links')

if (menuToggle && navLinks) {
	menuToggle.addEventListener('click', () => {
		menuToggle.classList.toggle('active')
		navLinks.classList.toggle('active')
		document.body.classList.toggle('menu-open')
	})

	document.querySelectorAll('.header__link').forEach(link => {
		link.addEventListener('click', () => {
			menuToggle.classList.remove('active')
			navLinks.classList.remove('active')
			document.body.classList.remove('menu-open')
		})
	})
}

// Gallery image animations
document.addEventListener('DOMContentLoaded', function () {
	const galleryImages = document.querySelectorAll(
		'.mayorka-gallery-image1, .mayorka-gallery-image2, .mayorka-gallery-image3'
	)
	galleryImages.forEach(image => {
		image.style.opacity = '1'
	})
})
