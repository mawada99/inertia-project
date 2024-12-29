<?php

namespace App\Policies;

use App\Models\Shipment;
use App\Models\User;

class ShipmentPolicy
{
    public function viewAny(User $user)
    {
        return $user->hasPermission('shipping.shipment.list');
    }

    public function create(User $user)
    {
        return $user->hasPermission('shipping.shipment.create');
    }

    public function update(User $user, Shipment $shipment)
    {
        return $user->hasPermission('shipping.shipment.update')
            && ($user->id == $shipment->user->id || $user->isAdmin);
    }

    public function view(User $user, Shipment $shipment)
    {
        return $user->id === $shipment->user->id;
    }
}
