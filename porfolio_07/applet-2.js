class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

const myMap = new LeafletMap('map', [8.459482, 124.784754], 18);

/*
myMap.addMarker(8.459361, 124.784822, 'Balubal CCRL Store');
myMap.addMarker(8.459329,124.784842, 'Balubal CCRL Store Street');
myMap.addMarker(8.45938,124.78472, 'Balubal Fundamental Baptist Church');
myMap.addMarker(8.45970,124.78517, 'Balubal National High School');
*/

myMap.loadMarkersFromJson('applet-2.json');