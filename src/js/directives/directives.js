/*global TweenMax:false */

angular.module(_APP_).directive('rkAccordeon', [function () {
    
    'use strict';
    
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment
        link: function ($scope, element, attrs) { 

            var children = element.children();
            var header   = children[0];
            var content  = children[1];
            var arrow    = angular.element(header).find('img')[0];     
            var collapse = TweenMax.to(content, 0.5, {height:0, paused:true, reversed:true});
            var rotate   = TweenMax.to(arrow, 0.5, {rotation:'180_cw', paused:true, reversed:true});
            
            $scope.open = attrs.open && attrs.open === 'true';
            if(!$scope.open) {
                toggle();
            }
            
            function toggle(){
                if (collapse.reversed()) {
                    collapse.play();
                    rotate.play();
                } else {
                    collapse.reverse();
                    rotate.reverse();
                }  
            }
            
            angular.element(header).bind('click', function(evt) {
                toggle();
                evt.stopPropagation();
            });

        }
      };
  }]);