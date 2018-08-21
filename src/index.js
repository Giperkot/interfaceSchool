import {initMap} from "./map";

document.addEventListener("DOMContentLoaded", function () {
    ymaps.ready(() => {
        let mapsId = "map";
        initMap(ymaps, mapsId);
        console.log("inited");
    });
});


