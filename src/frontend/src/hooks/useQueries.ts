import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useListGames() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listGames();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBalance() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getBalance();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetWithdrawalRequests() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWithdrawalRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRequestWithdrawal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (amount: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.requestWithdrawal(amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
    },
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile({ username });
    },
  });
}
