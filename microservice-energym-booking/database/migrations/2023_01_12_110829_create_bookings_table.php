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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('class_id');
            $table->string('classTitle');
            $table->string('classType');
            $table->string('classRoom');
            $table->string('classStartDateTime');
            $table->string('classEndDateTime');
            $table->string('classDuration');
            $table->string('userFullName');
            $table->string('userEmail');
            $table->integer('userMobile');
            $table->string('userProfilePic');
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
        Schema::dropIfExists('bookings');
    }
};
