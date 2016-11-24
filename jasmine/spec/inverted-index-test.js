let file1 = [
      {
        "title": "Alice in Wonderland",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      },

      {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
      }
    ];
let file3 = `[
      {
        "title": "Alice in Wonderland",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      },

      {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
      }
    ]`;
let file2 = 'just a file';
let filename = 'file1.json';
describe('Inverted Index', function () {
    describe('Read book data', function () {
        beforeEach(function() {
            let ivd = new InvertedIndex();
        });
        it('reads the JSON file and asserts that it is not empty', function(){
            expect(ivd.isValidJson(file3)).toBe(true);
        });
        it('reads the JSON file and asserts that file is invalid', function () {
            expect(ivd.isValidJson(file1)).toBe('Invalid Json file');
        })
    });
    describe('Populate Index', function () {
        it('verifies that the index is created once the JSON file has been read', function() {
            ivd.uploadedFiles['file1.json'] = file1;
            ivd.createIndex('file1.json');
            let indexed = ivd.getIndex('file1.json');
            expect(typeof indexed).toBe('object');
        });
        it('verifies that the index returned is an object', function () {
            ivd.uploadedFiles['file1.json'] = file1;
            ivd.createIndex('file1.json');
            let indexed = ivd.getIndex('file1.json');
            expect(typeof ivd.getIndex('file1.json')).toBe('object');
            expect(indexed.an).toEqual([0]);
            expect(indexed.a).toEqual([0, 1]);
        });
    });
    describe('Search Index', function () {
        it('verifies that searching the index returns an array of the indices', function() {
            let words = "alice lord";
            ivd.uploadedFiles['file1.json'] = file1;
            ivd.createIndex('file1.json');
            let result = ivd.searchIndex(words, filename);
            expect(result).toEqual({alice:[0,1], lord:[1]});
            expect(result = ivd.searchIndex("", filename)).toEqual({});
        });
    });
})