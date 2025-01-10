import { Toaster,toast } from "react-hot-toast";
import { fetchAddMarin } from "../../services/dataMarins";
import useStore from "../../store/useStore"
import Marin from "../../types/Marin";
import MarinForm from "./MarinForm";

export default function MarinAdd(){

    const {token} = useStore();
    const addMarin = async (marin: Marin) => {
        try {
          await fetchAddMarin(token, marin);
          toast.success('Marin added');
        } catch (error) {
            toast.error('Error: ' + error);        
        }
      };
    
    return (
        <>
            <Toaster/>
            <MarinForm onSubmit={addMarin}/>
        </>
    )
}