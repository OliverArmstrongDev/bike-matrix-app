import Button from "../components/Buttons/primary/Button";
import "./BikeList.css";
import { useBike } from "../hooks/useBike";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBikeForm } from "../hooks/useBikeForm";

type BikeFormProps = {
};


const BikeList = () => {
  const { bikes, deleteBike } = useBike();
  const { formDispatch, formActionType } = useBikeForm();
  const navigate = useNavigate();

  const handleEditClick = (bike: any) => {
    formDispatch({
      type: formActionType.SET_VALUES,
      payload: {...bike},
    });
    navigate(`/edit/${bike._id}`)
  }

  const handleDeleteClick = (id: number) => {
    deleteBike(id)
  }


  return (
    <div className="bike-list-form-container">
      <table>
        <thead>
          <tr>
            {/* <td>Preview</td> */}
            <td>Brand</td>
            <td>Model</td>
            <td>Year</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {bikes?.map((bike: any, idx: number) => (
            <tr key={idx}>
              {/* <td>IMAGE</td> */}
              <td>{bike.brand}</td>
              <td>{bike.modelName}</td>
              <td>{bike.year}</td>
              <td className="bike-list-actions">
                <div >
                  <Button buttonStyles={{width: '50px'}} buttonText="Edit" onButtonClick={()=> handleEditClick(bike)}/> 
                  <Button buttonStyles={{width: '55px'}} buttonText="Delete" onButtonClick={() => handleDeleteClick(bike?._id)}/> 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BikeList;
