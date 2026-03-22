import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Time "mo:core/Time";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  type GameId = Nat;
  type UserProfile = {
    username : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Game = {
    title : Text;
    genre : Text;
    url : Text;
    rewardAmount : Nat;
  };

  public type WithdrawalStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type WithdrawalRequest = {
    amount : Nat;
    timestamp : Time.Time;
    status : WithdrawalStatus;
    rejectionReason : ?Text;
  };

  private func getNextGameId() : GameId {
    let currentId = nextGameId;
    nextGameId += 1;
    currentId;
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func addGame(game : Game) : async GameId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add games");
    };
    let gameId = getNextGameId();
    games.add(gameId, game);
    gameId;
  };

  public query ({ caller }) func listGames() : async [Game] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list games");
    };
    games.values().toArray();
  };

  public shared ({ caller }) func playGame(gameId : GameId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can play games");
    };
    switch (games.get(gameId)) {
      case (null) { Runtime.trap("Game not found") };
      case (?game) {
        let currentBalance = switch (userBalances.get(caller)) {
          case (null) { 0 };
          case (?balance) { balance };
        };
        userBalances.add(caller, currentBalance + game.rewardAmount);
      };
    };
  };

  public shared ({ caller }) func requestWithdrawal(amount : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can request withdrawals");
    };

    let currentBalance = switch (userBalances.get(caller)) {
      case (null) { 0 };
      case (?balance) { balance };
    };

    if (amount > currentBalance) {
      Runtime.trap("Insufficient balance for withdrawal request");
    };

    let request : WithdrawalRequest = {
      amount;
      timestamp = Time.now();
      status = #pending;
      rejectionReason = null;
    };

    let existingRequests = switch (withdrawalRequests.get(caller)) {
      case (null) {
        let newList = List.empty<WithdrawalRequest>();
        newList.add(request);
        newList;
      };
      case (?requests) {
        requests.add(request);
        requests;
      };
    };
    withdrawalRequests.add(caller, existingRequests);
  };

  public query ({ caller }) func getBalance() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their balance");
    };
    switch (userBalances.get(caller)) {
      case (null) { 0 };
      case (?balance) { balance };
    };
  };

  public query ({ caller }) func getWithdrawalRequests() : async [WithdrawalRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their withdrawal requests");
    };
    switch (withdrawalRequests.get(caller)) {
      case (null) { [] };
      case (?requests) { requests.toArray() };
    };
  };

  var nextGameId = 1;

  let games = Map.empty<GameId, Game>();
  let userBalances = Map.empty<Principal, Nat>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let withdrawalRequests = Map.empty<Principal, List.List<WithdrawalRequest>>();
};
