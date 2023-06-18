export type CommonResultStatus =
  | {
      succeed: true;
    }
  | {
      succeed: false;
      msg: string;
    };
