"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Truck, Clock, AlertTriangle, CheckCircle2, Search, Eye } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ShipmentItem {
  id: string
  declarationNumber: string
  company: string
  route: string
  currentLocation: string
  status: string
  progress: number
  entryPort: string
  exitPort: string
  estimatedArrival: string
  alertLevel: string
}

export function MonitoringScreen() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const shipments: ShipmentItem[] = [
    {
      id: "1",
      declarationNumber: "QC2025001234",
      company: "Công ty TNHH ABC",
      route: "Lào Cai → Hà Nội → Lạng Sơn",
      currentLocation: "Hà Nội",
      status: "transit",
      progress: 45,
      entryPort: "Lào Cai",
      exitPort: "Lạng Sơn",
      estimatedArrival: "20/01/2025 14:00",
      alertLevel: "normal"
    },
    {
      id: "2",
      declarationNumber: "QC2025001235",
      company: "Công ty CP XYZ",
      route: "Hải Phòng → Hà Nội → Lào Cai",
      currentLocation: "Đang chờ tại Hải Phòng",
      status: "waiting",
      progress: 5,
      entryPort: "Hải Phòng",
      exitPort: "Lào Cai",
      estimatedArrival: "22/01/2025 10:00",
      alertLevel: "warning"
    },
    {
      id: "3",
      declarationNumber: "QC2025001236",
      company: "Công ty TNHH DEF",
      route: "Mộc Bài → TP.HCM → Cần Thơ",
      currentLocation: "Đã đến Cần Thơ",
      status: "completed",
      progress: 100,
      entryPort: "Mộc Bài",
      exitPort: "Cần Thơ",
      estimatedArrival: "18/01/2025 16:00",
      alertLevel: "normal"
    },
    {
      id: "4",
      declarationNumber: "QC2025001237",
      company: "Công ty TNHH GHI",
      route: "Lạng Sơn → Hà Nội → Hải Phòng",
      currentLocation: "Hà Nội - Chậm tiến độ",
      status: "transit",
      progress: 35,
      entryPort: "Lạng Sơn",
      exitPort: "Hải Phòng",
      estimatedArrival: "19/01/2025 08:00",
      alertLevel: "critical"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "transit":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Đang vận chuyển</Badge>
      case "waiting":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Chờ xuất phát</Badge>
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Hoàn thành</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      default:
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header với tóm tắt */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Tổng số lô hàng</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Đang trong giám sát</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Đang vận chuyển</CardDescription>
            <CardTitle className="text-3xl text-blue-600">15</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Di chuyển trên tuyến</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Cảnh báo</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Có vấn đề cần xử lý</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Hoàn thành hôm nay</CardDescription>
            <CardTitle className="text-3xl text-green-600">6</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Đã xuất cửa khẩu</p>
          </CardContent>
        </Card>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <Card>
        <CardHeader>
          <CardTitle>Giám sát lô hàng quá cảnh</CardTitle>
          <CardDescription>Theo dõi hành trình và trạng thái lô hàng đang quá cảnh</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Tìm kiếm theo số tờ khai, doanh nghiệp..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="transit">Đang vận chuyển</SelectItem>
                <SelectItem value="waiting">Chờ xuất phát</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Cửa khẩu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả cửa khẩu</SelectItem>
                <SelectItem value="lao-cai">Lào Cai</SelectItem>
                <SelectItem value="lang-son">Lạng Sơn</SelectItem>
                <SelectItem value="hai-phong">Hải Phòng</SelectItem>
                <SelectItem value="moc-bai">Mộc Bài</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Danh sách lô hàng */}
      <div className="space-y-4">
        {shipments.map((shipment) => (
          <Card key={shipment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{shipment.declarationNumber}</h3>
                    {getStatusBadge(shipment.status)}
                    {getAlertIcon(shipment.alertLevel)}
                  </div>
                  <p className="text-sm text-muted-foreground">{shipment.company}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Chi tiết
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">Tuyến đường</p>
                    <p className="text-sm font-medium">{shipment.route}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="h-4 w-4 text-primary mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">Vị trí hiện tại</p>
                    <p className="text-sm font-medium">{shipment.currentLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-primary mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">Dự kiến đến</p>
                    <p className="text-sm font-medium">{shipment.estimatedArrival}</p>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{shipment.entryPort}</span>
                  <span>{shipment.progress}%</span>
                  <span>{shipment.exitPort}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      shipment.alertLevel === 'critical' ? 'bg-red-500' :
                      shipment.alertLevel === 'warning' ? 'bg-yellow-500' :
                      'bg-primary'
                    }`}
                    style={{ width: `${shipment.progress}%` }}
                  />
                </div>
              </div>

              {/* Alert messages */}
              {shipment.alertLevel === "critical" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Cảnh báo chậm tiến độ</p>
                    <p className="text-xs text-red-700">Lô hàng đã chậm hơn 4 giờ so với dự kiến. Cần liên hệ đơn vị vận tải.</p>
                  </div>
                </div>
              )}

              {shipment.alertLevel === "warning" && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Chờ xử lý</p>
                    <p className="text-xs text-yellow-700">Lô hàng đang chờ xác nhận xuất phát từ cửa khẩu.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
