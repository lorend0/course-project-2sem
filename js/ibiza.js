// Gallery image animations
document.addEventListener('DOMContentLoaded', function () {
	const galleryImages = document.querySelectorAll(
		'.ibiza-gallery-image1, .ibiza-gallery-image2, .ibiza-gallery-image3'
	)
	galleryImages.forEach(image => {
		image.style.opacity = '1'
	})
})

// XML images loading
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
					img.onload = function () {
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
