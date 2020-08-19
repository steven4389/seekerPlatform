<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFavoritesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('title')->nullable($value = true); 
            $table->string('author')->nullable($value = true); 
            $table->string('content', 500)->nullable($value = true); 
            $table->string('description', 500)->nullable($value = true); 
            $table->string('publishedAt', 500)->nullable($value = true); 
            $table->string('url', 500)->nullable($value = true); 
            $table->string('urlToImage', 500)->nullable($value = true);
            $table->integer('user_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('favorites');
    }
}
