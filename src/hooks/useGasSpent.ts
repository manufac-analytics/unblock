import { AlchemyInstance } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { AssetTransfersCategory } from "alchemy-sdk";
import type { AssetTransfersResult } from "alchemy-sdk";

export function useGasSpent(address: string) {
  return useQuery<AssetTransfersResult[]>({
    queryKey: ["gasSpent", address],
    queryFn: async (): Promise<AssetTransfersResult[]> => {
      const gasTransfersData = await AlchemyInstance.core.getAssetTransfers({
        fromAddress: address,
        category: [AssetTransfersCategory.INTERNAL],
      });
      return gasTransfersData.transfers;
    },
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
