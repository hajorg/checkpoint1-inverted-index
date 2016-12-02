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
    it('reads the JSON file and asserts that file is format is invalid', () => {
      indexer.uploadedFiles['file1.json'] = file2;
      expect(indexer.checkJson('file1.json')).toBe(false);
    });
  });
  describe('Populate Index', () => {
    it('verifies that the index is created once the JSON file has been read', () => {
      indexer.uploadedFiles['file1.json'] = file1;
      const creator = indexer.createIndex('file1.json');
      const indexed = indexer.getIndex('file1.json');
      expect(typeof indexed).toBe('object');
      expect(creator).toBe(true);
    });
    it('verifies that the index returned is an object', () => {
      indexer.uploadedFiles['file1.json'] = file1;
      indexer.createIndex('file1.json');
      const indexed = indexer.getIndex('file1.json');
      expect(typeof indexer.getIndex('file1.json')).toBe('object');
      expect(indexed['file1.json'].an).toEqual([0]);
      expect(indexed['file1.json'].a).toEqual([0, 1]);
    });
  });
  describe('Search Index', () => {
    const words = 'alice lord';
    indexer.uploadedFiles['file1.json'] = file1;
    indexer.uploadedFiles['file2.json'] = file1;
    indexer.createIndex('file1.json');
    indexer.createIndex('file2.json');
    let result = indexer.searchIndex(words, filename);
    it(' should verifies that searching the index returns an array of the indices', () => {
      expect(result).toEqual({ 'file1.json': { alice: [0, 1], lord: [1] } });
    });
    it('should return an empty object if no search word is given', () => {
      expect(result = indexer.searchIndex('', filename)).toEqual({});
    });
    it('should return two filename and an object', () => {
      expect(result = indexer.searchIndex('alice', 'all')).toEqual({
        'file1.json': { alice: [0, 1] }, 'file2.json': { alice: [0, 1] }
      });
    });
  });
});
