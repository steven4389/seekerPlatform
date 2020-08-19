<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'sexo', 'dateBirth', 'cellphone','password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }


    public function interests(){
        return $this->belongsToMany(Interest::class, 'interest_user', 'user_id', 'interest_id');
    }

    public function economicSectors(){
        return $this->belongsToMany(EconomicSector::class, 'economic_sector_user', 'user_id', 'economic_sector_id');
    }

    public function favorites(){
        return $this->hasMany(favorites::class);
    }
}
