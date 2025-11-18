"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle2, XCircle, AlertTriangle, Camera, Upload, Package, Scale, FileText } from 'lucide-react'

export function InspectionScreen() {
  const [inspectionResult, setInspectionResult] = useState("pending")
  const [inspectionNotes, setInspectionNotes] = useState("")
  const [photos, setPhotos] = useState<string[]>([])

  const declaration = {
    declarationNumber: "QC2025001234",
    declarationType: "Quá cảnh (QC)",
    company: "Công ty TNHH Thương mại Quốc tế ABC",
    lane: "Đỏ",
    containerNumber: "ABCU1234567",
    sealNumber: "SEAL123456"
  }

  const inspectionItems = [
    {
      category: "Thông tin container",
      items: [
        { label: "Số container khớp với khai báo", status: "unchecked" },
        { label: "Số seal nguyên vẹn, khớp khai báo", status: "unchecked" },
        { label: "Container không có dấu hiệu mở trái phép", status: "unchecked" }
      ]
    },
    {
      category: "Kiểm tra hàng hóa",
      items: [
        { label: "Loại hàng hóa khớp với khai báo", status: "unchecked" },
        { label: "Số lượng, trọng lượng phù hợp", status: "unchecked" },
        { label: "Bao bì, đóng gói đúng mô tả", status: "unchecked" },
        { label: "Không có hàng cấm, hàng lạ", status: "unchecked" }
      ]
    },
    {
      category: "Chứng từ",
      items: [
        { label: "Mã HS Code chính xác", status: "unchecked" },
        { label: "Xuất xứ hàng hóa khớp với C/O", status: "unchecked" },
        { label: "Số lượng khớp với Packing List", status: "unchecked" }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Kiểm tra thực tế hàng hóa</CardTitle>
              <CardDescription>Số tờ khai: {declaration.declarationNumber}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-300">
              {declaration.lane}
            </Badge>
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
              <p className="text-sm text-muted-foreground">Số container</p>
              <p className="font-medium">{declaration.containerNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Số seal</p>
              <p className="font-medium">{declaration.sealNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thông tin kiểm tra */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin kiểm tra hiện trường</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inspector-name">Cán bộ kiểm tra *</Label>
              <Input id="inspector-name" placeholder="Họ và tên" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspector-id">Mã cán bộ *</Label>
              <Input id="inspector-id" placeholder="Mã số cán bộ" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspection-date">Ngày giờ kiểm tra *</Label>
              <Input id="inspection-date" type="datetime-local" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspection-location">Địa điểm kiểm tra *</Label>
              <Input id="inspection-location" placeholder="Vị trí kiểm tra" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist kiểm tra */}
      <Card>
        <CardHeader>
          <CardTitle>Danh mục kiểm tra</CardTitle>
          <CardDescription>Xác nhận các hạng mục kiểm tra thực tế</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {inspectionItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  {sectionIndex === 0 && <Package className="h-4 w-4" />}
                  {sectionIndex === 1 && <Scale className="h-4 w-4" />}
                  {sectionIndex === 2 && <FileText className="h-4 w-4" />}
                  {section.category}
                </h4>
                <div className="space-y-2 ml-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{item.label}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          Đạt
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <XCircle className="h-3 w-3 text-red-600" />
                          Không đạt
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kết quả kiểm tra */}
      <Card>
        <CardHeader>
          <CardTitle>Kết luận kiểm tra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Kết quả kiểm tra tổng thể *</Label>
            <RadioGroup value={inspectionResult} onValueChange={setInspectionResult}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="pass" id="pass" />
                <Label htmlFor="pass" className="flex-1 cursor-pointer font-normal">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Đạt - Hàng hóa khớp với khai báo, không có vấn đề</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="warning" id="warning" />
                <Label htmlFor="warning" className="flex-1 cursor-pointer font-normal">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span>Cảnh báo - Có sai lệch nhỏ, cần làm rõ</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="fail" id="fail" />
                <Label htmlFor="fail" className="flex-1 cursor-pointer font-normal">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span>Không đạt - Phát hiện vi phạm, hàng không đúng khai báo</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspection-details">Chi tiết kết quả kiểm tra *</Label>
            <Textarea 
              id="inspection-details"
              placeholder="Mô tả chi tiết kết quả kiểm tra: những gì đã kiểm tra, phát hiện (nếu có), số liệu đo đạc..."
              rows={6}
              value={inspectionNotes}
              onChange={(e) => setInspectionNotes(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="actual-weight">Trọng lượng thực tế (kg)</Label>
              <Input id="actual-weight" type="number" step="0.01" placeholder="Trọng lượng đo được" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="actual-quantity">Số lượng thực tế</Label>
              <Input id="actual-quantity" type="number" placeholder="Số lượng kiểm tra" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ảnh chụp */}
      <Card>
        <CardHeader>
          <CardTitle>Ảnh chụp hiện trường</CardTitle>
          <CardDescription>Chụp ảnh container, hàng hóa, seal, biên bản</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Camera className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-3">
                Chụp ảnh hoặc tải ảnh lên từ thiết bị
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="gap-2">
                  <Camera className="h-4 w-4" />
                  Chụp ảnh
                </Button>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Tải ảnh lên
                </Button>
              </div>
            </div>

            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                    <img src={photo || "/placeholder.svg"} alt={`Ảnh ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Lưu nháp
        </Button>
        <Button variant="outline">
          In biên bản
        </Button>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <CheckCircle2 className="h-4 w-4" />
          Hoàn thành kiểm tra
        </Button>
      </div>
    </div>
  )
}
