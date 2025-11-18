"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, XCircle, AlertTriangle, FileText, User, Package, Truck, ArrowRight, Download } from 'lucide-react'

interface DeclarationDetail {
  declarationNumber: string
  declarationType: string
  company: string
  portEntry: string
  portExit: string
  status: string
  lane: string
  declarationDate: string
}

export function ReviewScreen() {
  const [reviewItems, setReviewItems] = useState({
    companyValid: false,
    permitValid: false,
    routeValid: false,
    goodsValid: false,
    documentComplete: false,
    riskAssessment: false
  })

  const [reviewNotes, setReviewNotes] = useState("")

  // Mock data
  const declaration: DeclarationDetail = {
    declarationNumber: "QC2025001234",
    declarationType: "Quá cảnh (QC)",
    company: "Công ty TNHH Thương mại Quốc tế ABC",
    portEntry: "Chi cục HQ Lào Cai",
    portExit: "Chi cục HQ Lạng Sơn",
    status: "Chờ kiểm tra hồ sơ",
    lane: "Vàng",
    declarationDate: "15/01/2025"
  }

  const riskIndicators = [
    { level: "Cao", description: "Doanh nghiệp có lịch sử vi phạm trong 6 tháng gần đây", type: "warning" },
    { level: "Trung bình", description: "Tuyến đường chưa được đăng ký trước", type: "info" },
    { level: "Thấp", description: "Hàng hóa thuộc danh mục giám sát thường xuyên", type: "success" }
  ]

  return (
    <div className="space-y-6">
      {/* Header với thông tin tờ khai */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Kiểm tra hồ sơ tờ khai</CardTitle>
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
              <p className="text-sm text-muted-foreground">Ngày khai báo</p>
              <p className="font-medium">{declaration.declarationDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tuyến</p>
              <p className="font-medium">{declaration.portEntry} → {declaration.portExit}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cảnh báo rủi ro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Phân tích rủi ro từ hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskIndicators.map((risk, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  risk.type === 'warning' ? 'bg-red-50 border-red-200' :
                  risk.type === 'info' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  risk.type === 'warning' ? 'bg-red-500' :
                  risk.type === 'info' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">Mức độ: {risk.level}</p>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chi tiết tờ khai */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin chi tiết tờ khai</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">
                <User className="h-4 w-4 mr-2" />
                Thông tin chung
              </TabsTrigger>
              <TabsTrigger value="transport">
                <Truck className="h-4 w-4 mr-2" />
                Vận tải
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

            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Doanh nghiệp</p>
                  <p className="font-medium">Công ty TNHH Thương mại Quốc tế ABC</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mã số thuế</p>
                  <p className="font-medium">0123456789</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Người khai</p>
                  <p className="font-medium">Nguyễn Văn A</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Số thẻ HQ</p>
                  <p className="font-medium">HQ-12345678</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cửa khẩu nhập</p>
                  <p className="font-medium">{declaration.portEntry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cửa khẩu xuất</p>
                  <p className="font-medium">{declaration.portExit}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Tuyến đường</p>
                  <p className="font-medium">Lào Cai → Hà Nội → Lạng Sơn</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transport" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Loại phương tiện</p>
                  <p className="font-medium">Xe tải (Đường bộ)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Biển số</p>
                  <p className="font-medium">29C-12345</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lái xe</p>
                  <p className="font-medium">Trần Văn B</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CMND</p>
                  <p className="font-medium">001234567890</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Số container</p>
                  <p className="font-medium">ABCU1234567</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Số seal</p>
                  <p className="font-medium">SEAL123456</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Số vận đơn</p>
                  <p className="font-medium">BL2025001234</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tổng trọng lượng</p>
                  <p className="font-medium">15,000 kg</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="goods" className="space-y-4 mt-4">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">STT</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Tên hàng</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Mã HS</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Số lượng</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Trọng lượng</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Trị giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3 text-sm">1</td>
                      <td className="px-4 py-3 text-sm">Linh kiện điện tử</td>
                      <td className="px-4 py-3 text-sm">85423190</td>
                      <td className="px-4 py-3 text-sm text-right">500</td>
                      <td className="px-4 py-3 text-sm text-right">5,000 kg</td>
                      <td className="px-4 py-3 text-sm text-right">$25,000</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 text-sm">2</td>
                      <td className="px-4 py-3 text-sm">Máy tính xách tay</td>
                      <td className="px-4 py-3 text-sm">84713010</td>
                      <td className="px-4 py-3 text-sm text-right">100</td>
                      <td className="px-4 py-3 text-sm text-right">200 kg</td>
                      <td className="px-4 py-3 text-sm text-right">$50,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 mt-4">
              <div className="space-y-3">
                {[
                  { name: "Hóa đơn thương mại", file: "invoice_2025001234.pdf", status: "complete" },
                  { name: "Giấy phép quá cảnh", file: "permit_2025001234.pdf", status: "complete" },
                  { name: "Vận đơn", file: "bl_2025001234.pdf", status: "complete" },
                  { name: "Packing List", file: "packing_2025001234.pdf", status: "complete" },
                  { name: "Giấy chứng nhận xuất xứ", file: "co_2025001234.pdf", status: "missing" }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.file}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === "complete" ? (
                        <>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Đầy đủ
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Thiếu
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Checklist kiểm tra */}
      <Card>
        <CardHeader>
          <CardTitle>Kiểm tra hồ sơ</CardTitle>
          <CardDescription>Đánh dấu các tiêu chí đã kiểm tra đạt yêu cầu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id="company" 
                checked={reviewItems.companyValid}
                onCheckedChange={(checked) => setReviewItems({...reviewItems, companyValid: checked as boolean})}
              />
              <div className="flex-1">
                <Label htmlFor="company" className="font-medium cursor-pointer">
                  Thông tin doanh nghiệp hợp lệ
                </Label>
                <p className="text-sm text-muted-foreground">
                  Kiểm tra mã số thuế, giấy phép kinh doanh, lịch sử hoạt động
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id="permit" 
                checked={reviewItems.permitValid}
                onCheckedChange={(checked) => setReviewItems({...reviewItems, permitValid: checked as boolean})}
              />
              <div className="flex-1">
                <Label htmlFor="permit" className="font-medium cursor-pointer">
                  Giấy phép quá cảnh còn hiệu lực
                </Label>
                <p className="text-sm text-muted-foreground">
                  Xác minh giấy phép đã được cấp và chưa hết hạn
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id="route" 
                checked={reviewItems.routeValid}
                onCheckedChange={(checked) => setReviewItems({...reviewItems, routeValid: checked as boolean})}
              />
              <div className="flex-1">
                <Label htmlFor="route" className="font-medium cursor-pointer">
                  Tuyến đường đã đăng ký
                </Label>
                <p className="text-sm text-muted-foreground">
                  Kiểm tra tuyến đường phù hợp với đăng ký tại GTVT
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id="goods" 
                checked={reviewItems.goodsValid}
                onCheckedChange={(checked) => setReviewItems({...reviewItems, goodsValid: checked as boolean})}
              />
              <div className="flex-1">
                <Label htmlFor="goods" className="font-medium cursor-pointer">
                  Hàng hóa khai báo chính xác
                </Label>
                <p className="text-sm text-muted-foreground">
                  So khớp thông tin hàng hóa với hóa đơn, packing list
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id="docs" 
                checked={reviewItems.documentComplete}
                onCheckedChange={(checked) => setReviewItems({...reviewItems, documentComplete: checked as boolean})}
              />
              <div className="flex-1">
                <Label htmlFor="docs" className="font-medium cursor-pointer">
                  Hồ sơ đầy đủ và hợp lệ
                </Label>
                <p className="text-sm text-muted-foreground">
                  Kiểm tra tính đầy đủ và hợp lệ của tất cả chứng từ
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id="risk" 
                checked={reviewItems.riskAssessment}
                onCheckedChange={(checked) => setReviewItems({...reviewItems, riskAssessment: checked as boolean})}
              />
              <div className="flex-1">
                <Label htmlFor="risk" className="font-medium cursor-pointer">
                  Đánh giá rủi ro hoàn tất
                </Label>
                <p className="text-sm text-muted-foreground">
                  Xem xét các cảnh báo rủi ro từ hệ thống
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="review-notes">Ghi chú kết quả kiểm tra</Label>
            <Textarea 
              id="review-notes"
              placeholder="Nhập ý kiến, nhận xét về kết quả kiểm tra hồ sơ..."
              rows={4}
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Trả lại hồ sơ
        </Button>
        <Button variant="outline" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Chuyển luồng Đỏ
        </Button>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <CheckCircle2 className="h-4 w-4" />
          Phê duyệt hồ sơ
        </Button>
      </div>
    </div>
  )
}
