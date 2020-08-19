<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EconomicSector;
use App\User;

class economicSectorController extends Controller
{
    public function findEconomicSector(){
        
        $economicSectors = EconomicSector::all();

        return $economicSectors;
    }

    public function findUserEconomicSector($id){        

        try{
            $user = User::findOrFail($id);
            $user->economicSectors;
        }catch(Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 504);
        }
        
        $response = [
            'message' => 'registros ingresados correctamente!',
            'data'    => $user->economicSectors,
        ];

        return  response()->json($response, 200);
    }

    public function saveUserEconomicSector(Request $request, $id){
        
        try{
            $data = $request->all();
            $user = User::findOrFail($id);
            $user->economicSectors()->detach();
            $user->economicSectors()->attach($data);

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
}
