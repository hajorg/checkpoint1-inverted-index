/*  eslint-disable no-undef*/
describe('Inverted Index', () => {
  const indexer = new InvertedIndex();

  describe('Read book data', () => {
    it('should read file and assert that file is a valid file', () => {
      expect(InvertedIndex.isValidJson(JSON.stringify(file1))).toBe(true);
      expect(InvertedIndex.isValidJson(file1)).toBe('Invalid Json file');
    });

    it('should ensure the file content is actually a valid JSON Array', () => {
      indexer.uploadedFiles['file1.json'] = file1;
      expect(indexer.checkJson('file1.json')).toBe(true);
    });

    it('should ensure JSON array is not empty', () => {
      indexer.uploadedFiles['file1.json'] = file1;
      indexer.uploadedFiles['file2.json'] = file2;
      expect(indexer.checkJson('file1.json')).toBe(true);
      expect(indexer.checkJson('file2.json')).toBe(false);
    });
  });

  describe('Populate Index', () => {
    indexer.uploadedFiles['file1.json'] = file1;
    const creator = indexer.createIndex('file1.json');
    const indexed = indexer.getIndex('file1.json');

    it('should ensure that the index is created once the JSON file has been read', () => {
      expect(indexed['file1.json'].an).toEqual([0]);
      expect(indexed['file1.json'].a).toEqual([0, 1]);
    });

    it('should verify that the index returned is an object', () => {
      expect(creator).toBe(true);
      expect(typeof indexed).toBe('object');
    });
  });

  describe('Search Index', () => {
    let words = 'alice lord';
    words = InvertedIndex.converter(words);
    indexer.uploadedFiles['file1.json'] = file1;
    indexer.uploadedFiles['file2.json'] = file1;
    indexer.createIndex('file1.json');
    indexer.createIndex('file2.json');
    const result = indexer.searchIndex(filename, ...words);
    it('should ensure index returns the correct results when searched', () => {
      expect(result).toEqual({ 'file1.json': { alice: [0, 1], lord: [1] } });
    });

    it('should return an empty object if no search word is given', () => {
      expect(indexer.searchIndex(filename)).toEqual({});
    });

    it('should ensure​ searchIndex can handle an array of search terms', () => {
      expect(indexer.searchIndex('file1.json', ...['alice', 'a'])).toEqual({
        'file1.json': { alice: [0, 1], a:[0, 1] }
      });
    });

    it('should ensure searchIndex can handle a varied number of search terms as arguments', () => {
      expect(indexer.searchIndex('file1.json', 'alice', 'a')).toEqual({
        'file1.json': { alice: [0, 1], a:[0, 1] }
      });
    });

    it('should return all the search terms which are present in index map ', () => {
      expect(indexer.searchIndex('all', 'alice', 'a')).toEqual({
        'file1.json': { alice: [0, 1], a:[0, 1] }, 'file2.json': { alice: [0, 1], a:[0, 1] }
      });
    });
  });
});
