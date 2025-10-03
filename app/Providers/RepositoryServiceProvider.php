<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;

class RepositoryServiceProvider extends ServiceProvider
{

    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class,UserRepository::class);
    }


    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}