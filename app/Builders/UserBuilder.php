<?php

namespace App\Builders;

class UserBuilder extends BaseBuilder
{
    public function search(string $key, string $value)
    {
        return $this->where($key, 'like', "%$value%");
    }

    public function sort(string $key, string $value)
    {
        return $this->orderBy($key, $value);
    }

    # filters come from request
    public function filter($filters)
    {
        if($filters->name) $this->search('name', $filters->name);
        if($filters->email) $this->search('email', $filters->email);

        if($filters->sort_field && $filters->sort_direction) $this->sort($filters->sort_field, $filters->sort_direction);

        return $this;
    }
}