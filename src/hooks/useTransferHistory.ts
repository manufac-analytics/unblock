import { useQuery } from '@tanstack/react-query';
import { Alchemy, Network, AssetTransfersCategory, AssetTransfersResponse } from 'alchemy-sdk';

const AlchemySettings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const AlchemyInstance = new Alchemy(AlchemySettings);

export function useTransferHistory(address: string) {
  return useQuery<AssetTransfersResponse>({
    queryKey: ['transferHistory', address],
    queryFn: async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching transfer history:', error);
        throw new Error('Failed to fetch transfer history');
      }
    },
    enabled: typeof address === 'string' && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}