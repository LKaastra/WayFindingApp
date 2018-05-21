var graph =  {
    edgeList:  [],
    nodeList:  [],
    infinity: 100000,
    totalCost: 0,
    path:[],
    openList:[],
    closedList: [],
    addEdge: function (name,from, to ,directed, compassPoint) {
        directed = directed || false;
        var edge  = new Edge(name,from,to, directed,compassPoint);
        from.connectedEdges.push(edge);
        from.connectedNodes.push(to);
        this.edgeList.push(edge);
        if (!directed) {
            var newCompassPoint = compassPoint;
            switch (compassPoint){
                case "N":
                    newCompassPoint = "S";
                    break;
                case "S":
                    newCompassPoint = "N";
                    break;
                case "E":
                    newCompassPoint = "W";
                    break;
                case "W":
                    newCompassPoint = "E";
                    break;
            }
            to.connect(from,  true, newCompassPoint);
        }

    },
    addNode: function (type,name,X,Y) {
        var node = new Node(type,name,X,Y);
        this.nodeList.push(node);
    }
};
//constructor for the edge
function Edge(name,from, to, directed, compassPoint) {
    this.name = name;
    this.from = from;
    this.to = to;
    var a = Math.abs(from.X - to.X);
    var b = Math.abs(from.Y - to.Y);
    var c = Math.sqrt( a*a + b*b );
    this.weight = Math.round(c * 100) / 100;
    if(from.type == 'RM')
    {
        this.weight = 1000;
    }
    if(to.type == 'RM')
    {
        this.weight = 1;
    }
    this.directed = directed;
    this.compassPoint = compassPoint;
}
//constructor for the node
function Node(type,name, X,Y) {
    this.type = type;
    this.name = name;
    this.X = X;
    this.Y = Y;
    this.connectedNodes = [];
    this.connectedEdges = [];
    this.before = Node;
    this.cost = 1000000;
    this.connect = function (endpoint, directed,compassPoint) {
        var thisNode = this;
        var name1 = "";
        function successSelect(tx, results){
            var row = results.rows[0];
            name1 = row.Name;
            graph.addEdge(name1,thisNode,endpoint,directed,compassPoint);
        }
        var option = [];
        option[0] = endpoint.name;
        option[1] = this.name;
        Edges.select(successSelect, option);

     }

}
//traverses the graph and determines shortest path
function dijkstra(from,To) {
    // only executed on the first pass
    if (graph.closedList.length == 0){

        //populate the open node list

        graph.nodeList.forEach(openAdd);
        //set the first node's cost to 0
        from.cost = 0;
        // sets the total cost of the path to 0
        graph.totalCost = 0;
        //adds the node you are traversing from, to the closed list because its cost is known
        graph.closedList.push(from);
        //sorts the open node list so that the known node is the first element
        graph.openList.sort(openSort);
        //removes the known node
        graph.openList.shift();
        //recursively calls the method again
        dijkstra(graph.closedList.last(),To);
    }
    else{
        //all subsequent method calls
        //for each edge that is connected to the latest node whose cost is known
        for(var i = 0; i < graph.closedList.last().connectedEdges.length;i++){
            //edge set to the current edge of the latest known nodes connected edge list
            var edge = graph.closedList.last().connectedEdges[i];

                //determines if the node this particular edge is connected to is in the open list
                //prevents returning back to the node we just traversed from
                var index = -1;
                for(var j = 0; j < graph.openList.length;j++){

                  if (graph.openList[j].name == edge.to.name){
                     index = j;
                    }
                }
                //determines if the edge is leaving the last known node and is not going to a previously known node
                if(edge.from.name == graph.closedList.last().name && index > -1 ){
                    //if the total cost of the graph plus the weight of this edge is less than the cost of the node you
                    // are traversing to, update the cost of the node
                    if(graph.totalCost + edge.weight < edge.to.cost){

                      edge.to.cost = graph.totalCost + edge.weight;
                      //update the node you are going to with a pointer to the node which you traversed from
                      edge.to.before = graph.closedList.last();

                    }
                }
                //if the edge you are traversing from is the node you are traversing to you have found the fastest path
                else if(edge.from == To)
                {
                    populatePath();
                    return;
                 }

        }
        //if the open list is not empty
        if(graph.openList.length > 0){

            //sort the open list with the updated node costs
            graph.openList.sort(openSort);
            //add the node whose cost is known to the closed list
            graph.closedList.push(graph.openList[0]);
            //remove the node whose cost is known from the open list
            graph.openList.shift();
            //set the total cost of the graph to the last known nodes cost
            graph.totalCost = graph.closedList.last().cost;
            //recursively call the function again starting from the last known node
            dijkstra(graph.closedList.last(), To);
        }
    }

}


//populates the open array
function openAdd(item) {
    graph.openList.push(item);
}
//adds the last method to the array
Array.prototype.last = function() {
    return this[this.length -1];
};
//adds the insert functionality to the array
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

//sorts the path
function openSort(a,b) {
    if (a.cost < b.cost)
        return -1;
    if (a.cost > b.cost)
        return 1;
    return 0;
}


//Traverses back through the connected nodes to find the shortest path
//prints the path
function populatePath() {
    graph.path.push(graph.closedList.last());

    var start = graph.closedList[0];
    do {
        graph.closedList.forEach(previousNode)
    }while (graph.path[0] != start);
    function previousNode(item) {
        if(item == graph.path[0].before){
            graph.path.insert(0,item);
        }
    }
    var pathway = graph.path[0].name;
    for (var i=1;i < graph.path.length;i++){
        pathway += " -> " + graph.path[i].name;
    }

}

function loadAllNodes() {

        function successSelect(tx, results) {
            for (var i=0;i < results.rows.length; i++)
            {
                var row = results.rows[i];
               graph.addNode(row['Type'],row['nodeId'],row['X'],row['Y']);


            }
        }

        Nodes.selectAll(successSelect);

    }

function loadAllEdges() {

    function successSelect(tx, results) {
        for (var i=0;i < results.rows.length -1; i++)
        {
            var row = results.rows[i];
            graph.addEdge(row['Name'],graph.nodeList[row['From'] - 1],graph.nodeList[row['To'] - 1],false,row['Direction']);
        }

    }

    Edges.selectAll(successSelect);

}



function resetGraph() {

    graph.totalCost = 0;
    graph.openList.length = 0;
    graph.closedList.length = 0;
    graph.path.length = 0;
  for (var i=0;i < graph.nodeList.length;i++){
      graph.nodeList[i].cost = graph.infinity;
      graph.nodeList[i].before = Node;
  }
}