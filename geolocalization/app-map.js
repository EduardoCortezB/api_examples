const getMap=(lat,lon)=>{
    const map = L.map("map").setView([lat,lon],5)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.marker([lat,lon]).addTo(map)
}

const success = (pos)=>{
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude

    getMap(lat,lon)
}  
const error=()=>{
    alert("unable")
}

(()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success,error)
    }else{
        p.innerHTML="Is not suported";
    }
})();




