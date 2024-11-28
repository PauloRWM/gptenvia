<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Training;

class TrainingController extends Controller
{
    public function index()
    {
        
        $trainings = Training::with('user:id,name,email')->get(); 

        return response()->json([
            'message' => 'Lista de treinamentos',
            'data' => $trainings,
        ], 200);
    }

   public function store(Request $request)
{
    $userId = auth()->id();

    $validatedData = $request->validate([
        'content' => 'nullable|string',
        'resources' => 'nullable|string',
    ]);

    $training = Training::updateOrCreate(
        [ 'userId' => $userId],
        [
            'content' => $validatedData['content'] ?? null,
            'resources' => $validatedData['resources'] ?? null,
        ]
    );

    return response()->json([
        'message' => 'Treinamento registrado ou atualizado com sucesso!',
        'data' => $training,
    ], 201);
}
}
