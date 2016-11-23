var app = angular.module("myApp", []);
app.controller("myController", function ($scope) {
    //Make search input file and button hidden
    $scope.display = false;
    $scope.displayTable = false;
    //Get a list names of the uploaded files
    $scope.uploaded = [];
//    Get the uploaded file
    document.getElementById('fileUploaded').addEventListener('change', function (e) {
        for (let i = 0; i < e.target.files.length; i++) {
            ivd.getFile(e.target.files[i]);
            if($scope.uploaded.indexOf(e.target.files[i].name) === -1) {
                $scope.uploaded.push(e.target.files[i].name);
            }
            
        }
        $scope.$apply();
        console.log(ivd.uploadedFiles);
    });
    //count the number of document in a file
    $scope.counter = [];
    $scope.error = ivd.error;
    $scope.triggerSearchAll = false;
    $scope.createIndex = function() {
        ivd.createIndex($scope.selectFile);
        $scope.index = ivd.getIndex($scope.selectFile);
        $scope.display = true;
        $scope.displayTable = true;
        $scope.count = ivd.counter;
        $scope.triggerSearchAll = false;
        $scope.search = function() {
//            $scope.searched = ivd.searchIndex($scope.searchIndex,$scope.selectValue);
            if ($scope.searchIndex !== '') {
                if ($scope.selectValue) { 
                    $scope.triggerSearchAll = true;
                    if ($scope.selectValue == 'all') {
                        $scope.displayTable = false;
                    } else {
                        $scope.triggerSearchAll = false;
                        $scope.displayTable = true;
                    }
                    $scope.index = ivd.searchIndex($scope.searchIndex,$scope.selectValue);
                } else {
                    alert('You must select a file to search');
                }
            } else {
                alert('no search word found');
            }
//            console.log($scope.searched);
        }
    }
});