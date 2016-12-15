/*  eslint-disable no-unused-vars*/
/*  eslint no-shadow: 0*/
/**
*Inverted Index class
* @class
*/
class InvertedIndex {
  /**
  * Called when InvertedIndex class is instantiated
  * @constructor
  * @param {class} utility - a helper class
  */
  constructor(utility) {
    this.utility = utility;
    this.indexMap = {};
    this.uploadedFiles = {};
    this.allCounter = {};
    this.counter = [];
  }

  /**
  * creates index of a file
  * @param {string} file - The name of file to create index for
  * @returns {boolean} returns true if index is created
  */
  createIndex(file) {
    if (this.utility.checkJson(file, this.uploadedFiles)) {
      this.counter = [];
      /*  An object that will hold each unique word
       and show which file the words are found
       */
      this.fileIndex = {};
      //  Loop through an array of the json file
      this.uploadedFiles[file].forEach((doc, id) => {
        this.counter.push(id);
        const text = this.utility.converter(doc.text);
        const title = this.utility.converter(doc.title);
        const unicity = new Set(text.concat(title));
        const uniqueWords = Array.from(unicity.values());
        this.utility.indexMapper(uniqueWords, this.fileIndex, id);
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
  * creates a search based on users input on file(s) uploaded
  * @param {string} file - The name of file to search for.
  * @param {...string} words - A sentence to search for.
  * @returns {object} The search index for file(s)
  */
  searchIndex(file = 'all', ...words) {
    if (words.length === 0) return {};
    const allWords = this.utility.flatten(...words);
    const result = {};
    if (file !== 'all') {
      result[file] = this.utility.searchMap(allWords, file, this.indexMap);
    } else {
      Object.keys(this.indexMap).forEach((key) => {
        result[key] = this.utility.searchMap(allWords, key, this.indexMap);
      });
    }
    return result;
  }

}
