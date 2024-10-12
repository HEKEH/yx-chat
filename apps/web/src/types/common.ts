export type CommonResultStatus =
  | {
      success: true;
    }
  | {
      success: false;
      msg: string;
    };
