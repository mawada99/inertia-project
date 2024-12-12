<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('users', function ($user) {
    return Auth::user()->isAdmin;
});
