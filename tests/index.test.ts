import { MrError } from '../src';

describe('MrError', () => {
  describe('add', () => {
    test('split errors by key', () => {
      const errorKeyFirst = 'first';
      const errorKeySecond = 'second';
      const errorCode = 'code';

      const instance = new MrError();

      instance.add(errorKeyFirst, errorCode);
      instance.add(errorKeySecond, errorCode);

      const keys = Object.keys(instance.errors);

      expect(keys.length).toEqual(2);
      expect(instance.errors).toEqual({
        [errorKeyFirst]: [errorCode],
        [errorKeySecond]: [errorCode],
      });
    });

    test('collapse uniq error codes', () => {
      const errorKey = 'first';
      const errorCodes = ['codeA', 'codeB'];

      const instance = new MrError();

      instance.add(errorKey, errorCodes[0]);
      instance.add(errorKey, errorCodes[0]);
      instance.add(errorKey, errorCodes[1]);

      expect(instance.errors[errorKey].length).toEqual(errorCodes.length);
      expect(instance.errors).toEqual({
        [errorKey]: errorCodes,
      });
    });
  });

  describe('merge', () => {
    test('merge errors of instance', () => {
      const errorKeyFirst = 'first';
      const errorKeySecond = 'second';
      const errorCode = 'code';

      const instanceFirst = new MrError();
      const instanceSecond = new MrError();

      instanceFirst.add(errorKeyFirst, errorCode);
      instanceSecond.add(errorKeySecond, errorCode);

      instanceFirst.merge(instanceSecond);

      const keys = Object.keys(instanceFirst.errors);

      expect(keys.length).toEqual(2);
      expect(instanceFirst.errors).toEqual({
        [errorKeyFirst]: [errorCode],
        [errorKeySecond]: [errorCode],
      });
    });
  });

  describe('message', () => {
    test('display list of formatted message', () => {
      const errorKeyFirst = 'first';
      const errorKeySecond = 'second';
      const errorCode = 'code';

      const instance = new MrError();

      instance.add(errorKeyFirst, errorCode);
      instance.add(errorKeySecond, errorCode);

      expect(instance.messages()).toEqual({
        [errorKeyFirst]: [`base.${errorKeyFirst}.${errorCode}`],
        [errorKeySecond]: [`base.${errorKeySecond}.${errorCode}`],
      });
    });
  });
});
