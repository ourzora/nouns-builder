import * as styles from './mixins.css';
export type Mixins = typeof styles;
export type MixinsProp<M = Mixins> = {
    [P in keyof M]: Partial<keyof M[P]> | undefined | true;
};
export declare function mixins(mixinsProp: Partial<MixinsProp>): string;
//# sourceMappingURL=mixins.d.ts.map