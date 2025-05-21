document.addEventListener('DOMContentLoaded', function () {
	const links = document.querySelectorAll('a')
	links.forEach(link => {
		link.addEventListener('click', function (e) {
			if (this.getAttribute('href').startsWith('#')) return
			e.preventDefault()
			document.body.classList.add('page-fading')
			setTimeout(() => {
				window.location = this.href
			}, 300)
		})
	})
})

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

document.addEventListener('DOMContentLoaded', function () {
	const galleryImages = document.querySelectorAll(
		'.tenerife-gallery-image1, .tenerife-gallery-image2, .tenerife-gallery-image3'
	)
	galleryImages.forEach(image => {
		image.style.opacity = '1'
	})
})

document.addEventListener('DOMContentLoaded', function () {
	fetch('/xml/images.xml')
		.then(response => response.text())
		.then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
		.then(data => {
			const images = data.getElementsByTagName('image')
			for (let i = 0; i < images.length; i++) {
				const className = images[i].getAttribute('class')
				const imageUrl = images[i].textContent.trim()
				const element = document.querySelector(`.${className}`)
				if (element) {
					const img = new Image()
					img.onload = function() {
						element.style.backgroundImage = `url('${imageUrl}')`
						element.style.visibility = 'visible'
						element.style.opacity = '1'
					}
					img.src = imageUrl
				}
			}
		})
		.catch(error => console.error('Ошибка загрузки XML:', error))
})
