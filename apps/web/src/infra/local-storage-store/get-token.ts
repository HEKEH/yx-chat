import { LocalStorageStore } from '.';

export default function getToken() {
  return LocalStorageStore.instance.getItem<string | undefined>('token');
}
