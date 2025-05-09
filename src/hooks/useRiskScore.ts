import { AlchemyInstance } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { AssetTransfersCategory } from "alchemy-sdk";
import type { AssetTransfersResult } from "alchemy-sdk";

interface RiskScore {
  transactionCount: number;
  interactions: AssetTransfersResult[];
  riskLevel: "Low" | "Medium" | "High";
}

export function useRiskScore(address: string) {
  return useQuery<RiskScore>({
    queryKey: ["riskScore", address],
    queryFn: async (): Promise<RiskScore> => {
      // Fetch the total number of transactions sent from the address
      const transactionCount = await AlchemyInstance.core.getTransactionCount(address);

      // Fetch contract interactions
      const interactionsData = await AlchemyInstance.core.getAssetTransfers({
        fromAddress: address,
        category: [AssetTransfersCategory.EXTERNAL],
      });

      const interactions = interactionsData.transfers;

      // Determine risk level based on transaction count and interactions
      let riskLevel: "Low" | "Medium" | "High" = "Low";
      if (transactionCount < 5 || interactions.length < 5)
        riskLevel = "High"; // Few transactions or interactions = High risk
      else if (transactionCount < 20 || interactions.length < 20) riskLevel = "Medium"; // Moderate transactions or interactions = Medium risk

      return {
        transactionCount,
        interactions,
        riskLevel,
      };
    },
    enabled: typeof address === "string" && address.trim().length > 0,
    refetchOnWindowFocus: false,
  });
}
