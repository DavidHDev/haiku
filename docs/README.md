# React Haiku Docs

<div align="center">
	<br>
	<br>
	<img src="./media/haiku-logo-orange.svg" alt="react-haiku" height="200">
	<br>
	<br>
	<b>An awesome collection of React Hooks & Utilities!</b>
	<br>
	<br>
	<br>
	<br>
	<hr>
</div>

[![NPM](https://img.shields.io/npm/l/react-haiku)](https://github.com/DavidHDev/react-haiku/blob/main/LICENSE.md)
[![npm](https://img.shields.io/npm/v/react-haiku)](https://www.npmjs.com/package/react-haiku)
[![npm](https://img.shields.io/npm/dm/react-haiku)](https://www.npmjs.com/package/react-haiku)

## Links

- [Official Docs](https://reacthaiku.dev/)

## What is this?

Haiku is a simple & lightweight React library with the goal of saving<br>
you time by offering a large collection of hooks & utilities that will<br>
help you get the job done faster & more efficiently!

## Install

Installing Haiku is very easy! <br>
*Requires React >=16.8.0*
<br>

#### NPM
```sh
npm install react-haiku
```

#### Yarn
```sh
yarn add react-haiku
```
#### PNPM
```sh
pnpm install react-haiku
```
<br>

## Usage Examples
<br>

Please check the official [Documentation](https://reacthaiku.dev/) for full usage examples.

<br>

### Using Hooks
<br>

```jsx
import { useHover } from 'react-haiku';

const Component = () => {
  const { hovered, ref } = useHover();

  return (
    <p ref={ref}>
      {hovered ? 'All mice on me' : 'No mice on me'}
    </p>
  );
}

export default Component;
```

### Using Utilities
<br>

```jsx
import { For } from 'react-haiku';

const Component = () => {
    const list = [{ name: 'React' }, { name: 'Haiku' }]

    render(
        <>
        	<For each={list} render={(item, index) =>
		        <p>{item.name}</p>
	        }/>
        </>
    )
}

export default Component;
```

## PACKAGE CONTENTS

### Hooks

- [`useClipboard()`](https://reacthaiku.dev/docs/hooks/useClipboard) - Copy data to the user's clipboard!
- [`useHover()`](https://reacthaiku.dev/docs/hooks/useHover) - Quick way to detect if your mouse is over an element!
- [`useInputValue()`](https://reacthaiku.dev/docs/hooks/useInputValue) - Manage input state with this simple hook!
- [`useLeaveDetection()`](https://reacthaiku.dev/docs/hooks/useLeaveDetection) - Detect when your user's cursor leaves the page!
- [`useMediaQuery()`](https://reacthaiku.dev/docs/hooks/useMediaQuery) - Manipulate your component using media queries!
- [`useMousePosition()`](https://reacthaiku.dev/docs/hooks/useMousePosition) - Detect the current position of the mouse relative to a target or the whole document!
- [`usePrefersTheme()`](https://reacthaiku.dev/docs/hooks/usePrefersTheme) - Detect the user's preferred system theme!
- [`useScript()`](https://reacthaiku.dev/docs/hooks/useScript) - Attach script tags to the document from your components!
- [`useToggle()`](https://reacthaiku.dev/docs/hooks/useToggle) - Toggle state values between two different options!
- [`useBoolToggle()`](https://reacthaiku.dev/docs/hooks/useToggle) - Toggle boolean state values!
- [`useUrgentUpdate()`](https://reacthaiku.dev/docs/hooks/useUrgentUpdate) - Force render a component when calling this hook!
- [`useClickOutside()`](https://reacthaiku.dev/docs/hooks/useClickOutside) - Detect clicks outside a target element!
- [`useConfirmExit()`](https://reacthaiku.dev/docs/hooks/useConfirmExit) - Prompt the user with a message before closing the tab if the state is set as dirty.
- [`useDebounce()`](https://reacthaiku.dev/docs/hooks/useDebounce) - Debounce state changes to react to updates after a delay!
- [`useEventListener()`](https://reacthaiku.dev/docs/hooks/useEventListener) - Set event listeners on the window object or a specific target element!
- [`useFavicon()`](https://reacthaiku.dev/docs/hooks/useFavicon) - Dynamically update the website's favicon from a component!
- [`useFirstRender()`](https://reacthaiku.dev/docs/hooks/useFirstRender) - Check whether or not a component is on its first render!
- [`useFullscreen()`](https://reacthaiku.dev/docs/hooks/useFullscreen) - Toggle between entering fullscreen mode and exiting fullscreen mode!
- [`useHold()`](https://reacthaiku.dev/docs/hooks/useHold) - Handle long presses on a target element and execute a handler after a set delay!
- [`useIdle()`](https://reacthaiku.dev/docs/hooks/useIdle) - Detect user activity/inactivity on the page based on events!
- [`useIsomorphicLayoutEffect()`](https://reacthaiku.dev/docs/hooks/useIsomorphicLayoutEffect) - Switch between useEffect and useLayoutEffect depending on the execution environment (SSR VS Browser)!
- [`useLocalStorage()`](https://reacthaiku.dev/docs/hooks/useLocalStorage) - Manage localStorage values dynamically
- [`useScrollPosition()`](https://reacthaiku.dev/docs/hooks/useScrollPosition) - Access the current scroll position on the page and modify it programatically.
- [`useSingleEffect()`](https://reacthaiku.dev/docs/hooks/useSingleEffect) - Run the useEffect hook strictly only once when the component is mounted!
- [`useTitle()`](https://reacthaiku.dev/docs/hooks/useTitle) - Update the document's title from your components!
- [`useUpdateEffect()`](https://reacthaiku.dev/docs/hooks/useUpdateEffect) - Similar to useEffect, but it skips the first render of a component, and only react to updates triggered by dependency values.
- [`useOrientation()`](https://reacthaiku.dev/docs/hooks/useOrientation) - Detect when device is in portrait or landscape mode.
- [`useWindowSize()`](https://reacthaiku.dev/docs/hooks/useWindowSize) - Use hook to get width and height of window. Values update upon window resizing.
- [`useIntersectionObserver()`](https://reacthaiku.dev/docs/hooks/useIntersectionObserver) - Provides a way to detect when an element enters or exits the viewport, with options for configuring intersection thresholds, margins, and one-time animation triggers.
- [`useBatteryStatus()`](https://reacthaiku.dev/docs/hooks/useBatteryStatus) - Provides real-time information about the device's battery level and charging status, automatically updating as these values change.
- [`useSize()`](https://reacthaiku.dev/docs/hooks/useSize) - hook observes a referenced DOM element and returns its current width and height, updating the values whenever the element is resized. This is useful for dynamically tracking size changes of any resizable component.
- [`useDeviceOS()`](https://reacthaiku.dev/docs/hooks/useDeviceOS) - Detects the user's operating system, including mobile emulators, and uses string manipulation for identifying unique or new OS versions.
- [`usePreventBodyScroll()`](https://reacthaiku.dev/docs/hooks/usePreventBodyScroll) - Disables body scrolling when active and restores it upon deactivation or component unmounting. It provides a boolean state, a setter, and a toggle function for dynamic scroll control.
- [`useGeolocation()`](https://reacthaiku.dev/docs/hooks/useGeolocation) - Access the user's current geographical location using the browser's Geolocation API. Returns latitude and longitude coordinates and handles permission errors gracefully.

### Utilities

- [`If`](https://reacthaiku.dev/docs/utilities/if) - Component for simple conditional rendering!
- [`Show`](https://reacthaiku.dev/docs/utilities/show) - Component for complex conditional rendering!
- [`For`](https://reacthaiku.dev/docs/utilities/for) - Dynamic rendering component with automatic key assignment!
- [`RenderAfter`](https://reacthaiku.dev/docs/utilities/renderAfter) - Component that renders its children after a set delay.

## Maintainers

[David Haz](https://github.com/DavidHDev)

## License

MIT
