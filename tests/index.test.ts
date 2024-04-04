import { describe, expect, it } from 'bun:test';
import Hoge from '@src/index';

describe('', () => {
  it('test', () => {
    const hoge = new Hoge();
    expect(hoge.say()).toEqual(1);
  });
});
