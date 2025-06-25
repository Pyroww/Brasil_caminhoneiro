"use client"

import type React from "react"

import { useState, createContext, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, LogOut, BarChart3 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { NewExportDialog } from "@/components/new-export-dialog"
import { ReportDialog } from "@/components/report-dialog"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

interface Export {
  id: string
  cliente: string
  tipoCarne: string
  quantidade: number
  peso: number
  origem: string
  destino: string
  motorista: string
  status: "Ativo" | "Concluído" | "Pendente"
}

interface ExportsContextType {
  exports: Export[]
  setExports: React.Dispatch<React.SetStateAction<Export[]>>
}

const ExportsContext = createContext<ExportsContextType | null>(null)

export const useExports = () => {
  const context = useContext(ExportsContext)
  if (!context) {
    throw new Error("useExports must be used within ExportsProvider")
  }
  return context
}

export default function Dashboard() {
  const router = useRouter()
  const [exports, setExports] = useState<Export[]>([
    {
      id: "EXP001",
      cliente: "Frigorífico ABC",
      tipoCarne: "Bovina",
      quantidade: 500,
      peso: 12000,
      origem: "São Paulo",
      destino: "Rio de Janeiro",
      motorista: "João Silva",
      status: "Ativo",
    },
    {
      id: "EXP002",
      cliente: "Carnes Premium",
      tipoCarne: "Suína",
      quantidade: 300,
      peso: 8500,
      origem: "Minas Gerais",
      destino: "Espírito Santo",
      motorista: "Maria Santos",
      status: "Concluído",
    },
  ])

  const [showNewExport, setShowNewExport] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [deleteExportId, setDeleteExportId] = useState<string | null>(null)
  const [editingExport, setEditingExport] = useState<Export | null>(null)

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const storedExports = localStorage.getItem("loudfat-exports")
    if (storedExports) {
      setExports(JSON.parse(storedExports))
    }
  }, [])

  // Salvar no localStorage sempre que exports mudar
  useEffect(() => {
    localStorage.setItem("loudfat-exports", JSON.stringify(exports))
  }, [exports])

  const handleLogout = () => {
    router.push("/")
  }

  const handleDeleteExport = (id: string) => {
    setExports((prevExports) => prevExports.filter((exp) => exp.id !== id))
    setDeleteExportId(null)
  }

  const handleAddExport = (newExport: Omit<Export, "id">) => {
    const id = `EXP${String(exports.length + 1).padStart(3, "0")}`
    setExports([...exports, { ...newExport, id }])
    setShowNewExport(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-500"
      case "Concluído":
        return "bg-blue-500"
      case "Pendente":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  // Adicionar a função para navegar para detalhes da exportação
  const handleViewExport = (exportId: string) => {
    router.push(`/export/${exportId}`)
  }

  const handleEditExport = (exportItem: Export) => {
    setEditingExport(exportItem)
    setShowNewExport(true)
  }

  const handleUpdateExport = (updatedExport: Omit<Export, "id">) => {
    if (editingExport) {
      setExports((prevExports) =>
        prevExports.map((exp) => (exp.id === editingExport.id ? { ...updatedExport, id: editingExport.id } : exp)),
      )
      setEditingExport(null)
    } else {
      const id = `EXP${String(exports.length + 1).padStart(3, "0")}`
      setExports((prevExports) => [...prevExports, { ...updatedExport, id }])
    }
    setShowNewExport(false)
  }

  return (
    <ExportsContext.Provider value={{ exports, setExports }}>
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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">Exportações cadastradas</CardTitle>
                  <p className="text-gray-600 mt-1">Lista de todas as exportações de carne cadastradas...</p>
                </div>
                <Button onClick={() => setShowNewExport(true)} className="bg-emerald-500 hover:bg-emerald-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Exportação
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-emerald-500">
                    <TableHead className="font-bold">CLIENTE</TableHead>
                    <TableHead className="font-bold">TIPO DA CARNE</TableHead>
                    <TableHead className="font-bold">QUANTIDADE</TableHead>
                    <TableHead className="font-bold">PESO(KG)</TableHead>
                    <TableHead className="font-bold">ORIGEM → DESTINO</TableHead>
                    <TableHead className="font-bold">MOTORISTA</TableHead>
                    <TableHead className="font-bold">STATUS</TableHead>
                    <TableHead className="font-bold">AÇÕES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exports.map((exportItem) => (
                    <TableRow
                      key={exportItem.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewExport(exportItem.id)}
                    >
                      <TableCell className="font-medium">{exportItem.cliente}</TableCell>
                      <TableCell>{exportItem.tipoCarne}</TableCell>
                      <TableCell>{exportItem.quantidade}</TableCell>
                      <TableCell>{exportItem.peso.toLocaleString()}</TableCell>
                      <TableCell>
                        {exportItem.origem} → {exportItem.destino}
                      </TableCell>
                      <TableCell>{exportItem.motorista}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(exportItem.status)} text-white`}>{exportItem.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowReport(true)
                            }}
                          >
                            <BarChart3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditExport(exportItem)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setDeleteExportId(exportItem.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Button onClick={() => router.push("/")} className="bg-emerald-500 hover:bg-emerald-600">
              Voltar
            </Button>
          </div>
        </main>

        <NewExportDialog
          open={showNewExport}
          onOpenChange={(open) => {
            setShowNewExport(open)
            if (!open) setEditingExport(null)
          }}
          onSubmit={handleUpdateExport}
          editingExport={editingExport}
        />

        <ReportDialog open={showReport} onOpenChange={setShowReport} />

        <DeleteConfirmDialog
          open={!!deleteExportId}
          onOpenChange={() => setDeleteExportId(null)}
          onConfirm={() => deleteExportId && handleDeleteExport(deleteExportId)}
        />
      </div>
    </ExportsContext.Provider>
  )
}
