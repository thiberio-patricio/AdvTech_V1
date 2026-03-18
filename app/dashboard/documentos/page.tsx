"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, AlertCircle, CheckCircle, Loader } from "lucide-react"
import { toast } from "sonner"

export default function DocumentosPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsAnalyzing(true)
    try {
      const content = await file.text()
      
      const response = await fetch("/api/ai/analyze-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })

      if (response.ok) {
        const data = await response.json()
        setAnalysisResult(data.analysis)
        toast.success("Documento analisado com sucesso!")
      } else {
        toast.error("Erro ao analisar documento")
      }
    } catch (error) {
      console.error("Erro:", error)
      toast.error("Erro ao processar arquivo")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documentos</h1>
        <p className="text-muted-foreground mt-2">
          Gerenciar e analisar documentos jurídicos
        </p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Análise com IA</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Carregue um documento para análise automática utilizando IA
        </p>

        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition cursor-pointer">
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={handleUpload}
            disabled={isAnalyzing}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <span>Analisando...</span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="font-semibold">
                  Clique para carregar um documento
                </span>
                <span className="text-sm text-muted-foreground">
                  ou arraste e solte
                </span>
              </>
            )}
          </label>
        </div>
      </Card>

      {analysisResult && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Resultado da Análise</h3>
              {analysisResult.riskLevel === "high" && (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              {analysisResult.riskLevel === "medium" && (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              {analysisResult.riskLevel === "low" && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">{analysisResult.analysis}</p>
            </div>

            {analysisResult.recommendations && (
              <div>
                <h4 className="font-semibold mb-2">Recomendações:</h4>
                <ul className="space-y-1 text-sm">
                  {analysisResult.recommendations.map(
                    (rec: string, idx: number) => (
                      <li key={idx} className="flex gap-2">
                        <span>•</span>
                        <span>{rec}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
