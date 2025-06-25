"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Package } from "lucide-react"

interface NewExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  editingExport?: any | null
}

export function NewExportDialog({ open, onOpenChange, onSubmit, editingExport }: NewExportDialogProps) {
  const [step, setStep] = useState(1)
  const [showImportConfirm, setShowImportConfirm] = useState(false)
  const [formData, setFormData] = useState({
    cliente: "",
    tipoCarne: "",
    quantidade: "",
    peso: "",
    motorista: "",
    placaCaminhao: "",
    temperatura: "",
    origem: "",
    destino: "",
    dataColeta: "",
    dataEntrega: "",
    idadeMotorista: "", // Adicionar este campo
    dataValidade: "", // Adicionar este campo
  })

  useEffect(() => {
    if (editingExport) {
      setFormData({
        cliente: editingExport.cliente,
        tipoCarne: editingExport.tipoCarne,
        quantidade: editingExport.quantidade.toString(),
        peso: editingExport.peso.toString(),
        motorista: editingExport.motorista,
        placaCaminhao: editingExport.placaCaminhao || "",
        temperatura: editingExport.temperatura || "",
        origem: editingExport.origem,
        destino: editingExport.destino,
        dataColeta: editingExport.dataColeta || "",
        dataEntrega: editingExport.dataEntrega || "",
        idadeMotorista: editingExport.idadeMotorista?.toString() || "",
        dataValidade: editingExport.dataValidade || "",
      })
    }
  }, [editingExport])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = () => {
    if (step === 1) {
      return formData.cliente && formData.tipoCarne && formData.quantidade && formData.peso
    }
    if (step === 2) {
      return formData.motorista && formData.idadeMotorista && formData.placaCaminhao && formData.temperatura
    }
    if (step === 3) {
      return formData.origem && formData.destino && formData.dataColeta && formData.dataEntrega && formData.dataValidade
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep()) {
      alert("Por favor, preencha todos os campos obrigatórios antes de continuar.")
      return
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      setShowImportConfirm(true)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit({
      cliente: formData.cliente,
      tipoCarne: formData.tipoCarne,
      quantidade: Number.parseInt(formData.quantidade),
      peso: Number.parseInt(formData.peso),
      origem: formData.origem,
      destino: formData.destino,
      motorista: formData.motorista,
      placaCaminhao: formData.placaCaminhao,
      temperatura: formData.temperatura,
      dataColeta: formData.dataColeta,
      dataEntrega: formData.dataEntrega,
      idadeMotorista: Number.parseInt(formData.idadeMotorista),
      dataValidade: formData.dataValidade,
      status: "Ativo",
    })
    // Reset form...
    setFormData({
      cliente: "",
      tipoCarne: "",
      quantidade: "",
      peso: "",
      motorista: "",
      placaCaminhao: "",
      temperatura: "",
      origem: "",
      destino: "",
      dataColeta: "",
      dataEntrega: "",
      idadeMotorista: "",
      dataValidade: "",
    })
    setShowImportConfirm(false)
  }

  const handleClose = () => {
    setStep(1)
    setShowImportConfirm(false)
    onOpenChange(false)
  }

  if (showImportConfirm) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Registrar importação?</h2>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex space-x-4 justify-center">
            <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white px-8">
              SIM
            </Button>
            <Button
              onClick={() => setShowImportConfirm(false)}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 px-8"
            >
              NÃO
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl font-bold">
                {editingExport ? "Editar Exportação" : "Nova Exportação"}
              </DialogTitle>
              <p className="text-gray-600">Preencha os dados da exportação de carne</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex mb-6">
          <Button
            variant={step === 1 ? "default" : "secondary"}
            className={`flex-1 rounded-r-none ${step === 1 ? "bg-emerald-500" : "bg-gray-300"}`}
          >
            Cliente & Produto
          </Button>
          <Button
            variant={step === 2 ? "default" : "secondary"}
            className={`flex-1 rounded-none ${step === 2 ? "bg-emerald-500" : "bg-gray-300"}`}
          >
            Transporte
          </Button>
          <Button
            variant={step === 3 ? "default" : "secondary"}
            className={`flex-1 rounded-l-none ${step === 3 ? "bg-emerald-500" : "bg-gray-300"}`}
          >
            Datas & Local
          </Button>
        </div>

        {step === 1 && (
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Informações do Cliente & produto</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cliente">Cliente *</Label>
                <Input
                  id="cliente"
                  placeholder="Nome do cliente ou empresa"
                  value={formData.cliente}
                  onChange={(e) => handleInputChange("cliente", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
              <div>
                <Label htmlFor="tipoCarne">Tipos de carnes *</Label>
                <Select onValueChange={(value) => handleInputChange("tipoCarne", value)}>
                  <SelectTrigger className="border-emerald-300 focus:border-emerald-500">
                    <SelectValue placeholder="Selecione o tipo de corte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bovina">Bovina</SelectItem>
                    <SelectItem value="suina">Suína</SelectItem>
                    <SelectItem value="aves">Aves</SelectItem>
                    <SelectItem value="ovina">Ovina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantidade">Quantidade (unidades) *</Label>
                <Input
                  id="quantidade"
                  type="number"
                  placeholder="0"
                  value={formData.quantidade}
                  onChange={(e) => handleInputChange("quantidade", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
              <div>
                <Label htmlFor="peso">Peso total (kg) *</Label>
                <Input
                  id="peso"
                  type="number"
                  placeholder="0"
                  value={formData.peso}
                  onChange={(e) => handleInputChange("peso", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Informações de Transporte</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="motorista">Motorista *</Label>
                <Input
                  id="motorista"
                  placeholder="Nome do motorista"
                  value={formData.motorista}
                  onChange={(e) => handleInputChange("motorista", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
              <div>
                <Label htmlFor="idadeMotorista">Idade do Motorista *</Label>
                <Input
                  id="idadeMotorista"
                  type="number"
                  placeholder="Idade"
                  value={formData.idadeMotorista}
                  onChange={(e) => handleInputChange("idadeMotorista", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
              <div>
                <Label htmlFor="placaCaminhao">Placa do caminhão *</Label>
                <Input
                  id="placaCaminhao"
                  placeholder="ABC-1234"
                  value={formData.placaCaminhao}
                  onChange={(e) => handleInputChange("placaCaminhao", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="temperatura">Temperatura de armazenamento *</Label>
              <Select onValueChange={(value) => handleInputChange("temperatura", value)}>
                <SelectTrigger className="border-emerald-300 focus:border-emerald-500">
                  <SelectValue placeholder="Selecione a temperatura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="congelado">Congelado (-18°C)</SelectItem>
                  <SelectItem value="refrigerado">Refrigerado (0°C a 4°C)</SelectItem>
                  <SelectItem value="ambiente">Temperatura ambiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Datas e Locais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="origem">Origem *</Label>
                <Input
                  id="origem"
                  placeholder="Cidade, Estado"
                  value={formData.origem}
                  onChange={(e) => handleInputChange("origem", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
              <div>
                <Label htmlFor="destino">Destino *</Label>
                <Input
                  id="destino"
                  placeholder="Cidade, Estado, Bairro, Rua, CEP..."
                  value={formData.destino}
                  onChange={(e) => handleInputChange("destino", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
              <div>
                <Label htmlFor="dataColeta">Data de coleta *</Label>
                <Input
                  id="dataColeta"
                  type="date"
                  value={formData.dataColeta}
                  onChange={(e) => handleInputChange("dataColeta", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
              <div>
                <Label htmlFor="dataEntrega">Data de entrega *</Label>
                <Input
                  id="dataEntrega"
                  type="date"
                  value={formData.dataEntrega}
                  onChange={(e) => handleInputChange("dataEntrega", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
              <div>
                <Label htmlFor="dataValidade">Data de validade *</Label>
                <Input
                  id="dataValidade"
                  type="date"
                  value={formData.dataValidade}
                  onChange={(e) => handleInputChange("dataValidade", e.target.value)}
                  className="border-emerald-300 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button onClick={handlePrevious} className="bg-emerald-500 hover:bg-emerald-600">
              Anterior
            </Button>
          )}
          <div className="ml-auto">
            <Button onClick={handleNext} className="bg-emerald-500 hover:bg-emerald-600">
              {step === 3 ? (editingExport ? "Salvar alterações" : "Criar exportação") : "Próximo"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
