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

            $booking = new bookings();

            $booking->user_id = $request->input('user_id');
            $booking->class_id = $request->input('class_id');
            $booking->userFullName = $request->input('userFullName');
            $booking->userEmail = $request->input('userEmail');
            $booking->userMobile = $request->input('userMobile');

            $booking->save();
            return response()->json([
                'status' => 200,
                'message' => 'Booked class Successfully',
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
        $booking = bookings::find($id);

        if ($booking->delete()) {
            return response()->json([
                'status' => 200,
                'message' => 'Deleted Class Booking Successfully',
            ]);
        }
    }
}
