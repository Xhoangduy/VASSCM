import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, AlertCircle, Package } from 'lucide-react'

export function DashboardStats() {
  const stats = [
    {
      title: "Tổng tờ khai",
      value: "248",
      icon: FileText,
      trend: "+12.5%",
      trendUp: true,
      color: "text-primary"
    },
    {
      title: "Đã phê duyệt",
      value: "186",
      icon: CheckCircle,
      trend: "+8.2%",
      trendUp: true,
      color: "text-success"
    },
    {
      title: "Đang xử lý",
      value: "42",
      icon: AlertCircle,
      trend: "-3.1%",
      trendUp: false,
      color: "text-warning"
    },
    {
      title: "Đang giám sát",
      value: "156",
      icon: Package,
      trend: "+15.8%",
      trendUp: true,
      color: "text-info"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.trendUp ? 'text-success' : 'text-destructive'}`}>
                {stat.trend} so với tháng trước
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
