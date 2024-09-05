<h1>Reactive</h1>
<code>@easedotjs/reactive</code>

<p>
  Reactive is an extension that allows you to create reactive components that automatically update when their values change. 
  This extension provides a simple way to create reactive components that update in real-time.
</p>

<p>
  To use the Reactive extension, you will need to include the <code>@easedotjs/reactive</code> script in your HTML file. This will 
  automatically load the extension and make it available to your components. Once the extension is loaded, you can create reactive
  values by using <code>$.live</code>
</p>

<template lang="html">
<script>
export default ({ $ }) => {
  const message = $.live('Hello World').subscribe(value => {
    console.log(value);
  });

  setTimeout(() => {
    message.value = 'Goodbye World';
  }, 1000);
};
</script>
</template>