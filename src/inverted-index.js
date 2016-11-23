class InvertedIndex {
    constructor() {
        this.indexMap = {};
        this.allFiles = [];
        this.error = "error";
        this.uploadedFiles = {};
    }
    getFile(file) {
        this.allFiles = [];
        let _this = this;
        let reader = new FileReader();
        let error = false;
        reader.onloadend = e => {
            try{
                let valid = _this.checkJson(JSON.parse(e.target.result), file);
                if (valid) {
                    this.uploadedFiles[file.name] = JSON.parse(e.target.result);
                    return true;
                }
                alert('error');
            }catch (e) {                
               this.error = "File is not a valid JSON";
                alert(this.error);
                error = true;
            }
        }
        reader.readAsText(file);
    }
    isValidJson(file) {
        try {
            JSON.parse(file);
            return true;
        } catch (err) {
            return 'Invalid Json file';
        }     
    }
    checkJson(content, file) {
//        if (result.length === 0) {
//            alert('empty array');
//            this.allFiles.pop();
//            return false;
//        }
        if (file.name.split(".")[1] !== "json") {
//            alert('error');
            return "invalid json file";
        }
        return true;
    }
    getAllFiles() {
        return this.allFiles;
    }
    createIndex(file) {
        this.counter = [];
        //An object that will hold each unique word and show which file the words are found
        this.fileIndex = {};
        //Loop through an array of the json file
        this.uploadedFiles[file].forEach((obj, id) => {
            this.counter.push(id);
            let text = obj.text.toLowerCase().match(/\w+/g);
            let title = obj.title.toLowerCase().match(/\w+/g);
            let mySet = new Set(text.concat(title));
            const uniqueWords = Array.from(mySet.values());
            for (let i in uniqueWords) {
                if (uniqueWords[i] in this.fileIndex) {
                    this.fileIndex[uniqueWords[i]].push(id);
                } else {
                    this.fileIndex[uniqueWords[i]] = [id];
                }
            }
        });
        this.indexMap[file] = this.fileIndex;
                console.log(this.indexMap);
    }
    getIndex(file) {
        return this.indexMap[file];
    }
    searchIndex(arr, file) {
        if (arr.length > 0) {
            arr = arr.split(" ");
            const index = this.getIndex(file);
            const result = {};
            if(file !== "all") {
                arr.forEach((word) => {
                    if (index.hasOwnProperty(word)) {
                        result[word] = index[word];
                    }
                });
            } else {
                let newObj = {};
                for(let i in this.indexMap) {
                    arr.forEach((word) => {
                        if (this.indexMap[i].hasOwnProperty(word)) {
                            newObj[word] = this.indexMap[i][word];
                        }
                    });
                    result[i] = newObj;
                }
            }
            console.log(result);
            return result;
        } else {
            alert('empty');
        }
    }
}
let ivd = new InvertedIndex();