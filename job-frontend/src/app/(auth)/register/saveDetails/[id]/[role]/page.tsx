"use client"
import StudentRoleDetailsForm from "@/components/roleForms/studentForm"
import RecruiterDetailsForm from "@/components/roleForms/recruiterForm"
import CoordinatorRoleDetailsForm from "@/components/roleForms/placementOfficerForm"
const SaveDetails = ({params}:{params:{id:number, role:string}}) => {
    const {role,id} = params

    if(role === "STUDENT"){
      <StudentRoleDetailsForm id={id}/>
    }else if(role === "RECRUITER"){
      <RecruiterDetailsForm/>
    }else if(role === "COORDINATOR"){
      <CoordinatorRoleDetailsForm/>
    }
}

export default SaveDetails;