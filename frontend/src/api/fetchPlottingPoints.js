const apiUrl = "http://localhost:5000";

function fetchPlottingPoints() {
  fetch(apiUrl).then(function (response) {
    return response.json();
  });
}

export default fetchPlottingPoints;
