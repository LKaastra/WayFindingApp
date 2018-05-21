function populateRoomLists() {

    function successSelect(tx, results) {
        var htmlCode = "";
        var j = 0;
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (j === 0) {
                htmlCode += "<option value='" + row['Name'] + "' selected='selected'>" + row['Name'] + "</option>";
                j++
            }
            else {
                htmlCode += "<option value='" + row['Name'] + "'>" + row['Name'] + "</option>";
            }
        }
        var selectFrom = $("#selectFrom");
        var selectTo = $("#selectTo");
        selectFrom.html(htmlCode);
        selectFrom.selectmenu("refresh");
        selectTo.html(htmlCode);
        selectTo.selectmenu("refresh");
        getFrom();
        getTo();
    }

    Rooms.selectAll(successSelect);
}
function roomListPopulate() {
    function successSelect(tx, results) {
        var htmlCode = "";
        var j = 0;
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (j === 0) {
                htmlCode += "<option value='" + row['Name'] + "' selected>" + row['Name'] + "</option>";
                j++
            }
            else {
                htmlCode += "<option value='" + row['Name'] + "'>" + row['Name'] + "</option>";
            }
        }
        var selectSearch = $("#selectSearch");
        selectSearch.html(htmlCode);
        selectSearch.selectmenu("refresh");
    }

    Rooms.selectAll(successSelect);
}


function DrawRoute() {
    var svg = $("#myMap");
    var htmlCode = "<svg viewBox='200 120 480 480' preserveAspectRatio='none'>" +
        "<image x='0' y='0' height='160%' width='160%' xlink:href='img/A2.svg'></image></svg>";

    var x = 0;
    var y = 0;
    x = graph.path[0].X + localStorage.getItem("from_width") / 2;
    y = graph.path[0].Y + localStorage.getItem("from_height") / 2;
    htmlCode += "<line x1='" + x + "' y1='" + y + "' x2='" + graph.path[1].X + "' y2='" + graph.path[1].Y + "'/>";
    for (var i = 1; i < graph.path.length - 1; i++) {
        var node = graph.path[i];
        var next = graph.path[i + 1];


        if (next.type == 'IN') {

            htmlCode += "<line x1='" + node.X + "' y1='" + node.Y + "' x2='" + next.X + "' y2='" + next.Y + "'/>";
            htmlCode += "<circle cx='" + node.X + "' cy='" + node.Y + "' r='" + 4 + "''/>";
        }
        else if (next.type == 'RM') {
            x = graph.path.last().X + localStorage.getItem("to_width") / 2;
            y = graph.path.last().Y + localStorage.getItem("to_height") / 2;
            htmlCode += "<line x1='" + node.X + "' y1='" + node.Y + "' x2='" + x + "' y2='" + y + "'/>";
            htmlCode += "<circle cx='" + node.X + "' cy='" + node.Y + "' r='" + 4 + "''/>";
        }


    }
    htmlCode += "<rect class ='myStartLocation' x='" + graph.path[0].X + "' y='" + graph.path[0].Y + "' width='" + localStorage.getItem("from_width") + "' height='"
        + localStorage.getItem("from_height") + "'/>";
    htmlCode += "<rect class='myEndLocation' x='" + graph.path.last().X + "' y='" + graph.path.last().Y + "' width='" + localStorage.getItem("to_width") + "' height='"
        + localStorage.getItem("to_height") + "'/>";
    svg.html(htmlCode);
    svg.change();
}

function getFrom() {
    var options = [];
    var from = $("#selectFrom").val();
    localStorage.setItem("from", from);
    options[0] = from;
    function successSelect(tx, results) {
        var row = results.rows[0];
        localStorage.setItem("from_width", row['width']);
        localStorage.setItem("from_height", row['height']);
    }

    JoinQuery.select(successSelect, options);
}
function getTo() {
    var options = [];
    var to = $("#selectTo").val();
    localStorage.setItem("to", to);
    options[0] = to;
    function successSelect(tx, results) {
        var row = results.rows[0];
        localStorage.setItem("to_width", row['width']);
        localStorage.setItem("to_height", row['height']);
    }

    JoinQuery.select(successSelect, options);
}

function drawDirections() {
    if (graph.path.length != 0) {
        var previousEdge;
        var list = $("#directionList");
        var htmlcode = "";
        for (var i = 0; i < graph.path.length - 1; i++) {
            for (var j = 0; j < graph.path[i].connectedEdges.length; j++) {
                if (graph.path[i].connectedEdges[j].to == graph.path[i + 1]) {
                    var edge1 = graph.path[i].connectedEdges[j];
                    if (i === 0) {
                        var node = graph.path[i];
                        var options = [];
                        options[0] = node.name;
                        function selectSuccess(tx, results) {
                            var row = results.rows[0];
                            var list1 = $("#directionListStart");
                            var htmlcodeStart = "<li><h2>Start in " + row.Name + "</h2></li>";
                            list1.html(htmlcodeStart);

                        }

                        Rooms.select(selectSuccess, options);
                        previousEdge = edge1;
                    }
                    if (i === graph.path.length - 2) {
                        var direction = directionFind(edge1, previousEdge);
                        htmlcode += "<li><h2>" + direction + " into " + edge1.name + "</h2></li>";
                        previousEdge = edge1;
                    }
                    else {
                        var direction = directionFind(edge1, previousEdge);
                        if (direction !== "Straight") {
                            htmlcode += "<li><h2>" + direction + " at " + edge1.name + "</h2></li>";
                            previousEdge = edge1;
                        }
                    }
                }
            }
        }
        list.html(htmlcode);
        list.change();
    }
}
function directionFind(edge1, edge2) {
    var direction = "";
    if (edge1.compassPoint === "N") {
        if (edge2.compassPoint === "W") {
            direction = "Right";
        }
        else if (edge2.compassPoint === "N") {
            direction = "Straight"
        }
        else if (edge2.compassPoint === "E") {
            direction = "Left";
        }
    }
    if (edge1.compassPoint === "E") {
        if (edge2.compassPoint === "E") {
            direction = "Straight";
        }
        else if (edge2.compassPoint === "S") {
            direction = "Left"
        }
        else if (edge2.compassPoint === "N") {
            direction = "Right";
        }
    }
    if (edge1.compassPoint === "S") {
        if (edge2.compassPoint === "S") {
            direction = "Straight";
        }
        else if (edge2.compassPoint === "W") {
            direction = "Left"
        }
        else if (edge2.compassPoint === "E") {
            direction = "Right";
        }
    }
    if (edge1.compassPoint === "W") {
        if (edge2.compassPoint === "W") {
            direction = "Straight";
        }
        else if (edge2.compassPoint === "N") {
            direction = "Left"
        }
        else if (edge2.compassPoint === "S") {
            direction = "Right";
        }
    }
    return direction;
}

function roomsDisplay() {
    var div = $("#roomDisplay");
    var htmlCode = "";
    var option = [];
    option[0] = $("#selectSearch").val();
    function successSelect(tx, results) {

        var row = results.rows[0];
        htmlCode += "<li data-theme='b'><h2>" + row.Name + "</h2>" +
            "<p>";
        if (row.isLab == 1) {
            htmlCode += "is a Lab <br>";
        }
        else{
            htmlCode += "is not a Lab <br>";
        }
        if (row.isOpenLab == 1) {
            htmlCode += "is an open Lab <br>";
        }
        else{
            htmlCode += "is not an open Lab <br>";
        }
        htmlCode += "</p></li>";
        div.html(htmlCode);
        div.change();
    }

    Rooms.selectName(successSelect, option);


}

