document.addEventListener('DOMContentLoaded', function () {
	// Инициализация карты
	const map = L.map('map', { attributionControl: false }).setView(
		[38.9087, 1.4329],
		6
	)

	// Яркий современный стиль CartoDB Voyager
	L.tileLayer(
		'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
		{
			attribution: '© OpenStreetMap contributors, © CARTO',
		}
	).addTo(map)

	// Получение всех маркеров
	const markers = document.querySelectorAll('.map-marker')

	// Добавление маркеров на карту
	markers.forEach(marker => {
		const lat = parseFloat(marker.dataset.lat)
		const lng = parseFloat(marker.dataset.lng)
		const title = marker.dataset.title

		// Создание маркера
		const mapMarker = L.marker([lat, lng]).addTo(map)

		// Добавление всплывающей подсказки
		mapMarker.bindPopup(title)

		// Позиционирование HTML-маркера
		const point = map.latLngToContainerPoint([lat, lng])
		marker.style.left = point.x + 'px'
		marker.style.top = point.y + 'px'
	})

	// Обновление позиций маркеров при изменении размера окна
	window.addEventListener('resize', function () {
		markers.forEach(marker => {
			const lat = parseFloat(marker.dataset.lat)
			const lng = parseFloat(marker.dataset.lng)
			const point = map.latLngToContainerPoint([lat, lng])
			marker.style.left = point.x + 'px'
			marker.style.top = point.y + 'px'
		})
	})

	// Обновление позиций маркеров при изменении зума
	map.on('zoomend', function () {
		markers.forEach(marker => {
			const lat = parseFloat(marker.dataset.lat)
			const lng = parseFloat(marker.dataset.lng)
			const point = map.latLngToContainerPoint([lat, lng])
			marker.style.left = point.x + 'px'
			marker.style.top = point.y + 'px'
		})
	})

	// Обновление позиций маркеров при перемещении карты
	map.on('moveend', function () {
		markers.forEach(marker => {
			const lat = parseFloat(marker.dataset.lat)
			const lng = parseFloat(marker.dataset.lng)
			const point = map.latLngToContainerPoint([lat, lng])
			marker.style.left = point.x + 'px'
			marker.style.top = point.y + 'px'
		})
	})
})
