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
        Schema::table('users', function (Blueprint $table) {
            DB::statement(
                "
            INSERT INTO users(ID, NAME, EMAIL, PASSWORD, CREATED_AT) VALUES(2, 'admin', 'admin@gmail.com', '$2y$10$.E39tCWExoVNhhZUKn5tiOOEEbcs23RVDWlxFrkYC3GbHLJQShNXK', '2024-11-10 09:19:53')"
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
