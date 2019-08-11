![Version](https://img.shields.io/badge/version-8.0.0-brightgreen.svg)

# Seed project for Angular 8+ libraries

**This repository contains a seed project for developing Angular 8 modules / libraries, which provides the following features:**

* Generation of distribution ready packages that comply to the [Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview).
* Support for a demo application to test the library.
* Separate directories for the library and demo application sources.
* Unit tests with coverage reports.
* AOT readiness testing (via demo application production builds).
* Configured to use [recommended TSLint standards](https://github.com/dscheerens/tslint-presets).
* SCSS compilation.
* Component template and style inlining.
* Support for building [scoped packages](https://docs.npmjs.com/misc/scope).

## How it works
The project uses a combination of [**ng-packagr**](https://github.com/dherges/ng-packagr) and the
[**Angular CLI**](https://github.com/angular/angular-cli) as build tools to develop, test and package your library.

## Creating a new Angular library

To create a new Angular library based on this seed project, use the following steps:

* Fork, clone or download [this repository](https://github.com/dscheerens/angular-library-seed-project).
* Update the package name in `package.json`.
* Update the UMD module ID for the package in `ng-package.json -> lib.umdId`.
  The convention for this ID is to use a lower camel-case version of the package name and using a dot as a replacement for slashes.
  So the UMD module ID for a package called `@john-doe/my-awesome-library` would then become `johnDoe.myAwesomeLibrary`.
* Edit the `demo/tsconfig.json` and `demo/tsconfig.prod.json` files and change `example-module` to the name of the package.
* Delete the example library found in the `lib/src` folder.
* Create a new clean barrel file `index.ts` in `lib/src`.
* Update the demo application and remove all references to the example module (`example-module`).
* Remove the `"private": true` setting from `package.json` if you wish to publish the library.
  By default the library is published to the [public NPM registry](https://www.npmjs.com/).
  If you wish to publish it to another (private) registry, then add the following configuration to `package.json`:
  ```
  "publishConfig": {
    "registry": "https://url-of.your/private/registry"
  }
  ```
* Start building your library!

## NPM scripts

| Command      | Description                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------------|
| `ng`         | Executes an Angular CLI command. For example: `npm run ng -- serve --app=demo`.                     |
| `start`      | Runs the demo application.                                                                          |
| `lint`       | Runs TSLint for the library sources (found in the `lib/src` directory).                             |
| `test`       | Executes a single run of the unit tests and generates a coverage report. Use this for CI jobs.      |
| `test.watch` | Runs the unit tests in watch mode.                                                                  |
| `build`      | Generates a distribution package of the library.                                                    |
| `build.demo` | Makes a production build of the demo application (requires a library build first: `npm run build`). |
| `release`    | Publishes a generated distribution package to the NPM repository.                                   |

## Using third party libraries

Whenever you install third party libraries always install them using `--save-dev`.
If your library actually depends on them at runtime then also add them as `peerDependencies` list in `package.json`.
For third party libraries that are used only in the demo application or for build tooling, then it suffices to have them listed only in `devDependencies`.

> **Why not install them as normal dependencies?**
>
> Installing third party libraries as normal dependencies will hide version conflicts if your published library is used in another library or application.
> That way you risk that consumers of your library will run it with incompatible versions of the dependencies, resulting in bugs or strange compile errors.

After having installed a third party library you will also have to update `lib.umdModuleIds` list in `ng-package.json`.
This property is used to tell [**Rollup.js**](https://rollupjs.org/) (which is used by **ng-packagr**) what the global names of the external dependencies are.
You have to do this for every dependency except `@angular/*`, `rxjs` and `tslib`, since **ng-packagr** automatically handles these for you.
Below you can find a list of commonly used libraries and their global name:

```javascript
{
    "@ngx-translate/core": "ngx-translate-core", // < 9.0.0
    "@ngx-translate/core": "ngx-translate.core", // >= 9.0.0
    "@ngx-translate/http-loader": "ngx-translate-http-loader", // < 3.0.0
    "@ngx-translate/http-loader": "ngx-translate.http-loader", // >= 3.0.0
    "lodash": "_",
    "moment": "moment"
}
```

### Note on the usage of **Moment.js**

If you make use [**Moment.js**](https://momentjs.com/) and try to build the package, there is a good chance that you'll be treated with the following error:

```
Cannot call a namespace ('moment')
```

This is a known [issue](https://github.com/moment/moment/issues/4170).
Until the problem is solved you can use the following workaround:

```Typescript
import * as momentNamespace from 'moment';

const moment = momentNamespace;
```

You will then be able to use the `moment` function and namespace as shown in the next example:

```Typescript
function foo(start: momentNamespace.Moment): void {
    console.log(`${start.format('dddd, MMMM Do YYYY')} was an awesome day!`);
}

const theBeginningOfTime = moment('1970-01-01T00:00:00Z');

foo(moment(theBeginningOfTime).add({ years: 16, months: 8, days: 1 }));
```
