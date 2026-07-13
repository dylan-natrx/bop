/**
 * Forbid imports across app/projects/* boundaries.
 *
 * The platform owns infrastructure; projects own design. A project may
 * import from lib/platform/ and from itself. It may never import from
 * another project, and platform code may never import from a project.
 * This is a rule, not a convention: two projects looking similar should
 * be a coincidence of taste, never a consequence of architecture.
 *
 * Generic on purpose — adding a new project requires no ESLint change.
 */

import path from 'node:path'

const PROJECTS_SEGMENT = `${path.sep}src${path.sep}app${path.sep}projects${path.sep}`

/** Which project (if any) a repo file path belongs to. */
function projectOf(absPath) {
  const idx = absPath.indexOf(PROJECTS_SEGMENT)
  if (idx === -1) return null
  const rest = absPath.slice(idx + PROJECTS_SEGMENT.length)
  const slug = rest.split(path.sep)[0]
  return slug || null
}

/** Resolve an import specifier to an absolute-ish path, or null if external. */
function resolveImport(specifier, importerAbsPath, cwd) {
  if (specifier.startsWith('@/')) {
    return path.join(cwd, 'src', specifier.slice(2))
  }
  if (specifier.startsWith('.')) {
    return path.resolve(path.dirname(importerAbsPath), specifier)
  }
  return null // bare package import
}

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Projects under app/projects/* are isolated: no imports across project boundaries, and no platform imports into a project.',
    },
    schema: [],
    messages: {
      crossProject:
        'Import crosses a project boundary ({{from}} -> {{to}}). Projects own their code outright; duplicate it or move it to lib/platform/ if it is genuinely infrastructure.',
      intoProject:
        'Platform code must not import from a project ({{to}}). The platform owns infrastructure only.',
    },
  },
  create(context) {
    const importerPath = context.filename ?? context.getFilename()
    const cwd = context.cwd ?? context.getCwd()
    const importerProject = projectOf(importerPath)

    function check(node, specifier) {
      if (typeof specifier !== 'string') return
      const target = resolveImport(specifier, importerPath, cwd)
      if (!target) return
      const targetProject = projectOf(target)
      if (!targetProject) return
      if (importerProject === targetProject) return
      context.report({
        node,
        messageId: importerProject ? 'crossProject' : 'intoProject',
        data: { from: importerProject ?? 'platform', to: targetProject },
      })
    }

    return {
      ImportDeclaration(node) {
        check(node, node.source.value)
      },
      ImportExpression(node) {
        if (node.source.type === 'Literal') check(node, node.source.value)
      },
      ExportNamedDeclaration(node) {
        if (node.source) check(node, node.source.value)
      },
      ExportAllDeclaration(node) {
        check(node, node.source.value)
      },
    }
  },
}

export default {
  rules: { 'no-cross-project-imports': rule },
}
