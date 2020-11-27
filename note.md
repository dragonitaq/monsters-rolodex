# Notes

`export const CardList` is named export, which mean you can only import it with the same name you export it and a pair of `{}`.

`export default CardList` is unnamed export, which mean you can import it with any name without a pair of `{}`, this kind of export is limited to one per module because it is default.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

First note first, `setState()` is a async function. If neended, we can attach a CB as an second argument in the fn.

Whenever `setState()` is being called, it will automatically call or recall `render()` fn.

You can think of state as data for your current component. Props is the data that you share across components. So if you have some state and pass it to another component, that is props.

State is actually immutable as well! While the `setState` method looks like its modifying our state object, it's actually creating a new object for our state and updating the values based on what keys we want to change from our `setState` call. This is why we never mutate the state object by doing something like this: `this.state.users = { .... }`. This is bad because when React tries to determine whether or not to update the component, it will see that the state object is still the same object by reference in memory.

React will under the hood perform an object merge. This will merge the properties of these two objects together, with the old state being the initial object, and whatever object you pass to `setState` it will merge into that base object replacing and overlapping properties. We want to always return a new object for state because the way that React component update is based on the recognizing that the state has changed by its reference value. As you remember, objects when compared with equality i.e (`===`), are based on their reference in memory.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

Real dom rerender may or may not repaint the whole thing.

Whether it is the whole or not is not important, the more important is whether individual component or node satisfy the real dom rerender and vdom rerender condition. Just remember these rules :

1. vdom rerender component if that component or its parent setState, unless you use react memo or shouldComponentUpdate.

2. Real dom (this is too, handled by React) will not rerender the node if there is no state or props change, the changes are known by comparing old vdom with new vdom after vdom rerender.

3. repaint only happen if there is visual change.

Always keep in mind that:

1. vdom rerender is not equal to real dom rerender as rerender in vdom doesnt alway lead to state or props change (as long as setState happen, even the state and props are same, vdom will rerender, unless you use react memo or shouldcomponent update)

2. real dom rerender is not equal to repaint as rerender include attribute mutation that doesnt involve visual change like onClick attribute

This is what real dom rerender do:

1. mutate attribute (may or may not lead to 3 or 4, eg changing onClick attribute will not cause visual/layout change while changing classname attribute is likely to cause visual/layout change)

2. add or remove node (very likely lead to 4)

3. change visual (repaint)

4. change layout (reflow)

<https://stackoverflow.com/questions/2549296/whats-the-difference-between-reflow-and-repaint>

just follow these rules to solve your doubt

You can verify those behavior with console.log, chrome dev tools, and react dev tools

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

`this` points to window, why in a React is undefined?

```Javascript
function foo(){
  console.log(this);
}

foo();
```

In Stateful Class Components in React, when we pass the event handler function reference as a callback like this

`<button type="button" onClick={this.handleClick}>Click Me</button>`

The event handler method loses its implicitly bound context. When the event occurs and the handler is invoked, the `this` value falls back to default binding and is set to undefined as class declarations and prototype methods run in strict mode. When we bind the this of the event handler to the component instance in the constructor, we can pass it as a callback without worrying about it losing its context.

Arrow functions are exempt from this behavior because they use lexical `this` binding which automatically binds them to the scope they are defined in.

In another word, the `this` keyword in the onClick should reference the button itself but classes runs in strict mode so the `this` keyword is set to undefined. I think it's because it follows the principle of React which is do-not-touch-DOM. So whenever our `this` keyword is pointing to an DOM element, it will automatically set to undefined to avoid us directly manipulate the DOM object.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

The use of passing a function to setState will wait for any previous setState calls to resolve before passing the state object in the parameters of the function to the actual function definition. This way you are ensured that the state object you use is the most up to date one. This is relevant only if you need to make sure you have the latest state before updating as setState is an asynchronous call! Generally speaking it's okay to use setState with just an object, but in cases where you absolutely need the latest version of the state around race conditions, then use a function.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
