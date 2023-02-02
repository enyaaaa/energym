<?php

namespace App\Http\Controllers;

use App\Models\instructors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class InstructorController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => 'required|max:191|unique:instructors,username',
            "email" => 'required|email|max:191|unique:instructors,email',
            "mobile" => 'required|max:10|unique:instructors,mobile',
            "password" => 'required|min:8|same:passwordConfirmation',
            "passwordConfirmation"=> 'required|same:password|min:8',
            "code" => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 404,
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            if ($request->code == "Q6FfficNa7vfXzHP5LSMB06iu2sJuXh") {
                $instuctor = instructors::create([
                    'username' => $request->username,
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'mobile' => $request->mobile,
                    'profilePic' => 'https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png',
                    'category' => $request->category,
                ]);

                $token = $instuctor->createToken($instuctor->email . 'token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'username' => $instuctor->username,
                    'token' => $token,
                    'mobile' => $instuctor->mobile,
                    'profilePic' => $instuctor->profilePic,
                    'message' => 'Registered Successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Invalid',
                ]);
            }
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            $instructor = instructors::where('email', $request->email)->first();

            if (!$instructor || !Hash::check($request->password, $instructor->password)) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Invalid',
                ]);
            } else {
                $token = $instructor->createToken($instructor->email . 'token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'username' => $instructor->username,
                    'token' => $token,
                    'instructor_id' => $instructor->id,
                    'email' => $instructor->email,
                    'mobile' => $instructor->mobile,
                    'message' => 'Logged in Successfully'
                ]);
            }
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            "status" => 200,
            "message" => "Logged out successfully",
        ]);
    }

    public function viewprofile()
    {
        if (auth('sanctum')->check()) {
            $instructor_id = auth('sanctum')->user()->id;
            $profile = instructors::where('id', $instructor_id)->get();
            return response()->json([
                'status' => 200,
                'profile' => $profile,
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to view profile',
            ]);
        }
    }

    public function editprofile(Request $request)
    {
        if (auth('sanctum')->check()) {
            $instructor_id = auth('sanctum')->user()->id;
            $profile = instructors::where('id', $instructor_id)->first();
            $validator  = Validator::make($request->all(), [
                "username" => ['required', Rule::unique('instructors', 'username')->ignore($profile->id),],
                "mobile" => ['required', Rule::unique('instructors', 'mobile')->ignore($profile->id),],
                "profilePic" => 'image|mimes:jpg,png,bmp,jpeg',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 404,
                    'message' => $validator->errors(),
                    'validation_errors' => $validator->errors(),
                ]);
            } else {

                $profile->username = $request->input('username');
                $profile->name = $request->input('name');
                $profile->mobile = $request->input('mobile');

                if ($request->hasFile('profilePic')) {
                    if ($profile->profilePic) {
                        $old_path = $profile->profilePic;
                        if (Storage::disk('s3')->exists($old_path)) {
                            Storage::disk('s3')->delete($old_path);
                        }
                    }

                    $file = $request->file('profilePic');
                    $filename = $file->getClientOriginalName();
                    $file = $request->profilePic->storeAs('profilePic/instructor/' . $profile->email, $filename, "s3");
                    Storage::disk('s3')->setVisibility($file, 'public');
                    $url = Storage::disk('s3')->url($file);
                    $profile->update([
                        "profilePic" => $url,
                    ]);
                } else {
                    $url = $profile->profilePic;
                    $profile->update([
                        "profilePic" => $url,
                    ]);
                }

                $profile->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Profile Updated Successfully',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue',
            ]);
        }
    }

    public function destroy($id)
    {
        if (auth('sanctum')->check()) {

            $instructor = instructors::find($id);

            if ($instructor->delete()) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Deleted Account Successfully',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to delete account',
            ]);
        }
    }
    public function index()
    {
        return instructors::all();
    }
}