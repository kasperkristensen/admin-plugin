import { env } from "process";

export const defineBackend = (serve?: boolean) => {
  return {
    ___MEDUSA_BACKEND_URL___: JSON.stringify(
      serve ? "/" : env.MEDUSA_BACKEND_URL || "http://localhost:9000"
    ),
  };
};
