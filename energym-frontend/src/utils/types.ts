export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    mobile: number;
    profilePic: string;
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
}

export interface Class {
    id: number;
    instructor_id: number;
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
    user_id: number;
    review: string;
    commentImage: string;
    rating: number;
}
  
  
  
  