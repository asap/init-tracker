import { useState } from "react";

type Validation = "number" | "string";

interface EditableInputFieldProps {
  label: string | number;
  onSave: (value: any) => void; // TODO: Find a cleaner way to support number | string
  placeholder?: string;
  validation?: Validation;
  tabIndex: number;
}

const EditableInputField = ({
  label,
  onSave,
  placeholder,
  validation = "string",
  tabIndex,
}: EditableInputFieldProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(label as string);

  const validateAs = (value: string, validation: Validation): string =>
    validation === "number" ? value.replace(/[^0-9]/g, "") : value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = validateAs(inputValue, validation);

    setInputValue(numericValue);
  };

  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) =>
    event.target.select();

  const handleSave = () => {
    if (inputValue) {
      onSave(inputValue);
      setEditMode(false);
    }
  };

  // Only defined to make TS happy or if we need to do anyting in the future
  const handleKeyUp = () => {};

  // TODO: Maybe add popup or tool tip

  return (
    <>
      {editMode ? (
        <input
          tabIndex={tabIndex}
          className="editable select-all valid:border-blue-700 bg-transparent placeholder-textColor/70 invalid:border-red-700 invalid:bg-red-600"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleSave}
          minLength={0}
          placeholder={placeholder}
          // Hack because the component is hidden until edit mode is true
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
          required
        />
      ) : (
        <div
          role="textbox"
          tabIndex={tabIndex}
          className="editable border-transparent hover:bg-transparent/10 hover:text-textColor/70"
          onClick={() => setEditMode(true)}
          onKeyUp={handleKeyUp}
          onFocus={() => setEditMode(true)}
          onBlur={() => setEditMode(false)}
        >
          {inputValue}
        </div>
      )}
    </>
  );
};

export default EditableInputField;
