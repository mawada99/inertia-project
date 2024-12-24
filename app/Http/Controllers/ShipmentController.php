<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShipmentRequest;
use App\Models\Shipment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ShipmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Shipment/ShipmentList', [
            // 'can' => Gate::allows('create', Shipment::class),
            // 'shipments' => Shipment::all()->map(function ($shipment) {
            //     return [
            //         'id' => $shipment->id,
            //         'price' => $shipment->price,
            //         'type' => $shipment->type,
            //         'payment_method' => $shipment->payment_type,
            //         'can' => [
            //             'update_shipment' => Gate::allows('update', [Shipment::class, $shipment]),
            //         ],
            //     ];
            // }),
        ]);
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
