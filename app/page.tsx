"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in real app, validate credentials
    if (username && password) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="LoudFat Logo" width={400} height={120} className="mx-auto mb-4" />
          <p className="text-white text-lg">O Sistema integrado de Rotas</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-4">
            <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
            <p className="text-white/90">Entre com suas credenciais para acessar o sistema</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="text"
                placeholder="Usuário..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/80"
                required
              />
              <Input
                type="password"
                placeholder="Senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/80"
                required
              />
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Entrar
              </Button>
            </form>
            <div className="text-center">
              <a href="#" className="text-white/90 hover:text-white underline text-sm">
                Esqueceu a senha?
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
