"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Download, FileSpreadsheet, FileText, BarChart3, TrendingUp, Package, Clock, AlertTriangle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export function ReportsScreen() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Tổng tờ khai tháng này
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,248</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </Badge>
              <span className="text-xs text-muted-foreground">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Đang giám sát
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">342</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-info/10 text-info border-info/20">
                Đang vận chuyển
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Thời gian xử lý TB
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">2.4h</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                -18%
              </Badge>
              <span className="text-xs text-muted-foreground">nhanh hơn trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              Vi phạm cảnh báo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">8</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                Cần xử lý
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Báo cáo thống kê</CardTitle>
          <CardDescription>Tạo và xuất các báo cáo tùy chỉnh</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="report-type">Loại báo cáo *</Label>
                <Select>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Chọn loại báo cáo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="declaration-summary">Tổng hợp tờ khai</SelectItem>
                    <SelectItem value="by-port">Theo cửa khẩu</SelectItem>
                    <SelectItem value="by-company">Theo doanh nghiệp</SelectItem>
                    <SelectItem value="by-lane">Theo luồng kiểm tra</SelectItem>
                    <SelectItem value="by-goods">Theo loại hàng hóa</SelectItem>
                    <SelectItem value="violation">Vi phạm và cảnh báo</SelectItem>
                    <SelectItem value="processing-time">Thời gian xử lý</SelectItem>
                    <SelectItem value="revenue">Doanh thu phí lệ phí</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-from-date">Từ ngày *</Label>
                <Input id="report-from-date" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-to-date">Đến ngày *</Label>
                <Input id="report-to-date" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-port">Cửa khẩu</Label>
                <Select>
                  <SelectTrigger id="report-port">
                    <SelectValue placeholder="Tất cả cửa khẩu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả cửa khẩu</SelectItem>
                    <SelectItem value="lao-cai">Chi cục HQ Lào Cai</SelectItem>
                    <SelectItem value="lang-son">Chi cục HQ Lạng Sơn</SelectItem>
                    <SelectItem value="moc-bai">Chi cục HQ Mộc Bài</SelectItem>
                    <SelectItem value="hai-phong">Chi cục HQ Hải Phòng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-declaration-type">Loại tờ khai</Label>
                <Select>
                  <SelectTrigger id="report-declaration-type">
                    <SelectValue placeholder="Tất cả loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="QC">Quá cảnh (QC)</SelectItem>
                    <SelectItem value="TC">Trung chuyển (TC)</SelectItem>
                    <SelectItem value="CCK">Chuyển khẩu (CCK)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-format">Định dạng xuất</Label>
                <Select defaultValue="excel">
                  <SelectTrigger id="report-format">
                    <SelectValue placeholder="Chọn định dạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Xem báo cáo
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Xuất báo cáo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Báo cáo mẫu có sẵn</CardTitle>
          <CardDescription>Tải xuống các báo cáo thống kê thường dùng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Báo cáo tháng</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Tổng hợp hoạt động tháng hiện tại
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                    <Download className="h-3 w-3" />
                    Tải xuống
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Phân tích luồng</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Phân bố tờ khai theo luồng kiểm tra
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                    <Download className="h-3 w-3" />
                    Tải xuống
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Top doanh nghiệp</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Doanh nghiệp có số lượng tờ khai nhiều nhất
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                    <Download className="h-3 w-3" />
                    Tải xuống
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Hiệu suất xử lý</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Thời gian xử lý trung bình theo cửa khẩu
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                    <Download className="h-3 w-3" />
                    Tải xuống
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Hàng hóa phổ biến</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Thống kê theo mã HS và loại hàng hóa
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                    <Download className="h-3 w-3" />
                    Tải xuống
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Cảnh báo vi phạm</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Danh sách vi phạm và xử lý
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                    <Download className="h-3 w-3" />
                    Tải xuống
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
