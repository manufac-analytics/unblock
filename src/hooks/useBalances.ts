import { useQuery } from "@tanstack/react-query";
import { Alchemy, Network } from "alchemy-sdk";
interface AlchemySettingsType {
  apiKey: string | undefined;
  network: Network;
}
interface TokenBalance {
  contractAddress: string;
  tokenBalance: string | null;
  symbol: string;
  decimals: number;
}
interface Balances {
  ethBalance: string;
  tokenBalances: TokenBalance[];
}

const AlchemySettings: AlchemySettingsType = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const AlchemyInstance = new Alchemy(AlchemySettings);

const fetchBalances = async (address: string): Promise<Balances> => {
  // This calls the Alchemy API's getBalance method which makes an eth_getBalance JSON-RPC call
  // Returns the ETH balance in wei as a BigNumber, which we convert to string
  const ethBalance = await AlchemyInstance.core.getBalance(address);
  // This calls the Alchemy API's getTokenBalances method which returns all ERC-20 token balances
  // Uses the Alchemy Enhanced API (not standard JSON-RPC)
  const tokenBalancesResponse = await AlchemyInstance.core.getTokenBalances(address);
  // Process each token to get additional metadata like symbol and decimals
  const tokenBalances: TokenBalance[] = await Promise.all(
    tokenBalancesResponse.tokenBalances.map(async (token) => {
      let result: TokenBalance;
      if (token.error !== null) {
        result = {
          contractAddress: token.contractAddress,
          tokenBalance: token.tokenBalance,
          symbol: "Unknown",
          decimals: 0,
        };
      } else {
        const metadata = await AlchemyInstance.core.getTokenMetadata(token.contractAddress);
        result = {
          contractAddress: token.contractAddress,
          tokenBalance: token.tokenBalance,
          symbol: metadata.symbol || "Unknown",
          decimals: metadata.decimals || 0,
        };
      }

      return result;
    }),
  );

  return {
    ethBalance: ethBalance.toString(), // Convert BigNumber to string
    tokenBalances,
  };
};

export function useBalances(address: string) {
  return useQuery<Balances>({
    queryKey: ["balances", address],
    queryFn: () => fetchBalances(address),
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
