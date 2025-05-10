import { AlchemyInstance } from "./utils";
import { useQuery } from "@tanstack/react-query";
import type { TokenBalance, TokenMetadataResponse } from "alchemy-sdk";

interface Balances {
  ethBalance: string;
  tokenBalances: { tokenBalance: TokenBalance; metadata: TokenMetadataResponse }[];
}

export function useBalances(address: string) {
  return useQuery<Balances>({
    queryKey: ["balances", address],
    queryFn: async (): Promise<Balances> => {
      // This calls the Alchemy API's getBalance method which makes an eth_getBalance JSON-RPC call
      // Returns the ETH balance in wei as a BigNumber, which we convert to string
      const ethBalance = await AlchemyInstance.core.getBalance(address);

      // This calls the Alchemy API's getTokenBalances method which returns all ERC-20 token balances
      // Uses the Alchemy Enhanced API (not standard JSON-RPC)
      const { tokenBalances } = await AlchemyInstance.core.getTokenBalances(address);

      // Fetch metadata for all tokens
      const tokenBalanceWithMetadata = await Promise.all(
        tokenBalances.map(async (tokenBalance) => {
          const metadata = await AlchemyInstance.core.getTokenMetadata(tokenBalance.contractAddress);
          return {
            tokenBalance,
            metadata,
          };
        }),
      );

      return {
        ethBalance: ethBalance.toString(),
        tokenBalances: tokenBalanceWithMetadata,
      };
    },
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
