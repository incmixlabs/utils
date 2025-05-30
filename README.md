# Incmix Shared Utils

shared utils for frontend and back-end


## Development

### Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning and changelog generation. Each commit message should follow this format:

The type of commit determines how version numbers are incremented:

- **Major Version (1.0.0 → 2.0.0)**: Commits with `BREAKING CHANGE:` in the footer or with type `feat!:` (feat with breaking change indicator)
- **Minor Version (1.0.0 → 1.1.0)**: Commits with type `feat:` (new features)
- **Patch Version (1.0.0 → 1.0.1)**: Commits with type `fix:` (bug fixes)

Other commit types that don't trigger version changes but appear in the changelog:
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements

Commit types that are skipped from the changelog:
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks, dependency updates, etc.
- `ci:` - Changes to CI configuration files and scripts
- `build:` - Changes that affect the build system

### Publishing a New Version

To publish a new version of the package to NPM, follow these steps:

1. Make your changes on a feature branch
2. Create a pull request to the `main` branch
3. Once approved and merged, create a PR from `main` to the `release` branch
4. When the PR to `release` is merged, the following automated process will occur:
   - GitHub Actions will generate a changelog based on commit messages
   - A new release will be created with the appropriate version number
   - The package will be published to NPM

