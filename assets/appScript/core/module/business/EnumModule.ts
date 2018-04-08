module ConstEnum {
    export enum Test {
        ok = 'ok',
        fail = 'fail',
    };
    export enum WebHttpStatu {
        success = '200',
        fail = '0',
    }
}
export default function()  {
    return ConstEnum;
};