
# Extensions

Extensions are a way to add additional functionality to the Ease framework. The power of Ease is in its simplicity, and extensions allow 
you to add more complex functionality to your components without having to write a lot of boilerplate code.

Ease includes some optional extensions that bring many familiar features from other frameworks. These extensions are designed to be 
lightweight and easy to use, so you can quickly add functionality to your components without having to learn a new API.

Extensions are loaded like everything else in Ease - add the necessary <code>script</code> tag to your HTML file, and you're good to go. 
Just make sure you check the documentation for each extension to see how to use it.

## Creating an Extension

To create your own extension, or to understand how extensions work in Ease, you need to understand how extensions are loaded and used.
Extensions are just simple JavaScript files that call a method on the global <code>ease</code> object providing the extension's name and
the extension's functionality. To ensure the extension is loaded correctly, it's recommended to verify that <code>ease</code> is defined: 

```js
if (typeof ease == 'undefined') {
  throw new Error('This library requires Ease to be loaded first')
}
```

It's recommended to throw an error if <code>ease</code> is not defined, as this will prevent the extension from being loaded and used while
also providing a clear error message to the developer.

Once you've verified that <code>ease</code> is defined, you can create your extension by calling <code>ease.extensions.add</code> and passing
in the extension's name and functionality. This can include methods, objects, or to extend other extensions, you can pass in the extension's
name and the extension's functionality.

```js
ease.extensions.add({
  name: 'my-extension',
  methods: {
    myMethod() {
      console.log('Hello from my extension!')
    }
  }
})
```

In this example, we've created a simple extension called <code>my-extension</code> that includes a single method called <code>myMethod</code>.
This method will log a message to the console when called. To access this method from within a component, it will be exposed to the component's
exported method:

```js
export default ({ extensions }) => {
  extensions.myMethod()
}
```