<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface
{
    public function getAll($relations, $filters, $perPage = null);

    public function geById($id) : ?Model;

    public function create(array $data): Model;

    public function update(Model $model, array $data) : bool;

    public function delete(Model $model) : bool;
}

