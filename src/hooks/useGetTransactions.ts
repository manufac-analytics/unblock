import { useEffect, useState } from "react";

// Ethereum and Base API URLs with actual API keys
const EthereumURL = process.env.ETHEREUM_URL;
const BaseURL = process.env.BASE_URL;

// Determines the direction of the transaction: sent or received
const inferDirection = (address: string, from: string, _to: string): "sent" | "received" =>
  address.toLowerCase() === from.toLowerCase() ? "sent" : "received";
// Source tagging logic to categorize transaction sources: "privy", "bridge", or "json"
const inferSource = (transaction: RawTransfer): "privy" | "bridge" | "json" =>
  transaction.category === "bridge" ? "bridge" : transaction.category === "privy" ? "privy" : "json";
// Define the interface for the response structure
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

interface Transaction extends RawTransfer {
  direction: "sent" | "received";
  source: "privy" | "bridge" | "json";
}

// Custom hook to fetch and process transactions for a given address
export function useGetTransactions(address: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Array of transactions
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    if (address === "") {
      setTransactions([]);
      setLoading(false);
    } else {
      const fetchTransfers = async () => {
        setLoading(true);

        const ethereumRequestBody = JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "alchemy_getAssetTransfers",
          params: [
            {
              fromBlock: "0x0",
              toBlock: "latest",
              toAddress: address,
              category: ["external", "internal", "erc20", "erc721", "erc1155"], // Ethereum supports "internal"
              excludeZeroValue: true,
              withMetadata: true,
              maxCount: "0x64",
            },
          ],
        });

        const baseRequestBody = JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "alchemy_getAssetTransfers",
          params: [
            {
              fromBlock: "0x0",
              toBlock: "latest",
              toAddress: address,
              category: ["external", "erc20", "erc721", "erc1155"], // Exclude "internal" for Base
              excludeZeroValue: true,
              withMetadata: true,
              maxCount: "0x64",
            },
          ],
        });

        try {
          const [ethResponse, baseResponse] = await Promise.all([
            fetch(EthereumURL ?? "", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: ethereumRequestBody,
            }),
            fetch(BaseURL ?? "", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: baseRequestBody,
            }),
          ]);

          const [ethData, baseData] = await Promise.all([ethResponse.json(), baseResponse.json()]);

          const mergedTransactions = [...ethData.result.transfers, ...baseData.result.transfers].map(
            (transaction: RawTransfer) => ({
              ...transaction,
              direction: inferDirection(address, transaction.from, transaction.to),
              source: inferSource(transaction), // Pass the transaction object here
            }),
          );

          setTransactions(mergedTransactions);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchTransfers(); // Call the function to fetch transfers
    }
  }, [address]);

  return { transactions, loading }; // Return transactions and loading state
}
