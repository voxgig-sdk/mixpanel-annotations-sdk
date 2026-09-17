import { Context } from './Context';
declare class MixpanelAnnotationsError extends Error {
    isMixpanelAnnotationsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MixpanelAnnotationsError };
