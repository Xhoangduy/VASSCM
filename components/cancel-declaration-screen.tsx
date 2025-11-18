"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertTriangle, XCircle, FileText, Info } from 'lucide-react'

export function CancelDeclarationScreen() {
  const [cancelReason, setCancelReason] = useState("")
  const [cancelType, setCancelType] = useState<"company" | "customs" | "system">("company")

  const declaration = {
    declarationNumber: "QC2025001234",
    declarationType: "Quá cảnh (QC)",
    company: "Công ty TNHH Thương mại Quốc tế ABC",
    status: "Khai tạm",
    declarationDate: "15/01/2025",
    canCancel: true
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <XCircle className="h-6 w-6 text-red-600" />
            Hủy tờ khai
          </CardTitle>
          <CardDescription>Thực hiện hủy bỏ tờ khai đã khai báo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Số tờ khai</p>
              <p className="font-medium">{declaration.declarationNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Loại tờ khai</p>
              <p className="font-medium">{declaration.declarationType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Doanh nghiệp</p>
              <p className="font-medium">{declaration.company}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Trạng thái</p>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                {declaration.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-300 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-amber-900">Điều kiện hủy tờ khai</p>
              <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                <li>Tờ khai tạm: Có thể hủy bất kỳ lúc nào trước khi chuyển sang khai chính thức</li>
                <li>Tờ khai chính thức: Chỉ được hủy trước khi hàng hóa được xác nhận xuất phát</li>
                <li>Hệ thống tự động hủy tờ khai quá cảnh nếu sau 15 ngày không có manifest</li>
                <li>Sau khi hủy, tờ khai không thể phục hồi và cần khai báo lại từ đầu</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lý do hủy tờ khai</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Loại hủy *</Label>
            <RadioGroup value={cancelType} onValueChange={(val: "company" | "customs" | "system") => setCancelType(val)}>
              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company" className="flex-1 cursor-pointer font-normal">
                  <div>
                    <p className="font-medium">Doanh nghiệp yêu cầu hủy</p>
                    <p className="text-sm text-muted-foreground">
                      Doanh nghiệp tự nguyện hủy do thay đổi kế hoạch, sai sót thông tin
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="customs" id="customs" />
                <Label htmlFor="customs" className="flex-1 cursor-pointer font-normal">
                  <div>
                    <p className="font-medium">Cán bộ hải quan quyết định hủy</p>
                    <p className="text-sm text-muted-foreground">
                      Phát hiện vi phạm, hồ sơ không hợp lệ, không đủ điều kiện
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex-1 cursor-pointer font-normal">
                  <div>
                    <p className="font-medium">Hệ thống tự động hủy</p>
                    <p className="text-sm text-muted-foreground">
                      Quá thời hạn 15 ngày không có manifest hoặc không xuất phát
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cancel-reason">Lý do chi tiết *</Label>
            <Textarea 
              id="cancel-reason"
              placeholder="Nhập lý do cụ thể cho việc hủy tờ khai này..."
              rows={5}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Lý do hủy sẽ được lưu vào hệ thống và không thể thay đổi sau khi xác nhận
            </p>
          </div>

          {cancelType === "customs" && (
            <div className="space-y-2">
              <Label htmlFor="legal-basis">Căn cứ pháp lý</Label>
              <Textarea 
                id="legal-basis"
                placeholder="Quy định, điều khoản pháp luật làm cơ sở cho quyết định hủy..."
                rows={3}
              />
            </div>
          )}

          <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-900 font-medium">
              Cảnh báo: Hành động này không thể hoàn tác. Tờ khai sẽ bị hủy vĩnh viễn.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Quay lại</Button>
        <Button variant="destructive" className="gap-2">
          <XCircle className="h-4 w-4" />
          Xác nhận hủy tờ khai
        </Button>
      </div>
    </div>
  )
}
