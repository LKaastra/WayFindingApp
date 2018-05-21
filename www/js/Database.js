/**
 * Created by Lucas Kaastra on 4/16/2017
 *
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + " (" + error.code + ") -- " + error.message);
}

function  successTransaction(){
    console.info("Success: Transaction is successful");
}

var DB ={
    createDataBase: function(){
        var shortName = "LKCBSchoolMap";
        var version = "";
        var displayname = "DataBase for Final";
        var size = 2 * 1024 * 1024;

        function createDbSuccess(){
            console.info("DataBase Created")
        }

        db = openDatabase(shortName, version, displayname, size, createDbSuccess)

    },
    createTables: function(){
        function txFunction(tx) {
            var option = [];

            //Drop Old Database Tables
            var sqlDropDirection = "DROP TABLE IF EXISTS Direction;";
            var sqlDropEdges = "DROP TABLE IF EXISTS Edges;";
            var sqlDropIntersection = "DROP TABLE IF EXISTS Intersections;";
            var sqlDropNodes = "DROP TABLE IF EXISTS Nodes;";
            var sqlDropRooms = "DROP TABLE IF EXISTS Rooms;";
            var sqlDropType = "DROP TABLE IF EXISTS Type;";

            //Create Tables
            var sqlDirection = "CREATE TABLE IF NOT EXISTS Direction (" +
                "directionCode varchar(2) NOT NULL PRIMARY KEY, " +
                "name varchar(25) NOT NULL);";
            var sqlEdges = "CREATE TABLE IF NOT EXISTS Edges (" +
                "'From' INTEGER NOT NULL, " +
                "'To' INTEGER NOT NULL, " +
                "Name varchar(25) NOT NULL, " +
                "Direction varchar(2) NOT NULL, " +
                "FOREIGN KEY(Direction) REFERENCES Direction(directionCode), " +
                "FOREIGN KEY('From') REFERENCES Nodes(nodeId), " +
                "FOREIGN KEY('To') REFERENCES Nodes(nodeId));";
            var sqlIntersections = "CREATE TABLE IF NOT EXISTS Intersections (" +
                "name varchar(25), " +
                "Description varchar(255), " +
                "node INTEGER NOT NULL, " +
                "FOREIGN KEY (node) REFERENCES Nodes(nodeId));";
            var sqlNodes = "CREATE TABLE IF NOT EXISTS Nodes (" +
                "nodeId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "Type varchar(2) NOT NULL," +
                "X FLOAT NOT NULL," +
                "Y FLOAT NOT NULL, " +
                "FOREIGN KEY(Type) REFERENCES Type(typeCode));";
            var sqlRooms = "CREATE TABLE IF NOT EXISTS Rooms (" +
                "Name varchar(25) NOT NULL, " +
                "isLab INTEGER NOT NULL, " +
                "isOpenLab INTEGER NOT NULL, " +
                "node INTEGER NOT NULL, " +
                "width INTEGER NOT NULL," +
                "height INTEGER NOT NULL," +
                "FOREIGN KEY(node) REFERENCES Nodes(nodeId));";
            var sqlType = "CREATE TABLE IF NOT EXISTS Type (" +
                "typeCode varchar(2) NOT NULL PRIMARY KEY," +
                "name varchar(25) NOT NULL," +
                "description varchar(255));";

            //Inserts Into Tables
            var sqlInsertType = "INSERT INTO Type(typeCode, name, description)" +
                "VALUES ('RM', 'Room', 'Rooms in the school')," +
                "('IN', 'Intersections', 'Intersections in hallways')" +
                ";";
            var sqlInsertDirection = "INSERT INTO Direction(directionCode, name)" +
                "VALUES ('W', 'West')," +
                "('E', 'East')," +
                "('N', 'North')," +
                "('S', 'South')" +
                ";";
            var sqlInsertIntersection = "INSERT INTO Intersections(name, Description, node)" +
                "VALUES " +
                " ('2A200@1', '1st intersection of 2A200', 79)," +
                " ('2A200@2', '2nd intersection of 2A200', 80)," +
                " ('2A200@3', '3rd intersection of 2A200', 81)," +
                " ('2A200@4', '4th intersection of 2A200', 82)," +
                " ('2A200@5', '5th intersection of 2A200', 83)," +
                " ('2A200@6', '6th intersection of 2A200', 84)," +
                " ('2A200@7', '7th intersection of 2A200', 85)," +
                " ('2A200@8', '8th intersection of 2A200', 86)," +
                " ('2A200@9', '9th intersection of 2A200', 87)," +
                " ('2A200@10', '10th intersection of 2A200', 88)," +
                " ('2A200@11', '11th intersection of 2A200', 89)," +
                " ('2A200@12', '12th intersection of 2A200', 90)," +
                " ('2A200@13', '13th intersection of 2A200', 91)," +
                " ('2A200@14', '14th intersection of 2A200', 92)," +
                " ('2A300@1', '1st intersection of 2A300', 93)," +
                " ('2A300@2', '2nd intersection of 2A300', 94)," +
                " ('2A300@3', '3rd intersection of 2A300', 95)," +
                " ('2A300@4', '4th intersection of 2A300', 96)," +
                " ('2A300@5', '5th intersection of 2A300', 97)," +
                " ('2A300@6', '6th intersection of 2A300', 98)," +
                " ('2A300@7', '7th intersection of 2A300', 99)," +
                " ('2A300@8', '8th intersection of 2A300', 100)," +
                " ('2A300@9', '9th intersection of 2A300', 101)," +
                " ('2A300@10', '10th intersection of 2A300', 102)," +
                " ('2A300@11', '11th intersection of 2A300', 103)," +
                " ('2A300@12', '12th intersection of 2A300', 104)," +
                " ('2A300@13', '13th intersection of 2A300', 105)," +
                " ('2A400@1', '1st intersection of 2A400', 106)," +
                " ('2A400@2', '2nd intersection of 2A400', 107)," +
                " ('2A400@3', '3rd intersection of 2A400', 108)," +
                " ('2A400@4', '4th intersection of 2A400', 109)," +
                " ('2A500@1', '1st intersection of 2A500', 110)," +
                " ('2A500@2', '2nd intersection of 2A500', 111)," +
                " ('2A500@3', '3rd intersection of 2A500', 112)," +
                " ('2A500@4', '4th intersection of 2A500', 113)," +
                " ('2A500@5', '5th intersection of 2A500', 114)," +
                " ('2A500@6', '6th intersection of 2A500', 115)," +
                " ('2A500@7', '7th intersection of 2A500', 116)," +
                " ('2A500@8', '8th intersection of 2A500', 117)," +
                " ('2A500@9', '9th intersection of 2A500', 118)," +
                " ('2A500@10', '10th intersection of 2A500', 119)," +
                " ('2A600@1', '1st intersection of 2A600', 120)," +
                " ('2A600@2', '2nd intersection of 2A600', 121)," +
                " ('2A600@3', '3rd intersection of 2A600', 122)," +
                " ('2A600@4', '4th intersection of 2A600', 123)," +
                " ('2A600@5', '5th intersection of 2A600', 124)," +
                " ('2A600@6', '6th intersection of 2A600', 125)," +
                " ('2A600@7', '7th intersection of 2A600', 126)," +
                " ('2A600@8', '8th intersection of 2A600', 127)," +
                " ('2A600@9', '9th intersection of 2A600', 128)," +
                " ('2A600@10', '10th intersection of 2A600', 129)," +
                " ('2A600@11', '11th intersection of 2A600', 130)," +
                " ('2ATOP@1', '1st intersection of 2ATOP', 131)," +
                " ('2ATOP@2', '2nd intersection of 2ATOP', 132)," +
                " ('2AD00R1@1', '1st intersection of 2ADOOR1', 133)," +
                " ('2AD00R1@2', '2nd intersection of 2ADOOR1', 134)," +
                " ('2AD00R1@3', '3rd intersection of 2ADOOR1', 135)," +
                " ('2AD00R1@4', '4th intersection of 2ADOOR1', 136)," +
                " ('2AD00R2@1', '1st intersection of 2ADOOR2', 137)," +
                " ('2AD00R2@2', '2nd intersection of 2ADOOR2', 138)," +
                " ('2AD00R2@3', '3rd intersection of 2ADOOR2', 139)," +
                " ('2AD00R2@4', '4th intersection of 2ADOOR2', 140)," +
                " ('2A100@1', '1st intersection of 2A100', 141)," +
                " ('2A100@2', '2nd intersection of 2A100', 142)," +
                " ('2A100@3', '3rd intersection of 2A100', 143)," +
                " ('2A100@4', '4th intersection of 2A100', 144)," +
                " ('2A100@5', '5th intersection of 2A100', 145)," +
                " ('2A100@6', '6th intersection of 2A100', 146)," +
                " ('2A100@7', '7th intersection of 2A100', 147)," +
                " ('2AMAIN@1', '1st Main Intersection', 148)," +
                " ('2AMAIN@2', '2nd Main Intersection', 149)," +
                " ('2AMAIN@3', '3rd Main Intersection', 150)," +
                " ('2AMAIN@4', '4th Main Intersection', 151)," +
                " ('2AMAIN@5', '5th Main Intersection', 152)," +
                " ('2AMAIN@6', '6th Main Intersection', 153)," +
                " ('2AMAIN@7', '7th Main Intersection', 154)," +
                " ('2AMAIN@8', '8th Main Intersection', 155)," +
                " ('2AMAIN@9', '9th Main Intersection', 156)," +
                " ('2AMAIN@10', '10th Main Intersection', 157)," +
                " ('2AMAIN@11', '11th Main Intersection', 158)," +
                " ('2AMAIN@12', '12th Main Intersection', 159)," +
                " ('2AMAIN@13', '13th Main Intersection', 160)," +
                " ('2AMAIN@14', '14th Main Intersection', 161)," +
                " ('2AMAIN@15', '15th Main Intersection', 162)," +
                " ('2AMAIN@16', '16th Main Intersection', 163)," +
                " ('2AMAIN@17', '17th Main Intersection', 164)," +
                " ('2AMAIN@18', '18th Main Intersection', 165)," +
                " ('2AMAIN@19', '19th Main Intersection', 166)," +
                " ('2AMAIN@20', '20th Main Intersection', 167)," +
                " ('2AMAIN@21', '21st Main Intersection', 168)," +
                " ('2AMAIN@22', '22nd Main Intersection', 169)" +
                ";";
            var sqlInsertNodes = "INSERT INTO Nodes(Type, X, Y)" +
                "VALUES " +
                "('RM', 262.5, 376)," +  //1
                "('RM', 262.5, 435)," +  //2
                "('RM', 292.5, 435)," +  //3
                "('RM', 322.5, 435)," +  //4
                "('RM', 351.5, 435)," +  //5
                "('RM', 351, 397)," +    //6
                "('RM', 375.5, 395)," +  //7
                "('RM', 133, 246)," +    //8
                "('RM', 83, 337)," +     //9
                "('RM', 83, 306)," +     //10
                "('RM', 83, 275)," +     //11
                "('RM', 83, 247)," +     //12
                "('RM', 83, 217)," +     //13
                "('RM', 83, 125)," +     //14
                "('RM', 83, 391)," +     //15
                "('RM', 83, 375)," +     //16
                "('RM', 133, 216)," +    //17
                "('RM', 133, 281)," +    //18
                "('RM', 133, 306)," +    //19
                "('RM', 133, 333)," +    //20
                "('RM', 133, 376)," +    //21
                "('RM', 133, 400)," +    //22
                "('RM', 133, 127)," +    //23
                "('RM', 83, 101)," +     //24
                "('RM', 83, 35)," +      //25
                "('RM', 118, 35)," +     //26
                "('RM', 206.5, 112)," +  //27
                "('RM', 237.5, 112)," +  //28
                "('RM', 205.5, 155)," +  //29
                "('RM', 237.5, 137)," +  //30
                "('RM', 206.5, 182)," +  //31
                "('RM', 237.5, 161)," +  //32
                "('RM', 171.5, 127)," +  //33
                "('RM', 237.5, 185)," +  //34
                "('RM', 173.5, 217)," +  //35
                "('RM', 222.5, 216)," +  //36
                "('RM', 173.5, 247)," +  //37
                "('RM', 173.5, 277)," +  //38
                "('RM', 173.5, 305)," +  //39
                "('RM', 222.5, 233)," +  //40
                "('RM', 173.5, 333)," +  //41
                "('RM', 222.5, 305)," +  //42
                "('RM', 173.5, 375)," +  //43
                "('RM', 222.5, 335)," +  //44
                "('RM', 173.5, 399)," +  //45
                "('RM', 222.5, 376)," +  //46
                "('RM', 272.5, 215.6)," +//47
                "('RM', 272.5, 239)," +//48
                "('RM', 272.5, 259.6)," +//49
                "('RM', 272.5, 280.6)," +//50
                "('RM', 272.5, 302.6)," +//51
                "('RM', 272.5, 334.6)," +//52
                "('RM', 262.5, 111.6)," +//53
                "('RM', 319.5, 215.6)," + //54
                "('RM', 319.5, 252.6)," + //55
                "('RM', 319.5, 287.6)," +//56
                "('RM', 304.5, 335)," +  //57
                "('RM', 350.5, 334.6)," +//58
                "('RM', 300.5, 375.6)," +//59
                "('RM', 350.5, 366.6)," +//60
                "('RM', 408.5, 164.6)," +//61
                "('RM', 387.5, 111.6)," +//62
                "('RM', 356.5, 216.6)," +//63
                "('RM', 399.5, 216.6)," +//64
                "('RM', 356.5, 252.6)," +//65
                "('RM', 399.5, 252.6)," +//66
                "('RM', 356.5, 287.6)," +//67
                "('RM', 399.5, 287.6)," +//68
                "('RM', 390.5, 333.6)," +//69
                "('RM', 390.5, 352.6)," +//70
                "('RM', 390.5, 373.6)," +//71
                "('RM', 416.5, 334)," +  //72
                "('RM', 390.5, 393.6)," +//73
                "('RM', 416.5, 366)," +  //74
                "('RM', 390.5, 403.6)," +//75
                "('RM', 416.5, 396)," +  //76
                "('RM', 416.5, 426)," +  //77
                "('RM', 402.5, 445)," + //78
                "('IN', 111, 64)," + //79 - 200 Hallway
                "('IN', 127.7, 64)," + //80 - 200 Hallway
                "('IN', 127.7, 104)," + //81 - 200 Hallway
                "('IN', 127.7, 135)," + //82 - 200 Hallway
                "('IN', 127.7, 188)," + //83 - 200 Hallway
                "('IN', 127.7, 227)," + //84 - 200 Hallway
                "('IN', 127.7, 252.5)," + //85 - 200 Hallway
                "('IN', 127.7, 284.4)," + //86 - 200 Hallway
                "('IN', 127.7, 311.6)," + //87 - 200 Hallway
                "('IN', 127.7, 326.6)," + //88 - 200 Hallway
                "('IN', 127.7, 341.6)," + //89 - 200 Hallway
                "('IN', 127.7, 355.6)," + //90 - 200 Hallway
                "('IN', 127.7, 383)," + //91 - 200 Hallway
                "('IN', 127.7, 415)," + //92 - 200 Hallway
                "('IN', 233.5, 129)," + //93 - 300 Hallway
                "('IN', 233.5, 147)," + //94 - 300 Hallway
                "('IN', 233.5, 161)," + //95 - 300 Hallway
                "('IN', 233.5, 194)," + //96 - 300 Hallway
                "('IN', 217, 225)," + //97 - 300 Hallway
                "('IN', 217, 244)," + //98 - 300 Hallway
                "('IN', 217, 255)," + //99 - 300 Hallway
                "('IN', 217, 280)," + //100 - 300 Hallway
                "('IN', 217, 290)," + //101 - 300 Hallway
                "('IN', 217, 322)," + //102 - 300 Hallway
                "('IN', 217, 347)," + //103 - 300 Hallway
                "('IN', 217, 382)," + //104 - 300 Hallway
                "('IN', 217, 415)," + //105 - 300 Hallway
                "('IN', 268, 228.5)," + //106 - 400 Hallway
                "('IN', 268, 256.5)," + //107 - 400 Hallway
                "('IN', 268, 277.5)," + //108 - 400 Hallway
                "('IN', 268, 299.5)," + //109 - 400 Hallway
                "('IN', 315, 224.6)," + //110 - 500 Hallway
                "('IN', 315, 247.6)," + //111 - 500 Hallway
                "('IN', 315, 256.6)," + //112 - 500 Hallway
                "('IN', 315, 284.6)," + //113 - 500 Hallway
                "('IN', 315, 294.6)," + //114 - 500 Hallway
                "('IN', 315, 313.6)," + //115 - 500 Hallway
                "('IN', 345.5, 339.6)," + //116 - 500 Hallway
                "('IN', 345.5, 358.6)," + //117 - 500 Hallway
                "('IN', 345.5, 383.6)," + //118 - 500 Hallway
                "('IN', 345.5, 411.6)," + //119 - 500 Hallway
                "('IN', 395, 221.6)," + //120 - 600 Hallway
                "('IN', 395, 246.6)," + //121 - 600 Hallway
                "('IN', 395, 258.6)," + //122 - 600 Hallway
                "('IN', 395, 281.6)," + //123 - 600 Hallway
                "('IN', 395, 294.6)," + //124 - 600 Hallway
                "('IN', 412.7, 345.6)," + //125 - 600 Hallway
                "('IN', 412.7, 364.6)," + //126 - 600 Hallway
                "('IN', 412.7, 375.6)," + //127 - 600 Hallway
                "('IN', 412.7, 401.6)," + //128 - 600 Hallway
                "('IN', 412.7, 415.6)," + //129 - 600 Hallway
                "('IN', 412.7, 433.6)," + //130 - 600 Hallway
                "('IN', 325.5, 109)," + //131 - Top Hallway
                "('IN', 392.5, 109.6)," + //132 - Top Hallway
                "('IN', 184.5, 211)," + //133 - Door 1 Hallway
                "('IN', 278, 211)," + //134 - Door 1 Hallway
                "('IN', 350, 211)," + //135 - Door 1 Hallway
                "('IN', 414.5, 207.5)," + //136 - Door 1 Hallway
                "('IN', 165.5, 370)," + //137 - Door 2 Hallway
                "('IN', 179.5, 370)," + //138 - Door 2 Hallway
                "('IN', 297.5, 370)," + //139 - Door 2 Hallway
                "('IN', 309.5, 370)," + //140 - Door 2 Hallway
                "('IN', 275.5, 430)," + //141 - 100 Hallway
                "('IN', 285.5, 430)," + //142 - 100 Hallway
                "('IN', 303.5, 430)," + //143 - 100 Hallway
                "('IN', 318.5, 430)," + //144 - 100 Hallway
                "('IN', 325.5, 430)," + //145 - 100 Hallway
                "('IN', 357.5, 430)," + //146 - 100 Hallway
                "('IN', 380.5, 430)," + //147 - 100 Hallway
                "('IN', 234.5, 108)," + //148 - Main Intersection 1
                "('IN', 127.7, 211)," + //149 - Main Intersection 2
                "('IN', 217, 211)," + //150 - Main Intersection 3
                "('IN', 233, 211)," + //151 - Main Intersection 4
                "('IN', 268, 211)," + //152 - Main Intersection 5
                "('IN', 315, 211)," + //153 - Main Intersection 6
                "('IN', 395, 211)," + //154 - Main Intersection 7
                "('IN', 268, 327)," + //155 - Main Intersection 8
                "('IN', 315, 327)," + //156 - Main Intersection 9
                "('IN', 346, 327)," + //157 - Main Intersection 10
                "('IN', 395, 327)," + //158 - Main Intersection 11
                "('IN', 413, 327)," + //159 - Main Intersection 12
                "('IN', 127.7, 370)," + //160 - Main Intersection 13
                "('IN', 217, 370)," + //161 - Main Intersection 14
                "('IN', 268, 370)," + //162 - Main Intersection 15
                "('IN', 346, 370)," + //163 - Main Intersection 16
                "('IN', 127.7, 430)," + //164 - Main Intersection 17
                "('IN', 217, 430)," + //165 - Main Intersection 18
                "('IN', 346, 430)," + //166 - Main Intersection 19
                "('IN', 396, 430)," + //167 - Main Intersection 20
                "('IN', 396, 443)," + //168 - Main Intersection 21
                "('IN', 413, 443)" + //169 - Main Intersection 22
                ";";
            var sqlInsertRoom = "INSERT INTO Rooms(Name, isLab, isOpenLab, node, width, height)" +
                "VALUES " +
                "('2A140', 1, 0, 1, 37, 49)," + //1
                "('2A141', 1, 0, 2, 30, 31)," + //2
                "('2A143', 1, 0, 3, 30, 31)," + //3
                "('2A145', 1, 0, 4, 30, 31)," + //4
                "('2A147', 1, 0, 5, 29, 31)," + //5
                "('2A148', 1, 1, 6, 24, 27)," + //6
                "('2A150', 0, 0, 7, 14, 29)," + //7
                "('2A211', 1, 0, 8, 39, 33)," + //8
                "('2A206', 1, 0, 9, 38, 28)," + //9
                "('2A208', 0, 0, 10, 38, 28)," + //10
                "('2A210', 0, 0, 11, 38, 28)," + //11
                "('2A212', 0, 0, 12, 38, 28)," + //12
                "('2A214', 0, 0, 13, 38, 28)," + //13
                "('2A216', 0, 0, 14, 39, 80)," + //14
                "('2A202', 1, 0, 15, 38, 31)," + //15
                "('2A204', 0, 0, 16, 38, 16)," + //16
                "('2A213', 1, 0, 17, 38, 28)," + //17
                "('2A209', 0, 0, 18, 38, 25.5)," + //18
                "('2A207', 1, 0, 19, 38, 28)," + //19
                "('2A205', 1, 0, 20, 38, 30)," + //20
                "('2A203', 1, 0, 21, 38, 23)," + //21
                "('2A201', 1, 0, 22, 38, 25)," + //22
                "('2A215', 0, 0, 23, 38, 80)," + //23
                "('2A220', 0, 0, 24, 34, 23)," + //24
                "('2A222', 0, 0, 25, 34, 24)," + //25
                "('2A224', 0, 0, 26, 38, 24)," + //26
                "('2A322', 0, 0, 27, 24, 41)," + //27
                "('2A321', 0, 0, 28, 25, 25)," + //28
                "('2A320', 0, 0, 29, 25, 29)," + //29
                "('2A319', 0, 0, 30, 25, 19)," + //30
                "('2A318', 0, 0, 31, 24, 25)," + //31
                "('2A317', 0, 0, 32, 25, 24)," + //32
                "('2A316', 0, 0, 33, 34, 80)," + //33
                "('2A315', 0, 0, 34, 25, 22)," + //34
                "('2A314', 1, 0, 35, 38, 29)," + //35
                "('2A313', 0, 0, 36, 40, 16)," + //36
                "('2A312', 0, 0, 37, 38, 29)," + //37
                "('2A310', 0, 0, 38, 38, 29)," + //38
                "('2A308', 1, 0, 39, 38, 28)," + //39
                "('2A307', 0, 0, 40, 40, 71)," + //40
                "('2A306', 1, 0, 41, 38, 30)," + //41
                "('2A305', 0, 0, 42, 40, 31)," + //42
                "('2A304', 1, 0, 43, 38, 24)," + //43
                "('2A303', 0, 0, 44, 40, 29)," + //44
                "('2A302', 1, 0, 45, 38, 25)," + //45
                "('2A301', 0, 0, 46, 40, 48)," + //46
                "('2A413', 0, 0, 47, 38, 22)," + //47
                "('2A411', 1, 1, 48, 38, 22)," + //48
                "('2A409', 1, 1, 49, 38, 22)," + //49
                "('2A407', 0, 0, 50, 38, 22)," + //50
                "('2A405', 0, 0, 51, 38, 21)," + //51
                "('2A403', 0, 0, 52, 32, 30)," + //52
                "('2A511', 0, 0, 53, 126, 95)," + //53
                "('2A509', 0, 0, 54, 36, 37)," + //54
                "('2A507', 0, 0, 55, 36, 36)," + //55
                "('2A505', 0, 0, 56, 36, 35)," +
                "('2A504', 0, 0, 57, 36, 30)," +
                "('2A503', 1, 0, 58, 40, 31)," +
                "('2A502', 0, 0, 59, 40, 49)," +
                "('2A501', 1, 1, 60, 40, 29)," +
                "('2A624', 1, 0, 61, 27, 38)," +
                "('2A623', 0, 0, 62, 48, 52)," +
                "('2A622', 0, 0, 63, 32, 36)," +
                "('2A621', 0, 0, 64, 36, 36)," +
                "('2A620', 0, 0, 65, 32, 35)," +
                "('2A619', 0, 0, 66, 36, 35)," +
                "('2A618', 0, 0, 67, 32, 24)," +
                "('2A617', 0, 0, 68, 36, 25)," +
                "('2A616', 0, 0, 69, 20, 20)," +
                "('2A614', 0, 0, 70, 20, 20)," +
                "('2A612', 0, 0, 71, 20, 20)," +
                "('2A609', 0, 0, 72, 20, 32)," +
                "('2A608', 0, 0, 73, 20, 10)," +
                "('2A607', 0, 0, 74, 20, 30)," +
                "('2A606', 0, 0, 75, 20, 20)," +
                "('2A605', 0, 0, 76, 20, 30)," +
                "('2A603', 0, 0, 77, 20, 20)," +
                "('2A601', 0, 0, 78, 34, 20)" +
                ";";
            var sqlInsertEdges = "INSERT INTO Edges('From', 'To', Name, Direction)" +
                "VALUES " +
                "(25, 79, '2A222', 'S')," +
                "(79, 80, '2A200 hallway', 'E')," +
                "(80, 26, '2A224', 'N')," +
                "(80, 81, '2A200 hallway', 'S')," +
                "(81, 24, '2A220', 'W')," +
                "(81, 148, 'Shipping and Receiving', 'E')," +
                "(81, 82, '2A200 hallway', 'S')," +
                "(82, 14, '2A216', 'W')," +
                "(82, 23, '2A216', 'E')," +
                "(82, 83, '2A200 hallway', 'S')," +
                "(83, 14, '2A216', 'W')," +
                "(83, 23, '2A215', 'E')," +
                "(83, 149, '2A200 hallway intersection', 'S')," +
                "(149, 84, '2A300 hallway intersection', 'S')," +
                "(149, 133, '2A300 hallway intersection', 'E')," +
                "(84, 13, '2A214', 'W')," +
                "(84, 17, '2A213', 'E')," +
                "(84, 85, '2A200 hallway', 'S')," +
                "(85, 12, '2A212', 'W')," +
                "(85, 8, '2A211', 'E')," +
                "(85, 86, '2A200 hallway', 'S')," +
                "(86, 11, '2A210', 'W')," +
                "(86, 18, '2A209', 'E')," +
                "(86, 87, '2A200 hallway', 'S')," +
                "(87, 10, '2A208', 'W')," +
                "(87, 19, '2A207', 'E')," +
                "(87, 88, '2A200 hallway', 'S')," +
                "(88, 10, '2A208', 'W')," +
                "(88, 19, '2A207', 'E')," +
                "(88, 89, '2A200 hallway', 'S')," +
                "(89, 9, '2A206', 'W')," +
                "(89, 20, '2A205', 'E')," +
                "(89, 90, '2A200 hallway', 'S')," +
                "(90, 9, '2A206', 'W')," +
                "(90, 20, '2A205', 'E')," +
                "(90, 160, '400 hallway intersection', 'S')," +
                "(160, 137, '2A200 hallway intersection', 'E')," +
                "(160, 91, '2A200 hallway intersection', 'S')," +
                "(91, 16, '2A204', 'W')," +
                "(91, 21, '2A203', 'E')," +
                "(91, 92, '2A200 hallway', 'S')," +
                "(92, 15, '2A202', 'W')," +
                "(92, 86, '2A201', 'E')," +
                "(92, 164, '2A200 hallway', 'S')," +
                "(164, 165, '2A100 hallway intersection', 'E')," +
                "(133, 33, '2A316', 'N')," +
                "(133, 35, '2A314', 'S')," +
                "(133, 150, '2a200 hallway intersection', 'E')," +
                "(148, 131, '2A300 hallway intersection', 'E')," +
                "(148, 93, '2A300 hallway intersection', 'S')," +
                "(93, 27, '2A322', 'W')," +
                "(93, 28, '2A321', 'E')," +
                "(93, 94, '2A300 hallway', 'S')," +
                "(94, 27, '2A322', 'W')," +
                "(94, 30, '2A322', 'E')," +
                "(94, 95, '2A300 hallway', 'S')," +
                "(95, 29, '2A320', 'W')," +
                "(95, 32, '2A317', 'E')," +
                "(95, 96, '2A300 hallway', 'S')," +
                "(96, 31, '2A318', 'W')," +
                "(96, 34, '2A315', 'E')," +
                "(96, 151, '2A300 hallway intersection', 'S')," +
                "(151, 150, '2A300 hallway intersection', 'W')," +
                "(151, 152, '2A300 hallway intersection', 'E')," +
                "(150, 97, '2A300 hallway intersection', 'S')," +
                "(97, 35, '2A314', 'W')," +
                "(97, 36, '2A313', 'E')," +
                "(97, 98, '2A300 hallway', 'S')," +
                "(98, 35, '2A314', 'W')," +
                "(98, 99, '2A300 hallway', 'S')," +
                "(99, 37, '2A312', 'W')," +
                "(99, 40, '2A307', 'E')," +
                "(99, 100, '2A300 hallway', 'S')," +
                "(100, 38, '2A310', 'W')," +
                "(100, 101, '2A300 hallway', 'S')," +
                "(101, 40, '2A307', 'E')," +
                "(101, 102, '2A300 hallway', 'S')," +
                "(102, 39, '2A308', 'W')," +
                "(102, 42, '2A305', 'E')," +
                "(102, 103, '2A300 hallway', 'S')," +
                "(103, 41, '2A306', 'W')," +
                "(103, 44, '2A303', 'E')," +
                "(103, 161, '2A300 hallway intersection', 'S')," +
                "(161, 138, '2A200 hallway intersection', 'W')," +
                "(161, 162, '2A300 hallway intersection', 'E')," +
                "(138, 41, '2A306', 'N')," +
                "(138, 137, 'Outside', 'W')," +
                "(137, 20, '2A205', 'N')," +
                "(161, 104, '2A300 hallway intersection', 'S')," +
                "(104, 43, '2A304', 'W')," +
                "(104, 46, '2A301', 'E')," +
                "(104, 105, '2A300 hallway', 'S')," +
                "(105, 45, '2A302', 'W')," +
                "(105, 46, '2A301', 'E')," +
                "(105, 165, '2A300 hallway intersection', 'S')," +
                "(165, 141, '2A100 hallway intersection', 'E')," +
                "(152, 134, '2A300 hallway intersection', 'E')," +
                "(152, 106, '2A400 hallway intersection', 'S')," +
                "(106, 47, '2A413', 'E')," +
                "(106, 107, '2A400 hallway', 'S')," +
                "(107, 48, '2A411', 'E')," +
                "(107, 108, '2A400 hallway', 'S')," +
                "(108, 49, '2A409', 'E')," +
                "(108, 109, '2A400 hallway', 'S')," +
                "(109, 50, '2A407', 'E')," +
                "(109, 51, '2A405', 'E')," +
                "(109, 155, '2A400 hallway intersection', 'S')," +
                "(155, 156, '2A400 hallway intersection', 'E')," +
                "(155, 162, '2A400 hallway intersection', 'S')," +
                "(162, 1, '2A140', 'S')," +
                "(162, 139, '2A400 hallway intersection', 'E')," +
                "(139, 52, '2A403', 'N')," +
                "(139, 140, '2ADOOR2@3 To 2ADOOR2@4', 'E')," +
                "(140, 57, '2A504', 'N')," +
                "(140, 59, '2A502', 'S')," +
                "(140, 163, '2A500 hallway intersection', 'E')," +
                "(131, 53, '2A511', 'S')," +
                "(131, 132, '2ATOP@1 To 2ATOP@2', 'E')," +
                "(132, 62, '2A623', 'S')," +
                "(134, 153, '2A500 hallway intersection', 'E')," +
                "(134, 53, '2A511', 'N')," +
                "(153, 53, '2A511', 'N')," +
                "(153, 135, '2A500 hallway intersection', 'E')," +
                "(153, 110, '2A500 hallway intersection', 'S')," +
                "(110, 54, '2A509', 'E')," +
                "(110, 111, '2A500 hallway', 'S')," +
                "(111, 54, '2A509', 'E')," +
                "(111, 112, '2A500 hallway', 'S')," +
                "(112, 55, '2A507', 'E')," +
                "(112, 113, '2A500 hallway', 'S')," +
                "(113, 55, '2A507', 'E')," +
                "(113, 114, '2A500 hallway', 'S')," +
                "(114, 56, '2A505', 'E')," +
                "(114, 115, '2A500 hallway', 'S')," +
                "(115, 56, '2A505', 'E')," +
                "(115, 156, '2A500 hallway intersection', 'S')," +
                "(156, 157, '2A500 hallway intersection', 'E')," +
                "(157, 158, '2A600 hallway intersection', 'E')," +
                "(157, 116, '2A500 hallway intersection', 'S')," +
                "(116, 57, '2A504', 'W')," +
                "(116, 58, '2A503', 'E')," +
                "(116, 117, '2A500@8', 'S')," +
                "(117, 58, '2A503', 'E')," +
                "(117, 163, '2A500 hallway intersection', 'S')," +
                "(163, 60, '2A501', 'E')," +
                "(163, 118, '2A500 hallway intersection', 'S')," +
                "(118, 59, '2A502', 'W')," +
                "(118, 119, '2A500 hallway', 'S')," +
                "(119, 59, '2A502', 'W')," +
                "(119, 166, '2A500 hallway interesction', 'S')," +
                "(166, 146, '2A100 hallway intersection', 'E')," +
                "(166, 145, '2A100 hallway intersection', 'W')," +
                "(145, 4, '2A145', 'S')," +
                "(145, 144, '2A100 hallway', 'W')," +
                "(144, 3, '2A143', 'S')," +
                "(144, 143, '2A100 hallway', 'W')," +
                "(143, 3, '2A143', 'S')," +
                "(143, 59, '2A502', 'N')," +
                "(143, 142, '2A100 hallway', 'W')," +
                "(142, 1, '2A140', 'N')," +
                "(142, 2, '2A141', 'S')," +
                "(142, 141, '2A100 hallway', 'W')," +
                "(141, 1, '2A140', 'N')," +
                "(146, 6, '2A148', 'N')," +
                "(146, 5, '2A147', 'S')," +
                "(146, 147, '2A100 hallway', 'E')," +
                "(147, 7, '2A150', 'N')," +
                "(147, 167, '2A100 hallway intersection', 'E')," +
                "(167, 168, '2A600 hallway intersection', 'S')," +
                "(168, 169, '2a600 hallway intersection', 'E')," +
                "(169, 130, '2a600 hallway intersection', 'N')," +
                "(169, 78, '2A601', 'S')," +
                "(130, 77, '2A603', 'E')," +
                "(130, 129, '2A600 hallway', 'N')," +
                "(129, 75, '2A606', 'W')," +
                "(129, 76, '2A605', 'E')," +
                "(129, 128, '2A600 hallway', 'N')," +
                "(128, 76, '2A605', 'E')," +
                "(128, 73, '2A608', 'W')," +
                "(128, 127, '2A600 hallway', 'N')," +
                "(127, 71, '2A612', 'W')," +
                "(127, 74, '2A607', 'E')," +
                "(127, 126, '2A600 hallway', 'N')," +
                "(126, 70, '2A614', 'W')," +
                "(126, 125, '2A600 hallway', 'N')," +
                "(125, 69, '2A616', 'W')," +
                "(125, 72, '2A609', 'E')," +
                "(125, 159, '2A600 hallway intersection', 'N')," +
                "(159, 158, '2A600 hallway intersection', 'W')," +
                "(158, 124, '2A600 hallway intersection', 'N')," +
                "(124, 67, '2A618', 'W')," +
                "(124, 68, '2A617', 'E')," +
                "(124, 123, '2A600 hallway', 'N')," +
                "(123, 65, '2A620', 'W')," +
                "(123, 66, '2A619', 'E')," +
                "(123, 122, '2A600 hallway', 'N')," +
                "(122, 65, '2A620', 'W')," +
                "(122, 66, '2A619', 'E')," +
                "(122, 121, '2A600 hallway', 'N')," +
                "(121, 63, '2A622', 'W')," +
                "(121, 64, '2A621', 'E')," +
                "(121, 120, '2A600@1', 'N')," +
                "(120, 63, '2A622', 'N')," +
                "(120, 64, '2A621', 'E')," +
                "(120, 154, '2A600 hallway intersection', 'N')," +
                "(154, 136, '2A600 hallway intersection', 'E')," +
                "(154, 135, '2A600 hallway intersection', 'W')," +
                "(136, 61, '2A624', 'N')," +
                "(135, 53, '2A511', 'N')" +
                ";";

            //Execute Drop old Database Tables
            tx.executeSql(sqlDropDirection, option, successTransaction,errorHandler);
            tx.executeSql(sqlDropEdges, option, successTransaction,errorHandler);
            tx.executeSql(sqlDropIntersection, option, successTransaction,errorHandler);
            tx.executeSql(sqlDropNodes, option, successTransaction,errorHandler);
            tx.executeSql(sqlDropRooms, option, successTransaction,errorHandler);
            tx.executeSql(sqlDropType, option, successTransaction,errorHandler);


            //Create Database Tables
            tx.executeSql(sqlDirection, option, successTransaction,errorHandler);
            tx.executeSql(sqlType, option, successTransaction,errorHandler);
            tx.executeSql(sqlNodes, option, successTransaction,errorHandler);
            tx.executeSql(sqlEdges, option, successTransaction,errorHandler);
            tx.executeSql(sqlIntersections, option, successTransaction,errorHandler);
            tx.executeSql(sqlRooms, option, successTransaction,errorHandler);



            //Insert Into Database Tables
            tx.executeSql(sqlInsertType, option, successTransaction,errorHandler);
            tx.executeSql(sqlInsertDirection, option, successTransaction,errorHandler);
            tx.executeSql(sqlInsertNodes, option, successTransaction,errorHandler);
            tx.executeSql(sqlInsertIntersection, option, successTransaction,errorHandler);
            tx.executeSql(sqlInsertRoom, option, successTransaction,errorHandler);
            tx.executeSql(sqlInsertEdges, option, successTransaction,errorHandler);

        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};