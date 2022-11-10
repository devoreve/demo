// Récupération du bouton de géolocalisation et de la zone de texte
const btnGeolocation = document.querySelector('#geolocation');
const textAddress = document.querySelector('#address span');

function getCoords() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve(position.coords);
        }
    });
}

function getAddress(coords) {
    return fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${coords.longitude}&lat=${coords.latitude}`)
    .then(response => response.json())
    .then(response => response.features[0].properties.label);
}

// Clic sur le bouton
btnGeolocation.addEventListener('click', async () => {
    const coords = await getCoords();
    const address = await getAddress(coords);
    textAddress.textContent = address;
});