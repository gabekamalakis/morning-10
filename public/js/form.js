const myMap = document.querySelector("#mapid");
const myBtn = document.querySelector("#getLocation");

myBtn.addEventListener("click", (e) => {
  getLocation();
});

// Modified from https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
function getLocation() {
  const status = document.querySelector("#status");
  const latField = document.querySelector("#lat");
  const lngField = document.querySelector("#lng");

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "";
    latField.value = latitude;
    lngField.value = longitude;

    myMap.style.display = "block";
    const mymap = L.map("mapid").setView([latitude, longitude], 15);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,<br />Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoicGFnYXJjaWEiLCJhIjoiY2s4ZXNhdDZvMDAwODNtcGhmZWdreHh0eCJ9.LAsRVy-mflZw0l16nB4rzw",
      }
    ).addTo(mymap);

    const marker = L.marker([latitude, longitude]).addTo(mymap);
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

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
