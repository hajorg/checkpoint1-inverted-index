let ivd = new InvertedIndex();
var app = angular.module("myApp", []);
app.controller("myController", function ($scope) {
  $scope.error = '';
  $scope.invertedIndex = new InvertedIndex();
  //  Make search input file and button hidden
  $scope.display = false;
  //  Get a list names of the uploaded files
  $scope.uploaded = [];
  // get a list of documents in a file
  $scope.tableHeader = {};
  //  Get the uploaded file
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
        $scope.invertedIndex.uploadedFiles[file.name] = JSON.parse(e.target.result);
        if (!$scope.invertedIndex.uploadedFiles[file.name][0]) {
          delete $scope.invertedIndex.uploadedFiles[file.name];
          alert('Invalid file format');
          return false;
        }
        if($scope.uploaded.indexOf(file.name) === -1) {
          $scope.uploaded.push(file.name);
          $scope.$apply();
        }
        }catch (e) {                
          alert('Invalid json file');
        }
      }
      reader.readAsText(file);
  }
  // Get uploaded file(s)
  document.getElementById('fileUploaded').addEventListener('change', (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      $scope.getFile(e.target.files[i]);
      alert(e.target.files[i].name+' uploaded')
    }
  });
  $scope.createIndex = function() {
    $scope.error = '';
    if ($scope.selectFile == '' || $scope.selectFile == undefined) {
      $scope.error = 'You have to select a valid file to upload';
      return;
    }
    if ($scope.invertedIndex.createIndex($scope.selectFile)) {
      $scope.index = $scope.invertedIndex.getIndex($scope.selectFile);
      //  show search form
      $scope.display = true;
      //  count the number of document in a file
      $scope.tableHeader[$scope.selectFile] = $scope.invertedIndex.allCounter[$scope.selectFile];
    } else {
      $scope.uploaded.pop();
      return;
    }
  }

  $scope.search = function() {
    $scope.error = '';
    if ($scope.searchIndex) {
      if ($scope.selectContent) {
        $scope.index = $scope.invertedIndex.searchIndex($scope.searchIndex,$scope.selectContent);
        if ($scope.index == false) {
          $scope.error = 'Invalid search word entered';
        }
      } else {
        $scope.error = 'You must select a file to search';
      }
    } else {
      $scope.error = 'No search word found';
    }
  }
});