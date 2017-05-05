var cloudapp=angular.module("CloudApp",[]);


cloudapp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

cloudapp.service('fileUpload', ['$http', function ($http,$scope) {
    //$scope.imgpath='';
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function(data){
                if(data.statusCode===204)
                {
                    console.log(data.data);
                    return data.data;
                }

            })
            .error(function(){
            });
    }
}]);

cloudapp.controller('myCtrl', ['$scope','$http', 'fileUpload', function($scope,$http, fileUpload) {

    $scope.uploadFile = function () {
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);
        var uploadUrl = "/fileUpload";
//        var x=fileUpload.uploadFileToUrl(file, uploadUrl);
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .then(function(data){
                console.log(data);
                if(data.data.statusCode===204)
                {
                    console.log(data.data.data);
                    $scope.imgpath=data.data.data;
                }

            },(function(){ console.log(data);
            }));
        //console.log("path"+x);


    };
}]);

cloudapp.controller('myMain', ['$scope','$http', function($scope,$http) {

    $scope.submitfn = function () {
        var x=$scope.restbucks.tenant;
        console.log("TENANT:"+x+"  --USERNAME"+$scope.restbucks.username);
        window.location.assign("/"+x);
        window.alert($scope.restbucks.username);
    };
}]);





