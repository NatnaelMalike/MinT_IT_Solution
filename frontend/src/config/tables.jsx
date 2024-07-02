import TechnicianDeleteDialog from "@/components/AdminLayout/admin_components/Technician/technician_components/TechnicianDeleteDialog";
import TechnicianEditForm from "@/components/AdminLayout/admin_components/Technician/technician_components/TechnicianEditForm";
import EditDialog from "@/components/EditDialog";
import { IdContext } from "@/contexts/Context";

export const technicianConfig = {
    headers: ['Full Name', 'Email Address', 'Department', 'Profession', 'Phone Number', 'Operations'],
    fields: [
      'fullName',
      'email',
      entity => entity.department['name'],
      'profession',
      'phone',
      entity => (
        <div className="flex gap-4">
          <IdContext.Provider value={entity._id}>
            <EditDialog entity="Technician">
              <TechnicianEditForm />
            </EditDialog>
          </IdContext.Provider>
          <TechnicianDeleteDialog id={entity._id} />
        </div>
      )
    ]
  };