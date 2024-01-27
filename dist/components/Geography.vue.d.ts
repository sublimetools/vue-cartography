declare const _default: import("vue").DefineComponent<{
    geography: {
        type: StringConstructor;
        required: true;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        required: true;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        required: true;
    };
    scale: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    filter: {
        type: StringConstructor;
    };
    fill: {
        type: StringConstructor;
        default: string;
    };
    stroke: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    geography: {
        type: StringConstructor;
        required: true;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        required: true;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        required: true;
    };
    scale: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    filter: {
        type: StringConstructor;
    };
    fill: {
        type: StringConstructor;
        default: string;
    };
    stroke: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    scale: string | number;
    stroke: string;
    fill: string;
}, {}>;
export default _default;
