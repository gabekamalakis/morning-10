fetch("/api")
  .then((res) => res.json())
  .then((res) => {
    console.log("Response data", res.dataPoints);

    // Modified from heatmap example at https://www.patrick-wied.at/static/heatmapjs/example-heatmap-leaflet.html
    const heatmapData = {
      max: 78,
      data: res.dataPoints,
    };

    const baseLayer = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://data.princegeorgescountymd.gov/">PG County</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoicGFnYXJjaWEiLCJhIjoiY2s4ZXNhdDZvMDAwODNtcGhmZWdreHh0eCJ9.LAsRVy-mflZw0l16nB4rzw",
      }
    );

    const cfg = {
      radius: 12,
      maxOpacity: 0.8,
      latField: "lat",
      lngField: "lng",
      valueField: "total_bags",
    };

    const heatmapLayer = new HeatmapOverlay(cfg);

    const map = new L.Map("mapid", {
      center: new L.LatLng(38.8334467, -76.8496937),
      zoom: 10,
      layers: [baseLayer, heatmapLayer],
    });

    console.log("Data passed to map", heatmapData);
    heatmapLayer.setData(heatmapData);
  });
