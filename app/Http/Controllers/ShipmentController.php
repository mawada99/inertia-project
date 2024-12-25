<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Shipment;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shipment\ListShipmentsRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\Shipment\ShipmentRequest;

class ShipmentController extends Controller
{
    public function index(ListShipmentsRequest $request)
    {
        $perPage = $request->get('perPage', 20);

        $shipments = $this->getShipments($request)->paginate($perPage);

        return Inertia::render('Shipment/ShipmentList', [
            'shipments' => $shipments,
        ]);
    }

    protected function getShipments(ListShipmentsRequest $request)
    {
        /** @var User */
        $user = Auth::user();

        $query = Shipment::ordered();

        if (!$user->isAdmin)
            $query->where('user_id', $user->id);

        if ($request->has('price'))
            $query->where('price', $request->price);

        if ($request->has('type'))
            $query->where('type', $request->type);

        if ($request->has('payment_type'))
            $query->where('payment_type', $request->payment_type);

        return $query;
    }

    public function saveForm(?Shipment $shipment = null)
    {
        return Inertia::render('Shipment/ShipmentCreate', [
            'shipment' => $shipment,
        ]);
    }

    public function save(ShipmentRequest $request)
    {
        /** @var User */
        $user = Auth::user();

        $shipment = $request->has('id') ? Shipment::find($request->id) : new Shipment;

        $request->merge(['user_id' => $user->id]);

        $shipment->forceFill($request->except('_token'))->save();

        return redirect()->route('home');
    }
}
