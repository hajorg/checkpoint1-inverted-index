var app = angular.module("myApp", []);
app.controller("myController", function ($scope) {
    $scope.ivd = new InvertedIndex();
    //Make search input file and button hidden
    $scope.display = false;
    $scope.displayTable = false;
    //Get a list names of the uploaded files
    $scope.uploaded = [];
//    Get the uploaded file
    function checkJson(content, file) {
        if (file.name.split(".")[1] !== "json") {
            return "invalid json file";
        }
        return true;
    }
    $scope.getFile = function (file) {
        let reader = new FileReader();
        reader.onloadend = e => {
            try{
                $scope.ivd.uploadedFiles[file.name] = JSON.parse(e.target.result);
                if($scope.uploaded.indexOf(file.name) === -1) {
                    $scope.uploaded.push(file.name);
                    $scope.$apply();
                }
            }catch (e) {                
                console.log('error');
            }
        }
        reader.readAsText(file);
    }
    document.getElementById('fileUploaded').addEventListener('change', function (e) {
        for (let i = 0; i < e.target.files.length; i++) {
            $scope.getFile(e.target.files[i]);
        }
    });
    //count the number of document in a file
    $scope.counter = [];
    $scope.error = ivd.error;
    $scope.triggerSearchAll = false;
    $scope.getCount = function (filename) {
        $scope.ivd.getDocCount(filename);
    }
    $scope.createIndex = function() {
        $scope.ivd.createIndex($scope.selectFile);
        $scope.index = $scope.ivd.getIndex($scope.selectFile);
        $scope.display = true;
        $scope.displayTable = true;
        $scope.count = $scope.ivd.counter;
        
        $scope.triggerSearchAll = false;
        $scope.search = function() {
//            $scope.searched = ivd.searchIndex($scope.searchIndex,$scope.selectContent);
            if ($scope.searchIndex !== '') {
                if ($scope.selectContent) { 
                    $scope.triggerSearchAll = true;
                    if ($scope.selectContent == 'all') {
                        $scope.displayTable = false;
                    } else {
                        $scope.triggerSearchAll = false;
                        $scope.displayTable = true;
                    }
                    $scope.index = $scope.ivd.searchIndex($scope.searchIndex,$scope.selectContent);
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