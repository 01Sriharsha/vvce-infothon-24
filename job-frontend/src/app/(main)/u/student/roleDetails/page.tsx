"use client";

import StudentRoleDetailsForm from "@/components/roleForms/studentForm";
import { useAppSelector } from "@/store";

const StudentRoleDetailsPage = () => {
  const { data } = useAppSelector((state) => state.auth);
  return <StudentRoleDetailsForm id={data?.id!} role="STUDENT" />;
};

export default StudentRoleDetailsPage;
