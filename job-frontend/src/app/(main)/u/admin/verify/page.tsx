"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAxios } from "@/hooks/useAxios";
import { Response } from "@/types";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("STUDENT");

  const { mutate, loading } = useAxios();

  const fetchUsers = async () => {
    try {
      const { error, data } = await mutate<Response<any>>(
        "post",
        `/admin/users/${role}`
      );
      if (error) {
        toast.error(error);
      }
      if (data) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [role]);

  const handleVerify = async (userId: number) => {
    try {
      const { error, data } = await mutate<Response<any>>(
        "post",
        `/admin/user/verify/${userId}`
      );
      if (error) {
        toast.error(error);
      }
      if (data) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, verified: true } : user
          )
        );
      }
    } catch (error) {
      console.error("Error verifying user", error);
    }
  };

  if (loading) {
    return (
      <div className="grid place-items-center h-full">
        <Loader className="animate-spin" size={"2rem"} color="green" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>
      <div className="p-4 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4 capitalize">
            {role?.toLowerCase()} Verification
          </h2>
          <Select onValueChange={(e) => setRole(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STUDENT">STUDENT</SelectItem>
              <SelectItem value="RECRUITER">RECRUITER</SelectItem>
              <SelectItem value="COORDINATOR">COORDINATOR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md space-y-3 capitalize">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <Button
                onClick={() => handleVerify(user.id)}
                className={`mt-2 py-2 px-4 rounded ${
                  user.verified ? "bg-teal-600" : "bg-teal-800"
                } text-white`}
              >
                {user.verified ? "Verified" : "Verify"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
