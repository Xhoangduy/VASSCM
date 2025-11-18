"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Save, Send, Upload, Plus, Trash2, X, AlertCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface GoodsItem {
  id: string
  goodsName: string
  hsCode: string
  quantity: string
  unit: string
  weight: string
  value: string
  origin: string
  description: string
}

interface Document {
  id: string
  name: string
  type: string
  file?: File
}

export function DeclarationForm({ mode = "new" }: { mode?: "new" | "temp" | "edit" }) {
  const [declarationMode, setDeclarationMode] = useState<"temp" | "official">("temp")
  const [goodsList, setGoodsList] = useState<GoodsItem[]>([
    {
      id: '1',
      goodsName: '',
      hsCode: '',
      quantity: '',
      unit: '',
      weight: '',
      value: '',
      origin: '',
      description: ''
    }
  ])

  const [documents, setDocuments] = useState<Document[]>([])

  const addGoodsItem = () => {
    const newItem: GoodsItem = {
      id: Date.now().toString(),
      goodsName: '',
      hsCode: '',
      quantity: '',
      unit: '',
      weight: '',
      value: '',
      origin: '',
      description: ''
    }
    setGoodsList([...goodsList, newItem])
  }

  const removeGoodsItem = (id: string) => {
    if (goodsList.length > 1) {
      setGoodsList(goodsList.filter(item => item.id !== id))
    }
  }

  const handleFileUpload = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newDocs = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: type,
        file: file
      }))
      setDocuments([...documents, ...newDocs])
    }
  }

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  return (
    <div className="space-y-6">
      {mode === "edit" && (
        <Card className="border-yellow-300 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Chế độ sửa đổi tờ khai</p>
                <p className="text-sm text-yellow-700">
                  Bạn đang sửa đổi tờ khai đã khai báo. Các thay đổi phải được phê duyệt trước khi có hiệu lực.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                {mode === "edit" ? "Sửa đổi tờ khai" : "Khai báo tờ khai"}
              </CardTitle>
              <CardDescription>
                {mode === "edit" 
                  ? "Cập nhật thông tin tờ khai đã khai báo" 
                  : "Nhập đầy đủ thông tin chi tiết cho tờ khai mới theo quy định"}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={declarationMode === "temp" ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"}>
                {declarationMode === "temp" ? "Khai tạm" : "Khai chính thức"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Thông tin chung</TabsTrigger>
              <TabsTrigger value="transport">Vận tải</TabsTrigger>
              <TabsTrigger value="goods">Hàng hóa</TabsTrigger>
              <TabsTrigger value="documents">Tài liệu</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Loại tờ khai và thông tin cơ bản</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="declaration-type">Loại tờ khai *</Label>
                      <Select>
                        <SelectTrigger id="declaration-type">
                          <SelectValue placeholder="Chọn loại tờ khai" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="QC">Quá cảnh (QC)</SelectItem>
                          <SelectItem value="TC">Trung chuyển (TC)</SelectItem>
                          <SelectItem value="CCK">Chuyển khẩu (CCK)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="declaration-mode">Chế độ khai báo *</Label>
                      <Select value={declarationMode} onValueChange={(val: "temp" | "official") => setDeclarationMode(val)}>
                        <SelectTrigger id="declaration-mode">
                          <SelectValue placeholder="Chọn chế độ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="temp">Khai tạm</SelectItem>
                          <SelectItem value="official">Khai chính thức</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {declarationMode === "temp" 
                          ? "Khai tạm: Cho phép khai báo sơ bộ, có thể sửa đổi sau" 
                          : "Khai chính thức: Hoàn chỉnh thông tin, gửi phê duyệt"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="declaration-date">Ngày khai báo *</Label>
                      <Input id="declaration-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Thông tin doanh nghiệp</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Tên doanh nghiệp *</Label>
                      <Input id="company" placeholder="Nhập tên doanh nghiệp" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-code">Mã số thuế *</Label>
                      <Input id="company-code" placeholder="Mã số doanh nghiệp" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-address">Địa chỉ *</Label>
                      <Input id="company-address" placeholder="Địa chỉ trụ sở" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Số điện thoại *</Label>
                      <Input id="company-phone" placeholder="Số điện thoại liên hệ" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-email">Email</Label>
                      <Input id="company-email" type="email" placeholder="email@company.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="declarant-name">Người khai hải quan *</Label>
                      <Input id="declarant-name" placeholder="Họ và tên người khai" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="declarant-id">CMND/CCCD người khai *</Label>
                      <Input id="declarant-id" placeholder="Số CMND/CCCD" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="declarant-cert">Số thẻ người khai hải quan</Label>
                      <Input id="declarant-cert" placeholder="Số thẻ HQ" />
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Thông tin cửa khẩu và tuyến đường</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="port-entry">Cửa khẩu nhập *</Label>
                      <Select>
                        <SelectTrigger id="port-entry">
                          <SelectValue placeholder="Chọn cửa khẩu nhập" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lao-cai">Chi cục HQ Lào Cai</SelectItem>
                          <SelectItem value="lang-son">Chi cục HQ Lạng Sơn</SelectItem>
                          <SelectItem value="moc-bai">Chi cục HQ Mộc Bài</SelectItem>
                          <SelectItem value="hai-phong">Chi cục HQ Hải Phòng</SelectItem>
                          <SelectItem value="tan-thanh">Chi cục HQ Tân Thanh</SelectItem>
                          <SelectItem value="lao-bao">Chi cục HQ Lao Bảo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="port-exit">Cửa khẩu xuất *</Label>
                      <Select>
                        <SelectTrigger id="port-exit">
                          <SelectValue placeholder="Chọn cửa khẩu xuất" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lao-cai">Chi cục HQ Lào Cai</SelectItem>
                          <SelectItem value="lang-son">Chi cục HQ Lạng Sơn</SelectItem>
                          <SelectItem value="moc-bai">Chi cục HQ Mộc Bài</SelectItem>
                          <SelectItem value="hai-phong">Chi cục HQ Hải Phòng</SelectItem>
                          <SelectItem value="tan-thanh">Chi cục HQ Tân Thanh</SelectItem>
                          <SelectItem value="lao-bao">Chi cục HQ Lao Bảo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country-origin">Nước xuất khẩu *</Label>
                      <Input id="country-origin" placeholder="Nước xuất xứ hàng hóa" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country-dest">Nước nhập khẩu *</Label>
                      <Input id="country-dest" placeholder="Nước đích" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="route-code">Mã tuyến đường *</Label>
                      <Input id="route-code" placeholder="Mã tuyến đã đăng ký" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimated-days">Thời gian dự kiến (ngày)</Label>
                      <Input id="estimated-days" type="number" placeholder="Số ngày vận chuyển" />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="route">Tuyến đường vận chuyển chi tiết *</Label>
                    <Textarea 
                      id="route" 
                      placeholder="Mô tả chi tiết tuyến đường: cửa khẩu nhập → các điểm trung chuyển → cửa khẩu xuất"
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Thông tin bổ sung</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contract-number">Số hợp đồng</Label>
                      <Input id="contract-number" placeholder="Số hợp đồng thương mại" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoice-number">Số hóa đơn</Label>
                      <Input id="invoice-number" placeholder="Số Invoice" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Phương thức thanh toán</Label>
                      <Select>
                        <SelectTrigger id="payment-method">
                          <SelectValue placeholder="Chọn phương thức" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LC">L/C (Letter of Credit)</SelectItem>
                          <SelectItem value="TT">T/T (Telegraphic Transfer)</SelectItem>
                          <SelectItem value="DP">D/P (Documents against Payment)</SelectItem>
                          <SelectItem value="DA">D/A (Documents against Acceptance)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                      <Select defaultValue="USD">
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Chọn loại tiền" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="VND">VND</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="CNY">CNY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="notes">Ghi chú</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Các thông tin bổ sung khác"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transport" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Thông tin phương tiện vận tải</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="transport-type">Loại phương tiện *</Label>
                      <Select>
                        <SelectTrigger id="transport-type">
                          <SelectValue placeholder="Chọn loại phương tiện" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="truck">Xe tải (Đường bộ)</SelectItem>
                          <SelectItem value="train">Tàu hỏa (Đường sắt)</SelectItem>
                          <SelectItem value="ship">Tàu thủy (Đường biển)</SelectItem>
                          <SelectItem value="plane">Máy bay (Đường hàng không)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle-number">Số hiệu phương tiện *</Label>
                      <Input id="vehicle-number" placeholder="Biển kiểm soát / Số hiệu tàu" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle-nationality">Quốc tịch phương tiện</Label>
                      <Input id="vehicle-nationality" placeholder="Quốc tịch đăng ký" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transport-company">Đơn vị vận tải</Label>
                      <Input id="transport-company" placeholder="Tên công ty vận tải" />
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Thông tin người điều khiển</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="driver-name">Họ tên lái xe / Thuyền trưởng *</Label>
                      <Input id="driver-name" placeholder="Họ và tên đầy đủ" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="driver-nationality">Quốc tịch</Label>
                      <Input id="driver-nationality" placeholder="Quốc tịch" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="driver-license">Số CMND / Hộ chiếu *</Label>
                      <Input id="driver-license" placeholder="Số giấy tờ tùy thân" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="driver-license-type">Số giấy phép lái xe / Chứng chỉ</Label>
                      <Input id="driver-license-type" placeholder="Số bằng lái" />
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Thông tin container và đóng gói</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="container-number">Số container</Label>
                      <Input id="container-number" placeholder="Số container (nếu có)" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="container-size">Kích cỡ container</Label>
                      <Select>
                        <SelectTrigger id="container-size">
                          <SelectValue placeholder="Chọn kích cỡ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20 feet</SelectItem>
                          <SelectItem value="40">40 feet</SelectItem>
                          <SelectItem value="40HC">40 feet HC</SelectItem>
                          <SelectItem value="45">45 feet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seal-number">Số seal *</Label>
                      <Input id="seal-number" placeholder="Số niêm phong container" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="package-count">Số kiện *</Label>
                      <Input id="package-count" type="number" placeholder="Tổng số kiện hàng" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="package-type">Loại bao bì</Label>
                      <Select>
                        <SelectTrigger id="package-type">
                          <SelectValue placeholder="Chọn loại bao bì" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carton">Thùng carton</SelectItem>
                          <SelectItem value="pallet">Pallet</SelectItem>
                          <SelectItem value="bag">Bao / Túi</SelectItem>
                          <SelectItem value="case">Kiện / Case</SelectItem>
                          <SelectItem value="bulk">Rời</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="total-weight">Tổng trọng lượng (kg) *</Label>
                      <Input id="total-weight" type="number" placeholder="Tổng trọng lượng" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Thông tin vận đơn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bill-of-lading">Số vận đơn *</Label>
                      <Input id="bill-of-lading" placeholder="Bill of Lading / AWB / Railway Bill" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bill-date">Ngày vận đơn</Label>
                      <Input id="bill-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="manifest-number">Số Manifest</Label>
                      <Input id="manifest-number" placeholder="Số tờ khai hàng hóa" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimated-arrival">Thời gian dự kiến đến *</Label>
                      <Input id="estimated-arrival" type="datetime-local" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimated-departure">Thời gian dự kiến rời</Label>
                      <Input id="estimated-departure" type="datetime-local" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="goods" className="space-y-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Danh sách hàng hóa</h3>
                  <p className="text-sm text-muted-foreground">Khai báo chi tiết từng mặt hàng trong lô hàng quá cảnh</p>
                </div>
                <Button onClick={addGoodsItem} variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm hàng hóa
                </Button>
              </div>

              {goodsList.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-6 space-y-4 bg-card">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Mặt hàng #{index + 1}</h4>
                    {goodsList.length > 1 && (
                      <Button 
                        onClick={() => removeGoodsItem(item.id)}
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Xóa
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`goods-name-${item.id}`}>Tên hàng hóa *</Label>
                      <Input id={`goods-name-${item.id}`} placeholder="Mô tả chi tiết hàng hóa" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`hs-code-${item.id}`}>Mã HS Code *</Label>
                      <Input id={`hs-code-${item.id}`} placeholder="Mã hàng hóa 8-10 số" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`origin-${item.id}`}>Xuất xứ *</Label>
                      <Input id={`origin-${item.id}`} placeholder="Nước sản xuất" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${item.id}`}>Số lượng *</Label>
                      <Input id={`quantity-${item.id}`} type="number" placeholder="0" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`unit-${item.id}`}>Đơn vị tính *</Label>
                      <Select>
                        <SelectTrigger id={`unit-${item.id}`}>
                          <SelectValue placeholder="Chọn đơn vị" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kg (Kilogram)</SelectItem>
                          <SelectItem value="ton">Tấn (Ton)</SelectItem>
                          <SelectItem value="piece">Cái (Piece)</SelectItem>
                          <SelectItem value="box">Thùng (Box)</SelectItem>
                          <SelectItem value="set">Bộ (Set)</SelectItem>
                          <SelectItem value="liter">Lít (Liter)</SelectItem>
                          <SelectItem value="m3">Mét khối (m³)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`weight-${item.id}`}>Trọng lượng (kg) *</Label>
                      <Input id={`weight-${item.id}`} type="number" step="0.01" placeholder="0.00" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`value-${item.id}`}>Trị giá FOB (USD)</Label>
                      <Input id={`value-${item.id}`} type="number" step="0.01" placeholder="0.00" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`package-${item.id}`}>Số kiện</Label>
                      <Input id={`package-${item.id}`} type="number" placeholder="Số kiện hàng" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`brand-${item.id}`}>Nhãn hiệu</Label>
                      <Input id={`brand-${item.id}`} placeholder="Tên thương hiệu" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`description-${item.id}`}>Mô tả chi tiết</Label>
                      <Textarea 
                        id={`description-${item.id}`} 
                        placeholder="Mô tả thông số kỹ thuật, đặc điểm hàng hóa"
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center space-x-2 md:col-span-2">
                      <Checkbox id={`dangerous-${item.id}`} />
                      <Label htmlFor={`dangerous-${item.id}`} className="text-sm font-normal cursor-pointer">
                        Hàng nguy hiểm (cần xử lý đặc biệt)
                      </Label>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tổng số mặt hàng</p>
                    <p className="text-lg font-semibold">{goodsList.length}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tổng số kiện</p>
                    <p className="text-lg font-semibold">-</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tổng trọng lượng</p>
                    <p className="text-lg font-semibold">- kg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tổng trị giá</p>
                    <p className="text-lg font-semibold">- USD</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">1. Hóa đơn thương mại (Commercial Invoice) *</Label>
                    <p className="text-sm text-muted-foreground mb-2">File PDF, JPG, PNG - Tối đa 10MB</p>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input 
                        type="file" 
                        id="invoice-upload" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleFileUpload('invoice', e)}
                      />
                      <label htmlFor="invoice-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Kéo thả file hoặc click để tải lên
                        </p>
                        <Button type="button" variant="outline" size="sm">Chọn file</Button>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base">2. Giấy phép quá cảnh / Trung chuyển *</Label>
                    <p className="text-sm text-muted-foreground mb-2">File PDF, JPG, PNG - Tối đa 10MB</p>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input 
                        type="file" 
                        id="permit-upload" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleFileUpload('permit', e)}
                      />
                      <label htmlFor="permit-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Kéo thả file hoặc click để tải lên
                        </p>
                        <Button type="button" variant="outline" size="sm">Chọn file</Button>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base">3. Vận đơn (Bill of Lading / AWB / Railway Bill) *</Label>
                    <p className="text-sm text-muted-foreground mb-2">File PDF, JPG, PNG - Tối đa 10MB</p>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input 
                        type="file" 
                        id="bl-upload" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleFileUpload('bl', e)}
                      />
                      <label htmlFor="bl-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Kéo thả file hoặc click để tải lên
                        </p>
                        <Button type="button" variant="outline" size="sm">Chọn file</Button>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base">4. Packing List (Danh sách đóng gói)</Label>
                    <p className="text-sm text-muted-foreground mb-2">File PDF, JPG, PNG, Excel - Tối đa 10MB</p>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input 
                        type="file" 
                        id="packing-upload" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
                        multiple
                        onChange={(e) => handleFileUpload('packing', e)}
                      />
                      <label htmlFor="packing-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Kéo thả file hoặc click để tải lên
                        </p>
                        <Button type="button" variant="outline" size="sm">Chọn file</Button>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base">5. Giấy chứng nhận xuất xứ (C/O)</Label>
                    <p className="text-sm text-muted-foreground mb-2">File PDF, JPG, PNG - Tối đa 10MB</p>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input 
                        type="file" 
                        id="co-upload" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleFileUpload('co', e)}
                      />
                      <label htmlFor="co-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Kéo thả file hoặc click để tải lên
                        </p>
                        <Button type="button" variant="outline" size="sm">Chọn file</Button>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base">6. Tài liệu khác (Hợp đồng, Catalog, v.v.)</Label>
                    <p className="text-sm text-muted-foreground mb-2">File PDF, JPG, PNG, Word, Excel - Tối đa 10MB</p>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input 
                        type="file" 
                        id="other-upload" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx,.xls"
                        multiple
                        onChange={(e) => handleFileUpload('other', e)}
                      />
                      <label htmlFor="other-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Kéo thả file hoặc click để tải lên
                        </p>
                        <Button type="button" variant="outline" size="sm">Chọn file</Button>
                      </label>
                    </div>
                  </div>
                </div>

                {documents.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Tài liệu đã tải lên ({documents.length})</h4>
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                              <Upload className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{doc.type}</p>
                            </div>
                          </div>
                          <Button 
                            onClick={() => removeDocument(doc.id)}
                            variant="ghost" 
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center gap-4 mt-8 pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              <span className="text-destructive">*</span> Trường bắt buộc
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Hủy</Button>
              {declarationMode === "temp" && (
                <Button variant="outline" className="gap-2">
                  <Save className="h-4 w-4" />
                  Lưu tạm
                </Button>
              )}
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
                {declarationMode === "temp" ? "Gửi khai tạm" : "Gửi khai chính thức"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
