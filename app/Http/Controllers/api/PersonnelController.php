<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PersonnelResource;
use App\Models\Personnel;
use App\Http\Requests\StorePersonnelRequest;
use App\Http\Requests\UpdatePersonnelRequest;

use Illuminate\Database\Query\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class PersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return PersonnelResource::collection(Personnel::all());
    }

//    /**
//     * Return filtered personnel
//     * @param Request $request
//     * @return Collection
//     */
//    public function globalSearch(Request $request)
//    {
//        $name = $request->get('name');
//        $age = $request->get('age');
//        $gender = $request->get('gender');
//        Log::debug("Got here");
//        $search = $request->input('search');
//        Log::debug($search);
//        $filteredPersonnel = DB::table('personnels')->select('name', 'age', 'gender')->whereAny(['name', 'age', 'gender'], 'LIKE', '%' . $search . '%')->get();
//        Log::debug($filteredPersonnel);
//        return $filteredPersonnel;
//    }

    /**
     * Return filtered personnel
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function search(Request $request)
    {
        $name = $request->input('name');
        $age = $request->input('age');
        $gender = $request->input('gender');
        Log::debug("Got here");
        Log::debug($name . " " . $age . " " . $gender);
        $filteredPersonnel = DB::table('personnels')->select('id', 'name', 'age', 'gender')->where(function (Builder $query) use ($name, $age, $gender) {
            if($name){
                $query->where('name', 'LIKE', '%' . $name . '%');
            }
            if($age){
                $query->where('age', 'LIKE', '%' . $age . '%');
            }
            if($gender){
                $query->where('gender', 'LIKE', '%' . $gender . '%');
            }
        })->get();
        Log::debug($filteredPersonnel);
        return PersonnelResource::collection($filteredPersonnel);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonnelRequest $request)
    {
        $data = $request->validated();
        $user = Personnel::create($data);
        return response(new PersonnelResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Personnel $personnel)
    {
        return new PersonnelResource($personnel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonnelRequest $request, Personnel $personnel)
    {
        $data = $request->validated();
        $personnel->update($data);
        return new PersonnelResource($personnel);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Personnel $personnel)
    {
        $personnel->delete();
        return response(null, 204);
    }
}
