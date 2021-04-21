const NumberUtils = require('../common/NumberUtils');

test('random', () => {
  const list1 = NumberUtils.getRandomList(45, 6);
  const list2 = NumberUtils.getRandomList(45, 6);
  expect(list1.length).toBe(6);
  expect(list2.length).toBe(6);
  expect(JSON.stringify(list1)).not.toBe(JSON.stringify(list2));
});
