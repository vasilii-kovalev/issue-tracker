# Folder structure

src/  # Application source code folder
  application/  # Application shell: main layout, error boundary, global wrappers
    application.tsx
    application.module.css

  components/  # Shared components
    login-form/
      tests/
        login-form.test.tsx
      hooks/  # Component-specific React Hooks
        tests/
          use-login-form.test.ts
        use-login-form.ts
      utilities/
        tests/
          validate-email.test.ts
        validate-email.ts
      login-form.tsx
      login-form.module.css
      constants.ts
      types.ts

  features/
    users/
      hooks/  # Feature-specific React Hooks
        tests/
          use-is-authorized-user.test.ts
        use-is-authorized-user.ts
      tests/
        utilities/
          get-user.ts
        fixtures.ts
        request-handlers.ts  # MSW request handlers for mocking API requests
      api.ts   # Feature-specific Redux Toolkit Query endpoints' definitions
      constants.ts
      schemas.ts  # Schemas for data parsing and validation
      types.ts
    dates-and-time/
      tests/
        fixtures.ts
      utilities/
        tests/
          format-date.test.ts
          format-date-and-time.test.ts
        format-date.ts
        format-date-and-time.ts
      constants.ts
      schemas.ts
      types.ts

  hooks/  # Shared React Hooks
    tests/
      use-previous.test.ts
    use-previous.ts  # General purpose React Hooks

  routes/  # Routes data
    constants.ts
    routes.tsx  # Routes' definitions
    utilities/
      tests/
        get-current-user-page-path.test.ts
      get-current-user-page-path.ts

  store/  # Redux configuration
    utilities/
      get-store.ts
    api.ts  # Redux Toolkit Query API configuration
    store.ts  # Redux store configuration

  pages/  # Application's pages
    current-user-dashboard/
      tests/
        fixtures.ts
        page.test.tsx
      components/
        tests/
          left-panel.test.tsx
        left-panel.tsx
        left-panel.module.css
      hooks/  # Page-specific React Hooks
        tests/
          use-left-panel.test.ts
        use-left-panel.ts
      utilities/
        tests/
          get-left-panel-width.test.ts
        get-left-panel-width.ts
      store/  # Page-specific Redux slice data
        selectors.ts
        slice.ts
      constants.ts
      page.tsx
      page.module.css
      schemas.ts  # Page-specific schemas for data parsing and validation of the Redux slice, URL params, etc.
      types.ts
    error-forbidden/
      tests/
        page.test.tsx
      page.tsx
    login/
      tests/
        page.test.tsx
      page.tsx

  styles/  # Global styles
    reset.css  # CSS reset
    theme.css  # Theme variables and global styles

  tests/  # Integration/end-to-end tests and tests' configuration
    e2e/
      login.test.ts
    integration/
      login.test.ts
    setup-tests.ts

  types/  # Global types
    with-children.ts

  utilities/  # Shared utility functions
    tests/
      is-empty.test.ts
      is-error.test.ts
      is-null.test.ts
      local-storage.test.ts
      log-error.test.ts
    is-empty.ts
    is-error.ts
    is-null.ts
    local-storage.ts
    log-error.ts

  constants.ts  # Global constants
  main.tsx  # Application entry point
