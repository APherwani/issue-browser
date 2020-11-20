const queryString = window.location.search;
const issueNum = new URLSearchParams(queryString).get('issueNum');
console.log(issueNum);

// now making an API call for the issue specific info
var url = "https://api.github.com/repos/nlyra/SaveDatMoney/issues/"+issueNum;

fetch(url, {method: 'GET'})
    .then(
        function(response) {
            return response.json();
    })
    .then(function (data) {
        renderInfo(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
function renderInfo(data) {
    var mainContainer = document.getElementById("myData");
    var div = document.createElement("div");

    // Title
    var title = document.createElement("h5");
    title.innerHTML = data.title;
    div.appendChild(title);
    
    // Body info
    var p1 = document.createElement("p");
    p1.innerHTML = "Body: "+data.body;
    div.appendChild(p1);

    // Date created
    var dateCreated = document.createElement("p");
    dateCreated.innerHTML = "Data Created: "+data.created_at;
    div.appendChild(dateCreated);

    mainContainer.appendChild(div);
    console.log()
}