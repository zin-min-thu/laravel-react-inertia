<?php

namespace App\Builders;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class BaseBuilder extends Builder
{
    # search json column value by key with LIKE operator
    public function searchJsonColumn(string $json_column, string $value,?string $json_key = null)
    {
        $value = Str::lower($value);
        $json_column_field = $json_column;

        if($json_key) {
            $json_column_field = $json_column_field = "$json_column->>'$.$json_key'";
        }

        return $this->whereRaw("LOWER($json_column_field) LIKE ?", ["%$value%"]);

    }
}