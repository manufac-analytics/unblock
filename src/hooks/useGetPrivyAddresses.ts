import { useQuery, UseQueryResult } from "@tanstack/react-query";

const PollingInterval = 5 * 60 * 1000;

// Ref:https://docs.privy.io/wallets/wallets/get-a-wallet/get-all-wallets#rest-api
interface Wallet {
  id: string;
  address: string;
  chain_type: string;
  policy_ids: string[];
  additional_signers: string[];
  owner_id: string;
  created_at: number;
}

interface PrivyResponse {
  wallets: Wallet[];
}
console.log("Privy API Key", process.env.PRIVY_API_KEY);

//Ref:https://docs.privy.io/api-reference/introduction#examples
export function useGetPrivyAddresses(): UseQueryResult<PrivyResponse> {
  return useQuery({
    queryKey: ["privyAddresses"],
    queryFn: async () => {
      const options: RequestInit = {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa("cmaezmfbx028jjv0m9dkb7zl7" + ":" + process.env.PRIVY_API_KEY)}`, // TODO: read from env
          "privy-app-id": "cmaezmfbx028jjv0m9dkb7zl7",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("https://api.privy.io/v1/wallets", options);

      if (response.ok === false) {
        throw new Error("Failed to fetch Privy data");
      }

      const data: PrivyResponse = await response.json();

      return data;
    },
    refetchInterval: PollingInterval,
    staleTime: PollingInterval,
  });
}
