import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import platformBoundaries from './eslint-rules/no-cross-project-imports.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // Project isolation is enforced, not conventional: no imports across
    // app/projects/* boundaries anywhere in the codebase.
    files: ['src/**/*.{ts,tsx,js,jsx,mjs}'],
    plugins: { platform: platformBoundaries },
    rules: { 'platform/no-cross-project-imports': 'error' },
  },
]

export default eslintConfig
