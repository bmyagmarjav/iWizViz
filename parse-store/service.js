/* import */
const connect = require('./connect.js');
const structure = require('./structure.js');
const csv = require("fast-csv");
const Promise = require('promise');

/* path to file */
var PATH = 'geographic-mobility/',
    START = 2000,
    END = 2016;
/* call */
main();

//call each column of a csv table as a array ..
function pushMigrationFlow(i, fromRegion, year) {
    var ref = connect.getRef1.child(String(year)).child(fromRegion),
        file = "flows" + year,
        object = {};

    getColumn(i, year, file + ".csv").then(function(col) {
        object = getJSON(year, col, false);
        store(ref.child(getRegion(year, col)).child('Type1'), object);
    });

    getColumn(i, year, file + "-1.csv").then(function(col) {
        object = getJSON(year, col, true);
        store(ref.child(col[1]).child('Type2'), object);
    });
}

function pushReasonForMove(i, header, year) {
    var ref = connect.getRef2.child(String(year)).child(header),
        file = "reason" + year + ".csv",
        object = {};

    getColumn(i, year, file).then(function(col) {
        object = getJSON2(year, col);
        store(ref, object);
    });
}

/**
 * Parse: csv - calls each row based on index number
 */
function getColumn(index, year, file) {
    return new Promise(function (resolve, reject) {
        var rows = [];
        csv.fromPath(PATH + file)
            .on("error", function(error) {
                reject(error);
            })
            .on("data", function(data){
                rows.push(data[index]);
            })
            .on("end", function(){
                resolve(rows);
            });
    });
}

function getRegion(year, col) {
    if (year > 2006) {
        return col[5]
    }
    return col[1];
}

function getJSON(year, col, isTable2) {
    if (year > 2006 && !isTable2) {
        return structJSON1(col);
    }
    if (year < 2007 && !isTable2) {
        return structJSON2(col);
    }
    if (year > 2002 && isTable2) {
        return structJSON3(col);
    }
    return structJSON4(col);
}

//for 2007 to 2016
function structJSON1(col) {
    return structure.one(col[6],
        structure.sex(col[9], col[10]),
        structure.age(col[12], col[13], col[14], col[15], col[16],
            col[17], col[18], col[19], col[20], col[21]),
        structure.householder(col[33], col[34], col[35], col[36],
            col[37], col[38], col[39]),
        structure.edu(col[42], col[43], col[44], col[45], col[46], col[47]),
        structure.maritalStatus(col[49], col[50], col[51], col[52],
            col[53], col[54], col[55]),
        structure.nativity(col[57], col[58]),
        structure.tenure(col[62], col[63])
    );
}

//for 2000 to 2006
function structJSON2(col) {
    return structure.one(col[2],
        structure.sex(col[15], col[16]),
        structure.age(col[4], col[5], col[6], col[7], col[8],
            col[9], col[10], col[11], col[12], col[13]),
        structure.householder(col[18], col[19], col[21], col[22],
            col[23], col[24], col[20]),
        structure.edu(col[34], col[35], col[36], col[37], col[38], col[38]),
        structure.maritalStatus(col[26], col[27], col[28], col[29],
            col[30], col[31], col[32]),
        null,
        structure.tenure(col[41], col[42])
    );
}

function structJSON3(col) {
    return structure.two(
        col[2],
        structure.income(col[4], col[5], col[6], col[7],
            col[8], col[9], col[10], col[11], col[12]),
        structure.laborForce(
            col[14], col[15], col[16], col[17], null)
    );
}

function structJSON4(col) {
    return structure.two(
        col[2],
        structure.income(col[4], col[5], col[6], col[7],
            col[8], col[9], col[10], col[11], col[12]),
        structure.laborForce(
            col[15], col[16], null, col[17], col[14])
    );
}

function getJSON2(year, col) {
    if (year > 2006) {
        return structJSON5(col);
    }
    return structJSON6(col);
}

function structJSON5(col) {
    return structure.one(col[1],
        structure.sex(col[3], col[4]),
        structure.reasonAge(col[6], col[7], col[8], col[9],
            col[10], col[11], col[12], col[13]),
        structure.householder(col[25], col[26], col[27], col[28],
            col[29], col[30], col[31]),
        structure.edu(col[33], col[34], col[35], col[36], col[37], col[38]),
        structure.maritalStatus(col[40], col[41], col[42], col[43],
            col[44], col[45], col[46]),
        structure.nativity(col[48], col[49]),
        structure.tenure(col[53], col[54])
    );
}

function structJSON6(col) {
    return structure.one(col[1],
        structure.sex(col[3], col[4]),
        structure.reasonAge(col[6], col[7], col[8], col[9],
            col[10], col[11], col[12], col[13]),
        null,
        null,
        structure.maritalStatus(col[33], col[34], col[35], col[36],
            col[37], col[38], col[39]),
        null,
        structure.tenure(col[47], col[48])
    );
}

/**
 * Update: object based on reference
 */
function store(ref, object) {
    ref.update(object);
}

function main() {
    for (var year = START; year < END; year++) {
        for (var i = 1; i < 13; i++) {
            if (i > 0 && i < 4) {
                pushMigrationFlow(i, structure.from.Northeast, year);
            }
            if (i > 3 && i < 7) {
                pushMigrationFlow(i, structure.from.Midwest, year);
            }
            if (i > 6 && i < 10) {
                pushMigrationFlow(i, structure.from.South, year);
            }
            if (i > 9 && i < 13) {
                pushMigrationFlow(i, structure.from.West, year);
            }
        }
    }
    for (var year = START + 1; year < END; year++) {
        for (var i = 2; i < 19; i++) {
            pushReasonForMove(i, structure.reason[i - 2], year);
        }
    }
}
