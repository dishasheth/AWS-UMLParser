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
//     return {
//         scope: {
//             fileinput: "=",
//             //filepreview: "="
//         },
//         link: function($scope, element, attributes) {
//             element.bind("change", function(changeEvent) {
//                 $scope.fileinput = changeEvent.target.files[0];
//                 var reader = new FileReader();
//                 // reader.onload = function(loadEvent) {
//                 //     $scope.$apply(function() {
//                 //         //scope.filepreview = loadEvent.target.result;
//                 //     });
//                 // }
//                 reader.readAsDataURL($scope.fileinput);
//             });
//         }
//     }
// }]);
// cloudapp.controller("cloudCtrl", ['$scope', '$http', 'uploadService', function($scope, $http, uploadService) {
//     $scope.$watch('file', function(newfile, oldfile) {
//         if(angular.equals(newfile, oldfile) ){
//             return;
//         }
//         console.log("NEWFILE"+newfile);
//         /*var files = $scope.fileUpload.files;
//         console.log(files[0]);*/
//         //if (files.length > 0) {
//             // create a FormData object which will be sent as the data payload in the
//             // AJAX request
//             var formData = new FormData();
//
//             // loop through all the selected files and add them to the formData object
//            // for (var i = 0; i < files.length; i++) {
//
//                 // add the files to formData object for the data payload
//                 formData.append('uploads[]', newfile , newfile.name);
//         //formData.append(file.name,file);
//          //   }
//         //}
//         console.log("FORMDATA:"+formData.length);
//         uploadService.upload(newfile,formData).then(function(res){
//             // DO SOMETHING WITH THE RESULT!
//             console.log("result", res);
//         })
//     });
//
// }]);


// cloudapp.service("uploadService", function($http, $q,$window) {
//
//     return ({
//         upload: upload
//     });
//
//     function upload(file,formData) {
//         $window.alert('inside sercie');
//         console.log(file+" ======="+formData.length);
//         var upl = $http({
//             method: 'POST',
//             url: '/upload', // /api/upload,
//                 processData: false,
//                 contentType: false,
//                 transformRequest: angular.identity,
//                 headers: {'Content-Type': undefined},
//             /* headers: {
//                  'Content-Type': 'multipart/form-data;'
//              },*/
//             data: {
//                 upload:formData
//             }
//             // transformRequest: function(data, headersGetter) {
//             //     var formData = new FormData();
//             //     angular.forEach(data, function(value, key) {
//             //         formData.append(key, value);
//             //     });
//             //
//             //     var headers = headersGetter();
//             //     delete headers['Content-Type'];
//             //
//             //     return formData;
//             // }
//         }
//         );
//         $window.alert('inside sercie'+file+formData);
//         console.log(file+"========"+formData);
//
//         return upl.then(handleSuccess, handleError);
//
//     } // End upload function
//
//     // ---
//     // PRIVATE METHODS.
//     // ---
//
//     function handleError(response, data) {
//         if (!angular.isObject(response.data) ||!response.data.message) {
//             return ($q.reject("An unknown error occurred."));
//         }
//
//         return ($q.reject(response.data.message));
//     }
//
//     function handleSuccess(response) {
//         console.log(response);
//         return (response);
//     }
//
// });






