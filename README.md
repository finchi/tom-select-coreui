# @finchi/tom-select-coreui

A [Tom Select](https://tom-select.js.org/) Stimulus wrapper plus a CoreUI/Bootstrap-compatible SCSS theme. The Stimulus controller handles `turbo:morph` reconnection (preserving the selected value across the morph).

## Installation

Add the package via Git in your `package.json`:

```json
"@finchi/tom-select-coreui": "git+https://github.com/finchi/tom-select-coreui.git#v1.0.0"
```

Then `yarn install` (or `npm install`).

The package declares peer dependencies on `@hotwired/stimulus`, `@coreui/coreui`, and `tom-select`. Make sure your project provides them.

## JavaScript

```js
import { Application } from "@hotwired/stimulus"
import { TomSelectController } from "@finchi/tom-select-coreui"

const application = Application.start()
application.register("tom-select", TomSelectController)
```

### Stimulus values

| Value | Type | Default | Effect |
| --- | --- | --- | --- |
| `dropDownInput` | Boolean | `false` | Enables the `dropdown_input` plugin |
| `removeButton` | Boolean | `true` | Enables the `remove_button` plugin |
| `maxOptions` | Number | `null` | Caps rendered options |
| `dropdownParent` | String | `null` | CSS selector for the dropdown's portal target |

Markup example:

```erb
<%= form.select :tag_ids, @tags.map { |t| [t.name, t.id] }, {}, multiple: true,
      data: { controller: "tom-select", "tom-select-remove-button-value": true } %>
```

## SCSS

The build must pass `--load-path=node_modules` so Sass resolves package paths. Then:

```scss
@use "@finchi/tom-select-coreui/scss/tom-select";
```

This loads CoreUI-themed Tom Select styles plus all eight plugin partials.

The theme depends on `@coreui/coreui` for variables (`coreui.$input-height`, `coreui.$input-padding-x`, etc.). Install `@coreui/coreui` in your host project; the theme imports it via `@use "@coreui/coreui/scss/coreui"`.

### Customisation

All theme variables are declared `!default`. Override at import time:

```scss
@use "@finchi/tom-select-coreui/scss/tom-select" with (
  $select-ns: 'my-select',
  $select-color-item-active: red,
);
```

See `scss/_config.scss` for the full variable list.

## Versioning

Semver. Renaming the controller class, a Stimulus value name, the SCSS entry path, or the `$select-ns` default is a major bump. New plugin SCSS or a new Stimulus value is minor. Bug fixes that preserve the contract are patches.
