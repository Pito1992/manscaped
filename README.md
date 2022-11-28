# Front-end challenge of Manscaped

## Introduction
- This is main structure of the website where the configuration, the components, images, fonts... constructed
```
src
│   README.md
|   package.json
|   (tailwind.config.js, postcss.config.js, tsconfig.json, yarn.lock...)
│
└───src
│   │   index.tsx: the root component where all root configs should be placed
│   │
│   └───assets
│   │   └───images: stores the local images (PNG, JPG, SVG...)
|   │   └───fonts: stores the local font files
|   |
│   └───components: list of component that can be reusable everywhere.
│   └───constants: the immutable variables that will be used to config constant values for many purposes.
│   └───pages: list of page-level components that constructed from many child components.
│   └───styles: contains SCSS configuration to be included in root components.
│   └───types: locates all interfaces or types
|
└───public: contains files that was built for production deployment
```

- This project is using TailwindCSS to make less effort when styling. Also the benefits of removing redundant CSS classes of Tailwind can make the app reduce a lot of file size.
- Using React to compose many components for "separation of concerns" where we can modify the logic or CSS easier inside it. Rather than the many long-line of code in the same place.
- Using Typescript to guarantee the website can be more good to read without many comments.

## Install dependencies

Run command `yarn install`

## How to start

Run command `yarn start`.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Tech stack
- ReactJS
- TailwindCSS
- React-intl
- Typescript
- SASS
- And some supports from create-react-app to bootstrap the website quickly.

## What should you review?
- The folder structure.
- The code syntax.
- The reusable components.
- The knowledge and idea of coding.