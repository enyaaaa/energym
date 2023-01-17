<?php

namespace App\Http\Controllers;

use App\Models\bookings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

            $user_id = auth('sanctum')->user()->id;
            $class_id = $request->class_id;
            $userFullName = $request->input('userFullName');
            $userEmail = $request->input('userEmail');
            $userMobile = $request->input('userMobile');

            $bookingCheck = bookings::where('id', $class_id)->first();

            if ($bookingCheck) {

                if (bookings::where('class_id', $class_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => 'you have already booked a slot',
                    ]);
                } else {
                    $validator  = Validator::make($request->all(), [
                        "userFullName" => 'required',
                        "userEmail" => 'required|email|max:191',
                        "userMobile" => 'required|max:8',
                    ]);

                    if ($validator->fails()) {
                        return response()->json([
                            'status' => 404,
                            'message' => 'Some fields are missing',
                            'validation_errors' => $validator->errors(),
                        ]);
                    } else {
                        $booking = new bookings;

                        $booking->user_id = $user_id;
                        $booking->class_id = $class_id;
                        $booking->userFullName = $userFullName;
                        $booking->userEmail = $userEmail;
                        $booking->userMobile = $userMobile;

                        $booking->save();

                        return response()->json([
                            'status' => 201,
                            'message' => 'Booked class Successfully',
                        ]);
                    }
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Booking not found',
                ]);
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
        $booking = bookings::where("user_id", $id)->get();
        return $booking;
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
        $booking = bookings::find($id);

        if ($booking->delete()) {
            return response()->json([
                'status' => 200,
                'message' => 'Deleted Class Booking Successfully',
            ]);
        }
    }
}
