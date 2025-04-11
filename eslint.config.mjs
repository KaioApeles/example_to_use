import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['dist', 'node_modules']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}']
  },
  js.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      },
      globals: {
        console: true,
        process: true
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin
    },
    rules: {
      // Regras de qualidade
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],

      // Regras de formatação delegadas ao Prettier
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          tabWidth: 2,
          trailingComma: 'none',
          printWidth: 100
        }
      ]
    }
  }
]
