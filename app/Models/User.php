<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property Shipment[]|Collection $shipments
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected static array $admins = [
        'admin@gmail.com',
    ];

    public function getIsAdminAttribute()
    {
        return in_array($this->email, self::$admins);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function shipments()
    {
        return $this->hasMany(Shipment::class);
    }

    public function permissions()
    {
        return $this->hasManyThrough(
            Permission::class,
            PermissionUser::class,
            'user_id',
            'id',
            'id',
            'permission_id',
        );
    }

    function hasPermission(string|array $slug): bool
    {
        $slug = is_array($slug) ? $slug : [$slug];
        return static::whereKey($this->id)->hasAnyPermission($slug)->exists();
    }

    public function scopeHasAnyPermission($query, string|array $permission)
    {
        $query->whereHas('permissions', function ($query) use ($permission) {
            $query->where(function ($query) use ($permission) {
                collect($permission)->each(function ($permission) use ($query) {
                    $permission = str_replace('*', '%', strtolower($permission));
                    $query->orWhere(DB::raw('lower(slug)'), 'like', $permission);
                });
            });
        });
    }
}
