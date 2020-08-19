<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class favorites extends Model
{
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'author', 'content', 'description', 'publishedAt', 'title', 'url', 'urlToImage'
    ];

}
