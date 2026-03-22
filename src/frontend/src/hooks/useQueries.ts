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

export function usePlayGame() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (gameId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.playGame(gameId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
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

export function useAddGame() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (game: {
      title: string;
      genre: string;
      url: string;
      rewardAmount: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addGame(game);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
