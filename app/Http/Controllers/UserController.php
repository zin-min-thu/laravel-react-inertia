<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(private UserRepositoryInterface $userRepository)
    {
        
    }

    public function index(Request $request)
    {
        $users = $this->userRepository->getAll(null, $request, 10);

        return inertia('User/Index', [
            'users'         => UserCrudResource::collection($users),
            'queryParms'    => request()->query() ?: null,
            'success'       => session('success'),
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

        $this->userRepository->create($data);

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

        $this->userRepository->update($user, $data);

        return to_route('user.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $message = "User \"{$user->name}\" deleted successfully.";

        $this->userRepository->delete($user);

        return to_route('user.index')->with('success', $message);
    }
}
