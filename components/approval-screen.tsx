"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle, FileText, Clock, User, Package } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ApprovalHistory {
  step: string
  officer: string
  timestamp: string
  result: string
  notes: string
}

export function ApprovalScreen() {
  const [approvalNotes, setApprovalNotes] = useState("")

  const declaration = {
    declarationNumber: "QC2025001234",
    declarationType: "Quá cảnh (QC)",
    company: "Công ty TNHH Thương mại Quốc tế ABC",
    status: "Chờ phê duyệt",
    lane: "Vàng",
    submittedDate: "15/01/2025 10:30"
  }

  const approvalHistory: ApprovalHistory[] = [
    {
      step: "Tiếp nhận tờ khai",
      officer: "Nguyễn Văn A",
      timestamp: "15/01/2025 10:30",
      result: "Đã tiếp nhận",
      notes: "Tờ khai được tiếp nhận vào hệ thống"
    },
    {
      step: "Phân luồng tự động",
      officer: "Hệ thống",
      timestamp: "15/01/2025 10:31",
      result: "Luồng Vàng",
      notes: "Hệ thống phân tích rủi ro: Luồng Vàng - Kiểm tra hồ sơ"
    },
    {
      step: "Kiểm tra hồ sơ",
      officer: "Trần Thị B",
      timestamp: "15/01/2025 14:20",
      result: "Đạt",
      notes: "Hồ sơ đầy đủ, hợp lệ. Thông tin khai báo chính xác."
    }
  ]

  const checklistItems = [
    { label: "Hồ sơ đầy đủ và hợp lệ", checked: true },
    { label: "Thông tin doanh nghiệp xác thực", checked: true },
    { label: "Giấy phép quá cảnh còn hiệu lực", checked: true },
    { label: "Tuyến đường đã đăng ký", checked: true },
    { label: "Hàng hóa không thuộc danh mục cấm", checked: true },
    { label: "Không có cảnh báo rủi ro cao", checked: true }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Phê duyệt tờ khai quá cảnh</CardTitle>
              <CardDescription>Số tờ khai: {declaration.declarationNumber}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-300">
                {declaration.lane}
              </Badge>
              <Badge variant="outline">{declaration.status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Loại tờ khai</p>
              <p className="font-medium">{declaration.declarationType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Doanh nghiệp</p>
              <p className="font-medium">{declaration.company}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ngày nộp</p>
              <p className="font-medium">{declaration.submittedDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Luồng kiểm tra</p>
              <Badge className="bg-yellow-500">{declaration.lane}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử xử lý tờ khai</CardTitle>
          <CardDescription>Quá trình xử lý và kiểm tra tờ khai từ khi nộp đến nay</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {approvalHistory.map((item, index) => (
                <div key={index} className="relative flex gap-4">
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{item.step}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.officer} • {item.timestamp}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {item.result}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kiểm tra điều kiện phê duyệt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">{item.label}</span>
                {item.checked ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin chi tiết tờ khai</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">
                <FileText className="h-4 w-4 mr-2" />
                Thông tin chung
              </TabsTrigger>
              <TabsTrigger value="goods">
                <Package className="h-4 w-4 mr-2" />
                Hàng hóa
              </TabsTrigger>
              <TabsTrigger value="documents">
                <FileText className="h-4 w-4 mr-2" />
                Tài liệu
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-4">
              <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Cửa khẩu nhập</p>
                  <p className="font-medium">Chi cục HQ Lào Cai</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cửa khẩu xuất</p>
                  <p className="font-medium">Chi cục HQ Lạng Sơn</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nước xuất khẩu</p>
                  <p className="font-medium">Trung Quốc</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nước nhập khẩu</p>
                  <p className="font-medium">Lào</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Tuyến đường</p>
                  <p className="font-medium">Lào Cai → Hà Nội → Lạng Sơn</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="goods" className="mt-4">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Tên hàng</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Mã HS</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Số lượng</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Trọng lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3 text-sm">Linh kiện điện tử</td>
                      <td className="px-4 py-3 text-sm">85423190</td>
                      <td className="px-4 py-3 text-sm text-right">500 kg</td>
                      <td className="px-4 py-3 text-sm text-right">5,000 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <div className="space-y-2">
                {["Hóa đơn thương mại", "Giấy phép quá cảnh", "Vận đơn", "Packing List"].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{doc}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Đầy đủ
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ý kiến phê duyệt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="approval-notes">Ghi chú phê duyệt</Label>
            <Textarea 
              id="approval-notes"
              placeholder="Nhập ý kiến, ghi chú về quyết định phê duyệt..."
              rows={4}
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Trả lại sửa đổi
        </Button>
        <Button variant="destructive" className="gap-2">
          <XCircle className="h-4 w-4" />
          Từ chối
        </Button>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <CheckCircle2 className="h-4 w-4" />
          Phê duyệt tờ khai
        </Button>
      </div>
    </div>
  )
}
