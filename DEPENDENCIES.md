### Dependency Upgrade Instructions:

1. Run `yarn outdated` to check what all dependencies needs upgrading.
2. After running `yarn outdated` command, the dependencies which are marked in green color (the ones that moved from `X.Y.Z` to `X.Y.Z+1`) can be upgraded first since they are deemed safer to upgrade w.r.t. introducing any breaking changes.
3. Use command `yarn upgrade <package-name> --latest` to upgrade dependency.
4. The dependencies need to be upgraded in batches via multiple PRs for ease of review and testing.
5. While making a major version change (`X.Y.Z` to `X+1.Y.Z`), the changelog (from the concerned library) should be added to the PR description for reviewing the breaking changes.
6. The core dependencies should preferably be upgraded first. The suggested sequence is: ([React](https://react.dev/) -> [Storybook](https://storybook.js.org/) -> [Webpack](https://webpack.js.org/) -> [Typescript](https://www.typescriptlang.org/) -> [ESLint](https://eslint.org/) -> Remaining).
7. All the dependencies related to a particular dependency should be clubbed together. For ex: `react`, `@react/types`, `react-dom`, `@types/react-dom` should be clubbed together.
8. The standalone dependencies can be clubbed together in batches of 3 or less after the core dependencies have been upgraded.
9. To upgrade all dependencies related to [Storybook](https://storybook.js.org/). Simply run `npx storybook@latest upgrade`.
10. Avoid upgrading anything that is related to [babel](https://babeljs.io/). It automatically gets upgraded to the version required while upgrading [Storybook](https://storybook.js.org/).
11. To upgrade the dependencies placed in resolutions, change the version of the dependency to the desired version manually and then simply run `yarn`.
12. Always run the following commands before raising a PR and try fixing the errors that arise (if any). If unsuccessful, raise an issue for the same.
  - `yarn`
  - `yarn lint`
  - `yarn compile`
  - `yarn build`