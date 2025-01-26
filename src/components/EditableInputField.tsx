import { useState } from "react";

interface EditableInputFieldProps {
  label: string | number;
  onSave: (value: any) => void; // TODO: Find a cleaner way to support number | string
  placeholder?: string;
}

const EditableInputField = ({
  label,
  onSave,
  placeholder,
}: EditableInputFieldProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(label as string);

  const handleSave = () => {
    console.log("blur");
    if (inputValue) {
      onSave(inputValue);
      setEditMode(false);
    }
  };

  // TODO: Should select text on focus
  // TODO: Mabye validate numberical values?
  // TODO: Maybe add popup or tool tip

  return (
    <>
      {editMode ? (
        <input
          className="editable select-all valid:border-blue-700 bg-transparent placeholder-textColor/70 invalid:border-red-700 invalid:bg-red-600"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleSave}
          minLength={0}
          placeholder={placeholder}
          required
        />
      ) : (
        <div
          className="editable border-transparent hover:bg-transparent/10 hover:text-textColor/70"
          onClick={() => setEditMode(true)}
        >
          {inputValue}
        </div>
      )}
    </>
  );
};

export default EditableInputField;
