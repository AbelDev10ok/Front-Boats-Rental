import { fetchAddMarin } from "../../services/dataMarins";
import useStore from "../../store/useStore"
import Marin from "../../types/Marin";
import MarinForm from "./MarinForm";

export default function MarinAdd(){

    const {token} = useStore();
    const addMarin = async(marin: Marin)=>{        
        try{
            await fetchAddMarin(token,marin);
        }catch(error){
            console.error(error)
            alert(error)
        }
    }
    return (
        <MarinForm onSubmit={addMarin}/>
    )
}