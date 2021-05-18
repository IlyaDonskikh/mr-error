# Mr.Error

![Node.js CI Tests](https://github.com/IlyaDonskikh/mr-error/actions/workflows/node.js.yml/badge.svg?branch=master)

The right way to bake errors.

<img width="200" alt="mr error" src="https://user-images.githubusercontent.com/3100222/118550668-a273a580-b765-11eb-882e-6c686a264b3d.png">

## Introduction

Errors building is one of the most common tasks in software development. `Mr.Error` gladly provides high-quality service to help your application cover all needs in this field.

Make errors your friends🤝 , not your enemies.

## Installation

Just one step.

```shell
npm i mr-error
```

And use it where you need it.

```typescript
import { MrError } from 'mr-error';
```

## Overview

This section explains how to generate, merge and even localize errors.

> Have a look at [🐨 Mr.Koa](https://github.com/IlyaDonskikh/mrkoa) boilerplate and [💼 Mr.UseCase](https://github.com/IlyaDonskikh/mr-use-case) package if you want to see `Mr.Error` in ready-to-use environment.

#### Generation

Let's create an instance and add a few errors:

```typescript
const instance = new MrError();

instance.add('email', 'format');
instance.add('password', 'length');
instance.add('password', 'length');
instance.add('password', 'security');

instance.errors; // => { email: ['format'], password: ['length', 'security'] }
```

As you see, `Mr.Error` is doing its work pretty well. It groups these errors and removes duplicates.

#### Merge

Now let's assume that we need to collect errors from different instances.

```typescript
const instanceFirst = new MrError();
const instanceSecond = new MrError();

instanceFirst.add('email', 'format');
instanceSecond.add('password', 'length');
instanceFirst.merge(instanceSecond);

instanceFirst.errors; // => { email: ['format'], password: ['length'] }
```

It seems that `Mr.Error` doesn't even break a sweat.

#### Localization

The localization feature is enabled with the help of the [i18n](https://github.com/mashpie/i18n-node) package.

```typescript
import i18n from 'i18n';

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
```

Where `locales/en/index.js` contains:

```js
module.exports = {
  test: {
    text: {
      length: 'The text should be at least {{min}} characters long.',
    },
  },
};
```

Now we can utilise all localization power of `i18n` under `Mr.Error` hood. So, let's localize something.

```typescript
const instance = new MrErrorLocalized({ localePath: 'test' }); // default 'base'

instanceFirst.add('text', 'length', { replacements: { min: 10 } });

instance.messages(); // => { text: ['The text should be at least 10 characters long.'] }
```

As you may notice, `Mr.Error` not only perfectly localizes the error, but passes some information to localization data as well.

## Conclusion

`Mr.Error` is ready to take the role of error builder and has a simple interface to work with.

Give it a try!
