import { BaseService } from "../base/BaseService";

export class Login extends BaseService {
    async execute(): Promise<{
        success: boolean,
        msg?: string
    }> {
        return {
            success: true,
        };
    }
}
