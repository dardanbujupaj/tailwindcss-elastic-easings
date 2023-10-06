# tailwindcss-elastic-easings

A plugin for Tailwind CSS that provides elastic and bounce transition timing functions.

![Elastic horizontal translate](./translate-elastic-out.gif)

> [!NOTE]
>
> **Compatibility**
>
> Transition timing functions provided by this plugin currently don't work on Safari and Mobile.
> See [#Compatibility](#Compatibility) for more details and fallback behavior/options.

## Installation

Install the plugin from npm:

```sh
npm install tailwindcss-elastic-easings
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require("tailwindcss-elastic-easings"),
    // ...
  ],
};
```

## Usage

Define a transition and set the desired transition-timing-function (here `ease-elastic-out`).

```html
<div
  className="transition-transform duration-1000 ease-elastic-out hover:translate-x-8"
>
  Hover me
</div>
```

### transition-timing-functions

- `ease-elastic-in`
- `ease-elastic-out`
- `ease-elastic-in-out`
- `ease-bounce-in`
- `ease-bounce-out`
- `ease-bounce-in-out`

### Compatibility

`tailwindcss-elastic-easings` relies on [linear easing functions (`linear()`)](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#linear_easing_function).
These are currently not supported by Safari, as well as most mobile browsers. When not supported it will fall back to the default tailwind easing.

Missing support can be detected with the `no-elastic` modifier.

```html
<div
  className="transition-transform duration-1000 ease-elastic-out hover:translate-x-8 no-elastic:ease-in-out"
>
  Hover me
</div>
```

## Configuration

This plugin can be configured by passing a configuration object to it.

```js
  // ...
  plugins: [
    require("tailwindcss-elastic-easings")({ resolution: 30 }),
    // ...
  ],
  // ...
```

Currently the only configurable function is the `resolution` (default value `30`) of the timing functions.
The higher the value the smoother the velocity changes, the lower the value the smaller your CSS-bundle.

## Acknowledgments

- easing functions by https://easings.net
