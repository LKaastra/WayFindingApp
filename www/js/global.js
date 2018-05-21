$(document).ready(function () {
    initDB();
    init();
    getFrom();
    getTo();
});

function initDB(){
    try{


        DB.createDataBase();
        if(db){
            DB.createTables();
        }
    }
    catch(e){
        console.error("Error in initDB()")
    }
}

function init() {
    populateRoomLists();
    loadAllNodes();
    loadAllEdges();
    roomListPopulate();
    $("#newSearch").on("click", newSearch_click);
    $("#selectFrom").on("change",selectFrom_click);
    $("#selectTo").on("change",selectTo_click);
    $("#directionLKCB").on("pageshow", directionList);
    $("#roomsLKCB").on("pageshow", populateRoomsSearch);
    $("#selectSearch").on("change", displaySelect);
}

function displaySelect() {
    roomsDisplay();
}

function populateRoomsSearch(){

    roomsDisplay();
}
function directionList(){
    drawDirections();
}

function selectFrom_click() {
    getFrom();
}
function selectTo_click() {
    getTo();
}
function newSearch_click() {

    Search();
}


function Search(){
    var from = $("#selectFrom").prop('selectedIndex');
    var to = $("#selectTo").prop('selectedIndex');
    resetGraph();
    dijkstra(graph.nodeList[from],graph.nodeList[to]);
    DrawRoute();
}



