interface ImportMetaEnv {
  PUBLIC_SERVER_BASE_URL?: string;
  PUBLIC_SERVER_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
