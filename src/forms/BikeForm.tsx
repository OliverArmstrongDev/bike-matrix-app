import { useEffect, useState } from "react";
import Button from "../components/Buttons/primary/Button";
import Image from "../components/Image/Image";
import Label from "../components/Label/Label";
import { useForm, Controller } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import "./BikeForm.css";
import { useBike } from "../hooks/useBike";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select/Select";
import { useBikeForm } from "../hooks/useBikeForm";

type BikeFormProps = {
  editing?: boolean;
};

// Validation schema using Yup
const schema = yup.object().shape({
  brand: yup.string().required('Brand is required'),
  modelName: yup.string().required('Model is required'),
  year: yup.string().required('Year is required'),
});

const BikeForm = ({ editing }: BikeFormProps) => {
  const navigate = useNavigate();
  const { saveBike, editBike } = useBike();
  const { formState } = useBikeForm();

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      brand    : '',
      modelName: '',
      year     : '',
    },
  });

  useEffect(() => {
    if (editing && formState) {
      reset(formState); // Prepopulate the form with existing bike data
    } else {
      reset(); // Clear form if not editing
    }
  }, [editing, formState, reset]);


  const onSubmit = (data: any) => {
    if (editing) {
      editBike(data);
    } else {
      saveBike(data);
    }
    reset(); // Clear form after submission
    navigate(-1);
  };

  return (
    <>
      <div className="form-navigate-back">
        <Button
          buttonType="button"
          buttonText={"Back"}
          onButtonClick={() => navigate(-1)}
          buttonStyles={{ width: "6em" }}
        />
      </div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <Label styles={{ paddingLeft: "8px" }} fontSize={15}>
              Brand:
            </Label>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="input-field"
                  type="text"
                  placeholder="Enter bike brand"
                />
              )}
            />
            {errors.brand && <p className="error-message">{errors.brand.message}</p>}
          </div>
          <div className="input-container">
            <Label styles={{ paddingLeft: "8px" }} fontSize={15}>
              Model:
            </Label>
            <Controller
              name="modelName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="input-field"
                  type="text"
                  placeholder="Enter bike model"
                />
              )}
            />
            {errors.modelName && <p className="error-message">{errors.modelName.message}</p>}
          </div>
          <div className="input-container">
            <Label styles={{ paddingLeft: "8px" }} fontSize={15}>
              Year of manufacture:
            </Label>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="year"
                  value={field.value}
                  onChange={(e) => setValue('year', e.target.value)}
                />
              )}
            />
            {errors.year && <p className="error-message">{errors.year.message}</p>}
          </div>
          <div className="input-container">
            <Label styles={{ paddingLeft: "8px" }} fontSize={15}>
              Image:
            </Label>
            <Image />
          </div>
          <Button
            buttonType="submit"
            buttonText={editing ? "Update" : "Save"}
            onButtonClick={() => {}}
          />
        </form>
      </div>
    </>
  );
};

export default BikeForm;
