<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShipmentRequest;
use App\Models\Shipment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

class ShipmentController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('perPage', 20);

        /** @var User */
        $user = Auth::user();

        $shipments = $user->isAdmin ? Shipment::paginate($perPage)->withQueryString() : $user->shipments()->paginate($perPage)->withQueryString();

        return Inertia::render('Shipment/ShipmentList', [
            'can' => Gate::allows('create', Shipment::class),
            'shipments' => $shipments,
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
