import { BigNumber } from "ethers";

export interface TransactionRequest {
  id: BigNumber;
  data: string;
  erc20Token: string;
  erc721Token: string;
  executed: boolean;
  requester: string;
  to: string;
  value: BigNumber;
}
