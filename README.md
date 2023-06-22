### About used Technologies

- [Vite](https://vitejs.dev/)
- [Tauri](https://tauri.app/v1/guides/getting-started/setup/vite) by using `yarn create tauri-app` command
- [React](https://reactjs.org/) by using `yarn create vite` command
  - using React Typescript template

### Getting started

- use `yarn install` to install dependencies
- Make sure you installed Rust Click [here](https://tauri.app/v1/guides/getting-started/prerequisites/)
- use `yarn dev` to start the react app in development mode
- use `yarn tauri dev` to start the app in development mode
- use `yarn tauri build` to build the app

### Used Dependencies

- For Styling: [Tailwindcss](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/), [theme-change](https://www.npmjs.com/package/theme-change)
- React-CodeMirror: [codemirror](https://www.npmjs.com/package/@uiw/react-codemirror)
- Pretty-bytes: [pretty-bytes](https://www.npmjs.com/package/pretty-bytes)

### Project Structure

- root
  - src (react app)
    - assets
    - components
    - utils
    - App.tsx
  - src-tauri (tauri app)
  - package.json
  - config Files
    - vite.config.ts
    - tailwind.config.cjs
    - postcss.config.cjs
    - .eslintrc.cjs
    - .prettierrc.cjs
    - tsconfig.json
    - tsconfig.node.json
  - README.md
  - TODO.md
