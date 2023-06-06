import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { BoxInterface } from "./Box";

/** Form for adding box.
 *
 * Props:
 * - createBox: fn to call in parent
 *
 * State:
 * formData: { height, width, backgroundColor }
 *
 * BoxList -> NewBoxForm
 */

interface FormInterface {
  height: string,
  width: string,
  backgroundColor: string
}

// interface FuncProps {
//   createBox(arg:BoxInterface): void
// }

interface FuncProps {
  createBox: (arg: BoxInterface) => void // what is function called? func signature (input:type) => outputType
}

function NewBoxForm({ createBox }: FuncProps) { // Props is an OBJECT
  const [formData, setFormData] = useState<FormInterface>({
    height: "",
    width: "",
    backgroundColor: "",
  });

  /** Update form input. */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>):void {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Submit form: call function from parent & clear inputs. */
  function handleSubmit(evt: React.FormEvent):void {
    evt.preventDefault();
    createBox({ ...formData, id: uuid() });
    setFormData({ height: "", width: "", backgroundColor: "" });
  }

  return (
      <div className="NewBoxForm">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newBox-height">Height</label>
            <input
                id="newBox-height"
                onChange={handleChange}
                name="height"
                value={formData.height}
            />
          </div>
          <div>
            <label htmlFor="newBox-width">Width</label>
            <input
                id="newBox-width"
                onChange={handleChange}
                name="width"
                value={formData.width}
            />
          </div>
          <div>
            <label htmlFor="newBox-backgroundColor">Background Color</label>
            <input
                id="newBox-backgroundColor"
                onChange={handleChange}
                name="backgroundColor"
                value={formData.backgroundColor}
            />
          </div>
          <button className="NewBoxForm-addBtn">Add a new box!</button>
        </form>
      </div>
  );
}

export default NewBoxForm;
