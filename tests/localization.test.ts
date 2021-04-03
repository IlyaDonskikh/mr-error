import i18n from 'i18n';
import faker from 'faker';

import { MrError } from '../src';

i18n.configure({
  locales: ['en'],
  directory: `${__dirname}/locales`,
  objectNotation: true,
  updateFiles: false,
  defaultLocale: 'en',
  staticCatalog: {
    en: require(`${__dirname}/locales/en`),
  },
});

class MrErrorLocalized extends MrError {
  protected localizationPackage = i18n;
}

describe('MrError', () => {
  describe('localization', () => {
    test('localize error', () => {
      const errorKeyFirst = 'localizationTest';
      const errorCode = 'localizationTestCode';

      const instance = new MrErrorLocalized();

      instance.add(errorKeyFirst, errorCode);

      expect(instance.messages()[errorKeyFirst]).toContain(
        'Localized test error',
      );
    });

    test('replace variable in localized error', () => {
      const errorKeyFirst = 'localizationReplacementsTest';
      const errorCode = 'localizationReplacementsTestCode';
      const replacementValue = faker.random.word();

      const instance = new MrErrorLocalized();

      instance.add(errorKeyFirst, errorCode, {
        replacements: { replacementValue },
      });

      expect(instance.messages()[errorKeyFirst]).toContain(
        `Localized test error with ${replacementValue}`,
      );
    });
  });
});
