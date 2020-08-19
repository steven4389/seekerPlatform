<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interest;
use App\User;

class interestController extends Controller
{
    public function findInterests(){
        
        $interests = Interest::all();

        return $interests;
    }

    
    public function findUserInterest($id){


        try{

            error_log($id);
            $user = User::findOrFail($id);

        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 504);
        }


        $response = [
            'message' => 'consulta ejecutada correctamente!',
            'data'    => $user->interests,
        ];
       

        return response()->json($response, 200);
    }


    public function saveUserInterest(Request $request, $id){
      
           try{
                $data = $request->all();
                $user = User::findOrFail($id);
                $user->interests()->detach();
                $user->interests()->attach($data);
               
            } catch (Exception $e) {
                
                DB::rollBack();
                return $this->errorResponse($e->getMessage(), 504);
            }
     
            $response = [
                'message' => 'registros ingresados correctamente!',
                'data'    => $data,
            ];

            return response()->json($response, 200);
        
    }

  
}
