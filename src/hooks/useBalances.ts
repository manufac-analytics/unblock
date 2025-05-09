import { AlchemyInstance } from "./utils";
import { useQuery } from "@tanstack/react-query";

import type { TokenBalance } from "alchemy-sdk";

interface Balances {
  ethBalance: string;
  tokenBalances: TokenBalance[];
}

export function useBalances(address: string) {
  return useQuery<Balances>({
    queryKey: ["balances", address],
    queryFn: async () => {
      // This calls the Alchemy API's getBalance method which makes an eth_getBalance JSON-RPC call
      // Returns the ETH balance in wei as a BigNumber, which we convert to string
      const ethBalance = await AlchemyInstance.core.getBalance(address);
      // This calls the Alchemy API's getTokenBalances method which returns all ERC-20 token balances
      // Uses the Alchemy Enhanced API (not standard JSON-RPC)
      const tokenBalancesResponse = await AlchemyInstance.core.getTokenBalances(address);
      const output = {
        ethBalance: ethBalance.toString(),
        tokenBalances: tokenBalancesResponse.tokenBalances,
      };

      return output;
    },
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
