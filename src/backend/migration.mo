import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  type OldActor = {};

  type NewActor = {
    games : Map.Map<Nat, { title : Text; genre : Text; url : Text; rewardAmount : Nat }>;
    userBalances : Map.Map<Principal, Nat>;
    withdrawalRequests : Map.Map<Principal, List.List<{ amount : Nat; timestamp : Int; status : { #pending; #approved; #rejected }; rejectionReason : ?Text }>>;
    nextGameId : Nat;
    userProfiles : Map.Map<Principal, { username : Text }>;
  };

  public func run(_old : OldActor) : NewActor {
    {
      games = Map.empty<Nat, { title : Text; genre : Text; url : Text; rewardAmount : Nat }>();
      userBalances = Map.empty<Principal, Nat>();
      withdrawalRequests = Map.empty<Principal, List.List<{ amount : Nat; timestamp : Int; status : { #pending; #approved; #rejected }; rejectionReason : ?Text }>>();
      nextGameId = 1;
      userProfiles = Map.empty<Principal, { username : Text }>();
    };
  };
};
