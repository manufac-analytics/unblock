import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

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

export function useBalances(address: string) {
  const [balances, setBalances] = useState<Balances | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address === "") {
      setBalances(null);
      setLoading(false);
    } else {
      const fetchBalances = async () => {
        setLoading(true);
        try {
          // This calls the Alchemy API's getBalance method which makes an eth_getBalance JSON-RPC call
          // Returns the ETH balance in wei as a BigNumber, which we convert to string
          const ethBalance = await alchemy.core.getBalance(address);
          // This calls the Alchemy API's getTokenBalances method which returns all ERC-20 token balances
          // Uses the Alchemy Enhanced API (not standard JSON-RPC)
          const tokenBalancesResponse = await alchemy.core.getTokenBalances(address);
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
                const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
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
          setBalances({
            ethBalance: ethBalance.toString(), // Convert BigNumber to string
            tokenBalances,
          });
        } catch (error) {
          console.error("Failed to fetch balances:", error);
          setBalances(null);
        } finally {
          setLoading(false);
        }
      };

      fetchBalances();
    }
  }, [address]);

  return { balances, loading };
}
