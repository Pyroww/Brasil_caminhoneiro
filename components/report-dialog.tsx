"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Fuel, Clock, Route, DollarSign } from "lucide-react"

interface ReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReportDialog({ open, onOpenChange }: ReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">Média de Valores e Tempo</DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Fuel className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gasto com Combustível</p>
                <p className="text-2xl font-bold">R$ 0.000,00</p>
                <p className="text-xs text-gray-500">litros consumidos</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Route className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Distância Percorrida</p>
                <p className="text-2xl font-bold">0 KM</p>
                <p className="text-xs text-gray-500">de 0 km total</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tempo de Viagem</p>
                <p className="text-2xl font-bold">0 h 0 min</p>
                <p className="text-xs text-gray-500">Estimativa:</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Custo por KM</p>
                <p className="text-2xl font-bold">R$ 0,00</p>
                <p className="text-xs text-gray-500">Combustível por km</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Fuel className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold">Detalhamento do Combustível</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Preço por litro</span>
              <span className="font-medium">R$ 0,0</span>
            </div>
            <div className="flex justify-between">
              <span>Litros consumidos</span>
              <span className="font-medium">0 L</span>
            </div>
            <div className="flex justify-between">
              <span>Consumo médio</span>
              <span className="font-medium">0 km/L</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-bold text-orange-600">
              <span>Total Combustível</span>
              <span>R$ 0.000,00</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
