<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        # task status pending, in_progress, completed
        $statusCounts = Task::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $myStatusCounts = $user->tasks()
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $activeTasks = $user->tasks()->with('project:id,name')
            ->where('status', 'in_progress')
            ->limit(10)
            ->get();

        return inertia('Dashboard', [
            'statusCounts'      => $statusCounts,
            'myStatusCounts'    => $myStatusCounts,
            'activeTasks'       => $activeTasks,
        ]);
    }
}
