export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  mobile: number;
  profilePic: string;
}

export interface RegisterForm {
  username: string;
  name: string;
  email: string;
  mobile: number;
  password: string;
  confirmPassword: string;
  arror_list: [];
}

export interface Booking {
  id: number;
  user_id: number;
  class_id: number;
  userFullName: string;
  userEmail: string;
  userMobile: number;
}

export interface Instructor {
  id: number;
  username: string;
  name: string;
  email: string;
  mobile: number;
  profilePic: string;
  category: string;
  code: string;
}

export interface Class {
  length: any;
  id: number;
  instructor_id: number;
  instructorName: string;
  classTitle: string;
  classImage: string;
  classType: string;
  classRoom: string;
  classStartDateTime: string;
  classEndDateTime: string;
  classDuration: string;
  price: string;
  purpose: string;
  description: string;
  slots: number;
}

export interface Comment {
  id: number;
  name: string;
  profilePic: string;
  review: string;
  rating: number;
  created_at: string;
  index: number;
}

