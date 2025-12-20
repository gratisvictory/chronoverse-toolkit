# Rule 2: Write All Exports at the End of the File

Always place **all exports at the bottom of the file**.

Do **not** use inline exports.
First declare all functions, variables, classes, types, and interfaces.
Then export them explicitly at the end of the file.

Use:

- `export { ... }` for values
- `export type { ... }` for types

This rule applies to **TypeScript, JavaScript, JSX, and TSX** and enforces a clear, predictable file structure.
