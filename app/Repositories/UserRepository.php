<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\BaseRepository;
use App\Interfaces\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseRepository implements UserRepositoryInterface  
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function create(array $data): User
    {
        $data['password']   = bcrypt($data['password']);
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        return $this->model->create($data);
    }

    public function update(Model $user, array $data): bool
    {
        if (! empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $data['updated_by'] = auth()->id();

        return $user->update($data);
    }
}