"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteConfirmDialog({ open, onOpenChange, onConfirm }: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tem certeza que vai apagar a exportação?</h2>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex space-x-4 justify-center">
          <Button onClick={onConfirm} className="bg-green-500 hover:bg-green-600 text-white px-8">
            SIM
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
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
