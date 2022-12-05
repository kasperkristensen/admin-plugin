type DefineBackendConfig = {
  serve?: boolean;
  backendUrl?: string;
};

/**
 * Utility function to define the backend for the plugin.
 * This is used to inject the URL of the server into the build of the admin dashboard.
 * If the dashboard is served as part of the same server as the API, the URL is set to "/",
 * otherwise it needs to be set to the URL of the API.
 */
export const defineBackend = ({
  serve = true,
  backendUrl = "http://localhost:9000",
}: DefineBackendConfig) => {
  return {
    ___MEDUSA_BACKEND_URL___: JSON.stringify(serve ? "/" : backendUrl),
  };
};
