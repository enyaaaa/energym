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
        $classes = classes::all();

        return response()->json([
            'status' => 200,
            "classes" => $classes
        ]);
    }

    public function getclass($id)
    {
        $classes = classes::find($id);
        if ($classes) {
            return response()->json([
                'status' => 200,
                "classes" => $classes
            ]);
        } else {
            return response()->json([
                'status' => 404,
                "message" => 'No classes found'
            ]);
        }
    }

    public function getclassbyinstructor($instructor_id)
    {
        $class = classes::where("instructor_id", $instructor_id)->get();
        return response()->json([
            'status' => 200,
            "classes" => $class
        ]);
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
        if (auth('sanctum')->check()) {

            $validator  = Validator::make($request->all(), [
                "instructorName" => 'required',
                "classTitle" => 'required',
                "classType" => 'required',
                "classImage" => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                "classRoom" => 'required',
                "classStartDateTime" => 'required',
                "classEndDateTime" => 'required',
                "classDuration" => 'required',
                "price" => 'required|regex:/^\d+(\.\d{1,2})?$/',
                "purpose" => 'required',
                "slots" => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Some fields are missing',
                    'validation_errors' => $validator->errors(),
                ]);
            } else {
                $instructor_id = auth('sanctum')->user()->id;
                $instructorName = $request->input('instructorName');
                $classTitle = $request->input('classTitle');
                $classType = $request->input('classType');
                $classRoom = $request->input('classRoom');
                $classStartDateTime = $request->input('classStartDateTime');
                $classEndDateTime = $request->input('classEndDateTime');
                $classDuration = $request->input('classDuration');
                $price = $request->input('price');
                $purpose = $request->input('purpose');
                $description = $request->input('description');
                $slots = $request->input('slots');

                if (classes::where('classRoom', $request->classRoom)
                    ->where(function ($query) use ($classStartDateTime, $classEndDateTime) {
                        $query->where(function ($q) use ($classStartDateTime, $classEndDateTime) {
                            $q->where('classStartDateTime', '>=', $classStartDateTime)
                                ->where('classStartDateTime', '<', $classEndDateTime);
                        })->orWhere(function ($q) use ($classStartDateTime, $classEndDateTime) {
                            $q->where('classStartDateTime', '<=', $classStartDateTime)
                                ->where('classEndDateTime', '>', $classEndDateTime);
                        })->orWhere(function ($q) use ($classStartDateTime, $classEndDateTime) {
                            $q->where('classEndDateTime', '>', $classStartDateTime)
                                ->where('classEndDateTime', '<=', $classEndDateTime);
                        })->orWhere(function ($q) use ($classStartDateTime, $classEndDateTime) {
                            $q->where('classStartDateTime', '>=', $classStartDateTime)
                                ->where('classEndDateTime', '<=', $classEndDateTime);
                        });
                    })
                    ->exists()
                ) {
                    return response()->json([
                        'status' => 409,
                        'message' => 'Classroom already taken',
                    ]);
                } else {
                    $class = new classes();

                    $class->instructor_id = $instructor_id;
                    $class->instructorName = $instructorName;
                    $class->classTitle = $classTitle;
                    $class->classType = $classType;
                    $class->classRoom = $classRoom;
                    $class->classStartDateTime = $classStartDateTime;
                    $class->classEndDateTime = $classEndDateTime;
                    $class->classDuration = $classDuration;
                    $class->price = $price;
                    $class->purpose = $purpose;
                    $class->description = $description;
                    $class->slots = $slots;

                    $file = $request->file('classImage');
                    $filename = $file->getClientOriginalName();
                    $file = $request->classImage->storeAs('classImage/instructor/' . $class->classTitle, $filename, "s3");
                    Storage::disk('s3')->setVisibility($file, 'public');
                    $url = Storage::disk('s3')->url($file);

                    $class->classImage = $url;

                    $class->save();
                    return response()->json([
                        'status' => 200,
                        'class' => $class,
                        'message' => 'Class Room Booking Added Successfully',
                    ]);
                }
            }
            return response()->json([
                'status' => 201,
                'message' => 'Booked',
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to book a room',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($classType)
    {
        $class = classes::where("classType", $classType)->get();
        return response()->json([
            'status' => 200,
            "classes" => $class
        ]);
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
        if (auth('sanctum')->check()) {

            $class = classes::find($id);

            if ($class->delete()) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Deleted Class Successfully',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to delete class',
            ]);
        }
    }
}
