"use client";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import EditProfilePage from "./_components/editProfile";
import StudentRoleDetailsPage from "./student/roleDetails/page";
import RecruiterRoleDetailsPage from "../../(main)/u/recruiter/roleDetails/page";
import CoordinatorRoleDetailsPage from "./placementOfficer/roleDetails/page";
import SideBar from "./_components/sidebar";

const UserPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("basic");

  useEffect(() => {
    // Only access the query parameters if the router is ready
    if (router.query) {
      const { userType: queryUserType, section } = router.query;
      setUserType(
        Array.isArray(queryUserType) ? queryUserType[0] : queryUserType
      );
      if (section) {
        setActiveSection(Array.isArray(section) ? section[0] : section);
      }
    }
  }, [router]);

  const renderContent = () => {
    switch (activeSection) {
      case "basic":
        return <EditProfilePage />;
      case "role":
        if (userType === "student") {
          return <StudentRoleDetailsPage />;
        } else if (userType === "recruiter") {
          return <RecruiterRoleDetailsPage />;
        } else if (userType === "coordinator") {
          return <CoordinatorRoleDetailsPage />;
        }
        return null;
      default:
        return <EditProfilePage />;
    }
  };

  const handleNavigation = (newSection: SetStateAction<string>) => {
    setActiveSection(newSection);
    router.push(`/${userType}?section=${newSection}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="flex">
      {userType && (
        <SideBar userType={userType} onNavigate={handleNavigation} />
      )}
      <div className="flex-1 p-4">{renderContent()}</div>
    </div>
  );
};

export default UserPage;
