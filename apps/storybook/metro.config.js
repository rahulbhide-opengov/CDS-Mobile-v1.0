const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// Watch all packages in the monorepo
config.watchFolders = [monorepoRoot]

// Resolve modules from monorepo root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
]

// Force resolving from monorepo root to avoid duplicate React instances
config.resolver.disableHierarchicalLookup = true

module.exports = config
