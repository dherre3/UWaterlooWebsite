'use strict';

/**
 * @ngdoc function
 * @name newSiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newSiteApp
 */
angular.module('newSiteApp')
  .controller('MainCtrl', function ($scope, $mdDialog, $mdMedia, $timeout, $filter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var ref = firebase.database().ref('Website/Updates').orderByChild('Date').limitToLast(10);
    console.log(ref);
    ref.once('value',function(snapshot){
      console.log(snapshot.val());
      if(snapshot.exists())
      {
        $timeout(function()
        {
          $scope.todos = snapshot.val();
          setDateUpdates($scope.todos);
        });
        
      }
    });
    function setDateUpdates(firebaseArray)
    {
      $scope.updateArray = [];
      for (var i in firebaseArray) {
        $scope.updateArray.push(firebaseArray[i]);
      }

    }
    
      $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogController',
      templateUrl: 'views/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
     $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  });
  angular.module('newSiteApp').filter('FormatDate',function()
  {
    return function(str) {
      
      if(typeof str==='string'){
        var a = str.split(/[^0-9]/);
        var d=new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] );
        console.log(d);
      return d;

      }
    };
  });
   angular.module('newSiteApp').filter('DateUpdate',function($filter)
  {
    return function(str) {
       var message = '';
       if(str){
             str =new Date(str);

             var dateUpdate=str;
             var temp = Math.floor((new Date() - dateUpdate) / (1000));
            var  message = temp + ' sec';
         if(temp>59){
             temp=Math.floor(temp/60);
             message = temp + ' min';
             if (temp > 60) {
                 temp = Math.floor(temp / 60);
                 message = temp + ' hours';
                 if (temp > 24) {
                     temp = Math.floor(temp / 24);
                     message = temp + ' days';
                     if(temp>30){
                         message=$filter('date')(str,'dd/MM/yyyy');
                     }
                 }
             }
         }

        
         }
         return message;
    };
  });
angular.module('newSiteApp')
  .controller('DialogController',function($scope,$mdDialog)
  {
    console.log('booll');
    $scope.cancel = function(answer) {
    $mdDialog.hide(answer);
  };
  });