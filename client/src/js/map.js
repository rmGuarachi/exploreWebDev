import mapboxgl from 'mapbox-gl';

export function MyMap(container, center, style) {
    this.map = null;
    this.style = null;
    this.container = null;
    this.center = center;
    if (center === '' && "geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition( (position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            this.center = [position.coords.longitude, position.coords.latitude];
            this.load(container, this.center, style);
        });
    } else {
      /* geolocation IS NOT available */
      console.log("geolocation not available");
      this.load(container, [-74.50, 40], style);
    }



    // map.addControl(new mapboxgl.NavigationControl(), 'top-left');


    // let geoTracker = new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //         enableHighAccuracy: true
    //     },
    //     trackUserLocation: true,
    //     showUserLocation: true
    // });
    // map.addControl(geoTracker);


    // map.addControl(new mapboxgl.AttributionControl({
    //     compact: true
    // }));
}

MyMap.prototype.load = function(container, center, style) {
    this.container = container || this.container;
    this.center = center || this.center;
    this.style = style || this.style;
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm1ndWFyYWNoaSIsImEiOiJjamwzdDdseXcyNTk5M3Fuc3p2ZzJmdXdlIn0.cjtHea9XjbVzu7IQDIXsog';
    this.map = new mapboxgl.Map({
        container: this.container,
        center: this.center,
        zoom: 9,
        style: this.style,
        trackResize: true
    });
    console.log(this.map);
}