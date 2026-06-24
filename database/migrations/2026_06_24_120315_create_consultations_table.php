<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('patient_id')
                ->constrained()
                ->onDelete('cascade');

            $table->json('symptoms'); 
            // example: [1,3,7]

            $table->string('severity')->nullable(); // Low/Medium/High/Critical
            $table->text('notes')->nullable();

            $table->foreignId('diagnosis_id')
                ->nullable()
                ->constrained('diagnoses')
                ->onDelete('set null');

            $table->text('recommendation')->nullable();

            $table->enum('status', ['pending', 'under_review', 'completed'])
                ->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};