// Conventional Commits, e.g. "feat(T04): add design tokens" or "docs: update plan".
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Allow task IDs such as T04 as the scope.
    "scope-case": [0],
    // Allow normal sentence case subjects ("Add tokens") as well as lower case.
    "subject-case": [0],
  },
};

export default config;
