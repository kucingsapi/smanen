function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
    } else {
        alert("Geolocation tidak didukung oleh browser ini.");
    }
}

function showPosition(position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;

    var targetLat = -3.4161333146516824; // Lokasi SMAN 1 Tabunganen
    var targetLng = 114.47920618205235;

    // Menggunakan Google Maps API untuk menampilkan peta
    var mapOptions = {
        center: new google.maps.LatLng(userLat, userLng),
        zoom: 10
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Menambahkan marker untuk posisi pengguna
    var userMarker = new google.maps.Marker({
        position: new google.maps.LatLng(userLat, userLng),
        map: map,
        title: "Lokasi Anda"
    });

    // Menambahkan marker untuk lokasi SMAN 1 Tabunganen
    var targetMarker = new google.maps.Marker({
        position: new google.maps.LatLng(targetLat, targetLng),
        map: map,
        title: "SMAN 1 Tabunganen"
    });

    // Menggambar garis antara dua titik
    var line = new google.maps.Polyline({
        path: [
            { lat: userLat, lng: userLng },
            { lat: targetLat, lng: targetLng }
        ],
        map: map,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    // Menghitung jarak
    var distance = calculateDistance(userLat, userLng, targetLat, targetLng);
    document.getElementById("distance").innerHTML = "Jarak ke SMAN 1 Tabunganen: " + distance.toFixed(2) + " km";
}

function handleLocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Akses lokasi diperlukan untuk mengukur jarak. Harap izinkan akses lokasi di pengaturan browser atau aktifkan GPS Anda.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informasi lokasi tidak tersedia. Harap aktifkan GPS di perangkat Anda.");
            break;
        case error.TIMEOUT:
            alert("Permintaan lokasi melebihi waktu.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Terjadi kesalahan yang tidak diketahui.");
            break;
    }
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    var R = 6371; // Radius bumi dalam kilometer
    var dLat = deg2rad(lat2 - lat1);
    var dLng = deg2rad(lat2 - lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = R * c; // Jarak dalam kilometer
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
