<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Models\User;
class UserController extends Controller
{
    public function index()
    {
        $query = User::query();

        $sortField      = request('sort_field', 'created_at');
        $sortDirection  = request('sort_direction', 'desc');

        $query = $query->where(function ($query) {
            if(request('name')) {
                $query->where('name', 'like', '%' . request('name') . '%');
            }

            if(request('email')) {
                $query->where('email', 'like', '%' . request('email') . '%');
            }
        });

        $users = $query->orderBy($sortField, $sortDirection)
                ->paginate(10)->onEachSide(1);

        return inertia('User/Index', [
            'users' => UserCrudResource::collection($users),
            'queryParms' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $data['password'] = bcrypt($data['password']);

        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        User::create($data);

        return to_route('user.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return inertia('User/Show', [
            'user'       => new UserCrudResource($user),
            'queryParms'    => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        if(!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $data['updated_by'] = auth()->id();

        $user->update($data);

        return to_route('user.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $message = "User \"{$user->name}\" deleted successfully.";

        $user->delete();

        return to_route('user.index')->with('success', $message);
    }
}
