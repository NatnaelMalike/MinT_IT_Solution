import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import profile from "@/assets/img/profile.png";
import { useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";
const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { token } = useAuthContext();
    useEffect(() => {
        if (token) {
            console.log(token);
            axios
                .get("http://localhost:4000/api/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]);
    return (
        <div>
            <Card className="w-96 mx-auto">
                <CardHeader>
                    <CardTitle className="text-center">Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <img src={profile} alt="" className="w-[60%] mx-auto" />
                    </div>
                    {user ? (
                        <div className="flex flex-col space-y-4 mt-8 text-xl">
                            <p className="flex justify-between">
                                <span className="font-medium">Full Name</span>
                                <span>{user.fullName}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-medium">Email</span>
                                <span>{user.email} </span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-medium">
                                    Phone Number
                                </span>
                                <span>{user.phone} </span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-medium">Department</span>
                                <span>{user.department.name}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-medium">Role</span>
                                <span>{user.role}</span>
                            </p>
                        </div>
                    ) : null}
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;
