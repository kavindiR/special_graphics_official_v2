'use client';

import { useState } from 'react';
import {
  Users,
  Image,
  Trophy,
  TrendingUp,
  DollarSign,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  MoreVertical,
  Activity,
  Target,
  Zap,
  Award,
  Star,
  Calendar,
  TrendingDown,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface StatCard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
  color: string;
  bgGradient: string;
}

const statCards: StatCard[] = [
  {
    title: 'Total Users',
    value: '12,847',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: Users,
    trend: 'up',
    color: 'text-gray-700',
    bgGradient: 'from-gray-700 to-gray-900',
  },
  {
    title: 'Active Designs',
    value: '3,421',
    change: 8.2,
    changeLabel: 'vs last month',
    icon: Image,
    trend: 'up',
    color: 'text-gray-900',
    bgGradient: 'from-gray-800 to-gray-900',
  },
  {
    title: 'Running Contests',
    value: '89',
    change: -3.1,
    changeLabel: 'vs last month',
    icon: Trophy,
    trend: 'down',
    color: 'text-gray-700',
    bgGradient: 'from-gray-600 to-gray-800',
  },
  {
    title: 'Total Revenue',
    value: '$124,567',
    change: 15.3,
    changeLabel: 'vs last month',
    icon: DollarSign,
    trend: 'up',
    color: 'text-gray-900',
    bgGradient: 'from-gray-800 to-gray-900',
  },
];

const performanceMetrics = [
  { label: 'Conversion Rate', value: '3.24%', change: 0.12, trend: 'up' },
  { label: 'Avg. Response Time', value: '2.4s', change: -0.3, trend: 'down' },
  { label: 'Customer Satisfaction', value: '4.8/5', change: 0.2, trend: 'up' },
  { label: 'Active Projects', value: '234', change: 12, trend: 'up' },
];

const recentActivities = [
  {
    id: 1,
    type: 'user',
    action: 'New user registered',
    user: 'John Doe',
    email: 'john.doe@example.com',
    time: '2 minutes ago',
    status: 'success',
    avatar: 'JD',
  },
  {
    id: 2,
    type: 'design',
    action: 'Design submitted',
    user: 'Sarah Miller',
    email: 'sarah.m@example.com',
    time: '15 minutes ago',
    status: 'success',
    avatar: 'SM',
  },
  {
    id: 3,
    type: 'contest',
    action: 'Contest created',
    user: 'Mike Johnson',
    email: 'mike.j@example.com',
    time: '1 hour ago',
    status: 'success',
    avatar: 'MJ',
  },
  {
    id: 4,
    type: 'user',
    action: 'User reported',
    user: 'Alex Brown',
    email: 'alex.b@example.com',
    time: '2 hours ago',
    status: 'warning',
    avatar: 'AB',
  },
  {
    id: 5,
    type: 'design',
    action: 'Design rejected',
    user: 'Emma Wilson',
    email: 'emma.w@example.com',
    time: '3 hours ago',
    status: 'error',
    avatar: 'EW',
  },
  {
    id: 6,
    type: 'payment',
    action: 'Payment processed',
    user: 'David Lee',
    email: 'david.l@example.com',
    time: '4 hours ago',
    status: 'success',
    avatar: 'DL',
  },
];

const topDesigners = [
  {
    id: 1,
    name: 'Alexandra Chen',
    designs: 234,
    rating: 4.9,
    revenue: '$12,450',
    avatar: 'AC',
    badge: 'Top Rated',
    completionRate: 98,
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    designs: 189,
    rating: 4.8,
    revenue: '$9,820',
    avatar: 'MR',
    badge: 'Pro',
    completionRate: 95,
  },
  {
    id: 3,
    name: 'Sophie Anderson',
    designs: 156,
    rating: 4.9,
    revenue: '$8,340',
    avatar: 'SA',
    badge: 'Top Rated',
    completionRate: 97,
  },
  {
    id: 4,
    name: 'David Kim',
    designs: 142,
    rating: 4.7,
    revenue: '$7,650',
    avatar: 'DK',
    badge: 'Pro',
    completionRate: 94,
  },
];

const recentTransactions = [
  {
    id: 1,
    user: 'John Smith',
    type: 'Contest Entry',
    amount: '$299',
    status: 'completed',
    date: '2024-01-15',
    time: '10:30 AM',
  },
  {
    id: 2,
    user: 'Emily Davis',
    type: 'Design Purchase',
    amount: '$450',
    status: 'completed',
    date: '2024-01-15',
    time: '09:15 AM',
  },
  {
    id: 3,
    user: 'Robert Wilson',
    type: 'Premium Upgrade',
    amount: '$99',
    status: 'pending',
    date: '2024-01-15',
    time: '08:45 AM',
  },
  {
    id: 4,
    user: 'Lisa Brown',
    type: 'Contest Entry',
    amount: '$299',
    status: 'completed',
    date: '2024-01-14',
    time: '11:20 PM',
  },
];

// Simple chart component using CSS
function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const normalizedData = data.map((val) => ((val - min) / range) * 100);

  return (
    <div className="flex items-end gap-1 h-12 w-full">
      {normalizedData.map((height, index) => (
        <div
          key={index}
          className="flex-1 rounded-t transition-all duration-300 hover:opacity-80"
          style={{
            height: `${height}%`,
            background: `linear-gradient(to top, ${color}, ${color}dd)`,
            minHeight: '4px',
          }}
        />
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const chartData = [45, 52, 48, 61, 55, 67, 72, 68, 75, 70, 78, 82];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1.5 text-sm">
            Monitor your platform performance and key metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
            {['7d', '30d', '90d', '1y'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={
                  selectedPeriod === period
                    ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }
              >
                {period}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient background accent */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}
              />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient} shadow-lg shadow-${stat.color.split('-')[1]}-500/25`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg ${
                      stat.trend === 'up'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.changeLabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Performance Metrics</h2>
            <p className="text-sm text-gray-600 mt-1">Key performance indicators</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric) => (
            <div
              key={metric.label}
              className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow"
            >
              <p className="text-xs font-medium text-gray-600 mb-2">{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <span
                  className={`text-xs font-semibold ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-blue-600'
                  }`}
                >
                  {metric.trend === 'up' ? '+' : ''}
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
              <p className="text-sm text-gray-600 mt-1">Last 12 months</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">$124,567</p>
                <p className="text-sm text-gray-600 mt-1">Total Revenue</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+15.3%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">vs last period</p>
              </div>
            </div>
            <MiniChart data={chartData} color="#1f2937" />
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">$12,450</p>
                <p className="text-xs text-gray-600">This Month</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">$11,230</p>
                <p className="text-xs text-gray-600">Last Month</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">234</p>
                <p className="text-xs text-gray-600">Transactions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Designers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Top Designers</h2>
              <p className="text-sm text-gray-600 mt-1">This month</p>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {topDesigners.map((designer) => (
              <div
                key={designer.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
              >
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 text-white font-semibold text-sm shadow-sm">
                    {designer.avatar}
                  </div>
                  {designer.badge === 'Top Rated' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-yellow-900 fill-yellow-900" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {designer.name}
                    </p>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                      {designer.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>{designer.designs} designs</span>
                    <span className="text-yellow-600 font-semibold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-yellow-600" />
                      {designer.rating}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-semibold text-gray-900">{designer.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-gray-900 h-1.5 rounded-full transition-all"
                        style={{ width: `${designer.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{designer.revenue}</p>
                  <p className="text-xs text-gray-500">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-600 mt-1">Latest platform events</p>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 group"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback
                    className={`${
                      activity.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : activity.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    } font-semibold`}
                  >
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{activity.user}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </p>
                </div>
                <Badge
                  variant={
                    activity.status === 'success'
                      ? 'default'
                      : activity.status === 'warning'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className="capitalize"
                >
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
              <p className="text-sm text-gray-600 mt-1">Payment history</p>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{transaction.user}</p>
                    <p className="text-xs text-gray-600">{transaction.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{transaction.amount}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {transaction.date} {transaction.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="secondary"
            className="h-auto py-4 flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
          >
            <Users className="w-6 h-6" />
            <span className="text-sm font-medium">Manage Users</span>
          </Button>
          <Button
            variant="secondary"
            className="h-auto py-4 flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
          >
            <Image className="w-6 h-6" />
            <span className="text-sm font-medium">Review Designs</span>
          </Button>
          <Button
            variant="secondary"
            className="h-auto py-4 flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
          >
            <Trophy className="w-6 h-6" />
            <span className="text-sm font-medium">Create Contest</span>
          </Button>
          <Button
            variant="secondary"
            className="h-auto py-4 flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm font-medium">View Analytics</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
