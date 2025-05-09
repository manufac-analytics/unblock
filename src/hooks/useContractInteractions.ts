import { AlchemyInstance } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { AssetTransfersCategory } from "alchemy-sdk";
import type { AssetTransfersResult } from "alchemy-sdk";

export function useContractInteractions(address: string) {
  return useQuery<AssetTransfersResult[]>({
    queryKey: ["contractInteractions", address],
    queryFn: async (): Promise<AssetTransfersResult[]> => {
      const interactionsData = await AlchemyInstance.core.getAssetTransfers({
        fromAddress: address,
        category: [AssetTransfersCategory.EXTERNAL],
      });

      return interactionsData.transfers;
    },
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
