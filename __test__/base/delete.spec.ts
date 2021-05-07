import { Deta } from '../../src/index';

const projectKey = process.env.PROJECT_KEY || '';
const dbName = process.env.DB_NAME || '';

const db = Deta(projectKey).Base(dbName);

describe('Base#delete', () => {
  beforeAll(async () => {
    const inputs = [
      [
        { name: 'alex', age: 77 },
        'delete_two',
        { name: 'alex', age: 77, key: 'delete_two' },
      ],
      [
        'hello, worlds',
        'delete_three',
        { value: 'hello, worlds', key: 'delete_three' },
      ],
      [7, 'delete_four', { value: 7, key: 'delete_four' }],
      [
        ['a', 'b', 'c'],
        'delete_my_abc',
        { value: ['a', 'b', 'c'], key: 'delete_my_abc' },
      ],
    ];

    const promises = inputs.map(async (input) => {
      const [value, key, expected] = input;
      const data = await db.put(value, key as string);
      expect(data).toEqual(expected);
    });

    await Promise.all(promises);
  });

  it.each([
    ['delete_two'],
    ['delete_three'],
    ['delete_four'],
    ['delete_my_abc'],
    ['this is some random key'],
  ])('delete data by using key `delete("%s")`', async (key) => {
    const data = await db.delete(key);
    expect(data).toBeNull();
  });
});
