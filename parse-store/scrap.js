'use strict'

const request = require('request');
const cheerio = require('cheerio');
const download = require('download');

const urls = [
    'http://www.census.gov/data/tables/2015/demo/geographic-mobility/cps-2015.html', 
    'http://www.census.gov/data/tables/2014/demo/geographic-mobility/cps-2014.html',
    'http://www.census.gov/data/tables/2013/demo/geographic-mobility/p20-574.html',
    'http://www.census.gov/data/tables/2012/demo/geographic-mobility/cps-2012.html',
    'http://www.census.gov/data/tables/2011/demo/geographic-mobility/cps-2011.html',
    'http://www.census.gov/data/tables/2010/demo/geographic-mobility/cps-2010.html',
    'http://www.census.gov/data/tables/2009/demo/geographic-mobility/p20-565.html',
    'http://www.census.gov/data/tables/2008/demo/geographic-mobility/cps-2008.html',
    'http://www.census.gov/data/tables/2007/demo/geographic-mobility/cps-2007.html',
    'http://www.census.gov/data/tables/2006/demo/geographic-mobility/cps-2006.html',
    'http://www.census.gov/data/tables/2005/demo/geographic-mobility/cps-2005.html',
    'http://www.census.gov/data/tables/2004/demo/geographic-mobility/cps-2004.html',
    'http://www.census.gov/data/tables/2003/demo/geographic-mobility/p20-549.html',
    'http://www.census.gov/data/tables/2002/demo/geographic-mobility/cps-2002.html',
    'http://www.census.gov/data/tables/2001/demo/geographic-mobility/cps-2001.html',
    'http://www.census.gov/data/tables/2000/demo/geographic-mobility/p20-538.html'
];

const FOLDER_NAME = 'geographic-mobility';



// urls.forEach(function(url) {
//     var year = url.substring(34,38);

//     request(url, function(error, response, html){
//         if (!error) {
//             var $ = cheerio.load(html);

//      		// console.log(html);

//             $('a').each(function() {
//                 var a = $(this);
//                 var link = String(a.attr('href'));




//                 var ftrack = a.attr('filetrack');

//                 // console.log(ftrack);

//                 if (ftrack != null) {
//                 	var sftrack = String(a.attr('filetrack'));
//                 	// console.log(sftrack);
                	
//                 	// console.log(sftrack);
//                 	// console.log(sftrack.match(/Reason for Move by Personal Characteristics/gi));
                	
//                 	// find all xls
// 		            if (link.match( /\b.xls\b/) != null
// 		            	&& sftrack.match(/Migration Flows Between Regions/gi) != null) {
// 		            	// ||  sftrack.match(/Reason for Move/gi) != null)) {
		                        
// 		                console.log(link);

// 		                    download('http:' + link, FOLDER_NAME + '/' + year).then(() => {
// 		                        console.log('done!');
// 		                    });
// 		            }
//                 }
                
                
                
//             })           
//         }        
//     })      
// })


