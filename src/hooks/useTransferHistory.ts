import { AlchemyInstance } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { AssetTransfersCategory } from "alchemy-sdk";
import type { AssetTransfersResponse } from "alchemy-sdk";

export function useTransferHistory(address: string) {
  return useQuery<AssetTransfersResponse>({
    queryKey: ["transferHistory", address],
    queryFn: async () => {
      const transfersData = await AlchemyInstance.core.getAssetTransfers({
        fromAddress: address,
        category: [
          AssetTransfersCategory.EXTERNAL,
          AssetTransfersCategory.INTERNAL,
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.ERC721,
          AssetTransfersCategory.ERC1155,
        ],
      });
      return transfersData;
    },
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
