"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogOut } from "lucide-react"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"

interface ExportDetails {
  id: string
  cliente: string
  tipoCarne: string
  quantidade: number
  peso: number
  origem: string
  destino: string
  motorista: string
  status: "Ativo" | "Concluído" | "Pendente"
  placaCaminhao: string
  temperatura: string
  dataColeta: string
  dataEntrega: string
  idadeMotorista: number
  dataValidade: string
  idEntrega: string
}

export default function ExportDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const exportId = params.id as string

  const [exportData, setExportData] = useState<ExportDetails | null>(null)

  // Simular dados da exportação baseado no ID
  useEffect(() => {
    // Buscar dados da exportação do localStorage ou contexto
    const storedExports = localStorage.getItem("loudfat-exports")
    if (storedExports) {
      const exports = JSON.parse(storedExports)
      const foundExport = exports.find((exp: any) => exp.id === exportId)

      if (foundExport) {
        const exportDetails: ExportDetails = {
          id: foundExport.id,
          cliente: foundExport.cliente,
          tipoCarne: foundExport.tipoCarne,
          quantidade: foundExport.quantidade,
          peso: foundExport.peso,
          origem: foundExport.origem,
          destino: foundExport.destino,
          motorista: foundExport.motorista,
          status: foundExport.status,
          placaCaminhao: foundExport.placaCaminhao || "ABC-1234",
          temperatura: foundExport.temperatura || "Congelado (-18°C)",
          dataColeta: foundExport.dataColeta || "2024-01-15",
          dataEntrega: foundExport.dataEntrega || "2024-01-17",
          idadeMotorista: foundExport.idadeMotorista || 45,
          dataValidade: foundExport.dataValidade || "2024-02-15",
          idEntrega: "ENT-" + foundExport.id,
        }
        setExportData(exportDetails)
      }
    }
  }, [exportId])

  const handleLogout = () => {
    router.push("/")
  }

  const handleConcluirExportacao = () => {
    if (exportData) {
      const updatedExport = { ...exportData, status: "Concluído" }
      setExportData(updatedExport)

      // Atualizar no localStorage
      const storedExports = localStorage.getItem("loudfat-exports")
      if (storedExports) {
        const exports = JSON.parse(storedExports)
        const updatedExports = exports.map((exp: any) =>
          exp.id === exportData.id ? { ...exp, status: "Concluído" } : exp,
        )
        localStorage.setItem("loudfat-exports", JSON.stringify(updatedExports))
      }

      alert("Exportação concluída com sucesso!")
    }
  }

  const handleVoltar = () => {
    router.push("/dashboard")
  }

  if (!exportData) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/logo.png" alt="LoudFat" width={120} height={36} />
            <div className="flex space-x-6">
              <Button variant="ghost" className="text-emerald-600 border-b-2 border-emerald-600">
                Exportações ativas/concluídas
              </Button>
              <Button variant="ghost" className="text-gray-600">
                Criar/editar exportações
              </Button>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="bg-emerald-500 text-white hover:bg-emerald-600">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold">Exportação ID identificador: {exportData.id}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="h-1 w-32 bg-emerald-500 rounded"></div>
                <span className="text-gray-600">Rota definida...</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleConcluirExportacao}
            className="bg-emerald-500 hover:bg-emerald-600"
            disabled={exportData.status === "Concluído"}
          >
            {exportData.status === "Concluído" ? "Exportação Concluída" : "Concluir exportação"}
          </Button>
        </div>

        {/* Área do Mapa */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="h-96 bg-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-lg font-semibold mb-2">Mapa da Rota</div>
                <div className="text-sm">
                  {exportData.origem} → {exportData.destino}
                </div>
                <div className="text-xs mt-2 opacity-75">Visualização do mapa será implementada aqui</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados do Responsável e da Exportação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Dados do Responsável */}
          <Card>
            <CardContent className="p-6">
              <div className="border-b-2 border-emerald-500 pb-2 mb-4">
                <h2 className="text-lg font-bold">Dados do responsável</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Nome: </span>
                  <span>{exportData.motorista}</span>
                </div>
                <div>
                  <span className="font-semibold">Idade: </span>
                  <span>{exportData.idadeMotorista} anos</span>
                </div>
                <div>
                  <span className="font-semibold">Placa do caminhão: </span>
                  <span>{exportData.placaCaminhao}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados da Exportação */}
          <Card>
            <CardContent className="p-6">
              <div className="border-b-2 border-emerald-500 pb-2 mb-4">
                <h2 className="text-lg font-bold">Dados da exportação</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Data início da entrega: </span>
                    <span>{new Date(exportData.dataColeta).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Quantidade de peças: </span>
                    <span>{exportData.quantidade}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Data prevista da entrega: </span>
                    <span>{new Date(exportData.dataEntrega).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Tipo de corte: </span>
                    <span>{exportData.tipoCarne}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Placa do caminhão: </span>
                    <span>{exportData.placaCaminhao}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Data de validade: </span>
                    <span>{new Date(exportData.dataValidade).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Tipo de carga: </span>
                    <span>{exportData.temperatura}</span>
                  </div>
                  <div>
                    <span className="font-semibold">ID da entrega: </span>
                    <span>{exportData.idEntrega}</span>
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Peso da carga: </span>
                  <span>{exportData.peso.toLocaleString()} kg</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button onClick={handleVoltar} className="bg-emerald-500 hover:bg-emerald-600">
          Voltar
        </Button>
      </main>
    </div>
  )
}
