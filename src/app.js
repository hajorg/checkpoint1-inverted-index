const app = angular.module('myApp', []);
app.controller('myController', ($scope) => {
  /**
  * Returns a message
  * @param {string} message - a message to be displayed to user
  * @return {string} returns a string message
  */
  function showMessage(message) {
    $scope.message = message;
    $('#response-modal').modal();
    $scope.$apply();
  }
  $scope.error = '';
  $scope.invertedIndex = new InvertedIndex();
  //  Make search input file and button hidden
  $scope.display = false;
  //  Get a list names of the uploaded files
  $scope.uploaded = [];
  // get a list of documents in a file
  $scope.tableHeader = {};
  /**
  * Checks if a file is a valid json file
  * @param {object} file - file contents
  * @return {boolean} returns a boolean or string
  */
  function checkJson(file) {
    if (file.name.split('.')[1] !== 'json') {
      showMessage('invalid json file');
      return;
    }
    return true;
  }
  //  Get the uploaded file
  $scope.getFile = (file) => {
    checkJson(file);
    $scope.error = '';
    const reader = new FileReader();
    reader.onloadend = (e) => {
      try {
        $scope.invertedIndex.uploadedFiles[file.name] = JSON.parse(e.target.result);
        if (!$scope.invertedIndex.uploadedFiles[file.name][0]) {
          delete $scope.invertedIndex.uploadedFiles[file.name];
          showMessage('Invalid file format');
          return false;
        }
        if ($scope.uploaded.indexOf(file.name) === -1) {
          $scope.uploaded.push(file.name);
          $scope.$apply();
        }
      } catch (err) {
        showMessage('Invalid json file');
      }
    };
    reader.readAsText(file);
  };
  // Get uploaded file(s)
  document.getElementById('fileUploaded').addEventListener('change', (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      $scope.getFile(e.target.files[i]);
      showMessage(`${e.target.files[i].name} uploaded`);
    }
  });
  $scope.createIndex = () => {
    $scope.error = '';
    if ($scope.selectFile === '' || $scope.selectFile === undefined) {
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
      return false;
    }
  };

  $scope.search = () => {
    $scope.error = '';
    if ($scope.searchIndex) {
      if ($scope.selectContent) {
        $scope.index = $scope.invertedIndex.searchIndex($scope.searchIndex, $scope.selectContent);
        if ($scope.index === false) {
          $scope.error = 'Invalid search word entered';
        }
      } else {
        $scope.error = 'You must select a file to search';
      }
    } else {
      $scope.error = 'No search word found';
    }
  };
});
