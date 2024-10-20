import { ref, Ref } from 'vue';

export function useAsyncOperation<T extends (...args: any[]) => any>(
  operationFn: T,
) {
  const isProcessing: Ref<boolean> = ref(false);

  const execute = (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (isProcessing.value) {
      return;
    }
    const result = operationFn(...args);
    if (result instanceof Promise) {
      isProcessing.value = true;
      return result.finally(() => {
        isProcessing.value = false;
      }) as ReturnType<T>;
    }
    return result;
  };

  return {
    isProcessing,
    execute,
  };
}
