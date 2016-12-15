/*  eslint-disable no-unused-vars*/
/*  eslint no-shadow: 0*/
/**
* Utility class
* @class
*/
class Utility {

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
  * @param {object} uploadedFiles - an object which holds files uploaded
  * @returns {boolean} returns a boolean or string
  */
  static checkJson(file, uploadedFiles) {
    const fileUploaded = uploadedFiles[file][0];
    if (!fileUploaded) {
      delete uploadedFiles[file];
      return false;
    }
    if (fileUploaded.title && fileUploaded.text) {
      return true;
    }
  }

  /**
  * converts a string to lowercase and takes only words from it
  * @param {string} string - a sentence or set of words
  * @returns {array} returns an array of words in lowercase
  */
  static converter(string) {
    return string.toLowerCase().match(/\w+/g);
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
  * converts a string to lowercase and takes only words from it
  * @param {...string} words - varied number of arguments
  * @returns {array} returns all argument into a single array
  */
  static flatten(...words) {
    const allWords = [];
    const flatter = (...words) => {
      words.forEach((word) => {
        if (Array.isArray(word)) {
          flatter(...word);
        } else {
          allWords.push(word);
        }
      });
    };
    flatter(...words);
    return allWords;
  }

  /**
  * method checks if a word is present in an index of a file
  * @param {array} words - words to search for in a file
  * @param {string} filename - the name of the file being searched
  * @param {object} indexMap - houses the generated search index for a file
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
