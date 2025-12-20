# Rule 1: Prefer Arrow Functions

Always use **arrow functions** (`const fn = () => {}`) instead of `function` declarations.

This rule applies **everywhere**, including **TypeScript, JavaScript, JSX, and TSX**.
In React components, hooks, callbacks, and handlers **arrow functions are mandatory**.

Arrow functions ensure a consistent modern style and avoid `this`-binding issues.
