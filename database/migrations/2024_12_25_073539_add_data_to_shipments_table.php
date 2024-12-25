<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('shipments', function (Blueprint $table) {
            DB::statement("
                insert into shipments(user_id, price, type, payment_type) values(2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test'),
                (2, 250, 'test', 'test');
            ");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shipments', function (Blueprint $table) {
            //
        });
    }
};
