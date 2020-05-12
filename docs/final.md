# LitterLog Final Report

Morning 10: Gabe Kamalakis, Andrew Garcia, Sarwat Kazmi, Brigidanna Crews, Adam Fiergang

Link to **LitterLog Heroku** site: litter: https://litter-logger.herokuapp.com/

## Information Problem
Before now, there has not been an efficient way of documenting litter pickup around PG County. So for our application, we set to create a website with a form for users to input any litter they find around PG County + a heatmap to visualize the litter that’s been logged.

## Identified Stakeholders & Target Browsers
### Stakeholders:
- PG County Residents
- Environmental Activists
### Target Browsers:
- Chrome 81+
- Firefox 76+

Currently untested for other browsers (Edge, Safari, w3m, etc.)

## Dataset

Link to PG County open data set:
``https://data.princegeorgescountymd.gov/Environment/LitterTRAK/9tsa-iner``

## Strategies and Solutions

- Consistently Updated Dataset 
  -Two main options:
    -Crowdsourcing and accepting the risk of some inaccurate data 
    -Contracting to a third-party to obtain data
- Maps
  -How to visually represent the dataset so it is easy to view is important to the user.
   -Either a heatmap or pop-up would be the easiest to convey to the user.
    -Heatmaps
      -Shows hotspots of litter at a glance
      -Heatmaps do not show specifics of datapoints.
    -Pop-ups
      -Shows specific date and time of each datapoint
      -Pop-ups might appear too cluttered.

## Technical System Decision Rationale

- SQLite Database
  - Used for embedded storage of our data in the back end of our system
- Heatmap (with leaflet.js)
  - Used for presentation of our data in the form of a heatmap. Has zooming capabilities and allows for data to update when submissions are added.
- Data fetched from PG County Open Data API
  - The base of our data, however we moved this data to be embedded within our SQLite.
- Bulma.io CSS Framework
  - Used as the foundation of our CSS to enhance our application with a smooth and consistent finish.
- Tests using Cypress.js and Mocha
  - Used for reliable and flexible testing for browser based applications.

## How the final system addresses the problem

- Visually Appealing
  - The homepage shows the public's opion about the app (very important for businesses that are just starting).
  - The heatmap is easy to read.
 -User Input/Crowdsourcing 
  -Having the data come from crowdsourcing reduces burden on the developers to keep the dataset updated.
  -The submission page is straight-forward. It is quick and easy to submit for the users. 
 

## Challenges

- False Positives
  - Keeping the database frequently updated 
  - Some litter might be picked up fast, or by someone not aware of LitterLog, and it remains in the database.

## Future Work

- Expand target area
  - Possibly include more counties if datasets exist.
- Add a filter
  - Additional functionality for the heat-map to show trash collected by litter type.
