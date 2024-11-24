'use client';

import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Save, RefreshCw } from 'lucide-react';
// import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TrainingResources = () => {
  const [trainingContent, setTrainingContent] = useState('');
  const [resources, setResources] = useState([
    { id: 1, name: 'Vídeos', active: false, description: 'Inclui vídeos explicativos no treinamento' },
    { id: 2, name: 'Quizzes', active: false, description: 'Adiciona questionários interativos' },
    { id: 3, name: 'Fórum', active: false, description: 'Habilita um fórum de discussão para os participantes' },
    { id: 4, name: 'Certificado', active: false, description: 'Emite um certificado ao concluir o treinamento' },
  ]);
  const [channels, setChannels] = useState([
    { id: 1, name: 'WhatsApp', status: 'disconnected' },
  ]);
//   const { toast } = useToast();

  const handleResourceToggle = (id) => {
    setResources(resources.map(resource =>
      resource.id === id ? { ...resource, active: !resource.active } : resource
    ));
  };

  const handleSave = () => {
    console.log('Saving training content:', trainingContent);
    console.log('Active resources:', resources.filter(r => r.active).map(r => r.name));
    // toast({
    //   title: "Treinamento salvo",
    //   description: "Seu conteúdo e recursos foram salvos com sucesso.",
    // });
  };

  const handleReconnect = (id) => {
    // Simulate reconnection process
    setTimeout(() => {
      setChannels(channels.map(channel =>
        channel.id === id ? { ...channel, status: 'connected' } : channel
      ));
      toast({
        title: "Canal reconectado",
        description: `O canal ${channels.find(c => c.id === id)?.name} foi reconectado com sucesso.`,
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">Página de Treinamento</h1> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conteúdo do Treinamento</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Insira o conteúdo do treinamento aqui..."
              value={trainingContent}
              onChange={(e) => setTrainingContent(e.target.value)}
              className="min-h-[200px]"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recursos Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            {resources.map(resource => (
              <div key={resource.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`resource-${resource.id}`} className="flex-grow">
                    {resource.name}
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{resource.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch
                  id={`resource-${resource.id}`}
                  checked={resource.active}
                  onCheckedChange={() => handleResourceToggle(resource.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recursos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {resources.filter(r => r.active).map(resource => (
                <li key={resource.id}>{resource.name}</li>
              ))}
            </ul>
            {resources.filter(r => r.active).length === 0 && (
              <p className="text-muted-foreground">Nenhum recurso ativo no momento.</p>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Canais de Comunicação</CardTitle>
          </CardHeader>
          <CardContent>
            {channels.map(channel => (
              <div key={channel.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <Label className="flex-grow">{channel.name}</Label>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    channel.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {channel.status === 'connected' ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" disabled={channel.status === 'connected'}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reconectar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Reconectar {channel.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center p-4">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/1200px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png" alt="QR Code para reconexão" className="mb-4" />
                      <p className="text-center text-sm text-muted-foreground">
                        Escaneie o QR code acima com o seu {channel.name} para reconectar.
                      </p>
                      <Button className="mt-4" onClick={() => handleReconnect(channel.id)}>
                        Confirmar Reconexão
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Salvar Treinamento
        </Button>
      </div>
    </div>
  );
};

export default TrainingResources;
