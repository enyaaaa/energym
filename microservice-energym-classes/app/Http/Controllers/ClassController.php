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
        if (auth('sanctum')->check()) {

            $instructor_id = auth('sanctum')->user()->id;
            $classTitle = $request->classTitle;
            $classType = $request->input('classType');
            $classRoom = $request->input('classRoom');
            $classStartDateTime = $request->input('classStartDateTime');
            $classEndDateTime = $request->input('classEndDateTime');
            $classDuration = $request->input('classDuration');
            $price = $request->input('price');
            $purpose = $request->input('purpose');
            $description = $request->input('description');
            $slots = $request->input('slots');

            if (classes::where('classRoom', request('classRoom'))
                ->where('classStartDateTime', '<=', request('classStartDateTime'))
                ->where('classEndDateTime', '>=', request('classEndDateTime'))
                ->exists()
            ) {
                return response()->json([
                    'status' => 409,
                    'message' => 'Classroom already taken',
                ]);
            } else {
                $validator  = Validator::make($request->all(), [
                    "classTitle" => 'required',
                    "classImage" => 'image|mimes:jpg,png,bmp,jpeg',
                    "classType" => 'required',
                    "classStartDateTime" => 'required',
                    "classEndDateTime" => 'required',
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

                    $class->instructor_id = $instructor_id;
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
                'message' => 'Login to add a booking',
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
        if (auth('sanctum')->check()) {

            $instructor_id = auth('sanctum')->user()->id;
            $classTitle = $request->classTitle;
            $classType = $request->input('classType');
            $classRoom = $request->input('classRoom');
            $classStartDateTime = $request->input('classStartDateTime');
            $classEndDateTime = $request->input('classEndDateTime');
            $classDuration = $request->input('classDuration');
            $price = $request->input('price');
            $purpose = $request->input('purpose');
            $description = $request->input('description');
            $slots = $request->input('slots');

            if (classes::where('classRoom', request('classRoom'))
                ->where('classStartDateTime', '<=', request('classStartDateTime'))
                ->where('classEndDateTime', '>=', request('classEndDateTime'))
                ->exists()
            ) {
                return response()->json([
                    'status' => 409,
                    'message' => 'Classroom already taken',
                ]);
            } else {
                $validator  = Validator::make($request->all(), [
                    "profilePic" => 'image|mimes:jpg,png,bmp,jpeg',
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'status' => 404,
                        'message' => 'Some fields are missing',
                        'validation_errors' => $validator->errors(),
                    ]);
                } else {

                    $class = classes::find($id);

                    $class->instructor_id = $instructor_id;
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

                    if ($request->hasFile('classImage')) {
                        if ($class->classImage) {
                            $old_path = $class->classImage;
                            if (Storage::disk('s3')->exists($old_path)) {
                                Storage::disk('s3')->delete($old_path);
                            }
                        }

                        $file = $request->file('classImage');
                        $filename = $file->getClientOriginalName();
                        $file = $request->classImage->storeAs('classImage/instructor/' . $class->classTitle, $filename, "s3");
                        Storage::disk('s3')->setVisibility($file, 'public');
                        $url = Storage::disk('s3')->url($file);

                        $class->classImage = $url;
                    } else {
                        $url = $class->classImage;
                        $class->classImage = $url;
                    }

                    $class->update();
                    return response()->json([
                        'status' => 200,
                        'message' => 'Class Room Updated Successfully',
                    ]);
                }
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to add a room booking',
            ]);
        }
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
