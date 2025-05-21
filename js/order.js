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

// Form validation and submission
document.addEventListener('DOMContentLoaded', function () {
	const today = new Date()
	const todayFormatted = today.toISOString().split('T')[0]

	const checkInDateInput = document.getElementById('checkInDate')
	const checkOutDateInput = document.getElementById('checkOutDate')

	checkInDateInput.min = todayFormatted
	checkOutDateInput.min = todayFormatted

	checkInDateInput.addEventListener('change', function () {
		checkOutDateInput.min = checkInDateInput.value
		if (
			checkOutDateInput.value &&
			new Date(checkOutDateInput.value) < new Date(checkInDateInput.value)
		) {
			checkOutDateInput.value = checkInDateInput.value
		}
	})

	const orderForm = document.getElementById('orderForm')

	orderForm.addEventListener('submit', function (e) {
		e.preventDefault()
		if (!validateForm()) {
			return false
		}

		const form = e.target
		const templateParams = {
			to_email: form.email.value,
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			resort: form.resort.value,
			guestCount: form.guestCount.value,
			checkInDate: form.checkInDate.value,
			checkOutDate: form.checkOutDate.value,
		}

		emailjs.send('service_nglk0mh', 'template_fpi0aqc', templateParams).then(
			function (response) {
				window.location.href = 'thank_you.html'
			},
			function (error) {
				alert('Ошибка при отправке: ' + error.text)
			}
		)
	})

	function validateForm() {
		let isValid = true

		if (!document.getElementById('firstName').value.trim()) {
			document.getElementById('firstNameError').style.display = 'block'
			isValid = false
		} else {
			document.getElementById('firstNameError').style.display = 'none'
		}

		if (!document.getElementById('lastName').value.trim()) {
			document.getElementById('lastNameError').style.display = 'block'
			isValid = false
		} else {
			document.getElementById('lastNameError').style.display = 'none'
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const emailValue = document.getElementById('email').value.trim()
		if (!emailValue || !emailRegex.test(emailValue)) {
			document.getElementById('emailError').style.display = 'block'
			isValid = false
		} else {
			document.getElementById('emailError').style.display = 'none'
		}

		if (!document.getElementById('phone').value.trim()) {
			document.getElementById('phoneError').style.display = 'block'
			isValid = false
		} else {
			document.getElementById('phoneError').style.display = 'none'
		}

		if (!document.getElementById('resort').value) {
			document.getElementById('resortError').style.display = 'block'
			isValid = false
		} else {
			document.getElementById('resortError').style.display = 'none'
		}

		const guestCount = document.getElementById('guestCount').value
		if (!guestCount || guestCount < 1) {
			document.getElementById('guestCountError').style.display = 'block'
			isValid = false
		} else {
			document.getElementById('guestCountError').style.display = 'none'
		}

		if (!document.getElementById('checkInDate').value) {
			document.getElementById('checkInDateError').style.display = 'block'
			isValid = false
		} else {
			document.getElementById('checkInDateError').style.display = 'none'
		}

		if (!document.getElementById('checkOutDate').value) {
			document.getElementById('checkOutDateError').style.display = 'block'
			isValid = false
		} else {
			document.getElementById('checkOutDateError').style.display = 'none'
		}

		return isValid
	}
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
					element.style.backgroundImage = `url('${imageUrl}')`
					element.style.backgroundRepeat = 'no-repeat'
					element.style.backgroundPosition = 'center'
					element.style.backgroundSize = 'cover'
				}
			}
		})
		.catch(error => console.error('Ошибка загрузки XML:', error))
})
