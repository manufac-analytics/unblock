import { AlchemyInstance } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { AssetTransfersCategory } from "alchemy-sdk";
import type { AssetTransfersResult } from "alchemy-sdk";

export function useTransferHistory(
  address: string,
  categories: AssetTransfersCategory[] = [
    AssetTransfersCategory.EXTERNAL,
    AssetTransfersCategory.INTERNAL,
    AssetTransfersCategory.ERC20,
    AssetTransfersCategory.ERC721,
    AssetTransfersCategory.ERC1155,
    AssetTransfersCategory.SPECIALNFT,
  ],
) {
  return useQuery<AssetTransfersResult[]>({
    queryKey: ["transferHistory", address, categories],
    queryFn: async (): Promise<AssetTransfersResult[]> => {
      const transfersData = await AlchemyInstance.core.getAssetTransfers({
        fromAddress: address,
        category: categories,
      });

      return transfersData.transfers;
    },
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
