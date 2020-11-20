const issuesPerPage = 10;
var issueData;
var pageNum = 1;
fetch('https://api.github.com/repos/nlyra/SaveDatMoney/issues', {method: 'GET'})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        renderTable(data, false);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function renderTable(data, flag) {
    issueData = data;
    var table = document.getElementById("table");
    
    // Setting the thead
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    tr.innerHTML = '<th scope="col">Title</th><th scope="col">Number</th><th scope="col>Status</th>';
    thead.appendChild(tr);

    var tableBody = document.createElement("tbody");

    var minVal = (data.length >= issuesPerPage*pageNum) ? issuesPerPage*pageNum : data.length;

    for(var i = issuesPerPage*(pageNum-1); i < minVal; i++) {
        var row = document.createElement("tr");
        
        var title = document.createElement("td");
        title.innerHTML = '<a href="next.html?issueNum='+extensionURL(data[i])+'">' + data[i].title+'</a>';
        row.appendChild(title);

        var number = document.createElement("td");
        number.innerHTML = data[i].number;
        row.appendChild(number);

        var status = document.createElement("td");
        status.innerHTML = data[i].state;
        row.appendChild(status);

        tableBody.appendChild(row);
    }
    if(flag){
        table.innerHTML='<thead><tr><th class="th-sm">Title</th><th class="th-sm">Number</th><th class="th-sm">Status</th></tr></thead>';
    }
    table.appendChild(tableBody);
    //body.appendChild(table);
}

function previousPage() {
    if(pageNum > 1){
        pageNum--;
        renderTable(issueData, true);
    }
}

function nextPage() {
    pageNum++;
    if(pageNum*issuesPerPage <= issueData.length){
        renderTable(issueData, true);
    }
    else{
        pageNum--;
    }
}

function extensionURL(issue) {
    var issueNum = issue.number;
    return issueNum;
}


