# Markdown to PRESENTA JSON

This library converts from `markdown` to an opinionated [PRESENTA](https://github.com/presenta-software/presenta-lib) config object.

A quick example [here](https://codepen.io/abusedmedia/pen/WNGwMrR).

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

The library parses the HTML comments as scene and block properties:

```markdown
<!--
textVar: section
colorBack: red
-->

# hello 

```

Also, you can create blocks using this notation:

```markdown
# hello

```youtube
url: YTcodeID
```  

```

The above chunk creates a scene with two blocks, the first one is a `text` block, the last one a `youtube` block.

This library understands a [subset](https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json) of [emoji shortcodes](https://emojipedia.org/shortcodes/), such as:

```markdown
# Hello! :heart:
```

## Development

Run the watcher:

    npm start

and the local webserver

    npm run test

## Licence

This plugin is released under the [3-Clause BSD license](LICENSE).

Copyright © 2020 Fabio Franchino, [https://fabiofranchino.com](https://fabiofranchino.com)