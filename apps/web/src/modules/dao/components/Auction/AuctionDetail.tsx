import { ReactNode } from "react";
import { Box, Flex } from "@zoralabs/zord";
import { auctionTextVariants } from "./Auction.css";

export const AuctionDetail = ({ title, children }: { title: string; children: ReactNode }) => (
  <Flex direction={'column'} style={{ flexBasis: '50%', flexGrow: 0 }}>
    <Box className={auctionTextVariants['tertiary']}>{title}</Box>
    <Box
      className={auctionTextVariants['secondary']}
      mt={{ '@initial': 'x1', '@768': 'x2' }}
    >
      {children}
    </Box>
  </Flex>
)
