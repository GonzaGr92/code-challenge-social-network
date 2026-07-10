import simpleImportSort from "eslint-plugin-simple-import-sort";

const config = [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports.
            ["^\\u0000"],
            // Packages. react related packages come first.
            ["^react", "^@?\\w"],
            // Absolute imports and other imports such as @/foo, lib/foo.
            // Anything that does not start with a dot.
            ["^[^.]"],
            // Relative imports.
            // Anything that starts with a dot.
            ["^\\."],
            // Style imports.
            ["^.+\\.s?css$", "^.+\\.less$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];

export default config;
