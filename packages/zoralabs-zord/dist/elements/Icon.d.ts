/// <reference types="react" />
import { FlexProps } from '../elements/Flex';
import * as iconComponents from '../icons';
import { iconVariants } from './Icon.css';
export type IconType = keyof typeof iconComponents;
export declare const icons: ("ArrowRightAngle" | "ArrowRight" | "Auction" | "Audio" | "Bell" | "Check" | "ChevronDown" | "ChevronLeft" | "ChevronRight" | "ChevronUp" | "Close" | "Coinbase" | "Copy" | "Create" | "Discord" | "Download" | "Ellipsis" | "Embed" | "File" | "Instagram" | "Kebab" | "Logout" | "Metamask" | "Pencil" | "Plus" | "Question" | "Rainbow" | "Search" | "Shield" | "Spinner" | "Tag" | "Twitter" | "Video" | "WalletConnect" | "Warning")[];
export interface IconProps extends FlexProps {
    id?: IconType;
    flip?: boolean;
    size?: keyof typeof iconVariants['size'];
}
export declare function Icon({ id, size, flip, ...props }: IconProps): JSX.Element;
//# sourceMappingURL=Icon.d.ts.map