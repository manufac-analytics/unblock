import { AlchemyInstance } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { AssetTransfersCategory } from "alchemy-sdk";
import type { AssetTransfersResult } from "alchemy-sdk";

export interface RiskScore {
  transactionCount: number;
  interactions: AssetTransfersResult[];
  riskLevel: "low" | "medium" | "high";
}

export function useRiskScore(address: string) {
  return useQuery<RiskScore>({
    queryKey: ["riskScore", address],
    queryFn: async (): Promise<RiskScore> => {
      // Fetch the total number of transactions sent from the address
      const transactionCount = await AlchemyInstance.core.getTransactionCount(address);

      // Fetch contract interactions
      const { transfers: interactions } = await AlchemyInstance.core.getAssetTransfers({
        fromAddress: address,
        category: [AssetTransfersCategory.EXTERNAL],
      });

      // Determine risk level based on transaction count and interactions
      let riskLevel: RiskScore["riskLevel"] = "low";
      if (transactionCount < 5 || interactions.length < 5)
        riskLevel = "high"; // Few transactions or interactions = High risk
      else if (transactionCount < 20 || interactions.length < 20) {
        riskLevel = "medium"; // Moderate transactions or interactions = Medium risk
      }

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
