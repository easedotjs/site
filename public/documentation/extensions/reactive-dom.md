# Reactive DOM
@easedotjs/reactive-dom

Reactive DOM is an extension that allows you to create reactive components that automatically update the DOM when their values change. 
This extension is built on top of the <a href="#extensions/reactive.html">Reactive</a> extension, and provides a simple way to create 
reactive components that update the DOM in real-time. As such, you will need to include both the Reactive and Reactive DOM extensions in
your project to use this extension.

To use the Reactive DOM extension, you will need to include the <code>@easedotjs/reactive-dom</code> script in your HTML file. This will 
automatically load the extension and make it available to your components. Once the extension is loaded, you can use {{ }} to create
reactive elements and they will appear within <code>rx</code> in your component's script:

```html
<template>
  <span id="message">{{ message }}</span>
</template>

<script>
export default ({ rx }) => {
  rx.message = 'Hello World!';
};
</script>
```

<p>
  Additional functionality is planned such as conditional rendering, loops, and more. Check back soon for updates!
</p>