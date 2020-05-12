const dateField = document.querySelector("input[name='date']");
const timeField = document.querySelector("input[name='time']");

const dtPicker = document.querySelector("#dtPicker");
const cal = flatpickr(dtPicker, {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
  inline: true,
  onChange: function(selectedDates, dateStr, instance) {
    dateField.value = dateStr.slice(0,10);
    timeField.value = dateStr.slice(11)
  },
});

const yesOrg = document.querySelector("#yes");
const noOrg = document.querySelector("#no");
const orgInfo = document.querySelector(".organization-info");

yesOrg.addEventListener("click", (e) => {
  orgInfo.style.display = "block";
});

noOrg.addEventListener("click", (e) => {
  orgInfo.style.display = "none";
});

const myMap = document.querySelector("#mapid");
const myBtn = document.querySelector("#getLocation");

myBtn.addEventListener("click", (e) => {
  getLocation();
});

// Modified from https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
function getLocation() {
  const status = document.querySelector("#status");
  const latField = document.querySelector("#latitude");
  const lngField = document.querySelector("#longitude");

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
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
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
    status.textContent =
      "Unable to retrieve your location. Please enter it manually in the text fields below.";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
    error();
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

async function createForm() {

	const formData = new FormData();

	const name = document.querySelector("input[name='username']").value;
	const email = document.querySelector("input[name='email']").value;
	const phoneNumber = document.querySelector("input[name='phoneNumber']").value;
	formData.append("name", name);
	formData.append("email", email);
	formData.append("phoneNumber", phoneNumber);

	// If Then statement
	const orgOption = document.querySelector("input[name='member']:checked").value;
	if (orgOption === "yes") {
		organization = document.querySelector("input[name='organization']").value;
		orgNumber = document.querySelector("input[name='orgNumber'").value;
		formData.append("organization", organization);
		formData.append("orgNumber", orgNumber);
	}
	else {
		formData.append("organization", "null");
		formData.append("orgNumber", "null");

	};


	const longitude = document.querySelector("input[name='longitude']").value;
	const latitude = document.querySelector("input[name='latitude']").value;
	formData.append("longitude", longitude);
	formData.append("latitude", latitude);

	// Our api might not require this
	const date = document.querySelector("input[name='date']").value;
	const time = document.querySelector("input[name='time']").value;
	const datetime = `${date} ${time}`
	formData.append("datetime", datetime);

	const cleanupType = document.querySelector("input[name='cleanupType']").value;
	const litterType = document.querySelector("input[name='litterType']").value;
	formData.append("cleanupType", cleanupType);
	formData.append("litterType", litterType);

	const weighttype = document.querySelector('input[name="amount"]:checked').value;
	const litterAmount = document.querySelector("input[name='litterAmount']").value;

	if (weighttype === "lbs" ) {
		formData.append("weight", litterAmount);
		formData.append("numBags", "null");
	}
	else {
		formData.append("weight", "null");
		formData.append("numBags", litterAmount);
	}


	const notes = document.querySelector(".textarea").value;
	formData.append("notes", notes);

	// console.log(formData);
	if (!valueMissing) {
		return formData;
	}
	else  {
		return 0;
	}
};

async function sendForm(e) {
	e.preventDefault();
	console.log("Client Submission started...")

	const formio = await createForm();

	const dio = JSON.stringify(Object.fromEntries(formio));

	const response = await fetch("/api", {
		method: "PUT",
		headers: {
			"Accept" : 'application/json',
			"Content-Type" : "application/json"
		},
		// Needs Form elements in the fromEntries box
		body: dio
		});
	console.log("Client form Submitted");

	const result = await response.json();
	alert("Submitted!", result);

}
submitter = document.querySelector("#submitB");
submitter.addEventListener("click", sendForm);
