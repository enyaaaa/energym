<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instructor_id')->constrained()->cascadeOnDelete();
            $table->text('classTitle');
            $table->string('classImage') ->nullable();
            $table->text('classType');
            $table->text('classLocation');
            $table->string('classDate');
            $table->time('classTime');
            $table->string('classDuration');
            $table->decimal('price', 6,2);
            $table->text('description') -> nullable();
            $table->integer('slots');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classes');
    }
};
