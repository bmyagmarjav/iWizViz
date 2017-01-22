var exports = module.exports = {};

exports.from = {
    Northeast : 'From Northeast',
    Midwest : 'From Midwest',
    South : 'From South',
    West : 'From West'
}

exports.reason = [
    'Change in marital status',
    'To establish own household',
    'Other family reason',
    'New job or job transfer',
    'To look for work or lost job',
    'To be closer to work or easier commute',
    'Retired',
    'Other job related reason',
    'Wanted own home',
    'Wanted new or better home - apartment',
    'Wanted better neighborhood - less crime',
    'Wanted cheaper housing',
    'Other housing reason',
    'To attend or leave college',
    'Change of climate',
    'Health reasons',
    'Other reasons'
]

/* start */
exports.one = function(to, s, a, r, e, m, n, t) {
    return {
        'Total' : to,
        'Sex' : s,
        'Age' : a,
        'Relationship to House' : r,
        'Educational Attainment' : e,
        'Marital Status' : m,
        'Nativity' : n,
        'Tenure' : t
    }
}

exports.sex = function(m, f) {
    return {
        "Male" : m,
        "Female" : f
    }
}

exports.age = function(a, b, c, d, e, f, g, h, i, j) {
    return {
        "1 to 4" : a,
        "5 to 9" : b,
        "10 to 14" : c,
        "15 to 19" : d,
        "20 to 24" : e,
        "25 to 29" : f,
        "30 to 44" : g,
        "45 to 64" : h,
        "65 to 74" : i,
        "75+" : j
    }
}

exports.householder = function(a, b, c, d, e, f, g) {
    return {
        "Householder - spouse present": a,
        "Other family householder": b,
        "Spouse of householder": c,
        "Child of householder": d,
        "Other relative of householder": e,
        "Nonrelative of householder": f,
        "Nonfamily householder": g
    }
}

exports.edu = function(a, b, c, d, e, f) {
    return {
        "Not a high school graduate" : a,
        "High school graduate" : b,
        "Some college or AA degree" : c,
        "Bachelor Degree" : d,
        "Prof or graduate degree" : e,
        "Person age 1 to 24" : f
    }
}

exports.maritalStatus = function(a, b, c, d, e, f, h) {
    return {
        "Married - spouse present" : a,
        "Married - spouse absent" : b,
        "Widowed" : c,
        "Divorced" : d,
        "Separated" : e,
        "Never married" : f,
        "Persons age 1 to 14" : h
    }
}

exports.nativity = function(a, b) {
    return {
        "Native" : a,
        "Foreign born" : b
    }
}

exports.tenure = function(a, b) {
    return {
        "In an owner-occupied housing unit" : a,
        "In a renter-occupied housing unit" : b
    }
}
/* end */

/* start */
exports.two = function(t, i, l) {
    return {
        "Total" : t,
        "Income" : i,
        "Labor force status" : l
    }
}

exports.income = function(a, b, c, d, e, f, g, h, i) {
    return {
        "Without Income" : a,
        "Under 10000 or loss" : b,
        "10000 to 19999" : c,
        "20000 to 29999" : d,
        "30000 to 39999" : e,
        "40000 to 49999" : f,
        "50000 to 59999" : g,
        "60000 to 74999" : h,
        "75000 and over" : i
    }
}

exports.laborForce = function(a, b, c, d, e) {
    return {
        "Employed" : a,
        "Unemployed" : b,
        "Armed Forces" : c,
        "Not in labor force" : d,
        "NIU - Under 16 years old" : e
    }
}

/* start */
exports.reasonAge = function(a, b, c, d, e, f, g, h) {
    return {
        'Under 16 years' : a,
        '16 to 19 years' : b,
        '20 to 24 years' : c,
        '25 to 29 years' : d,
        '30 to 44 years' : e,
        '45 to 64 years' : f,
        '65 to 74 years' : g,
        '75+ years' : h
    }
}
