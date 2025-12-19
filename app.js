// Map Configuration
const CONFIG = {
    center: [42.8746, 74.5698], // Bishkek coordinates
    zoom: 13,
    minZoom: 11,
    maxZoom: 18,
    // Bishkek Bounds: SouthWest, NorthEast
    maxBounds: [
        [42.70, 74.35], // SW
        [43.05, 74.80]  // NE
    ]
};

// Supabase Configuration
const SUPABASE_URL = 'https://qnotruksqxwbegdqqryh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Wc6otBM3K2ifwvWvMKSrOQ_naZlc6ve'; // Using the provided publishable key
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Initialize Map
const map = L.map('map', {
    zoomControl: false,
    maxBounds: CONFIG.maxBounds,
    maxBoundsViscosity: 1.0 // Sticky bounds
}).setView(CONFIG.center, CONFIG.zoom);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Category Configuration - Updated with better icons
const CATEGORIES = {
    'Roads': {
        color: '#334155',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/><path d="M10 12v.01"/><path d="M10 8v.01"/><path d="M14 8v.01"/><path d="M10 16v.01"/><path d="M14 16v.01"/></svg>'
    }, // Road/Construction style
    'Trash': {
        color: '#d97706',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>'
    }, // Trash can
    'Safety': {
        color: '#dc2626',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>'
    }, // Shield with alert
    'Lighting': {
        color: '#eab308',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><path d="M9 21h6"/></svg>'
    }, // Lightbulb
    'Pollution': {
        color: '#7e22ce',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.5a2.12 2.12 0 0 0-.09-3.66Z"/><path d="M5 6l-1 5.25A3 3 0 0 0 6.9 14.1l4.1 1.1a3 3 0 0 0 2.9-.9l1.1-1.1a3 3 0 0 1 2.9-.9l4.1 1.1a3 3 0 0 0 3.8-2.8l1-5.25"/></svg>'
    }, // Factory/Smoke (using a cloud/fog concept or factory) - actually using a mask/cloud combo
    'Noise': {
        color: '#db2777',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>'
    }, // Speaker volume
    'Transport': {
        color: '#2563eb',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 4V2h8v2"/><circle cx="9" cy="15" r="2"/><circle cx="15" cy="15" r="2"/></svg>'
    }, // Bus
    'Other': {
        color: '#10b981',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
    } // Info circle
};

// Translations
const TRANSLATIONS = {
    ru: {
        title: 'Карта Проблем Бишкека',
        searchPlaceholder: 'Поиск места в Бишкеке...',
        reportTitle: 'Сообщить о проблеме',
        categoryLabel: 'Категория',
        selectCategory: 'Выберите категорию',
        catRoads: 'Дороги',
        catTrash: 'Мусор',
        catSafety: 'Безопасность',
        catLighting: 'Освещение',
        catPollution: 'Смог / Воздух',
        catNoise: 'Шум',
        catTransport: 'Транспорт',
        catOther: 'Другое',
        descLabel: 'Описание',
        descPlaceholder: 'Опишите проблему...',
        photoLabel: 'Фото (Необязательно)',
        cancelBtn: 'Отмена',
        submitBtn: 'Отправить',
        locateMe: 'Найти меня',
        outsideBounds: 'Вы находитесь за пределами Бишкека.',
        youAreHere: 'Вы здесь',
        connectionError: 'Ошибка соединения с базой данных. Показаны только локальные отчеты.'
    },
    en: {
        title: 'Bishkek Problems Map',
        searchPlaceholder: 'Search for a place in Bishkek...',
        reportTitle: 'Report a Problem',
        categoryLabel: 'Category',
        selectCategory: 'Select a category',
        catRoads: 'Roads',
        catTrash: 'Trash',
        catSafety: 'Safety',
        catLighting: 'Lighting',
        catPollution: 'Smog / Air',
        catNoise: 'Noise',
        catTransport: 'Transport',
        catOther: 'Other',
        descLabel: 'Description',
        descPlaceholder: 'Describe the issue...',
        photoLabel: 'Photo (Optional)',
        cancelBtn: 'Cancel',
        submitBtn: 'Submit Report',
        locateMe: 'Locate Me',
        outsideBounds: 'You are outside the map boundaries (Bishkek).',
        youAreHere: 'You are here',
        connectionError: 'Database connection error. Showing local reports only.'
    }
};

let currentLang = 'ru'; // Default to Russian

// State
let reports = [];
let tempMarker = null;
// Use MarkerClusterGroup instead of LayerGroup
let markersLayer = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 50
}).addTo(map);
let activeFilters = new Set(Object.keys(CATEGORIES));
let isTargetingMode = false;
let targetMarker = null;

// DOM Elements
const modal = document.getElementById('report-modal');
const form = document.getElementById('report-form');
const addBtn = document.getElementById('add-report-btn');
const locateBtn = document.getElementById('locate-btn');
const cancelBtn = document.getElementById('cancel-btn');
const latInput = document.getElementById('report-lat');
const lngInput = document.getElementById('report-lng');
const filterContainer = document.getElementById('filter-controls');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const langBtn = document.getElementById('lang-btn');
const photoInput = document.getElementById('photo');

// Functions
async function init() {
    updateLanguage();
    renderFilters();
    await fetchReports();
}

function updateLanguage() {
    const t = TRANSLATIONS[currentLang];

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });

    // Update button text
    langBtn.textContent = currentLang === 'ru' ? 'EN' : 'RU';

    // Re-render filters to update names
    renderFilters();
}

function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    updateLanguage();
}

async function fetchReports() {
    try {
        const { data, error } = await supabase
            .from('reports')
            .select('*');

        if (error) throw error;

        reports = data || [];
        console.log('Reports fetched from Supabase:', reports.length);
        renderReports();
    } catch (error) {
        console.error('Error fetching reports:', error);

        // Alert user about sync issue
        const t = TRANSLATIONS[currentLang];
        // Only alert if it's a real network/permission error, not just empty
        if (error.message) {
            console.warn('Sync Error:', error.message);
            // We could show a toast here, but for now just log it.
            // If it's a permission error, it means RLS is blocking SELECT.
        }

        // Fallback to local storage if Supabase fails or table doesn't exist yet
        const localReports = JSON.parse(localStorage.getItem('bishkek_reports')) || [];
        if (reports.length === 0 && localReports.length > 0) {
            reports = localReports;
            renderReports();
        }
    }
}

function renderFilters() {
    filterContainer.innerHTML = '';
    const t = TRANSLATIONS[currentLang];

    Object.entries(CATEGORIES).forEach(([category, config]) => {
        const btn = document.createElement('button');
        btn.className = `filter-chip ${activeFilters.has(category) ? 'active' : ''}`;

        // Translate category name if possible, else use key
        const catKey = 'cat' + category;
        const displayName = t[catKey] || category;

        btn.innerHTML = `
            <span class="filter-dot" style="background-color: ${config.color}"></span>
            ${displayName}
        `;
        btn.addEventListener('click', () => toggleFilter(category));
        filterContainer.appendChild(btn);
    });
}

function toggleFilter(category) {
    if (activeFilters.has(category)) {
        activeFilters.delete(category);
    } else {
        activeFilters.add(category);
    }
    renderFilters();
    renderReports();
}

function renderReports() {
    if (isTargetingMode) return; // Don't render reports in targeting mode

    markersLayer.clearLayers();
    reports.forEach(report => {
        if (activeFilters.has(report.category)) {
            addMarkerToMap(report);
        }
    });
}

function getIcon(category) {
    const config = CATEGORIES[category] || CATEGORIES['Other'];
    return L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin" style="background-color: ${config.color}">${config.icon}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
}

function getTargetIcon() {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin red-pin"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
}

function addMarkerToMap(report) {
    const t = TRANSLATIONS[currentLang];
    const catKey = 'cat' + report.category;
    const catName = t[catKey] || report.category;

    let popupContent = `
        <div class="popup-content">
            <h3 style="color: ${CATEGORIES[report.category]?.color || '#10b981'}">${catName}</h3>
            <p>${report.description}</p>
    `;

    if (report.image_url) {
        popupContent += `<img src="${report.image_url}" class="popup-img" alt="Report Photo">`;
    }

    popupContent += `
            <small>${new Date(report.timestamp).toLocaleDateString()}</small>
        </div>
    `;

    const marker = L.marker([report.lat, report.lng], {
        icon: getIcon(report.category)
    })
        .bindPopup(popupContent);

    markersLayer.addLayer(marker);
    return marker;
}

function openModal(lat, lng) {
    latInput.value = lat;
    lngInput.value = lng;
    modal.classList.remove('hidden');

    // If opened via map click, show a temp marker if not in targeting mode
    if (!isTargetingMode) {
        if (tempMarker) map.removeLayer(tempMarker);
        tempMarker = L.marker([lat, lng], { opacity: 0.6 }).addTo(map);
    }
}

function closeModal() {
    modal.classList.add('hidden');
    form.reset();
    if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = null;
    }

    // If we were in targeting mode, exit it now (whether submitted or cancelled)
    // Wait, user might want to cancel modal but keep targeting? 
    // Let's assume cancel modal -> keep targeting. Submit -> exit targeting.
    // Actually, user said "until the review is left/ process is finished".
    // So if they submit, we definitely exit. If they cancel, maybe they want to search again?
    // Let's keep targeting mode on cancel for now, but provide a way to exit?
    // For simplicity: Submit -> Exit. Cancel -> Keep.
}

function exitTargetingMode() {
    isTargetingMode = false;
    if (targetMarker) {
        map.removeLayer(targetMarker);
        targetMarker = null;
    }
    renderReports();
    searchInput.value = '';
}

// Image Preview
photoInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const previewContainer = document.getElementById('photo-preview-container');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewContainer.innerHTML = `<img src="${e.target.result}" class="preview-img">`;
            previewContainer.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    } else {
        previewContainer.innerHTML = '';
        previewContainer.classList.add('hidden');
    }
});

async function saveReport(e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Загрузка...'; // Loading...
    submitBtn.disabled = true;

    let imageUrl = null;
    const file = photoInput.files[0];

    // Upload Photo if exists
    if (file) {
        try {
            // Sanitize filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from('photos')
                .upload(fileName, file);

            if (error) throw error;

            // Get Public URL
            const { data: publicUrlData } = supabase.storage
                .from('photos')
                .getPublicUrl(fileName);

            imageUrl = publicUrlData.publicUrl;
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Ошибка загрузки фото. Проверьте настройки Bucket (Public). Отчет будет сохранен без фото.');
        }
    }

    const report = {
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        lat: parseFloat(latInput.value),
        lng: parseFloat(lngInput.value),
        timestamp: new Date().toISOString(),
        image_url: imageUrl
    };

    // Save to Supabase
    try {
        const { data, error } = await supabase
            .from('reports')
            .insert([report])
            .select();

        if (error) {
            console.error('Supabase Insert Error:', error);

            // Check for RLS Policy Error
            if (error.code === '42501' || error.message.includes('violates row-level security policy')) {
                alert('Ошибка доступа (RLS): Supabase блокирует сохранение. \n\nНужно добавить Policy "Enable insert for anon" в настройках таблицы reports.');
            }
            // Check for missing column error
            else if (error.message && error.message.includes('column "image_url" of relation "reports" does not exist')) {
                alert('Ошибка: В таблице reports нет колонки image_url. Пожалуйста, добавьте её в Supabase.');
            } else {
                alert('Ошибка сохранения: ' + error.message);
            }
            throw error;
        }

        if (data) {
            reports.push(data[0]);
        }
    } catch (error) {
        console.error('Error saving report:', error);
        // Fallback to local storage
        report.id = Date.now().toString(); // Add ID for local storage fallback
        reports.push(report);
        localStorage.setItem('bishkek_reports', JSON.stringify(reports));
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    closeModal();
    exitTargetingMode(); // Exit targeting mode after successful report
}

// Locate Me Function
function locateUser() {
    map.locate({ setView: true, maxZoom: 16 });
}

map.on('locationfound', (e) => {
    const t = TRANSLATIONS[currentLang];
    // Check if within bounds
    if (map.getBounds().contains(e.latlng)) {
        L.popup()
            .setLatLng(e.latlng)
            .setContent(t.youAreHere)
            .openOn(map);
    } else {
        alert(t.outsideBounds);
        map.setView(CONFIG.center, CONFIG.zoom);
    }
});

map.on('locationerror', (e) => {
    alert(e.message);
});

// Search & Autocomplete
let debounceTimer;
let latestRequestTimestamp = 0;

async function handleSearchInput(e) {
    const query = e.target.value.trim();
    const suggestionsBox = document.getElementById('search-suggestions');

    // Clear previous timer
    clearTimeout(debounceTimer);

    if (query.length < 3) {
        suggestionsBox.classList.add('hidden');
        return;
    }

    // Debounce fetch
    debounceTimer = setTimeout(async () => {
        const currentTimestamp = Date.now();
        latestRequestTimestamp = currentTimestamp;

        try {
            // Viewbox for Bishkek approx: 74.4,42.8,74.7,43.0
            // bounded=1 to prioritize/restrict to Bishkek
            // accept-language=ru to prioritize Russian results
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&viewbox=74.4,42.8,74.7,43.0&bounded=1&limit=5&addressdetails=1&accept-language=${currentLang}`);

            // Race condition check: if a newer request started, ignore this one
            if (latestRequestTimestamp > currentTimestamp) {
                return;
            }

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            // Double check timestamp again after parsing
            if (latestRequestTimestamp > currentTimestamp) {
                return;
            }

            renderSuggestions(data);
        } catch (error) {
            console.error('Search error:', error);
            // Only hide if it's the latest request failing
            if (latestRequestTimestamp === currentTimestamp) {
                suggestionsBox.classList.add('hidden');
            }
        }
    }, 300);
}

function renderSuggestions(results) {
    const suggestionsBox = document.getElementById('search-suggestions');
    suggestionsBox.innerHTML = '';

    if (results.length === 0) {
        suggestionsBox.classList.add('hidden');
        return;
    }

    results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        // Format display name: keep it simple
        // result.display_name is often very long. Let's try to shorten it if possible, or just use it.
        // For better UX, maybe just the name and suburb/city?
        // Let's stick to display_name for now but truncate if needed via CSS (not done yet)
        div.textContent = result.display_name.split(',').slice(0, 3).join(','); // Show first 3 parts

        div.addEventListener('click', () => {
            selectLocation(result);
        });

        suggestionsBox.appendChild(div);
    });

    suggestionsBox.classList.remove('hidden');
}

function selectLocation(result) {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    // Update input
    searchInput.value = result.display_name.split(',')[0];
    document.getElementById('search-suggestions').classList.add('hidden');

    enterTargetingMode(lat, lng);
}

function enterTargetingMode(lat, lng) {
    isTargetingMode = true;

    // Clear existing markers
    markersLayer.clearLayers();
    if (tempMarker) map.removeLayer(tempMarker);
    if (targetMarker) map.removeLayer(targetMarker);

    // Add red target marker
    targetMarker = L.marker([lat, lng], {
        icon: getTargetIcon()
    }).addTo(map);

    // Click on red marker opens modal
    targetMarker.on('click', () => {
        openModal(lat, lng);
    });

    // Zoom to location
    map.setView([lat, lng], 16);
}

// Event Listeners
addBtn.addEventListener('click', () => {
    const center = map.getCenter();
    openModal(center.lat, center.lng);
});

locateBtn.addEventListener('click', locateUser);
langBtn.addEventListener('click', toggleLanguage);

map.on('click', (e) => {
    // In targeting mode, maybe clicking elsewhere moves the target?
    if (isTargetingMode) {
        enterTargetingMode(e.latlng.lat, e.latlng.lng);
    } else {
        openModal(e.latlng.lat, e.latlng.lng);
    }
});

cancelBtn.addEventListener('click', closeModal);

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

form.addEventListener('submit', saveReport);

// Search listeners
searchInput.addEventListener('input', handleSearchInput);

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        document.getElementById('search-suggestions').classList.add('hidden');
    }
});

// Start
init();
