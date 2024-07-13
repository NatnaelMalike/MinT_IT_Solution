import axios from "axios";
import { toast } from "sonner";

export const deleteEntity = (entity, id, token) => {
    axios
        .delete(`http://localhost:4000/api/${entity}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            toast.success("Entity Deleted Successfully!");
        })
        .catch((err) => {
            console.log(err);
            toast.error("Failed to delete entity.");
        });
};