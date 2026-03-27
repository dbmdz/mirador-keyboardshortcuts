declare module "mirador" {
  export function viewer(
    config: Record<string, unknown>,
    plugins?: unknown[],
  ): void;
}
