export enum ServerMessageType {
  foo = 'foo', // TODO delete
}

export type ServerMessage = {
  type: ServerMessageType.foo;
};
