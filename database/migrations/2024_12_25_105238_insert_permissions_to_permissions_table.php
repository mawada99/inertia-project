<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
            INSERT INTO permissions(NAME, SLUG) VALUES('List shipments', 'shipping.shipment.list'),
                ('Create Shipment', 'shipping.shipment.create'),
                ('Update Shipment', 'shipping.shipment.update'),
                ('Delete Shipment', 'shipping.shipment.delete');
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
