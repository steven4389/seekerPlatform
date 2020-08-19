<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\favorites;

class FavoritesController extends Controller
{
    public function saveFavorite(Request $request, $id){
    
        try{
            $data = $request->all();
            $user = User::findOrFail($id);
            $user->favorites()->create($data);

        }catch(Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 504);
        }
        $response = [
        'message' => 'registros ingresados correctamente!',
        'data'    =>  $data,
        ];

        return response()->json($response, 200);;
    }

    public function findfavoritesByUser($id){

        try{

            error_log($id);
            $user = User::findOrFail($id);
            error_log($user);
            $res=$user->favorites;

        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 504);
        }


        $response = [
            'message' => 'consulta ejecutada correctamente!',
            'data'    => $res,
        ];
       

        return response()->json($response, 200);
    }
}
