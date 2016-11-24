/**
*Inverted Index class
*/
class InvertedIndex {
  /**
  * Called when InvertedIndex class is instantiated
  * @constructor
  */
  constructor() {
    this.indexMap = {};
    this.uploadedFiles = {};
  }
  /**
  * Checks if a file is a valid json
  * @param {string} file - file contents
  * @return {boolean} returns a boolean or string
  */
  isValidJson(file) {
    try {
      JSON.parse(file);
      return true;
    } catch (err) {
      return 'Invalid Json file';
    }
  }
  /**
  * Checks if a file name has a .json extension
  * @param {string} file - file name
  * @returns {boolean} returns a boolean or string
  */
  checkJson(file) {
    if (!this.uploadedFiles[file][0]) {
      alert('Invalid format');
      delete this.uploadedFiles[file];
      return false;
    }
    if (this.uploadedFiles[file][0].title && this.uploadedFiles[file][0].text) {
      return true;
    } else {
      return false;
    }
    return true;
  }
  /**
  * @method
  * @param {string} file - The name of file to create index for
  * @returns {boolean} returns true if index is created
  */
  createIndex(file) {
//    this.checkJson(file);
    if (this.checkJson(file)) {
      this.counter = [];
      //  An object that will hold each unique word and show which file the words are found
      this.fileIndex = {};
      //  Loop through an array of the json file
      this.uploadedFiles[file].forEach((obj, id) => {
        this.counter.push(id);
        const text = obj.text.toLowerCase().match(/\w+/g);
        const title = obj.title.toLowerCase().match(/\w+/g);
        const mySet = new Set(text.concat(title));
        const uniqueWords = Array.from(mySet.values());
          for (const i in uniqueWords) {
            if (uniqueWords[i] in this.fileIndex) {
              this.fileIndex[uniqueWords[i]].push(id);
            } else {
              this.fileIndex[uniqueWords[i]] = [id];
            }
          }
      });
      this.indexMap[file] = this.fileIndex;
      if (this.fileIndex) {
        return true;
      }
    }
  }
  /**
  * @method
  * @param {string} file - The name of file to get generated index for.
  * @returns {object} The created index for a particular file
  */
  getIndex(file) {
    return this.indexMap[file];
  }
  /**
  * @method
  * @param {string} words - A sentence to search for .
  * @param {string} file - The name of file to get generated index for.
  * @returns {object} The created index for a particular file
  */
  searchIndex(words, file) {
    if (words.length > 0) {
      words = words.match(/\w+/g);
      const index = this.getIndex(file);
      const result = {};
      if (file !== 'all') {
        words.forEach((word) => {
        if (index.hasOwnProperty(word)) {
          result[word] = index[word];
        }
      });
    } else {
      const newObj = {};
      for(let i in this.indexMap) {
        words.forEach((word) => {
          if (this.indexMap[i].hasOwnProperty(word)) {
            newObj[word] = this.indexMap[i][word];
          }
        });
        result[i] = newObj;
      }
    }
    return result;
    }
    return {};
    }
}
let ivd = new InvertedIndex();
