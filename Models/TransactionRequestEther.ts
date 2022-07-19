import { BigNumber } from "ethers";

export interface TransactionRequest {
  data: string;
  erc20Token: string;
  erc721Token: string;
  executed: boolean;
  requester: string;
  to: string;
  value: BigNumber;
}
