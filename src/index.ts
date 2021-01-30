export class MrError {
  private localizationPackage?: typeof i18n;
  public localePath: string;

  public statusCode: number = 422;
  public errors: { [key: string]: string[] } = {};

  constructor({
    localePath,
    localizationPackage,
  }: {
    localePath: string;
    localizationPackage?: any;
  }) {
    this.localePath = localePath;
    this.localizationPackage = localizationPackage;
  }

  messages() {
    const localizedMessages: { [key: string]: string[] } = {};

    Object.keys(this.errors).forEach((key) => {
      localizedMessages[key] = this.buildLocalePathsBy(key);
    });

    return localizedMessages;
  }

  add(name: string, code: string) {
    if (this.errors[name] === undefined) {
      this.errors[name] = [];
    }
    if (this.errors[name].includes(code)) {
      return;
    }

    this.errors[name].push(code);
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
      this.localizeLine(`${this.localePath}.${key}.${code}`),
    );
  }

  private localizeLine(value: string) {
    if (this.localizationPackage) {
      return this.localizationPackage.__(value);
    }

    return value;
  }
}
