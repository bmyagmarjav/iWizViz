angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/components/about/about.html","<div class=\"component\">\n  <h2>{{$ctrl.text}}</h2>\n</div>");
$templateCache.put("app/components/flowmap/flowmap.html","<div class=\"col-md-5 push-left animated slideInUp\">\n  <h1 class=\"year-label\">{{$ctrl.service.sharedYear}}</h1>\n  <div class=\"flowmap card\">\n    <h5 class=\"graph-header\">Migration Flow</h5>\n    <i class=\"fa fa-magic fa-lg graph-icon\" aria-hidden=\"true\"></i>\n  </div>\n</div>\n");
$templateCache.put("app/components/heatmap/heatmap.html","<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"googlemap\" id=\"map\"></div>\n    </div>\n</div>\n");
$templateCache.put("app/components/inavbar/inavbar.html","<nav class=\"navbar navbar-default navbar-fixed-top\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand animated swing\" href=\"#\">\n        <img alt=\"Brand\" src=\"../../../img/brandLogo.png\">\n      </a>\n      <p class=\"navbar-text\">i Wiz Viz</p>\n    </div>\n\n    <!-- <ul class=\"nav navbar-nav navbar-left\">\n      <li><a href=\"#menu-toggle\" id=\"menu-toggle\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i></a></li>\n      <li>\n        <form class=\"navbar-form navbar-left\" role=\"search\">\n          <div class=\"form-group\"> -->\n            <!-- <input type=\"text\" class=\"form-control\" placeholder=\"Search\"> -->\n            <!-- <div class=\"input-group\">\n              <span class=\"input-group-addon\" id=\"basic-addon1\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\n              <input type=\"text\" class=\"form-control\" placeholder=\"Search...\" aria-describedby=\"basic-addon1\">\n            </div>\n          </div>\n        </form>\n      </li>\n    </ul>\n  </div> -->\n</div></nav>\n");
$templateCache.put("app/components/iradioslider/iradioslider.html","<div class=\"row\">\n   <div class=\"col-md-9 push-left animated slideInDown\">\n      <div class=\"radios\">\n         <label ng-repeat=\"year in years\" for=\"options{{$index + 1}}\" ng-style=\"{{mystyle}}\">\n            <input type=\"radio\" ng-model=\"$ctrl.year\" ng-value=\"{{year}}\" ng-click=\"reload()\" id=\"options{{$index + 1}}\" name=\"options\">\n            <span>{{year}}</span>\n         </label>\n      </div>\n   </div>\n</div>\n");
$templateCache.put("app/components/isankey/isankey.html","<div class=\"col-md-4 animated slideInUp\">\n  <div class=\"sankey-diagram card\">\n    <h5 class=\"graph-header\">Demographic</h5>\n    <i class=\"fa fa-magic fa-lg graph-icon\" aria-hidden=\"true\"></i>\n  </div>\n</div>\n");
$templateCache.put("app/components/sidebar/isidebar.html","<!-- Sidebar -->\n<div class=\"isidebar-wrapper\">\n  <ul class=\"isidebar-list\">\n    <li>\n      <a ui-sref=\"home\" ui-sref-active=\"active\" class=\"active\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i>Home</a>\n    </li>\n    <li>\n      <a ui-sref=\"migration\" ui-sref-active=\"active\"><i class=\"fa fa-location-arrow\" aria-hidden=\"true\"></i>Migration</a>\n    </li>\n    <li>\n      <a ui-sref=\"reason\" ui-sref-active=\"active\"><i class=\"fa fa-star\" aria-hidden=\"true\"></i>Reason</a>\n    </li>\n    <li>\n      <a ui-sref=\"table\" ui-sref-active=\"active\"><i class=\"fa fa-table\" aria-hidden=\"true\"></i>Tables</a>\n    </li>\n    <li>\n      <a ui-sref=\"about\" ui-sref-active=\"active\"><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>About</a>\n    </li>\n  </ul>\n  <div class=\"line\"></div>\n  <div class=\"social text-center\">\n    <a href=\"https://www.facebook.com\"><i class=\"fa fa-facebook fa-lg\" aria-hidden=\"true\"></i></a>\n    <a href=\"https://www.twitter.com\"><i class=\"fa fa-twitter fa-lg\" aria-hidden=\"true\"></i></a>\n    <a href=\"https://www.gmail.com\"><i class=\"fa fa-envelope fa-lg\" aria-hidden=\"true\"></i></a>\n  </div>\n</div>\n");
$templateCache.put("app/components/starplot/starplat.html","<div class=\"starplot card\">\n    <h5 class=\"graph-header\">Reasons for moving</h5>\n</div>\n");
$templateCache.put("app/components/table/table.html","<table class=\"table\">\n  <thead>\n    <tr class=\"top-row\">\n      <th class=\"wall\"><div class=\"hcol\"></div></th>\n      <th><div class=\"tcol\"></div></th>\n      <th><div class=\"tcol\">Midwest</div></th>\n      <th class=\"wall\"><div class=\"tcol\"></div></th>\n\n      <th><div class=\"tcol\"></div></th>\n      <th><div class=\"tcol\">Northeast</div></th>\n      <th class=\"wall\"><div class=\"tcol\"></div></th>\n\n      <th><div class=\"tcol\"></div></th>\n      <th><div class=\"tcol\">South</div></th>\n      <th class=\"wall\"><div class=\"tcol\"></div></th>\n\n      <th><div class=\"tcol\"></div></th>\n      <th><div class=\"tcol\">West</div></th>\n      <th><div class=\"tcol\"></div></th>\n    </tr>\n    <tr class=\"bottom-row\">\n      <th>{{$ctrl.service.sharedYear}}</th>\n\n      <th>NE</th>\n      <th>S</th>\n      <th>W</th>\n\n      <th>MW</th>\n      <th>S</th>\n      <th>W</th>\n\n      <th>MW</th>\n      <th>NE</th>\n      <th>W</th>\n\n      <th>MW</th>\n      <th>NE</th>\n      <th>S</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat=\"type in types\">\n      <td class=\"colhead\">{{type[0]}}</td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[1]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[2]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[3]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[4]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[5]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[6]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[7]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[8]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[9]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[10]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[11]}}</div></td>\n      <td class=\"wall\"><div class=\"tcol\">{{type[12]}}</div></td>\n    </tr>\n  </tbody>\n</table>\n");}]);