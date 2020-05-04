// From https://docs.mapbox.com/mapbox-gl-js/example/locate-user/
mapboxgl.accessToken =
  "pk.eyJ1IjoicGFnYXJjaWEiLCJhIjoiY2s4ZXNhdDZvMDAwODNtcGhmZWdreHh0eCJ9.LAsRVy-mflZw0l16nB4rzw";
const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-96, 37.8], // starting position
  zoom: 3, // starting zoom
});

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  })
);

// From https://demo.creativebulma.net/components/calendar/v6//#integration
// Initialize all input of date type.
const options = {
  color: "dark", // colors here: https://bulma.io/documentation/elements/button/#colors
};
const calendars = bulmaCalendar.attach('[type="datetime"]', options);

// Loop on each calendar initialized
calendars.forEach((calendar) => {
  // Add listener to date:selected event
  calendar.on("date:selected", (date) => {
    console.log(date);
  });
});

// To access to bulmaCalendar instance of an element
const element = document.querySelector("#my-element");
if (element) {
  // bulmaCalendar instance is available as element.bulmaCalendar
  element.bulmaCalendar.on("select", (datepicker) => {
    console.log(datepicker.data.value());
  });
}
