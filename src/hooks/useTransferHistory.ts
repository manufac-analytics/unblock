import { useQuery } from "@tanstack/react-query";
import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";
import type { AssetTransfersResponse, AssetTransfersResult } from "alchemy-sdk";

const AlchemySettings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const AlchemyInstance = new Alchemy(AlchemySettings);

export function useTransferHistory(address: string) {
  return useQuery<AssetTransfersResponse>({
    queryKey: ["transferHistory", address],
    queryFn: async (): Promise<AssetTransfersResponse> => {
      const result = await AlchemyInstance.core.getAssetTransfers({
        fromAddress: address,
        category: [
          AssetTransfersCategory.EXTERNAL,
          AssetTransfersCategory.INTERNAL,
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.ERC721,
          AssetTransfersCategory.ERC1155,
          AssetTransfersCategory.SPECIALNFT,
        ],
      });

      // Explicit return type is already declared, so this is safe
      return result;
    },
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
