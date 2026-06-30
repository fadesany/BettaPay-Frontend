"use client";

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { Users, AlertTriangle, ArrowUpRight, Activity, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { StatCard } from '@/components/shared/StatCard';

const PlatformVolumeChart = dynamic(() => import('@/components/charts/PlatformVolumeChart'), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full rounded-xl" />,
});

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground mt-1">
          Monitor system health, total volume, and compliance alerts.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Processed (30d)"
          icon={Activity}
          value={<CurrencyDisplay amount={1452310.89} />}
          trend={{ icon: ArrowUpRight, label: "+12.5% from last month", color: "text-green-500" }}
        />
        <StatCard
          title="Platform Fees Generated"
          icon={DollarSign}
          value={<CurrencyDisplay amount={14523.10} />}
          trend={{ label: "1.0% flat fee across volume" }}
        />
        <StatCard
          title="Active Merchants"
          icon={Users}
          value="142"
          trend={{ icon: ArrowUpRight, label: "+12 new this week", color: "text-green-500" }}
        />
        <StatCard
          title="Pending KYB Reviews"
          icon={AlertTriangle}
          value="8"
          variant="destructive"
          trend={{ label: "Requires immediate action" }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 bg-card border shadow-sm">
          <CardHeader>
            <CardTitle>Platform Volume vs Fees</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="mt-4">
              <PlatformVolumeChart height={300} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card border shadow-sm">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm font-medium">Stellar Horizon API</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">14ms ping</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm font-medium">Soroban RPC</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">42ms ping</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm font-medium">SEP-24 Anchor (NGN)</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Syncing</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <p className="text-sm font-medium">PostgreSQL Database</p>
                    <p className="text-xs text-muted-foreground">High Load</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-yellow-500">82% CPU</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
