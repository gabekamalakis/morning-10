// From https://demo.creativebulma.net/components/calendar/v6//#integration
// Initialize all input of date type.
const options = {
    color: "dark" // colors here: https://bulma.io/documentation/elements/button/#colors
};
const calendars = bulmaCalendar.attach('[type="datetime"]', options);

// Loop on each calendar initialized
calendars.forEach(calendar => {
	// Add listener to date:selected event
	calendar.on('date:selected', date => {
		console.log(date);
	});
});

// To access to bulmaCalendar instance of an element
const element = document.querySelector('#my-element');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', datepicker => {
		console.log(datepicker.data.value());
	});
}