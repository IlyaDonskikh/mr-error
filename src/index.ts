export class MrError {
  protected localizationPackage?: typeof i18n;
  public localePath: string;

  public statusCode: number = 422;
  public errors: { [key: string]: string[] } = {};
  public replacements: {
    [key: string]: { [key: string]: i18n.Replacements };
  } = {};

  constructor({ localePath }: { localePath: string } = { localePath: 'base' }) {
    this.localePath = localePath;
  }

  messages() {
    const localizedMessages: { [key: string]: string[] } = {};

    Object.keys(this.errors).forEach((key) => {
      localizedMessages[key] = this.buildLocalePathsBy(key);
    });

    return localizedMessages;
  }

  add(
    name: string,
    code: string,
    options?: { replacements: i18n.Replacements },
  ) {
    if (this.errors[name] === undefined) {
      this.errors[name] = [];
    }
    if (this.errors[name].includes(code)) {
      return;
    }

    this.errors[name].push(code);
    this.replacements[name] = { [code]: options?.replacements || {} };
  }

  merge(errorsBuilder: MrError) {
    const errorsList = errorsBuilder.errors;

    Object.keys(errorsList).forEach((key: string) => {
      errorsList[key].forEach((errorCode: string) => {
        this.add(key, errorCode);
      });
    });
  }

  private buildLocalePathsBy(key: string): Array<string> {
    return this.errors[key].map((code: string) =>
      this.localizeLine({ key, code }),
    );
  }

  private localizeLine({ key, code }: { key: string; code: string }) {
    const value = `${this.localePath}.${key}.${code}`;

    if (this.localizationPackage) {
      const replacements = this.replacements[key]?.[code];

      return this.localizationPackage.__(value, replacements);
    }

    return value;
  }
}
