<?php

namespace App\Http\Controllers;

use App\Models\forum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comments = forum::all();
        return response()->json([
            'status' => 200,
            'comments' => $comments,
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
        $validator  = Validator::make($request->all(), [
            "rating" => 'required',
            "review" => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 404,
                'message' => 'Some fields are missing',
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            $user_id = $request->user_id;
            $name = $request->name;
            $review = $request->input('review');
            $rating = $request->input('rating');
            $profilePic = $request->input('profilePic');

            $comment = new forum;

            $comment->user_id = $user_id;
            $comment->name = $name;
            $comment->review = $review;
            $comment->rating = $rating;
            $comment->profilePic = $profilePic;

            $comment->save();

            return response()->json([
                'status' => 200,
                'comment' => $comment,
                'message' => 'Posted Review Successfully',
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
        $comments = Forum::where("user_id", $id)->get();
        return response()->json([
            'status' => 200,
            'comments' => $comments,
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
        $comment = forum::find($id);

        $comment->review = $request->input('review');
        $comment->rating = $request->input('rating');

        $comment->update();
        return response()->json([
            'status' => 200,
            'comment' => $comment,
            'message' => 'Comment Updated Successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = forum::find($id);

        if ($comment->delete()) {
            return response()->json([
                'status' => 200,
                'message' => 'Deleted Comment Successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                "message" => 'No comment found'
            ]);
        }
    }
}
