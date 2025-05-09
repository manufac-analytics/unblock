import { useEffect, useState } from "react";

// Ethereum and Base API URLs with actual API keys
const EthereumURL = process.env.ETHEREUM_URL;

interface RawTransfer {
  blockNum: string;
  uniqueId: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  erc721TokenId: string | null;
  erc1155Metadata: string | null;
  tokenId: string | null;
  asset: string;
  category: string;
  rawContract: {
    value: string;
    address: string | null;
    decimal: string;
  };
}

// Custom hook to fetch and process transactions for a given address
export function useGetTransactions(address: string) {
  const [transactions, setTransactions] = useState<RawTransfer[]>([]); // Array of transactions
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    if (address === "") {
      setTransactions([]);
      setLoading(false);
      return;
    }

    const fetchTransfers = async () => {
      setLoading(true);
      const requestBody = JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "alchemy_getAssetTransfers",
        params: [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            toAddress: address,
            category: ["external", "internal", "erc20", "erc721", "erc1155"],
            excludeZeroValue: true,
            withMetadata: true,
            maxCount: "0x64",
          },
        ],
      });

      try {
        const response = await fetch(EthereumURL ?? "", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });

        const data = await response.json();
        setTransactions(data.result?.transfers || []);
      } catch (error) {
        console.error("Failed to fetch Ethereum transfers:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, [address]);

  return { transactions, loading };
}
