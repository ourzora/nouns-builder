import { ContractInterface } from "ethers";
import { ReactElement } from "react";

export interface AddTransactionSection {
  title: string;
  heading?: string | string[];
  subHeading?: string | string[];
  forms: ReactElement[];
}

export interface CustomTransactionProps {
  contract?: {
    address: string
    abi: ContractInterface
    fragments: readonly any[]
    functions: {}
  };
  address: string;
  arguments?: any;
  function: {
    name: string
    inputs: any[]
  };
  calldata?: string;
  value: string;
  customABI?: string;
}