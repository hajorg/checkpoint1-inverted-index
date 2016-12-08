/*  eslint-disable no-undef*/
describe('Inverted Index', () => {
  const indexer = new InvertedIndex();
  describe('Read book data', () => {
    it('reads file and assert that file is a valid file', () => {
      expect(InvertedIndex.isValidJson(JSON.stringify(file1))).toBe(true);
    });

    it('reads the JSON file and asserts that file is invalid', () => {
      expect(InvertedIndex.isValidJson(file1)).toBe('Invalid Json file');
    });

    it('reads the JSON file and asserts that file format is invalid', () => {
      indexer.uploadedFiles['file1.json'] = file2;
      expect(indexer.checkJson('file1.json')).toBe(false);
    });
  });
  describe('Populate Index', () => {
    indexer.uploadedFiles['file1.json'] = file1;
    const creator = indexer.createIndex('file1.json');
    const indexed = indexer.getIndex('file1.json');

    it('verify that the index is created once the JSON file has been read', () => {
      expect(indexed['file1.json'].an).toEqual([0]);
      expect(indexed['file1.json'].a).toEqual([0, 1]);
    });

    it('verify that the index returned is an object', () => {
      expect(creator).toBe(true);
      expect(typeof indexed).toBe('object');
    });
  });
  describe('Search Index', () => {
    const words = 'alice lord';
    indexer.uploadedFiles['file1.json'] = file1;
    indexer.uploadedFiles['file2.json'] = file1;
    indexer.createIndex('file1.json');
    indexer.createIndex('file2.json');
    let result = indexer.searchIndex(words, filename);
    it(' should verify that searching the index returns an object of the indices', () => {
      expect(result).toEqual({ 'file1.json': { alice: [0, 1], lord: [1] } });
    });

    it('should return an empty object if no search word is given', () => {
      expect(result = indexer.searchIndex('', filename)).toEqual({});
    });

    it('should return all the search terms which are present in index map ', () => {
      expect(result = indexer.searchIndex('alice', 'all')).toEqual({
        'file1.json': { alice: [0, 1] }, 'file2.json': { alice: [0, 1] }
      });
    });
  });
});
