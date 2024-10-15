interface ImportMetaEnv {
  PUBLIC_SERVER_HOSTNAME?: string;
  PUBLIC_SERVER_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
