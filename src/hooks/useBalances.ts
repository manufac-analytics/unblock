import { AlchemyInstance } from "./utils";
import { useQuery } from "@tanstack/react-query";

interface TokenWithMetadata {
  contractAddress?: string | null;
  tokenBalance?: string | null;
  name?: string | null;
  symbol?: string | null;
  decimals?: number | null;
}

interface Balances {
  ethBalance: string;
  tokensWithMetadata: TokenWithMetadata[];
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
      const tokenBalancesResponse = await AlchemyInstance.core.getTokenBalances(address);
      const tokenBalances = tokenBalancesResponse.tokenBalances;

      // Fetch metadata for all tokens
      const tokensWithMetadata = await Promise.all(
        tokenBalances.map(async (token) => {
          const metadata = await AlchemyInstance.core.getTokenMetadata(token.contractAddress);
          return {
            contractAddress: token.contractAddress,
            tokenBalance: token.tokenBalance,
            name: metadata.name,
            symbol: metadata.symbol,
            decimals: metadata.decimals,
          };
        }),
      );

      return {
        ethBalance: ethBalance.toString(),
        tokensWithMetadata,
      };
    },
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
