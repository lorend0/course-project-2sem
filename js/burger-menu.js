document.addEventListener('DOMContentLoaded', () => {
	const menuToggle = document.querySelector('.header__menu-toggle')
	const navLinks = document.querySelector('.header__nav-links')

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
})
