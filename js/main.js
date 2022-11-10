// Récupération du bouton de géolocalisation et de la zone de texte
const btnGeolocation = document.querySelector('#geolocation');
const textAddress = document.querySelector('#address span');

// Initialisation de la carte
let map = L.map('map').setView([48.57, 7.75], 13);

// Affichage de la carte
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch("data/restaurants.json").then(response => response.json()).then(response => {
    for (let restaurant of response.restaurants) {
        let marker = L.marker([restaurant.coords[0], restaurant.coords[1]]).addTo(map);
        marker.bindPopup(restaurant.name);
    }
});

// Clic sur le bouton
btnGeolocation.addEventListener('click', () => {
    // Récupération de la position de l'utilisateur
    navigator.geolocation.getCurrentPosition(position => {
        // Une fois que la position qui a été passée en paramètre a été récupérée
        // On envoie une requête vers un service qui fait du "reverse geocoding" 
        // (en gros on récupère l'adresse à partir des coordonnées)
        
        // Récupération des coordonnées gps de ma position
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        
        map.setView([lat, lon]);
        const marker = L.marker([lat, lon]).addTo(map);
        
        // Envoi de la requête à l'api adresse avec les coordonnées récupérées
        fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`)
        .then(response => response.json())
        .then(response => {
            let address = response.features[0].properties.label;
            textAddress.textContent = address;
        });
    });
});