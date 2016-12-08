/*  eslint-disable no-unused-vars*/
/**
*Inverted Index class
* @class
*/
class InvertedIndex {
  /**
  * Called when InvertedIndex class is instantiated
  * @constructor
  */
  constructor() {
    this.indexMap = {};
    this.uploadedFiles = {};
    this.allCounter = {};
    this.counter = [];
  }
  /**
  * Checks if a file is a valid json
  * @param {string} file - file contents
  * @return {boolean} returns a boolean or string
  */
  static isValidJson(file) {
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
    const fileUploaded = this.uploadedFiles[file][0];
    if (!fileUploaded) {
      delete this.uploadedFiles[file];
      return false;
    }
    if (fileUploaded.title && fileUploaded.text) {
      return true;
    }
  }
  /**
  * creates index of a file
  * @param {string} file - The name of file to create index for
  * @returns {boolean} returns true if index is created
  */
  createIndex(file) {
    if (this.checkJson(file)) {
      this.counter = [];
      /*  An object that will hold each unique word
       and show which file the words are found
       */
      this.fileIndex = {};
      //  Loop through an array of the json file
      this.uploadedFiles[file].forEach((doc, id) => {
        this.counter.push(id);
        const text = InvertedIndex.converter(doc.text);
        const title = InvertedIndex.converter(doc.title);
        const unicity = new Set(text.concat(title));
        const uniqueWords = Array.from(unicity.values());
        InvertedIndex.indexMapper(uniqueWords, this.fileIndex, id);
      });
      this.indexMap[file] = this.fileIndex;
      this.allCounter[file] = this.counter;
      return true;
    }
  }
  /**
  * gets the created index for a file
  * @param {string} fileName - The name of file to get generated index for.
  * @returns {object} The created index for a particular file
  */
  getIndex(fileName) {
    const fileIndex = {};
    if (this.indexMap[fileName]) {
      fileIndex[fileName] = this.indexMap[fileName];
      return fileIndex;
    }
  }
  /**
  * method maps each word to documents they are present in
  * @param {array} uniqueWords - unique
  * @param {object} fileIndex - will house the generated index for a file
  * @param {integer} id - the present document being accessed in the file
  * @returns {object} mapped object of the index created
  */
  static indexMapper(uniqueWords, fileIndex, id) {
    Object.keys(uniqueWords).forEach((i) => {
      if (uniqueWords[i] in fileIndex) {
        fileIndex[uniqueWords[i]].push(id);
      } else {
        fileIndex[uniqueWords[i]] = [id];
      }
    });
    return fileIndex;
  }
  /**
  * converts a string to lowercase and takes only word from it
  * @param {string} string - The name of file to get generated index for.
  * @returns {object} The created index for a particular file
  */
  static converter(string) {
    return string.toLowerCase().match(/\w+/g);
  }
  /**
  * creates a search based on users input on file(s) uploaded
  * @param {string} words - A sentence to search for .
  * @param {string} file - The name of file to get generated index for.
  * @returns {object} The created index for a particular file
  */
  searchIndex(words, file = 'all') {
    if (words.length === 0) return {};
    words = InvertedIndex.converter(words);
    if (!words) return false;
    const result = {};
    if (file !== 'all') {
      result[file] = InvertedIndex.searchMap(words, file, this.indexMap);
    } else {
      Object.keys(this.indexMap).forEach((key) => {
        result[key] = InvertedIndex.searchMap(words, key, this.indexMap);
      });
    }
    return result;
  }
  /**
  * method checks if a word is present in a file
  * @param {array} words - words to search for in a file
  * @param {string} filename - the name of the file being searched
  * @param {object} indexMap - will houses the generated index for a file
  * @returns {object} mapped object of the search result
  */
  static searchMap(words, filename, indexMap) {
    const collection = {};
    words.forEach((word) => {
      collection[word] = indexMap[filename][word];
    });
    return collection;
  }
}
