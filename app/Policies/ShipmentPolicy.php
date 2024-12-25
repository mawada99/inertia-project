<?php

namespace App\Policies;

use App\Models\Shipment;
use App\Models\User;

class ShipmentPolicy
{
    public function viewAny(User $user)
    {
        // TODO: Once user has this permission, user can see this page
        return $user->isAdmin || $user->shipments()->count() > 0;
    }

    public function create(User $user)
    {
        return $user->isAdmin;
    }

    public function update(User $user, Shipment $shipment)
    {
        return $user->id == $shipment->user->id || $user->isAdmin;
    }
}
