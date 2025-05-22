# Haiku

<div align="center">
	<br>
	<br>
	<img src="./media/haiku-logo-orange.svg" alt="react-haiku" height="200">
	<br>
	<br>
	<b>A clean & lightweight collection of React Hooks & Utilities!</b>
	<br>
	<br>
	<br>
	<br>
	<hr>
</div>

[![NPM](https://img.shields.io/npm/l/react-haiku)](https://github.com/DavidHDev/react-haiku/blob/main/LICENSE.md)
[![npm](https://img.shields.io/npm/v/react-haiku)](https://www.npmjs.com/package/react-haiku)
[![npm](https://img.shields.io/npm/dm/react-haiku)](https://www.npmjs.com/package/react-haiku)

## Table of Contents

- [Documentation](#documentation)
- [What is Haiku?](#what-is-haiku)
- [Installation Guide](#installation-guide)
- [Usage Examples](#usage-examples)
  - [Using Hooks](#using-hooks)
  - [Using Utilities](#using-utilities)
- [Contributing](#contributing)
- [Package Contents](#package-contents)
  - [Hooks](#hooks)
  - [Utilities](#utilities)
- [Maintainers](#maintainers)
- [License](#license)

---


## Documentation

- [Official Docs](https://reacthaiku.dev/)

## What is Haiku?

Haiku is a simple & lightweight React library with the goal of saving<br>
you time by offering a large collection of hooks & utilities that will<br>
help you get the job done faster & more efficiently!

## Installation Guide

Installing Haiku is very easy! <br>
_Requires React >=16.8.0_
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

#### Unit Testing with Jest and React Testing Library

This project uses [jest](https://jestjs.io/) as the testing framework and [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro) for testing React components and hooks.

#### Running Tests

To execute all unit tests with coverage enabled

```sh
npm run test
```

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

  return <p ref={ref}>{hovered ? 'All mice on me' : 'No mice on me'}</p>;
};

export default Component;
```

### Using Utilities

<br>

```jsx
import { For } from 'react-haiku';

const Component = () => {
  const list = [{ name: 'React' }, { name: 'Haiku' }];

  render(
    <>
      <For each={list} render={(item, index) => <p>{item.name}</p>} />
    </>,
  );
};

export default Component;
```

## Contributing

Haiku is always open to improvements and contributions, you can check the [Open Issues](https://github.com/DavidHDev/react-haiku/issues) if you want to contribute, and it's also possible to request to add your own improvements/ideas using the [Feature Request](https://github.com/DavidHDev/react-haiku/issues/new/choose) template. Before contributing, please read the [Contribution Guide](https://github.com/DavidHDev/react-haiku/blob/main/CONTRIBUTING.MD) and make sure to respect the standards! Thank you for your time!

## PACKAGE CONTENTS

### Hooks

- [`useBatteryStatus()`](https://reacthaiku.dev/docs/hooks/useBatteryStatus) - Provides real-time updates on the device's battery level and charging status.
- [`useBoolToggle()`](https://reacthaiku.dev/docs/hooks/useToggle) - Toggle boolean state values.
- [`useClipboard()`](https://reacthaiku.dev/docs/hooks/useClipboard) - Copy data to the user's clipboard.
- [`useClickOutside()`](https://reacthaiku.dev/docs/hooks/useClickOutside) - Detect clicks outside a target element.
- [`useConfirmExit()`](https://reacthaiku.dev/docs/hooks/useConfirmExit) - Prompt the user with a message before closing the tab if the state is set as dirty.
- [`useCookie()`](https://reacthaiku.dev/docs/hooks/useCookie) - Manages cookies reactively, ensuring automatic sync across tabs and persistent storage for simple data.
- [`useCookieListener()`](https://reacthaiku.dev/docs/hooks/useCookieListener) - Tracks cookie changes and triggers callbacks, useful for syncing state across tabs or handling authentication updates.
- [`useDebounce()`](https://reacthaiku.dev/docs/hooks/useDebounce) - Debounce state changes to react to updates after a delay.
- [`useDeviceOS()`](https://reacthaiku.dev/docs/hooks/useDeviceOS) - Detects the user's operating system, including mobile emulators, and identifies unique or new OS versions.
- [`useEventListener()`](https://reacthaiku.dev/docs/hooks/useEventListener) - Set event listeners on the window object or a specific target element.
- [`useFavicon()`](https://reacthaiku.dev/docs/hooks/useFavicon) - Dynamically update the website's favicon from a component.
- [`useFirstRender()`](https://reacthaiku.dev/docs/hooks/useFirstRender) - Check whether or not a component is on its first render.
- [`useFullscreen()`](https://reacthaiku.dev/docs/hooks/useFullscreen) - Can toggle between entering fullscreen mode and exiting fullscreen mode.
- [`useHold()`](https://reacthaiku.dev/docs/hooks/useHold) - Handle long presses on a target element and execute a handler after a set delay.
- [`useHover()`](https://reacthaiku.dev/docs/hooks/useHover) - Quick way to detect if your mouse is over an element.
- [`useIdle()`](https://reacthaiku.dev/docs/hooks/useIdle) - Detect user activity/inactivity on the page based on events.
- [`useInputValue()`](https://reacthaiku.dev/docs/hooks/useInputValue) - Manage input state with this simple hook.
- [`useIntersectionObserver()`](https://reacthaiku.dev/docs/hooks/useIntersectionObserver) - Detects when an element enters or exits the viewport, with configurable thresholds, margins, and animation triggers.
- [`useInterval()`](https://reacthaiku.dev/docs/hooks/useInterval) - Manages recurring tasks with start/stop controls, ideal for polling, animations, or delayed updates.
- [`useIsomorphicLayoutEffect()`](https://reacthaiku.dev/docs/hooks/useIsomorphicLayoutEffect) - Switch between useEffect and useLayoutEffect depending on the execution environment (SSR VS Browser).
- [`useKeyPress()`](https://reacthaiku.dev/docs/hooks/useKeyPress) - Listen for specific combination of keys and trigger a callback when all the keys are pressed simultaneously.
- [`useLeaveDetection()`](https://reacthaiku.dev/docs/hooks/useLeaveDetection) - Detect when your user's cursor leaves the page.
- [`useLocalStorage()`](https://reacthaiku.dev/docs/hooks/useLocalStorage) - Manage localStorage values dynamically.
- [`useMediaQuery()`](https://reacthaiku.dev/docs/hooks/useMediaQuery) - Manipulate your component using media queries.
- [`useMousePosition()`](https://reacthaiku.dev/docs/hooks/useMousePosition) - Detect the current position of the mouse relative to a target or the whole document.
- [`useNetwork()`](https://reacthaiku.dev/docs/hooks/useNetwork) - Monitors network status, allowing you to detect online/offline changes in your application.
- [`useOrientation()`](https://reacthaiku.dev/docs/hooks/useOrientation) - Detects and tracks screen orientation changes, helping adapt the UI for portrait or landscape modes.
- [`usePrefersTheme()`](https://reacthaiku.dev/docs/hooks/usePrefersTheme) - Detect the user's preferred system theme.
- [`usePreventBodyScroll()`](https://reacthaiku.dev/docs/hooks/usePreventBodyScroll) - Disables body scrolling when active and restores it when deactivated, offering dynamic control with a boolean state and toggle function.
- [`useScrollDevice()`](https://reacthaiku.dev/docs/hooks/useScrollDevice) - Detects if the user is scrolling with a mouse wheel or trackpad, allowing adaptive scroll behaviors.
- [`useScrollPosition()`](https://reacthaiku.dev/docs/hooks/useScrollPosition) - Access the current scroll position on the page and modify it programmatically.
- [`useScript()`](https://reacthaiku.dev/docs/hooks/useScript) - Attach script tags to the document from your components.
- [`useSingleEffect()`](https://reacthaiku.dev/docs/hooks/useSingleEffect) - Run the useEffect hook strictly only once when the component is mounted.
- [`useSize()`](https://reacthaiku.dev/docs/hooks/useSize) - Tracks and updates the width and height of a referenced DOM element whenever it is resized.
- [`useTabNotification()`](https://reacthaiku.dev/docs/hooks/useTabNotification) - Lets you change the browser tab's title, show alerts, and add a dot to the favicon to notify users of updates or new messages while they're on a different tab.
- [`useTitle()`](https://reacthaiku.dev/docs/hooks/useTitle) - Update the document's title from your components.
- [`useToggle()`](https://reacthaiku.dev/docs/hooks/useToggle) - Toggle state values between two different options.
- [`useUpdateEffect()`](https://reacthaiku.dev/docs/hooks/useUpdateEffect) - Similar to useEffect, but it skips the first render of a component and only reacts to updates triggered by dependency values.
- [`useUrgentUpdate()`](https://reacthaiku.dev/docs/hooks/useUrgentUpdate) - Force render a component when calling this hook.
- [`useWindowSize()`](https://reacthaiku.dev/docs/hooks/useWindowSize) - Provides the current window width and height dimensions.


### Utilities


- [`Class`](https://reacthaiku.dev/docs/utilities/class) - Component that conditionally applies a CSS class based on a boolean condition.
- [`For`](https://reacthaiku.dev/docs/utilities/for) - Dynamic rendering component with automatic key assignment.
- [`If`](https://reacthaiku.dev/docs/utilities/if) - Component for simple conditional rendering.
- [`Image`](https://reacthaiku.dev/docs/utilities/image) - Component that simplifies the process of rendering images.
- [`RenderAfter`](https://reacthaiku.dev/docs/utilities/renderAfter) - Component that renders its children after a set delay.
- [`Show`](https://reacthaiku.dev/docs/utilities/show) - Component for complex conditional rendering.
- [`Switch`](https://reacthaiku.dev/docs/utilities/switch) - Component that dynamically renders based on multiple "cases" with a "default" fallback.



## Maintainers

[David Haz](https://github.com/DavidHDev)

## License

MIT
