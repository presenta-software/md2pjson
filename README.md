# Markdown to PRESENTA json

This library converts from `markdown` to an opinionated [PRESENTA](https://github.com/presenta-software/presenta-lib) config object.

A quick example [here](https://codepen.io/abusedmedia/pen/WNGwMrR) together with [PRESENTA Lib](https://github.com/presenta-software/presenta-lib) while waiting for the full documentation.

## Usage

Parse a raw markdown string to get a JSON object:

```js
md2pjson.parse(md)
```

Get the index of the scene passing the line number of the raw markdown:

```js
const index = md2pjson.findIndex(res, 7)
```


Get the lines range in the raw markdown passing the index of the scene:

```js
const range = md2pjson.findRange(res, 1)
```


Change the separators string used for both the scenes and fragments, before parsing:

```js
md2pjson.setting.sceneSeparator = '---'
md2pjson.setting.fragmentSeparator = '–'
```



## Development

Run the watcher:

    npm start

and the local webserver

    npm run test

## Licence

This plugin is released under the [3-Clause BSD license](LICENSE).

Copyright © 2020 Fabio Franchino, [https://fabiofranchino.com](https://fabiofranchino.com)