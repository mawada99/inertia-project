<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserPermitted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param string $permissionSlug
     */
    public function handle(Request $request, Closure $next, string|array $permissionSlug): Response
    {
        $permissions = explode('|', $permissionSlug);

        if ($request->user()->hasPermission($permissions))
            return $next($request);

        return abort(401);
    }
}
