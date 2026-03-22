import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Game {
    url: string;
    title: string;
    rewardAmount: bigint;
    genre: string;
}
export type Time = bigint;
export type GameId = bigint;
export interface WithdrawalRequest {
    status: WithdrawalStatus;
    rejectionReason?: string;
    timestamp: Time;
    amount: bigint;
}
export interface UserProfile {
    username: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum WithdrawalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addGame(game: Game): Promise<GameId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getBalance(): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWithdrawalRequests(): Promise<Array<WithdrawalRequest>>;
    isCallerAdmin(): Promise<boolean>;
    listGames(): Promise<Array<Game>>;
    playGame(gameId: GameId): Promise<void>;
    requestWithdrawal(amount: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
