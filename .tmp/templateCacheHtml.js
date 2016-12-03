angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/components/about/about.html","<div class=\"row\">\n  <div class=\"col-md-12\">\n    <div class=\"about card\">\n      <div class=\"logo-about animated slideInLeft\">\n        <img class=\"animated infinite bounce delayHalfs\" src=\"../../../img/logo.png\" alt=\"Smiley face\" height=\"120\" width=\"100\">\n      </div>\n      <h2 class=\"about-header animated slideInLeft\"> ABOUT THE PROJECT </h2>\n      <span>\n        Where are people in the US Moving?\n\n        People move every year but why do they move? Is there a specific demographic that is more likely to move? Is there some years that people move more? This website has several information visualizations showing the Migrations Patterns of People in the US by Region that will hopefully answer these questions and more .The next pages’ visualization dashboard will give a more detailed overview on how people are moving region to region, why they are moving, and the demographics of the people moving. We hope that after viewing it you a a clear idea on how people have been moving in the US for over decade.\n\n        The first page’s heat map shows projected population of 2016 to help give a general overview of the population centers in the US.\n\n        This page is about how people move from region to region. Feel free to change the year by clicking the timeline at the top. The map shows the amount of people entering a region. Click on a bubble to get more information.\n\n        The Sankey digram is filterable by demographic, and shows people leaving and entering a region.To filter by demographic select demographic from the selection box. Hover over a link to get more information.\n\n        The bar graph shows both people entering and leaving a region(It’s numbers are in the thousands).\n\n        Numbers are in the thousands\n\n        This page is about the reasons for why people move. The star plot shows each reason and the bubble plot allows filtering by demographic. Hovering over a dot will highlight the corresponding bubble or bubbles in the bubble plot and show the corresponding values. To filter by demographic select demographic from the selection box.\n\n        The star plot shows each reason where as the bubble chart also allows filtering by demographic data.\n        <div class=\"thank\">Thank You For Visiting Our Website!<div>\n      </div></div></span>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("app/components/flowmap/flowmap.html","<div class=\"col-md-5 push-left animated fadeInLeftBig\">\n  <h1 class=\"year-label\">{{$ctrl.service.sharedYear}}</h1>\n  <div class=\"flowmap card\">\n    <h5 class=\"graph-header\">Migration Flows Between Regions</h5>\n    <i class=\"fa fa-magic fa-lg graph-icon\" aria-hidden=\"true\">\n      <span class=\"tooltiptext\">\n        <b>Intsruction</b><br><br>\n        You can hover over each bubble which will show how many people migrated\n        between regions based on <b>census</b> data. You can also click on each\n        bubble to see more clear migration flows between regions. It will intearct\n        with the other graphs.\n      </span>\n    </i>\n  </div>\n</div>\n");
$templateCache.put("app/components/groupedbarchart/groupedbarchart.html","<div class=\"col-md-5 push-left animated fadeInUpBig\">\n  <div class=\"gbarchart card\">\n    <h5 class=\"graph-header\">Variation In Regional Flow</h5>\n    <i class=\"fa fa-magic fa-lg graph-icon\" aria-hidden=\"true\">\n      <span class=\"tooltiptext\">\n        <b>Intsruction</b><br><br>\n        You can hover over each bar which will show total number of people\n        <b>census</b> data. \n      </span>\n    </i>\n  </div>\n  <div style=\"visibility: hidden\">{{$ctrl.service.sharedYear}}</div>\n</div>\n");
$templateCache.put("app/components/heatmap/heatmap.html","<div class=\"row\">\n  <div class=\"col-md-12\">\n    <div class=\"home-head-title animated flipInX\">\n      Where These People Of United States Moving?\n    </div>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <div class=\"googlemap\" id=\"map\"></div>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <div class=\"home-head-title heatmap-detail animated flipInX\">\n      This heatmap shows projected population of 2016.\n    </div>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <div class=\"project-description\">\n      <p>\n        <b>Are you planning to move?</b><br><br>\n\n        We are happy to show you several information visualizations\n        showing the Migrations Patterns of People in the US by Region that will\n        hopefully answer you questions and more.<br> <br>\n\n        <em><b>Try our dashboard</b><em>\n      </em></em></p>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("app/components/ibubble/ibubble.html","<div class=\"col-md-6 push-left animated fadeInRightBig\">\n  <h1 class=\"year-label\">{{$ctrl.service.sharedYear}}</h1>\n  <div class=\"ibubble card\">\n    <h5 class=\"graph-header\">Reason For Moving by Demographic</h5>\n    <i class=\"fa fa-magic fa-lg graph-icon\" aria-hidden=\"true\">\n      <span class=\"tooltiptext\">\n         <b>Intsruction</b><br><br>\n         You can hover over each bubble which will show how many people moves\n         based census given survey reason. You can also choose your demograophic\n         to visualize more bubbles.\n      </span>\n    </i>\n    <form class=\"demogr-form\" name=\"bubble-form\">\n      <label class=\"demogr-label\" for=\"bubble-select\">SELECT</label>\n      <select class=\"demogr-select\" name=\"bubble-select\" id=\"bubble-select\" ng-options=\"option.name for option in data.availableOptions track by option.id\" ng-model=\"data.selectedOption\"></select>\n    </form>\n  </div>\n</div>\n\n<div class=\"col-md-3\">\n  <div class=\"bubble-panel card animated fadeInRightBig delay2s\">\n    <h5 class=\"graph-header\">Reasons</h5>\n    <div class=\"reason-label\" ng-repeat=\"(key, value) in model\">\n      <div class=\"row each\">\n        <div class=\"circle-identifier\" style=\"background: {{value}}\"></div>\n        <div class=\"re\">{{key}}</div>\n      </div>\n\n    </div>\n  </div>\n<div>\n</div></div>");
$templateCache.put("app/components/inavbar/inavbar.html","<nav class=\"navbar navbar-default navbar-fixed-top\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand animated swing\" href=\"#\">\n        <img alt=\"Brand\" src=\"../../../img/brandLogo.png\">\n      </a>\n      <p class=\"navbar-text\">i Wiz Viz</p>\n    </div>\n\n    <!-- <ul class=\"nav navbar-nav navbar-left\">\n      <li><a href=\"#menu-toggle\" id=\"menu-toggle\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i></a></li>\n      <li>\n        <form class=\"navbar-form navbar-left\" role=\"search\">\n          <div class=\"form-group\"> -->\n            <!-- <input type=\"text\" class=\"form-control\" placeholder=\"Search\"> -->\n            <!-- <div class=\"input-group\">\n              <span class=\"input-group-addon\" id=\"basic-addon1\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\n              <input type=\"text\" class=\"form-control\" placeholder=\"Search...\" aria-describedby=\"basic-addon1\">\n            </div>\n          </div>\n        </form>\n      </li>\n    </ul>\n  </div> -->\n</div></nav>\n");
$templateCache.put("app/components/iradioslider/iradioslider.html","<div class=\"row\">\n   <div class=\"col-md-9 push-left animated slideInDown\">\n      <div class=\"radios\">\n         <label ng-repeat=\"year in years\" for=\"options{{$index + 1}}\" ng-style=\"{{mystyle}}\">\n            <input type=\"radio\" ng-model=\"$ctrl.year\" ng-value=\"{{year}}\" ng-click=\"reload()\" id=\"options{{$index + 1}}\" name=\"options\">\n            <span>{{year}}</span>\n         </label>\n      </div>\n   </div>\n</div>\n");
$templateCache.put("app/components/isankey/isankey.html","<div class=\"col-md-4 animated fadeInRightBig\">\n  <div class=\"sankey-diagram card\">\n    <h5 class=\"graph-header\">By Demographic</h5>\n    <i class=\"fa fa-magic fa-lg graph-icon\" aria-hidden=\"true\">\n      <span class=\"tooltiptext\">\n         <b>Intsruction</b><br><br>\n         You can hover over each link which will show how many people migrated\n         between regions based on <b>census</b> data. You can also choose your\n         demograophic to see more information.\n      </span>\n    </i>\n    <form class=\"demogr-form\" name=\"sankey-form\">\n      <label class=\"demogr-label\" for=\"sankey-select\">SELECT</label>\n      <select class=\"demogr-select\" name=\"sankey-select\" id=\"sankey-select\" ng-options=\"option.name for option in data.availableOptions track by option.id\" ng-model=\"data.selectedOption\"></select>\n    </form>\n  </div>\n  <div style=\"visibility: hidden\">{{$ctrl.service.sharedYear}}</div>\n</div>\n");
$templateCache.put("app/components/table/table.html","<table class=\"table\">\n  <thead>\n    <tr class=\"top-row\">\n      <th class=\"wall\"><div class=\"hcol\"></div></th>\n      <th><div class=\"tcol\"></div></th>\n      <th><div class=\"tcol\">Midwest</div></th>\n      <th class=\"wall\"><div class=\"tcol\"></div></th>\n\n      <th><div class=\"tcol\"></div></th>\n      <th><div class=\"tcol\">Northeast</div></th>\n      <th class=\"wall\"><div class=\"tcol\"></div></th>\n\n      <th><div class=\"tcol\"></div></th>\n      <th><div class=\"tcol\">South</div></th>\n      <th class=\"wall\"><div class=\"tcol\"></div></th>\n\n      <th><div class=\"tcol\"></div></th>\n      <th><div class=\"tcol\">West</div></th>\n      <th><div class=\"tcol\"></div></th>\n    </tr>\n    <tr class=\"bottom-row\">\n      <th>{{$ctrl.service.sharedYear}}</th>\n\n      <th>NE</th>\n      <th>S</th>\n      <th>W</th>\n\n      <th>MW</th>\n      <th>S</th>\n      <th>W</th>\n\n      <th>MW</th>\n      <th>NE</th>\n      <th>W</th>\n\n      <th>MW</th>\n      <th>NE</th>\n      <th>S</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat=\"type in types\">\n      <td class=\"colhead\">{{type[0]}}</td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[1]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[2]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[3]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[4]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[5]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[6]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[7]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[8]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[9]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[10]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[11]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[12]}}</div></td>\n    </tr>\n  </tbody>\n</table>\n");
$templateCache.put("app/components/sidebar/isidebar.html","<!-- Sidebar -->\n<div class=\"isidebar-wrapper\">\n  <ul class=\"isidebar-list\">\n    <li>\n      <a ui-sref=\"home\" ui-sref-active=\"active\" class=\"active\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i>Home</a>\n    </li>\n    <li>\n      <a ui-sref=\"migration\" ui-sref-active=\"active\"><i class=\"fa fa-location-arrow\" aria-hidden=\"true\"></i>Migration</a>\n    </li>\n    <li>\n      <a ui-sref=\"reason\" ui-sref-active=\"active\"><i class=\"fa fa-star\" aria-hidden=\"true\"></i>Reason</a>\n    </li>\n    <li>\n      <a ui-sref=\"table\" ui-sref-active=\"active\"><i class=\"fa fa-table\" aria-hidden=\"true\"></i>Tables</a>\n    </li>\n    <li>\n      <a ui-sref=\"about\" ui-sref-active=\"active\"><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>About</a>\n    </li>\n  </ul>\n  <div class=\"line\"></div>\n  <div class=\"social text-center\">\n    <a href=\"https://www.facebook.com\"><i class=\"fa fa-facebook fa-lg\" aria-hidden=\"true\"></i></a>\n    <a href=\"https://www.twitter.com\"><i class=\"fa fa-twitter fa-lg\" aria-hidden=\"true\"></i></a>\n    <a href=\"https://www.gmail.com\"><i class=\"fa fa-envelope fa-lg\" aria-hidden=\"true\"></i></a>\n  </div>\n</div>\n");}]);