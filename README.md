# Front-end challenge of Manscaped

## Introduction
- This is main structure of the website where the configuration, the components, images, fonts... constructed
```
root
│   README.md
|   package.json
|   (tailwind.config.js, postcss.config.js, tsconfig.json, yarn.lock, .babelrc, eslintrc.json,...)
|   index.tsx: the root component where all root configs should be placed
│
└───assets
│   └───images: stores the local images (PNG, JPG, SVG...)
│   └───fonts: stores the local font files
|
└───components: list of component that can be reusable everywhere.
└───constants: the immutable variables that will be used to config constant values for many purposes.
└───contexts: locates all the Contexts to share state among components to avoid prop drilling.
└───pages: list of page-level components that constructed from many child components.
└───styles: contains SCSS configuration to be included in root components.
└───types: locates all interfaces or types
└───hooks: custom hooks
└───mocks: mock transform files.
└───public: contains files that was built for production deployment
└───fixtures: sample contents
└───docs: contains media assets for document.
```

- This project is using TailwindCSS to make less effort when styling. Also the benefits of removing redundant CSS classes of Tailwind can make the app reduce a lot of file size.
- Using React to compose many components for "separation of concerns" where we can modify the logic or CSS easier inside it. Rather than the many long-line of code in the same place.
- Using Typescript to guarantee the website can be more good to read without many comments.
- Using NextJS for server-side rendering purpose.
- Using testing-library and Jest for unit testing.

- As the new requirement, I have updated the code and structure to apply NextJS; the previous is only ReactJS.

## User story
- For the real-world scenario here, we have *Cart* page and *Checkout* page corresponding *Admin* page and *View* page per requirement mentioned. You guys can modify anything from *Cart* page such as product quantity, remove products, and edit user information... Afterwards, you can click on the *Checkout* button below to move to *Checkout* page to finish the process of cart payment.

## Install dependencies

Run command `yarn install`

## How to start

Run command `yarn start`.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Tech stack
- NextJS
- ReactJS
- TailwindCSS
- React-intl
- Typescript
- SASS
- Jest, testing-library
- ESLint, Babel,

## What should you review?
- The folder structure.
- The coding style and syntax.
- Unit testing.
- The reusable components.
- The knowledge and idea of coding.
- The scenarios that applied for the requirement.
- Typescript types' and interfaces' structures.
- Responsive website for tablet and mobile.