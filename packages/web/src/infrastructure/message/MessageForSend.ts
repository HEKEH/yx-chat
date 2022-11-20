import { MessageTypeEnum } from "./MessageTypeEnum"

/** 所有需要发送的消息的父类 */
export abstract class MessageForSend {
    private readonly _key: string
    abstract get type(): MessageTypeEnum
    abstract get data(): any
    abstract get name(): string // 消息名称
    get key() {
        return this._key;
    }
    constructor(props: {
        key: string
    }) {
        this._key = props.key;
    }
}
