<?php

namespace App\Http\Controllers;

use App\Models\classes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return classes::all();
    }

    public function getclass($id)
    {
        $class = classes::find($id);
        if ($class) {
            return response()->json([
                'status' => 200,
                "class" => $class
            ]);
        } else {
            return response()->json([
                'status' => 404,
                "message" => 'No classes found'
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator  = Validator::make($request->all(), [
            "classTitle" => 'required',
            "classType" => 'required',
            "classLocation" => 'required',
            "classDate" => 'required',
            "classTime" => 'required',
            "classDuration" => 'required',
            "price" => 'required|regex:/^\d+(\.\d{1,2})?$/',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 404,
                'message' => 'Some fields are missing',
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            $class = new classes();

            $class->instructor_id = $request->input('instructor_id');
            $class->classTitle = $request->input('classTitle');

            $class->classType = $request->input('classType');
            $class->classLocation = $request->input('classLocation');
            $class->classDate = $request->input('classDate');
            $class->classTime = $request->input('classTime');
            $class->classDuration = $request->input('classDuration');
            $class->price = $request->input('price');
            $class->description = $request->input('description');
            $class->slots = $request->input('slots');

            $file = $request->file('classPic');
            $filename = $file->getClientOriginalName();
            $file = $request->profilePic->storeAs('classPic/' . $class->classTitle, $filename, "s3");
            Storage::disk('s3')->setVisibility($file, 'public');
            $url = Storage::disk('s3')->url($file);

            $class->classImage = $url;

            $class->save();
            return response()->json([
                'status' => 200,
                'message' => 'Class Added Successfully',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
