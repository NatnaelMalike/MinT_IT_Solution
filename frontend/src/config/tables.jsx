import AdminDeleteDialog from "@/components/Admin/admin_components/AdminDeleteDialog";
import AdminEditForm from "@/components/Admin/admin_components/AdminEditForm";
import DepartmentDeleteDialog from "@/components/AdminLayout/admin_components/Department/department_components/DepartmentDeleteDialog";
import DepartmentEditForm from "@/components/AdminLayout/admin_components/Department/department_components/DepartmentEditForm";
import TechnicianDeleteDialog from "@/components/AdminLayout/admin_components/Technician/technician_components/TechnicianDeleteDialog";
import TechnicianEditForm from "@/components/AdminLayout/admin_components/Technician/technician_components/TechnicianEditForm";
import UserDeleteDialog from "@/components/AdminLayout/admin_components/User/user_components/UserDeleteDialog";
import EditDialog from "@/components/EditDialog";
import RequestDeleteDialog from "@/components/Request/RequestDeleteDialog";
import RequestEditForm from "@/components/Request/RequestEditForm";
import { IdContext } from "@/contexts/Context";
import { formatter } from "@/utility/timeFormatter";

export const technicianConfig = {
  entity: "Technicians",
  headers: [
    "Full Name",
    "Email Address",
    "Department",
    "Profession",
    "Phone Number",
    "Actions",
  ],
  fields: [
    "fullName",
    "email",
    (entity) => entity.department["name"],
    "profession",
    "phone",
    (entity) =>
      entity.isActive ? (
        <div className="flex gap-4">
          <IdContext.Provider value={entity._id}>
            <EditDialog entity="Technician">
              <TechnicianEditForm />
            </EditDialog>
          </IdContext.Provider>
          <TechnicianDeleteDialog id={entity._id} />
        </div>
      ) : (
        <p className="text-destructive">No Action - Deleted</p>
      ),
  ],
};
export const deptConfig = {
  entity: "Departments",
  headers: ["Department Name", "Actions"],
  fields: [
    "name",
    (entity) =>
      entity.isActive ? (
        <div className="flex gap-4">
          <IdContext.Provider value={entity._id}>
            <EditDialog entity="Technician">
              <DepartmentEditForm />
            </EditDialog>
          </IdContext.Provider>
          <DepartmentDeleteDialog id={entity._id} />
        </div>
      ) : (
        <p className="text-destructive">No Action - Deleted</p>
      ),
  ],
};
export const usersConfig = {
  entity: "Users",
  headers: [
    "Full Name",
    "Email Address",
    "Phone Number",
    "Department",
    "Actions",
  ],
  fields: [
    "fullName",
    "email",
    "phone",
    (entity) => entity.department["name"],
    (entity) => (
      <div className="flex gap-4">
        {entity.isActive ? (
          <UserDeleteDialog id={entity._id} />
        ) : (
          <p className="text-destructive">No Action - Deleted</p>
        )}
      </div>
    ),
  ],
};
export const adminConfig = {
  entity: "Admins",
  headers: [
    "Full Name",
    "Email Address",
    "Phone Number",
    "Department",
    "Role",
    "Actions",
  ],
  fields: [
    "fullName",
    "email",
    "phone",
    (entity) => entity.department["name"],
    "role",
    (entity) => (
      <div className="flex gap-4">
        {entity.isActive ? (
          <IdContext.Provider value={entity._id}>
            <EditDialog entity="Admins">
              <AdminEditForm />
            </EditDialog>
          </IdContext.Provider>
        ) : (
          <p className="text-destructive">No Action</p>
        )}
        {entity.role === "helper_admin" ? (
          entity.isActive ? (
            <AdminDeleteDialog id={entity._id} />
          ) : (
            <p className="text-destructive"> - Deleted</p>
          )
        ) : null}
      </div>
    ),
  ],
};
export const userReqConfig = {
  entity: "Requests",
  headers: [
    "Issue Type",
    "Description",
    "Status",
    "Is Assigned",
    "Requested At",
    "Actions",
  ],
  fields: [
    "issueType",
    "description",
    "status",
    (entity) => (entity.isAssigned ? "Yes" : "No"),
    (entity) => formatter(entity.createdAt),
    (entity) =>
      entity.status === "Resolved" || entity.status === "UnResolved" ? <p>No Acion</p> : (
        <div className="flex gap-4">
          <IdContext.Provider value={entity._id}>
            <EditDialog entity="Report">
              <RequestEditForm />
            </EditDialog>
          </IdContext.Provider>
          {entity.isAssigned ? null : <RequestDeleteDialog id={entity._id} />}
        </div>
      ),
  ],
};
