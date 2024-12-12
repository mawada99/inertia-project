<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Gate::guessPolicyNamesUsing(function ($modelClass) {
            $splitted = explode("\\", $modelClass);
            $splitted = array_slice($splitted, 2);
            return "App\\Policies\\" . implode("\\", $splitted) . 'Policy';
        });
    }
}
