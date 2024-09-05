
# Getting Started

This guide will help you get quickly set up to use the Ease framework. We'll cover how to load the core and components, and how to define a new component.
Setup is simple - start by adding the necessary script tags to your HTML file:

```html
<script src="https://unpkg.com/easejs/core"></script>
<script src="https://unpkg.com/easejs/components"></script>
```

## Configuring the core

The core script will automatically load the necessary components and extensions. However, you can configure the core by adding meta tags to your HTML file:

```html
<meta name="ease.core.debug" content="true"> <!-- Enables debug output -->
<meta name="ease.inject.name" content="$$"> <!-- Changes the alias for extensions -->
```

## Defining a new component

Now, you're ready to build your first component. Components can be a simple HTML file:

```html
<template>
  <span>Hello World!</span>
</template>
```

Or, they can be more advanced with scripts and isolated styles.

```html
<attribute name="color" default="black" expose-to-styles attribute>
<attribute name="title" attribute>

<article>
  <h1 id="title">
    Article Title
  </h1>
  <slot></slot>
</article>

<script>
  export default ({ el, props }) => {
    el.title.innerText = props.title.value;
  };
</script>

<style>
  #title {
    color: var(--color);
  }
</style>
```

In this example, we've defined a new component with two properties: <code>color</code> and <code>title</code>.
The component will render an article with a title and content. The title will be styled with the color attribute.

Components in Ease are defined using the <code>template</code> tag, and scripts are defined using the <code>script</code> tag using the ES6 module syntax.
The default export of the script will be used as the component's behavior. The first and only parameter passed to the script is an object containing the 
component's root element, attributes, as well as any extensions that are loaded in.

## Loading your new component

To load your new component, simply add a <code>link</code> tag to your HTML file:

```html
<link rel="component" name="my-component" href="path/to/component.html">
```

The provided name will be used to reference the component in your HTML file. It must follow the same rules as a custom element name in vanilla HTML - 
remember, Ease is just a thin layer on top of what's already available in the browser. Each component must contain a unique name and include a hyphen.

## Available properties

Ease components have access to a number of properties that can be used to interact with the component's behavior. These properties are made available
in the object passed to the component's script. Here are the default properties available to all components:

-  `elements` - The component's root element
-  `properties` - An object containing the component's attributes
-  `extensions` - An object containing any loaded extensions

In addition, there are some aliases that can make your code more readable:

-  `el` - An alias for `elements`
-  `props` - An alias for `properties`
-  `ext` - An alias for `extensions`
-  `$` - An alias for `extensions` *

<sub>
  * The <code>$</code> alias defaults to <code>$</code> however it can be changed by setting the <code>ease.inject.name</code> meta tag.
</sub>

<code>elements</code> contains every element with an id attribute, for example:

```html
<template>
  <span id="message">Hello World!</span>
</template>
```

Will expose the <code>message</code> element as <code>el.message</code> in the component's script.

<code>properties</code> contains every property defined by the component's property tags, for example:

```html
<attribute content="color" default="black">
```

Will expose the <code>color</code> attribute as <code>attr.color.value</code> in the component's script. In addition, the <code>attr.color</code> object
will contain a <code>watch</code> method that can be used to watch for changes to the attribute's value. You should call <code>unwatch</code> when you're
done watching the attribute to prevent memory leaks - though there is currently no way to detect when a component is removed from the DOM - this will be
added in a future release.

## Extensions

Ease provides a number of built-in extensions that can be used to enhance your components. Extensions are loaded in using the <code>script</code> tag, 
and can add additional functionality to your components. For example, the reactive extension can be used to quickly create reactive values that will
trigger updates when they change. To learn more about these extensions, check out the <a href="#extensions.html">extensions documentation</a>.
