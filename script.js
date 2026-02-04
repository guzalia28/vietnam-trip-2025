// ===== Day Selector =====
document.addEventListener('DOMContentLoaded', function() {
    const dayBtns = document.querySelectorAll('.day-btn');
    const day1Content = document.getElementById('day1-content');
    const day2Content = document.getElementById('day2-content');

    dayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            dayBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Show/hide content
            const day = this.dataset.day;
            if (day === '1') {
                day1Content.classList.remove('hidden');
                day2Content.classList.add('hidden');
            } else {
                day1Content.classList.add('hidden');
                day2Content.classList.remove('hidden');
            }
        });
    });

    // ===== Cafe Filters =====
    const cafeFilters = document.querySelectorAll('.cafe-filter');
    const cafeCards = document.querySelectorAll('.cafe-card');

    cafeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            cafeFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            cafeCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const categories = card.dataset.category || '';
                    if (categories.includes(filterValue)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    // ===== Initialize Map =====
    initMap();

    // ===== Smooth scroll for nav links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== Leaflet Map =====
function initMap() {
    // Ho Chi Minh City center
    const map = L.map('leaflet-map').setView([10.7769, 106.7009], 13);

    // Add tile layer (using OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom icons
    const shopIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #ff6b9d; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; box-shadow: 0 3px 10px rgba(255,107,157,0.4);">🛍️</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    const cafeIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #7c5cff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; box-shadow: 0 3px 10px rgba(124,92,255,0.4);">☕</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    const placeIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #ffa94d; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; box-shadow: 0 3px 10px rgba(255,169,77,0.4);">🏛️</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    // Shopping locations
    const shoppingLocations = [
        {
            name: '26 Lý Tự Trọng',
            desc: 'Главная точка — 20+ локальных брендов',
            coords: [10.7745, 106.7032],
            type: 'shop'
        },
        {
            name: 'Vincom Center Dong Khoi',
            desc: 'Zara, H&M, Nike, Adidas',
            coords: [10.7735, 106.7025],
            type: 'shop'
        },
        {
            name: 'MUJI Lê Thánh Tôn',
            desc: 'Крупнейший MUJI в ЮВА',
            coords: [10.7755, 106.7005],
            type: 'shop'
        },
        {
            name: '42 Tôn Thất Thiệp',
            desc: 'Секретный хаб — She by Shj, Thrift Mall',
            coords: [10.7725, 106.6995],
            type: 'shop'
        },
        {
            name: 'Trần Quang Diệu Street',
            desc: 'K-style магазины',
            coords: [10.7835, 106.6885],
            type: 'shop'
        },
        {
            name: 'An Dong Market',
            desc: 'Оптовый рынок с 1951',
            coords: [10.7565, 106.6595],
            type: 'shop'
        },
        {
            name: 'Nguyễn Trãi Fashion Street',
            desc: '2 км моды, 200+ магазинов',
            coords: [10.7585, 106.6655],
            type: 'shop'
        },
        {
            name: 'Nguyen Dinh Chieu (обувь)',
            desc: 'Обувной рай — сотни магазинов',
            coords: [10.7785, 106.6815],
            type: 'shop'
        }
    ];

    // Cafe locations
    const cafeLocations = [
        {
            name: 'Noong Oi Cafe',
            desc: 'Сад Эдема — 5000+ растений',
            coords: [10.8515, 106.7545],
            type: 'cafe'
        },
        {
            name: 'Oasis Cafe',
            desc: 'Кои-кафе с 2010',
            coords: [10.7925, 106.6795],
            type: 'cafe'
        },
        {
            name: 'Miền Thảo Mộc Cafe',
            desc: 'Сад с водопадами',
            coords: [10.7625, 106.6525],
            type: 'cafe'
        },
        {
            name: 'Okkio Caffe',
            desc: 'Минимализм + старый Сайгон',
            coords: [10.7715, 106.6985],
            type: 'cafe'
        },
        {
            name: 'L\'Usine Dong Khoi',
            desc: 'Французское ретро + бутик',
            coords: [10.7765, 106.7025],
            type: 'cafe'
        },
        {
            name: 'Oromia',
            desc: 'Скрытый gem с кои-прудом',
            coords: [10.7825, 106.6925],
            type: 'cafe'
        },
        {
            name: 'Saigon Oi (Cafe Apartment)',
            desc: 'Балкон на пешеходную улицу',
            coords: [10.7735, 106.7035],
            type: 'cafe'
        },
        {
            name: 'Ngam Cafe',
            desc: 'Ретро-эстетика, 24/7',
            coords: [10.7755, 106.6975],
            type: 'cafe'
        }
    ];

    // Historical places
    const historicalPlaces = [
        {
            name: 'Jade Emperor Pagoda',
            desc: 'Самый атмосферный храм',
            coords: [10.7905, 106.6955],
            type: 'place'
        },
        {
            name: 'Thiên Hậu Temple',
            desc: 'Храм богини моря в Чайнатауне',
            coords: [10.7545, 106.6595],
            type: 'place'
        },
        {
            name: 'Bitexco Saigon Skydeck',
            desc: '49 этаж, 360° панорама',
            coords: [10.7715, 106.7045],
            type: 'place'
        },
        {
            name: 'Cafe Apartment',
            desc: '9 этажей кафе и бутиков',
            coords: [10.7735, 106.7035],
            type: 'place'
        }
    ];

    // Add markers
    function createPopup(item) {
        const typeClass = item.type === 'shop' ? 'popup-type-shop' :
                         item.type === 'cafe' ? 'popup-type-cafe' : 'popup-type-place';
        const typeLabel = item.type === 'shop' ? '🛍️ Шоппинг' :
                         item.type === 'cafe' ? '☕ Кафе' : '🏛️ Место';

        return `
            <div class="popup-type ${typeClass}">${typeLabel}</div>
            <div class="popup-title">${item.name}</div>
            <div class="popup-desc">${item.desc}</div>
        `;
    }

    shoppingLocations.forEach(loc => {
        L.marker(loc.coords, { icon: shopIcon })
            .addTo(map)
            .bindPopup(createPopup(loc));
    });

    cafeLocations.forEach(loc => {
        L.marker(loc.coords, { icon: cafeIcon })
            .addTo(map)
            .bindPopup(createPopup(loc));
    });

    historicalPlaces.forEach(loc => {
        L.marker(loc.coords, { icon: placeIcon })
            .addTo(map)
            .bindPopup(createPopup(loc));
    });

    // Draw route for Day 1 (District 1 + 3)
    const day1Route = [
        [10.7745, 106.7032], // 26 Ly Tu Trong
        [10.7735, 106.7025], // Vincom
        [10.7755, 106.7005], // MUJI
        [10.7725, 106.6995], // 42 Ton That Thiep
        [10.7835, 106.6885]  // Tran Quang Dieu
    ];

    L.polyline(day1Route, {
        color: '#ff6b9d',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);

    // Add layer control hint
    const legend = L.control({ position: 'bottomleft' });
    legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-info');
        div.style.cssText = 'background: white; padding: 10px 15px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); font-size: 12px;';
        div.innerHTML = '<b>Пунктир:</b> маршрут Дня 1';
        return div;
    };
    legend.addTo(map);
}

// ===== Intersection Observer for animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.card, .cafe-card, .place-card, .tip-card, .shop-location').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
