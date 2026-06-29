"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorDisplay } from "@/components/shared/ErrorDisplay";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  RefreshCcw,
  ExternalLink,
  Inbox,
  Wallet,
} from "lucide-react";
import { useNotify } from "@/lib/hooks/useNotify";
import { useAuthStore } from "@/lib/store/authStore";
import { useWalletStore } from "@/lib/store/walletStore";
import Image from "next/image";
import { memo, useEffect, useCallback } from "react";

interface WalletTx {
  id: string;
  type: "receive" | "send";
  label: string;
  amount: number;
  time: string;
}

const WalletActivityItem = memo(function WalletActivityItem({ tx }: { tx: WalletTx }) {
  return (
    <div
      className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-muted transition-colors"
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === "receive" ? "bg-emerald-100" : "bg-primary/20"}`}
      >
        {tx.type === "receive" ? (
          <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
        ) : (
          <ArrowUpRight className="w-4 h-4 text-primary" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">
          {tx.label}
        </p>
        <p className="text-xs text-muted-foreground">{tx.time}</p>
      </div>
      <span
        className={`text-sm font-semibold ${tx.type === "receive" ? "text-emerald-600" : "text-foreground"}`}
      >
        {tx.type === "receive" ? "+" : "-"}
        {tx.amount.toFixed(2)} USDC
      </span>
    </div>
  );
});

const mockTxHistory: WalletTx[] = [
  {
    id: "w1",
    type: "receive",
    label: "Payment from link_02",
    amount: 45.5,
    time: "2h ago",
  },
  {
    id: "w2",
    type: "receive",
    label: "Payment from link_01",
    amount: 750,
    time: "5h ago",
  },
  {
    id: "w3",
    type: "send",
    label: "Settlement to GTBank",
    amount: 1200,
    time: "Yesterday",
  },
  {
    id: "w4",
    type: "receive",
    label: "Payment from link_03",
    amount: 29,
    time: "Yesterday",
  },
];

function BalanceSkeleton() {
  return (
    <Card className="border border-border bg-card shadow-sm">
      <CardContent className="flex items-center gap-3 p-4">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function WalletPage() {
  const { user } = useAuthStore();
  const { address: walletAddress, balances, loading, error, refreshBalances } = useWalletStore();
  const { success } = useNotify();

  const address = walletAddress ?? user?.id ?? "";
  const shortAddress = address ? `${address.substring(0, 8)}...${address.slice(-6)}` : "";

  useEffect(() => {
    if (address) {
      refreshBalances();
    }
  }, [address, refreshBalances]);

  const handleCopy = useCallback(() => {
    if (address) {
      navigator.clipboard.writeText(address);
      success("Address copied");
    }
  }, [address, success]);

  const handleRefresh = useCallback(() => {
    refreshBalances();
  }, [refreshBalances]);

  const primaryBalance = balances.length > 0
    ? balances.reduce((max, b) => parseFloat(b.balance) > parseFloat(max.balance) ? b : max, balances[0])
    : null;

  return (
    <div className="space-y-8 pb-8">
      <div>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">
          Stellar Wallet
        </p>
        <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your non-custodial Stellar wallet for receiving crypto payments.
        </p>
      </div>

      {/* Wallet Card */}
      <div className="relative rounded-2xl overflow-hidden bg-foreground p-4 sm:p-6 text-background shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-contain bg-background/10"
              />
              <span className="font-bold text-lg">BettaPay</span>
            </div>
            <span className="text-xs bg-background/10 px-3 py-1 rounded-full font-medium">
              Stellar Network
            </span>
          </div>

          {primaryBalance && !loading && (
            <div className="mb-6">
              <p className="text-xs text-background/50 uppercase tracking-wider mb-1">
                {primaryBalance.assetCode} Balance
              </p>
              <p className="text-4xl font-bold">
                {parseFloat(primaryBalance.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 7 })}{" "}
                <span className="text-lg font-normal text-background/60">{primaryBalance.assetCode}</span>
              </p>
            </div>
          )}

          {loading && (
            <div className="mb-6">
              <p className="text-xs text-background/50 uppercase tracking-wider mb-1">
                Loading...
              </p>
              <p className="text-4xl font-bold">
                <Skeleton className="h-10 w-48 bg-background/20 inline-block" />
              </p>
            </div>
          )}

          {!primaryBalance && !loading && (
            <div className="mb-6">
              <p className="text-xs text-background/50 uppercase tracking-wider mb-1">
                Wallet
              </p>
              <p className="text-2xl font-bold text-background/60">
                Multi-Asset Wallet
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-background/50 mb-1">Wallet Address</p>
              <p className="font-mono text-xs sm:text-sm text-background/80 break-all">{shortAddress || "Not connected"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleCopy}
                variant="ghost"
                aria-label="Copy wallet address"
                className="h-8 w-8 p-0 rounded-lg bg-background/10 hover:bg-background/20 text-primary-foreground"
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
              <a
                href={`https://stellar.expert/explorer/testnet/account/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on Stellar Expert"
                className="h-8 w-8 p-0 rounded-lg bg-background/10 hover:bg-background/20 text-primary-foreground flex items-center justify-center transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && balances.length === 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <BalanceSkeleton />
          <BalanceSkeleton />
          <BalanceSkeleton />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <ErrorDisplay message={error} onRetry={handleRefresh} />
      )}

      {/* Empty State (unfunded account) */}
      {!loading && !error && balances.length === 0 && address && (
        <Card className="border border-border bg-card shadow-sm">
          <CardContent>
            <EmptyState
              icon={Wallet}
              title="No assets found"
              description="This account has no balances yet. Fund it with XLM or add a trustline to get started."
              action={{ label: "Refresh", onClick: handleRefresh }}
            />
          </CardContent>
        </Card>
      )}

      {/* Balances */}
      {!loading && balances.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {balances.map((asset) => (
            <Card
              key={`${asset.assetCode}${asset.assetIssuer || ''}`}
              className="border border-border bg-card shadow-sm"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {asset.assetCode}
                    </p>
                    {asset.assetIssuer && (
                      <p className="text-xs text-muted-foreground break-all mt-0.5" title={asset.assetIssuer}>
                        Issuer: {asset.assetIssuer.substring(0, 8)}...{asset.assetIssuer.slice(-6)}
                      </p>
                    )}
                  </div>
                  {asset.assetCode === 'USDC' && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-600 bg-emerald-50">
                      Stable
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {parseFloat(asset.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 7 })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No address / not connected */}
      {!address && (
        <EmptyState
          icon={Wallet}
          title="No wallet connected"
          description="Connect a Stellar wallet to view your balances."
        />
      )}

      {/* Transaction history */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Wallet Activity
            </CardTitle>
            <CardDescription>Recent on-chain transactions</CardDescription>
          </div>
          <Button
            variant="ghost"
            aria-label="Refresh balances"
            className="text-xs text-muted-foreground h-7 px-2 rounded-lg"
            onClick={handleRefresh}
          >
            <RefreshCcw className="w-3 h-3 mr-1.5" /> Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {mockTxHistory.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No wallet activity yet"
              description="On-chain transactions will appear here once your wallet receives payments."
            />
          ) : (
            <div className="space-y-2">
              {mockTxHistory.map((tx) => (
                <WalletActivityItem key={tx.id} tx={tx} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
