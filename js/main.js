// Intersection Observer for animations
const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.1,
}

const observer = new IntersectionObserver((entries, obs) => {
	entries.forEach(entry => {
		if (!entry.isIntersecting) return
		const el = entry.target

		el.style.visibility = 'visible'

		if (
			el.classList.contains('whyspain-img3') ||
			el.classList.contains('whyspain-img1')
		) {
			el.classList.add('slide-in-left')
		}

		if (
			el.classList.contains('popular-resorts__title') ||
			el.classList.contains('why-spain__feature-text') ||
			el.classList.contains('whyspain-title') ||
			el.classList.contains('whyspain-img2') ||
			el.classList.contains('whyspain-text')
		) {
			el.classList.add('slide-in-up')
		}

		obs.unobserve(el)
	})
}, observerOptions)

document
	.querySelectorAll(
		'.why-spain__feature-text, .why-spain__feature-image, ' +
			'.whyspain-img2, .whyspain-img1, .whyspain-title, .whyspain-text, .popular-resorts__title, .whyspain-img3'
	)
	.forEach(el => {
		el.style.opacity = 0
		el.style.visibility = 'hidden'
		observer.observe(el)
	})

// Gallery slider
document.addEventListener('DOMContentLoaded', function () {
	const sliderTrack = document.querySelector('.slider-track')
	const images = document.querySelectorAll('.why-spain__gallery-image')
	const prevButton = document.querySelector('.gallery-arrow--left')
	const nextButton = document.querySelector('.gallery-arrow--right')
	let currentIndex = 0

	function updateSlider() {
		const offset = -currentIndex * 100
		sliderTrack.style.transform = `translateX(${offset}%)`
	}

	prevButton.addEventListener('click', () => {
		currentIndex = (currentIndex - 1 + images.length) % images.length
		updateSlider()
	})

	nextButton.addEventListener('click', () => {
		currentIndex = (currentIndex + 1) % images.length
		updateSlider()
	})

	updateSlider()
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
					element.style.backgroundImage = `url('${imageUrl}')`
					element.style.backgroundRepeat = 'no-repeat'
					element.style.backgroundPosition = 'center'
					element.style.backgroundSize = 'cover'
				}
			}
		})
		.catch(error => console.error('Ошибка загрузки XML:', error))
})
