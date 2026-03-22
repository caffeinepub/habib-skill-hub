import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  CheckCircle2,
  Clock,
  Coins,
  ExternalLink,
  Gamepad2,
  Loader2,
  LogOut,
  Plus,
  Shield,
  Trophy,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { WithdrawalStatus } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddGame,
  useGetBalance,
  useGetWithdrawalRequests,
  useIsAdmin,
  useListGames,
  usePlayGame,
  useRequestWithdrawal,
} from "../hooks/useQueries";

const GENRE_COLORS: Record<string, string> = {
  Action: "oklch(0.65 0.22 25)",
  RPG: "oklch(0.65 0.22 290)",
  Strategy: "oklch(0.65 0.22 195)",
  Puzzle: "oklch(0.65 0.22 145)",
  Sports: "oklch(0.72 0.2 60)",
  Adventure: "oklch(0.65 0.2 230)",
  Simulation: "oklch(0.65 0.18 170)",
  Racing: "oklch(0.7 0.22 40)",
  Runner: "oklch(0.68 0.22 50)",
  Social: "oklch(0.65 0.2 310)",
};

function genreColor(genre: string) {
  return GENRE_COLORS[genre] ?? "oklch(0.6 0.12 260)";
}

const DEMO_GAMES = [
  {
    id: BigInt(0),
    title: "Candy Crush",
    genre: "Puzzle",
    rewardAmount: BigInt(5),
    url: "https://www.king.com/game/candycrush",
  },
  {
    id: BigInt(1),
    title: "Subway Surfers",
    genre: "Runner",
    rewardAmount: BigInt(10),
    url: "https://www.kiloo.com/subway-surfers/",
  },
  {
    id: BigInt(2),
    title: "Among Us",
    genre: "Social",
    rewardAmount: BigInt(15),
    url: "https://www.innersloth.com/games/among-us/",
  },
  {
    id: BigInt(3),
    title: "Clash of Clans",
    genre: "Strategy",
    rewardAmount: BigInt(20),
    url: "https://supercell.com/en/games/clashofclans/",
  },
];

function StatusBadge({ status }: { status: WithdrawalStatus }) {
  if (status === WithdrawalStatus.approved) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
        style={{
          background: "oklch(0.65 0.22 145 / 0.15)",
          color: "oklch(0.82 0.2 145)",
        }}
      >
        <CheckCircle2 className="w-3 h-3" />
        Approved
      </span>
    );
  }
  if (status === WithdrawalStatus.rejected) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
        style={{
          background: "oklch(0.577 0.245 27 / 0.15)",
          color: "oklch(0.75 0.2 27)",
        }}
      >
        <XCircle className="w-3 h-3" />
        Rejected
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{
        background: "oklch(0.72 0.18 60 / 0.15)",
        color: "oklch(0.82 0.18 60)",
      }}
    >
      <Clock className="w-3 h-3" />
      Pending
    </span>
  );
}

type DemoGame = (typeof DEMO_GAMES)[number];
type BackendGame = {
  title: string;
  genre: string;
  rewardAmount: bigint;
  url: string;
};
type DisplayGame = DemoGame | BackendGame;

function getGameId(game: DisplayGame, index: number): bigint {
  return "id" in game ? (game as DemoGame).id : BigInt(index);
}

function GameCard({
  game,
  index,
  isDemo,
}: {
  game: DisplayGame;
  index: number;
  isDemo: boolean;
}) {
  const { mutateAsync: playGame, isPending: playing } = usePlayGame();
  const [earned, setEarned] = useState(false);

  const handleEarnReward = async () => {
    if (isDemo) {
      toast.info("Connect your wallet to earn real rewards!");
      return;
    }
    try {
      await playGame(getGameId(game, index));
      setEarned(true);
      toast.success(`+$${Number(game.rewardAmount)} added to your balance!`);
      setTimeout(() => setEarned(false), 3000);
    } catch {
      toast.error("Failed to earn reward. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="game-card rounded-xl p-5 flex flex-col gap-4"
      data-ocid={`games.item.${index + 1}`}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${genreColor(game.genre)}22` }}
        >
          <Gamepad2
            className="w-5 h-5"
            style={{ color: genreColor(game.genre) }}
          />
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: `${genreColor(game.genre)}20`,
            color: genreColor(game.genre),
          }}
        >
          {game.genre}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-display font-semibold text-foreground text-sm leading-snug">
          {game.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-2">
          <Coins
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.82 0.18 60)" }}
          />
          <span
            className="text-sm font-bold"
            style={{ color: "oklch(0.82 0.18 60)" }}
          >
            ${Number(game.rewardAmount)} reward
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            background: "oklch(0.72 0.18 195 / 0.15)",
            color: "oklch(0.88 0.16 195)",
            border: "1px solid oklch(0.72 0.18 195 / 0.3)",
          }}
          data-ocid={`games.play.button.${index + 1}`}
        >
          Play Now <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button
          type="button"
          onClick={handleEarnReward}
          disabled={playing}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: earned
              ? "oklch(0.65 0.22 145 / 0.3)"
              : "oklch(0.65 0.22 145 / 0.15)",
            color: "oklch(0.82 0.2 145)",
            border: "1px solid oklch(0.65 0.22 145 / 0.3)",
          }}
          data-ocid={`games.earn.button.${index + 1}`}
        >
          {playing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Earning...
            </>
          ) : earned ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Earned!
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5" />
              Earn Reward
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { identity, clear } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: games, isLoading: gamesLoading } = useListGames();
  const { data: balance } = useGetBalance();
  const { data: withdrawals, isLoading: withdrawalsLoading } =
    useGetWithdrawalRequests();
  const { mutateAsync: requestWithdrawal, isPending: withdrawing } =
    useRequestWithdrawal();
  const { data: isAdmin } = useIsAdmin();
  const { mutateAsync: addGame, isPending: addingGame } = useAddGame();
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [newGame, setNewGame] = useState({
    title: "",
    genre: "",
    url: "",
    rewardAmount: "",
  });

  if (!identity) {
    navigate({ to: "/" });
    return null;
  }

  const displayGames: DisplayGame[] =
    games && games.length > 0 ? games : DEMO_GAMES;
  const isDemo = !games || games.length === 0;
  const balanceNum = balance !== undefined ? Number(balance) : 0;

  const handleLogout = () => {
    clear();
    navigate({ to: "/" });
  };

  const handleWithdraw = async () => {
    const amt = Number(withdrawAmount);
    if (!withdrawAmount || Number.isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (amt > balanceNum) {
      toast.error("Insufficient balance.");
      return;
    }
    try {
      await requestWithdrawal(BigInt(Math.floor(amt)));
      toast.success("Withdrawal request submitted!");
      setWithdrawOpen(false);
      setWithdrawAmount("");
    } catch {
      toast.error("Withdrawal failed. Please try again.");
    }
  };

  const handleAddGame = async () => {
    if (
      !newGame.title ||
      !newGame.genre ||
      !newGame.url ||
      !newGame.rewardAmount
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    const rewardAmt = Number(newGame.rewardAmount);
    if (Number.isNaN(rewardAmt) || rewardAmt <= 0) {
      toast.error("Invalid reward amount.");
      return;
    }
    try {
      await addGame({
        title: newGame.title,
        genre: newGame.genre,
        url: newGame.url,
        rewardAmount: BigInt(Math.floor(rewardAmt)),
      });
      toast.success("Game added successfully!");
      setAdminOpen(false);
      setNewGame({ title: "", genre: "", url: "", rewardAmount: "" });
    } catch {
      toast.error("Failed to add game. Please try again.");
    }
  };

  const statColor = (c: string) => `oklch(0.72 0.18 ${c} / 0.07)`;
  const statBorder = (c: string) => `1px solid oklch(0.72 0.18 ${c} / 0.2)`;
  const statIconColor = (c: string) => ({ color: `oklch(0.82 0.16 ${c})` });

  const stats = [
    {
      label: "Current Balance",
      value: `$${balanceNum.toLocaleString()}`,
      Icon: Wallet,
      color: "195",
    },
    {
      label: "Games Available",
      value: String(displayGames.length),
      Icon: Gamepad2,
      color: "145",
    },
    {
      label: "Withdrawals",
      value: String(withdrawals?.length ?? 0),
      Icon: ArrowDownToLine,
      color: "290",
    },
    {
      label: "Top Reward",
      value: `$${Math.max(...displayGames.map((g) => Number(g.rewardAmount))).toLocaleString()}`,
      Icon: Trophy,
      color: "60",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "oklch(var(--card) / 0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "oklch(var(--border))",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2
              className="w-6 h-6"
              style={{ color: "oklch(0.88 0.16 195)" }}
            />
            <span className="font-display text-lg font-bold text-foreground">
              Game Site
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="balance-glow hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl"
              data-ocid="dashboard.balance.card"
            >
              <Coins
                className="w-4 h-4"
                style={{ color: "oklch(0.82 0.18 60)" }}
              />
              <span className="font-display font-bold text-sm text-foreground">
                ${balanceNum.toLocaleString()}
              </span>
              <span className="text-muted-foreground text-xs">balance</span>
            </div>
            {isAdmin && (
              <Dialog open={adminOpen} onOpenChange={setAdminOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground"
                    data-ocid="admin.add_game.open_modal_button"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </Button>
                </DialogTrigger>
                <DialogContent data-ocid="admin.dialog">
                  <DialogHeader>
                    <DialogTitle className="font-display text-lg flex items-center gap-2">
                      <Shield
                        className="w-5 h-5"
                        style={{ color: "oklch(0.82 0.18 290)" }}
                      />
                      Add New Game
                    </DialogTitle>
                    <DialogDescription>
                      Add a new game to the platform for users to play and earn
                      rewards.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="game-title">Title</Label>
                      <Input
                        id="game-title"
                        placeholder="Awesome Game"
                        value={newGame.title}
                        onChange={(e) =>
                          setNewGame((p) => ({ ...p, title: e.target.value }))
                        }
                        data-ocid="admin.game_title.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="game-genre">Genre</Label>
                      <Input
                        id="game-genre"
                        placeholder="Action, Puzzle, RPG..."
                        value={newGame.genre}
                        onChange={(e) =>
                          setNewGame((p) => ({ ...p, genre: e.target.value }))
                        }
                        data-ocid="admin.game_genre.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="game-url">Game URL</Label>
                      <Input
                        id="game-url"
                        placeholder="https://..."
                        value={newGame.url}
                        onChange={(e) =>
                          setNewGame((p) => ({ ...p, url: e.target.value }))
                        }
                        data-ocid="admin.game_url.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="game-reward">Reward Amount ($)</Label>
                      <Input
                        id="game-reward"
                        type="number"
                        min="1"
                        placeholder="10"
                        value={newGame.rewardAmount}
                        onChange={(e) =>
                          setNewGame((p) => ({
                            ...p,
                            rewardAmount: e.target.value,
                          }))
                        }
                        data-ocid="admin.game_reward.input"
                      />
                    </div>
                  </div>
                  <DialogFooter className="gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setAdminOpen(false)}
                      data-ocid="admin.cancel_button"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddGame}
                      disabled={addingGame}
                      style={{
                        background: "oklch(0.65 0.22 290)",
                        color: "oklch(0.1 0.02 290)",
                      }}
                      data-ocid="admin.submit_button"
                    >
                      {addingGame ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Game
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-muted-foreground hover:text-foreground"
              data-ocid="nav.logout.button"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-5 space-y-3"
              style={{
                background: statColor(stat.color),
                border: statBorder(stat.color),
              }}
            >
              <stat.Icon
                className="w-5 h-5"
                style={statIconColor(stat.color)}
              />
              <div>
                <div className="font-display text-xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs mt-0.5">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Games */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Available Games
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">
                {isDemo
                  ? "Demo games — connect to see live games"
                  : "Play games to earn rewards"}
              </p>
            </div>
            <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
              <DialogTrigger asChild>
                <Button
                  className="gap-2 font-semibold"
                  style={{
                    background: "oklch(0.72 0.18 195)",
                    color: "oklch(0.1 0.01 195)",
                  }}
                  data-ocid="dashboard.withdraw.open_modal_button"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="withdrawal.dialog">
                <DialogHeader>
                  <DialogTitle className="font-display text-lg">
                    Request Withdrawal
                  </DialogTitle>
                  <DialogDescription>
                    Your current balance is{" "}
                    <strong>${balanceNum.toLocaleString()}</strong>. Enter the
                    amount you'd like to withdraw.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount">Amount ($)</Label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      min="1"
                      max={balanceNum}
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      data-ocid="withdrawal.amount.input"
                    />
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setWithdrawOpen(false)}
                    data-ocid="withdrawal.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleWithdraw}
                    disabled={withdrawing}
                    style={{
                      background: "oklch(0.72 0.18 195)",
                      color: "oklch(0.1 0.01 195)",
                    }}
                    data-ocid="withdrawal.confirm_button"
                  >
                    {withdrawing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Withdrawal"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {gamesLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              data-ocid="games.loading_state"
            >
              {["a", "b", "c", "d"].map((k) => (
                <div
                  key={k}
                  className="rounded-xl h-52 animate-pulse"
                  style={{ background: "oklch(var(--card))" }}
                />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              data-ocid="games.list"
            >
              {displayGames.map((game, i) => (
                <GameCard
                  key={"id" in game ? String((game as { id: bigint }).id) : i}
                  game={game}
                  index={i}
                  isDemo={isDemo}
                />
              ))}
            </div>
          )}
        </section>

        {/* Withdrawal History */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-6">
            Withdrawal History
          </h2>
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid oklch(var(--border))" }}
          >
            {withdrawalsLoading ? (
              <div
                className="p-8 text-center"
                data-ocid="withdrawals.loading_state"
              >
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
              </div>
            ) : !withdrawals || withdrawals.length === 0 ? (
              <div
                className="p-10 text-center space-y-2"
                data-ocid="withdrawals.empty_state"
              >
                <ArrowDownToLine className="w-8 h-8 mx-auto text-muted-foreground opacity-40" />
                <p className="text-muted-foreground text-sm">
                  No withdrawal requests yet.
                </p>
                <p className="text-muted-foreground text-xs">
                  Play games to earn rewards, then withdraw your balance.
                </p>
              </div>
            ) : (
              <Table data-ocid="withdrawals.table">
                <TableHeader>
                  <TableRow style={{ borderColor: "oklch(var(--border))" }}>
                    <TableHead className="text-muted-foreground font-medium">
                      Date
                    </TableHead>
                    <TableHead className="text-muted-foreground font-medium">
                      Amount
                    </TableHead>
                    <TableHead className="text-muted-foreground font-medium">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((w, i) => (
                    <TableRow
                      key={`${String(w.timestamp)}-${String(w.amount)}`}
                      style={{ borderColor: "oklch(var(--border))" }}
                      data-ocid={`withdrawals.row.${i + 1}`}
                    >
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(
                          Number(w.timestamp) / 1_000_000,
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        ${Number(w.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={w.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </section>
      </main>

      <footer
        className="border-t mt-16 py-6"
        style={{ borderColor: "oklch(var(--border))" }}
      >
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
