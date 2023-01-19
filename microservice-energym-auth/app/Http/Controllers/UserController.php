<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => 'required|max:191|unique:users,username',
            "email" => 'required|email|max:191|unique:users,email',
            "mobile" => 'required|max:10|unique:users,mobile',
            "password" => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 404,
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            $user = User::create([
                'username' => $request->username,
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'mobile' => $request->mobile,
                'profilePic' => 'https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png',
            ]);

            $token = $user->createToken($user->email . 'token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'username' => $user->username,
                'token' => $token,
                'mobile' => $user->mobile,
                'profilePic' => $user->profilePic,
                'message' => 'Registered Successfully'
            ]);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Invalid',
                ]);
            } else {
                $token = $user->createToken($user->email . 'token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'username' => $user->username,
                    'token' => $token,
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'mobile' => $user->mobile,
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
            $user_id = auth('sanctum')->user()->id;
            $profile = User::where('id', $user_id)->get();
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
            $user_id = auth('sanctum')->user()->id;
            $profile = User::where('id', $user_id)->first();
            $validator  = Validator::make($request->all(), [
                "username" => ['required', Rule::unique('users', 'username')->ignore($profile->id),],
                "mobile" => ['required', Rule::unique('users', 'mobile')->ignore($profile->id),],
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
                    $file = $request->profilePic->storeAs('profilePic/' . $profile->email, $filename, "s3");
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
}
