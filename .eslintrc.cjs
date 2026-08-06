// ============================================================
//  TARUNYA SYSTEMS — Professional ESLint Configuration
//  ESLint 8.x | React 18 | Vite | ESM
// ============================================================

module.exports = {
  root: true,

  // ─── Environment ────────────────────────────────────────────
  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  // ─── Parser ─────────────────────────────────────────────────
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  // ─── Settings ───────────────────────────────────────────────
  settings: {
    react: {
      version: "detect", // auto-detect installed React version
    },
  },

  // ─── Plugins ────────────────────────────────────────────────
  plugins: ["react", "react-hooks"],

  // ─── Extends ────────────────────────────────────────────────
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime", // React 18 new JSX transform — no import React needed
    "plugin:react-hooks/recommended",
  ],

  // ─── Rules ──────────────────────────────────────────────────
  rules: {
    // ── React ──────────────────────────────────────────────
    "react/react-in-jsx-scope": "off",       // Not needed with new JSX transform
    "react/prop-types": "off",               // TypeScript or JSDoc handles types
    "react/no-unknown-property": "error",    // Catch invalid DOM props (e.g. class vs className)
    "react/no-unescaped-entities": "warn",   // Catch unescaped quotes/apostrophes in JSX
    "react/no-danger": "warn",               // Flag dangerouslySetInnerHTML usage for review
    "react/self-closing-comp": "warn",       // <Component /> not <Component></Component>
    "react/jsx-key": "error",                // Enforce key on list items

    // ── React Hooks ────────────────────────────────────────
    "react-hooks/rules-of-hooks": "error",   // MUST: hooks only at top level
    "react-hooks/exhaustive-deps": "warn",   // Warn on missing useEffect deps

    // ── Variables ──────────────────────────────────────────
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",             // Allow _unused function params
        varsIgnorePattern: "^_",             // Allow _unused variables
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "no-var": "error",                       // Always use const/let
    "prefer-const": ["warn", {              // Prefer const when not reassigned
      destructuring: "any",
      ignoreReadBeforeAssign: true,
    }],

    // ── Code Quality ───────────────────────────────────────
    "no-console": ["warn", {                 // Allow warn/error in production; flag log
      allow: ["warn", "error"],
    }],
    "no-debugger": "error",                  // Never commit debugger statements
    "no-alert": "warn",                      // No browser alert/confirm/prompt in UI
    "no-duplicate-imports": "error",         // One import per module
    "no-shadow": "warn",                     // Avoid variable shadowing
    "eqeqeq": ["error", "always"],           // Always ===, never ==
    "curly": ["error", "all"],               // Always braces for if/else/for
    "no-return-await": "warn",               // Avoid unnecessary async overhead
    "require-await": "warn",                 // Don't mark functions async if no await

    // ── Security ───────────────────────────────────────────
    "no-eval": "error",                      // Never eval()
    "no-implied-eval": "error",              // No setTimeout("code") patterns
    "no-new-func": "error",                  // No new Function() dynamic code exec

    // ── Best Practices ─────────────────────────────────────
    "no-param-reassign": ["warn", {         // Don't mutate function params
      props: false,                          // Allow param.prop mutations (common in reducers)
    }],
    "object-shorthand": "warn",              // { foo: foo } → { foo }
    "prefer-template": "warn",               // 'hello' + name → `hello ${name}`
    "prefer-arrow-callback": "warn",         // Arrow functions for callbacks
    "array-callback-return": "error",        // map/filter must return
  },

  // ─── Per-file Overrides ─────────────────────────────────────
  overrides: [
    // Test files — relax some prod rules
    {
      files: ["src/__tests__/**/*.{js,jsx}", "**/*.test.{js,jsx}", "**/*.spec.{js,jsx}"],
      env: { vitest: true },
      rules: {
        "no-console": "off",
        "no-unused-vars": "warn",
        "react/no-danger": "off",
      },
    },
    // Config files — they're CJS, not ESM
    {
      files: ["*.config.{js,cjs}", ".eslintrc.cjs"],
      env: { node: true },
      rules: {
        "no-console": "off",
      },
    },
  ],

  // ─── Ignore Patterns ────────────────────────────────────────
  ignorePatterns: [
    "dist/",
    "node_modules/",
    "public/",
    "*.min.js",
    "coverage/",
    "scratch/",
  ],
};
