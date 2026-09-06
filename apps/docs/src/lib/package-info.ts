import packageJson from '../../../../packages/hooks/package.json';

/**
 * Single import point for the published package's metadata.
 * Routes reach it through the `@/` alias so moving a page between route
 * groups never breaks a relative path.
 */
export const packageVersion = packageJson.version;
export const packageName = packageJson.name;
export const packageDescription = packageJson.description;
