<?php

namespace App\Http\Controllers;

use App\Models\forum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return forum::all();
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
        $comment = new forum();

        $comment->user_id = $request->input('user_id');
        $comment->review = $request->input('review');
        $comment->rating = $request->input('rating');

        $file = $request->file('commentImage');
        $filename = $file->getClientOriginalName();
        $file = $request->commentImage->storeAs('commentImage/' . $comment->user_id, $filename, "s3");
        Storage::disk('s3')->setVisibility($file, 'public');
        $url = Storage::disk('s3')->url($file);

        $comment->commentImage = $url;

        if ($comment->save()) {
            return $comment;
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
        $comment = forum::find($id);

        $comment->review = $request->input('review');
        $comment->rating = $request->input('rating');

        if ($request->hasFile('commentImage')) {
            if ($comment->commentImage) {
                $old_path = $comment->commentImage;
                if (Storage::disk('s3')->exists($old_path)) {
                    Storage::disk('s3')->delete($old_path);
                }
            }

            $file = $request->file('commentImage');
            $filename = $file->getClientOriginalName();
            $file = $request->commentImage->storeAs('commentImage/user/' . $comment->email, $filename, "s3");
            Storage::disk('s3')->setVisibility($file, 'public');
            $url = Storage::disk('s3')->url($file);
            $comment->update([
                "commentImage" => $url,
            ]);
        } else {
            $url = $comment->commentImage;
            $comment->update([
                "commentImage" => $url,
            ]);
        }

        $comment->update();
        return response()->json([
            'status' => 200,
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
