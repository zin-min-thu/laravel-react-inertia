<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField      = request('sort_field', 'created_at');
        $sortDirection  = request('sort_direction', 'desc');

        $query = $query->where(function ($query) {
            if(request('name')) {
                $query->where('name', 'like', '%' . request('name') . '%');
            }

            if(request('status')) {
                $query->where('status', request('status'));
            }
        });

        $tasks = $query->orderBy($sortField, $sortDirection)
                ->paginate(10)->onEachSide(1);

        return inertia('Task/Index', [
            'tasks'         => TaskResource::collection($tasks),
            'queryParms'    => request()->query() ?: null,
            'success'       => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // dd(User::all());
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection(Project::orderBy('name', 'asc')->get()),
            'users' => UserResource::collection(User::orderBy('name', 'asc')->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        if($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('tasks/'. Str::random(8), 'public');
        }

        // dd($request->all());
        Task::create($data);

        return to_route('task.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task'          => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection(Project::orderBy('name', 'asc')->get()),
            'users' => UserResource::collection(User::orderBy('name', 'asc')->get()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $data['updated_by'] = auth()->id();

        if($request->hasFile('image')) {
            # delete old image
            if($task->image_path && Storage::disk('public')->exists($task->image_path)) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }

            $data['image_path'] = $request->file('image')->store('tasks/'. Str::random(8), 'public');
        }

        $task->update($data);

        return to_route('task.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $message = "Task \"{$task->name}\" deleted successfully.";

        # delete old image
        if($task->image_path && Storage::disk('public')->exists($task->image_path)) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }

        $task->delete();

        return to_route('task.index')->with('success', $message);
    }

    public function myTasks()
    {
        $query = Task::where('assigned_user_id', auth()->id());

        $sortField      = request('sort_field', 'created_at');
        $sortDirection  = request('sort_direction', 'desc');

        $query = $query->where(function ($query) {
            if(request('name')) {
                $query->where('name', 'like', '%' . request('name') . '%');
            }

            if(request('status')) {
                $query->where('status', request('status'));
            }
        });

        $tasks = $query->orderBy($sortField, $sortDirection)
                ->paginate(10)->onEachSide(1);

        return inertia('Task/Index', [
            'tasks'         => TaskResource::collection($tasks),
            'queryParms'    => request()->query() ?: null,
            'success'       => session('success'),
        ]);
    }
}
