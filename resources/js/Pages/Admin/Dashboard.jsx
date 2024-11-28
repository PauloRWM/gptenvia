'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Modal Component
function AddResourceModal({ isOpen, onClose, onAddResource }) {
  const [resourceName, setResourceName] = useState('')
  const [resourceCode, setResourceCode] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [resourceUrl, setResourceUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newResource = {
      id: Date.now().toString(),
      name: resourceName,
      code: resourceCode,
      company: selectedCompany,
      url: resourceUrl
    }
    onAddResource(newResource)
    onClose()
    // Reset form
    setResourceName('')
    setResourceCode('')
    setSelectedCompany('')
    setResourceUrl('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Recurso</DialogTitle>
          <DialogDescription>
            Crie um novo recurso JavaScript e atribua a uma empresa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resource-name">Nome do Recurso</Label>
            <Input
              id="resource-name"
              placeholder="Digite o nome do recurso"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resource-url">URL do Recurso</Label>
            <Input
              id="resource-url"
              type="url"
              placeholder="https://exemplo.com/recurso"
              value={resourceUrl}
              onChange={(e) => setResourceUrl(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resource-code">Código JavaScript</Label>
            <Textarea
              id="resource-code"
              placeholder="Digite seu código JavaScript aqui"
              value={resourceCode}
              onChange={(e) => setResourceCode(e.target.value)}
              className="font-mono h-64"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-select">Selecione a Empresa</Label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany} required>
              <SelectTrigger id="company-select">
                <SelectValue placeholder="Selecione uma empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company1">Empresa 1</SelectItem>
                <SelectItem value="company2">Empresa 2</SelectItem>
                <SelectItem value="company3">Empresa 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Adicionar Recurso</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Main Page Component
function ResourceManagementPage() {
  const [resources, setResources] = useState([
    {
      id: '1',
      name: 'Exemplo de Recurso',
      code: 'console.log("Olá, mundo!");',
      company: 'Empresa 1',
      url: 'https://exemplo.com/recurso'
    }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addResource = (newResource) => {
    setResources([...resources, newResource])
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gerenciamento de Recursos</h1>
        <Button onClick={() => setIsModalOpen(true)}>Adicionar Recurso</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Prévia do Código</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.name}</TableCell>
              <TableCell>{resource.company}</TableCell>
              <TableCell>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {resource.url}
                </a>
              </TableCell>
              <TableCell className="font-mono">
                {resource.code.length > 50
                  ? `${resource.code.substring(0, 50)}...`
                  : resource.code}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddResourceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddResource={addResource}
      />
    </div>
  )
}

export default ResourceManagementPage
