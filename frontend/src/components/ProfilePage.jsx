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
            <Card className="mx-auto bg-slate-50">
                <CardHeader>
                    <CardTitle className="text-center">
                        Account Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {user ? (
                        <div className="flex gap-10 justify-center mt-8 text-lg">
                            <div className="space-y-2">
                            <p className="font-semibold">
                                    Full Name:
                                </p>
                            <p className="font-semibold">
                                    Email:
                                </p>
                            <p className="font-semibold">
                                    Phone Number:
                                </p>
                            <p className="font-semibold">
                                    Department:
                                </p>
                            <p className="font-semibold">
                                    Role:
                                </p>
                            </div>
                            <div className="space-y-2">
                            <p>{user.fullName}</p>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            <p>{user.department.name}</p>
                            <p>{user.role}</p>
                            </div>
                        </div>
                    ) : null}
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;
