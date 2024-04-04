import { describe, expect, it } from 'bun:test';
import UserEntity from '@src/entities/UserEntity';

describe('UserEntity', () => {
  describe('正常系', () => {
    describe('idがundefinedのパターン', () => {
      it('nameが1文字以上, ageに0以上の整数を渡すとインスタンスが生成される', () => {
        const entity = new UserEntity({ name: 'a', age: 0 });

        expect(entity.name).toEqual('a');
        expect(entity.age).toEqual(0);
      });

      it('nameが ` a ` のように、前後のスペースが含まれている場合は、スペースを取り除いた状態でインスタンスが生成される', () => {
        const entity = new UserEntity({ name: ' a ', age: 0 });

        expect(entity.name).toEqual('a');
      });

      it('ageが「1.0」のような実質整数の形式で渡された時、「1」に変換された上でインスタンスが生成される', () => {
        const entity = new UserEntity({ name: ' a ', age: 1.0 });

        expect(entity.age).toEqual(1);
      });
    });

    describe('idに値があるパターン', () => {
      it('nameが1文字以上, ageに0以上の整数を渡すとインスタンスが生成される', () => {
        const entity = new UserEntity({ id: 1, name: 'a', age: 0 });

        expect(entity.id).toEqual(1);
      });
    });
  });

  describe('異常系', () => {
    describe('name', () => {
      it('nameが空文字のときは例外が発生する', () => {
        expect(() => new UserEntity({ name: '', age: 0 })).toThrow(
          new Error('nameは1文字以上'),
        );
      });
    });

    describe('age', () => {
      it('ageが0未満のときは例外が発生する', () => {
        expect(() => new UserEntity({ name: 'a', age: -1 })).toThrow(
          new Error('ageは0以上の整数'),
        );
      });

      it('ageが小数のときは例外が発生する', () => {
        expect(() => new UserEntity({ name: 'a', age: 1.1 })).toThrow(
          new Error('ageは0以上の整数'),
        );
      });
    });

    describe('id', () => {
      it('idが1未満のときは例外が発生する', () => {
        expect(() => new UserEntity({ id: 0, name: 'a', age: 0 })).toThrow(
          new Error('idは1以上の整数、またはundefined'),
        );
      });

      it('idが小数のときは例外が発生する', () => {
        expect(() => new UserEntity({ id: 1.1, name: 'a', age: 0 })).toThrow(
          new Error('idは1以上の整数、またはundefined'),
        );
      });
    });
  });
});
