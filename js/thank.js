// Mobile menu toggle
const menuToggle = document.querySelector('.header__menu-toggle')
const navLinks = document.querySelector('.header__nav-links')

if (menuToggle && navLinks) {
	menuToggle.addEventListener('click', () => {
		menuToggle.classList.toggle('active')
		navLinks.classList.toggle('active')
	})
}

document.addEventListener('DOMContentLoaded', function () {
	function generateOrderNumber() {
		const prefix = 'ORDER-'
		const randomNum = Math.floor(100000 + Math.random() * 900000)
		return prefix + randomNum
	}

	document.getElementById('orderNumber').textContent = generateOrderNumber()

	const urlParams = new URLSearchParams(window.location.search)
	const resort = urlParams.get('resort')

	if (resort) {
		let resortName
		switch (resort) {
			case 'ibiza':
				resortName = 'Ибица'
				break
			case 'tenerife':
				resortName = 'Тенерифе'
				break
			case 'mallorca':
				resortName = 'Майорка'
				break
			default:
				resortName = resort
		}

		const messageEl = document.querySelector('.success-card p:first-of-type')
		messageEl.innerHTML = `
            Ваша заявка на курорт <strong>${resortName}</strong> успешно отправлена и принята в обработку.
            Мы свяжемся с вами в ближайшее время для подтверждения деталей бронирования.
        `
	}
})
