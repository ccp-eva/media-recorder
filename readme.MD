# Media Recorder &middot; `mRec` &middot; [![GitHub package.json version](https://img.shields.io/github/package-json/v/ccp-eva/media-recorder?label=GitHub%20version)](https://github.com/ccp-eva/media-recorder/blob/master/package.json) [![npm version](https://img.shields.io/npm/v/@ccp-eva/media-recorder?label=npm%20version)](https://www.npmjs.com/package/@ccp-eva/media-recorder) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ccp-eva/media-recorder) [![UNPKG](https://img.shields.io/badge/unpkg-latest-green.svg)](https://unpkg.com/@ccp-eva/media-recorder)

> An unobtrusive and DOM-independent JavaScript/npm package (UMD) providing utility functions to record a webcam stream using WebRTC.
>
> ### [🚀 CodePen Demo](https://codepen.io/Kalaschnik/pen/gOrJOYb?editors=1000) (under construction)

---

## Support & Limitations

## Installation

As of version 2, this package uses [webpack](https://webpack.js.org/) to simplify development (see [development section](#development--contribution)) and streamline the bundle output. That entails that this package now follows the UMD pattern, which allows it to be used within the following module systems: CJS, AMD, and ESM ([check this article](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm) if you want to learn more about these systems).

The following snippets demonstrate **how you can integrate this package into your project**.

### CDN (quick and easy)

#### Step 1 — Setup

Put the following line in the `head` section of your `HTML` file:

```html
<!-- index.html -->
<script src="https://unpkg.com/@ccp-eva/media-recorder" async></script>
```

**Notes**

- You can safely use the `async` attribute here, as the required DOM components are included in the js file. You can also put that line at the very end of your `body` if you feel like it
- This line automatically resolves to the latest version (try it in your browser: [https://unpkg.com/@ccp-eva/media-recorder](https://unpkg.com/@ccp-eva/media-recorder) and observe the URL). Yet, if you need a specific version, you can [browse available versions on npm](https://www.npmjs.com/package/@ccp-eva/media-recorder?activeTab=versions). Knowing a valid version tag, you can specify an explicit version as such: https://unpkg.com/@ccp-eva/media-recorder@1.1.3 (legacy version)
- You can also download the JavaScript file and run it without needing an internet connection

#### Step 2 — Usage

Inserting the script under step 1 will add a global(!) property named: _**`mrec`**_ to your window object. Thus, you can access the utility functions/components by prepending them with `mrec` (see [what functions are available here](#functions-overview)).

##### Examples

###### HTML

```html
<!-- index.html -->
<button id="toggle-btn" onclick="mrec.toggleModal()"></button>
<!-- OR -->
<button id="toggle-btn" onclick="window.mrec.toggleModal()"></button>
```

Similarily you may also use JavaScript to attach event listeners:

###### JavaScript

```javascript
// index.js
const toggleButton = document.getElementById('toggle-btn');
toggleButton.addEventListener('click', mrec.toggleModal);
```

### npm

#### Step 1 — Setup

```javascript
npm install @ccp-eva/media-recorder
```

#### Step 2 — Usage

In order to use npm packages in your browser you need a bundler. The following example uses `webpack`.

```javascript
npm init -y
npm i -D webpack webpack webpack-cli
```

Assuming your `index.js` is in a `src` folder, you can use ESM syntax to import components as such:

```javascript
// src/index.js

// named import for a single or multiple components
// import { toggleModal } from '@ccp-eva/media-recorder'

// import all components
import * as mrec from '@ccp-eva/media-recorder';

// execute toggleModal() function
mrec.toggleModal();
```

Assuming your `index.html` is in a `dist` folder and contains:

```html
<!-- dist/index.html -->
<html lang="en">
  <head>
    <script src="./main.js" async></script>
  </head>
  <body></body>
</html>
```

Now you should have the following file structure:

```
my-project
|- /dist
  |- index.html
|- /src
  |- index.js
|- package.json
```

This file structure uses webpack defaults. Thus, if can run:

```javascript
npx webpack
```

webpack will create a `main.js` within the `dist` directory. If you now open the `index.html` you will see the empty modal window.

## Functions Overview

Regardless of [how you install](#installation) the package, you can use the following utility functions:

<!-- prettier-ignore -->
| **Utility Function**<br />(signature:default value)<br />? = optional ! = required parameter | **Description** |
|---|---|
| `injectShell()` | Injecting HTML & CSS for the modal UI (you may never need to call this function) |
| `logMediaDevices(showDeviceKind?:true, showDeviceLabel?:true, showDeviceId?:false)` | Will console.log device type, label and ID |
| `modalContent(htmlContent?:'<h1>Hi</h1>', backgroundColor?:'deeppink')` | Set the modal content: The first parameter accepts `html` as a string. The second parameter defines the background color of the modal.<br />Example: `modalContent("<h1>Hello</h1>")`. You can also pass the predefined strings: `#video-preview` or `#video-playback` to load the corresponding video elements.<br />Note: Calling `modalContent()` always opens the modal afterwards. |
| `toggleModal()` | show/hide the modal UI (use modalContent before to set any content) |
| `openVideoPreview()` | Opens the modal with the video stream by calling implicitly `modalContent('#video-preview')` |
| `openVideoPlayback()` | Opens the modal off the recorded video by calling implicitly `modalContent('#video-playback')` |
| `startStream({constraintObject}?:[1])` | starts a webcam stream w/o recording it |
| `stopStream()` | stops all active webcam streams |
| `startRecorder({constraintObject}?:[1])` | starts a webcam stream (if not active) and starts recording |
| `stopRecorder()` | stops the recording, creates a video file, stops the webcam stream |
| `uploadVideo("filename:")` | Parameters: string (optional)<br />Uploads the recording using given parameter "filename". If no argument is provided, the filename defaults to a ISO 8601 timestamp. [See notes about uploading.](#endpoint-for-uploading) |

[1] `startStream({obj})` and `startRecorder({obj})` allow you tp pass a [MediaTrackConstraints Object](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) as an argument, which allows you define what media tracks (e.g., video, audio) should be recorded, and how they should be recorded (e.g., resolution, fps, facing mode). When providing no arguments, both functions default to:

```javascript
{
  audio: true,
  video: { facingMode: 'user' },
  frameRate: 15,
}
```

See https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia for examples you can provide to both functions.

## Endpoint for Uploading

For local development, I recommend [PHP Server for VS Code](https://marketplace.visualstudio.com/items?itemName=brapifra.phpserver)).

You need to have a server-side endpoint for this function. Right now, this function only works for PHP.

`upload_video.php`

```php
$target_path = "uploads/" . basename($_FILES["vidfile"]["name"] . ".webm");
move_uploaded_file($_FILES["vidfile"]["tmp_name"], $target_path );
```

`php.ini`

Change php’s `post_max_size` and `upload_max_filesize` accordingly in your `php.ini`, if your video is likely to exceed the default 2MB limitation:

```php
post_max_size = 105M
upload_max_filesize = 100M
```

## Development & Contribution

### Dev Setup

1. `git clone git@github.com:ccp-eva/media-recorder.git`
2. `npm install`
3. `npm start`

This will launch `webpack-dev-server` (w/ Hot Module Replacement / Auto Refresh).  
**Note**: To have some easier debugging-time during development, all functions are exposed to the global scope using `process.env.NODE_ENV !== 'production'` defined within the `index.js`.

### Build for Production

1. `git clone git@github.com:ccp-eva/media-recorder.git`
2. `npm install`
3. `npm run build`

**Note** This project uses the ESLint/AirBnb linter styles (see `.eslintrc.yml`) and prettier as formatter (see `.prettierrc`). If you do a PR, it would be great if you conform to these.

## Near Future Development

- [ ] Multiple Stream Recording (e.g., Webcam + Screen)
- [ ] Better Modal UI
- [ ] Refactor Code Base to conform to WebRTC stanrdards
