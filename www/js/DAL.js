/**
 * Created by Lucas Kaastra on 4/18/2017
 *
 */



var Direction = {
    selectAll: function (successSelect) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Direction;";
            var options = [];


            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (successSelect, options){
        function txFunction(tx) {
            var sql = "SELECT * FROM Direction WHERE rowid=?;";

            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
var Edges = {
    selectAll: function (successSelect) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Edges;";
            var options = [];


            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (successSelect, options){
        function txFunction(tx) {
            var sql = "SELECT * FROM Edges E WHERE E.'From' = ? AND E.'To' = ? ;";

            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Intersections = {
    selectAll: function (successSelect) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Intersections;";
            var options = [];


            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (successSelect, options){
        function txFunction(tx) {
            var sql = "SELECT * FROM Intersections WHERE rowid=?;";

            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Nodes = {
    selectAll: function (successSelect) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Nodes;";
            var options = [];


            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAllIntersection: function (successSelect) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Nodes WHERE Type = 'IN';";
            var options = [];


            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (successSelect, options){
        function txFunction(tx) {
            var sql = "SELECT * FROM Nodes WHERE rowid=?;";

            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Rooms = {
    selectAll: function (successSelect) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Rooms;";
            var options = [];


            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectName: function (successSelect, options){
        function txFunction(tx) {
            var sql = "SELECT * FROM Rooms WHERE Name = ?;";

            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (successSelect, options){
        function txFunction(tx) {
            var sql = "SELECT * FROM Rooms WHERE rowid= ?;";

            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Type = {
    selectAll: function (successSelect) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Type;";
            var options = [];


            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (successSelect, options){
        function txFunction(tx) {
            var sql = "SELECT * FROM Type WHERE rowid=?;";

            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var JoinQuery = {
    selectAll: function (successSelect) {
        function txFunction(tx) {
            var sql = "SELECT Rooms.Name, Rooms.width," +
                "Rooms.height, Nodes.X, Nodes.Y  " +
                " FROM Rooms " +
                "INNER JOIN Nodes ON Rooms.node = Nodes.rowid;";
            var options = [];


            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (successSelect, options){
        function txFunction(tx) {
            var sql = "SELECT rm.Name AS 'name', rm.width AS 'width'," +
                "rm.height AS 'height' , nd.X as 'X', nd.Y AS 'Y'  " +
                " FROM Rooms rm " +
                "INNER JOIN Nodes nd ON(rm.node = nd.nodeId) " +
                "WHERE rm.Name = ?;";
            tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};