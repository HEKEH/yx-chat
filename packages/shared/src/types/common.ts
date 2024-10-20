export type CommonResult =
  | {
      success: true;
    }
  | { success: false; message: string };
