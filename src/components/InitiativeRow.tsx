import { useState } from "react";
import EditableInputField from "./EditableInputField";

export interface InitiativeRowEntity {
  id: string;
  initiativeRoll: number;
  characterName: string;
  currentHP: number;
  maxHP: number;
  armorClass: number;
  dexterity: number;
  conditions: string[];
}

export interface InitiativeRowProps {
  initiativeEntity: InitiativeRowEntity;
  currentTurn?: number;
  index: number;
  updateRow: (newEntity: InitiativeRowEntity) => void;
  removeRow: (id: string) => void;
}

const InitiativeRow = (props: InitiativeRowProps) => {
  const { initiativeEntity, currentTurn, index, updateRow, removeRow } = props;

  const [currentEntity, setEntity] = useState(initiativeEntity);

  const { conditions } = currentEntity;

  const computedStyle: string[] = ["text-xl"];

  const hiddenConditions = ["hiding", "out-of-range"];

  const baseStyle =
    "hover:opacity-90 odd:bg-primary even:bg-secondary font-normal";

  const isHidden =
    conditions.every((value) => hiddenConditions.includes(value)) ||
    currentEntity.currentHP === 0;

  const isActiveTurn = currentTurn === index;

  if (isActiveTurn) {
    computedStyle.push("bg-tertiary text-primary font-bold");
  } else if (isHidden) {
    computedStyle.push("bg-gray-500");
  } else {
    computedStyle.push(baseStyle);
  }

  const updateEntity = (entity: InitiativeRowEntity) => {
    console.log("new entity", entity);

    setEntity(entity);
    updateRow(entity);
  };

  const handleSaveName = (_name: string) => {
    const newEntity = {
      ...currentEntity,
      characterName: _name,
    };

    updateEntity(newEntity);
  };

  const handleUpdateInitiativeRoll = (_roll: number) => {
    const newEntity = {
      ...currentEntity,
      initiativeRoll: Number(_roll),
    };

    updateEntity(newEntity);
  };

  const handleUpdateArmorClass = (_ac: number) => {
    const newEntity = {
      ...currentEntity,
      armorClass: Number(_ac),
    };

    updateEntity(newEntity);
  };

  const handleUpdateDexterity = (_dex: number) => {
    const newEntity = {
      ...currentEntity,
      dexterity: Number(_dex),
    };

    updateEntity(newEntity);
  };

  const handleUpdateCurrentHP = (_hp: number) => {
    const newEntity = {
      ...currentEntity,
      currentHP: Number(_hp),
    };

    updateEntity(newEntity);
  };

  const handleUpdateMaxHP = (_hp: number) => {
    const newEntity = {
      ...currentEntity,
      maxHP: Number(_hp),
    };

    updateEntity(newEntity);
  };

  const handleRemoveRow = () => {
    console.log("currentEntity", currentEntity);
    removeRow(currentEntity.id);
  };

  console.log("isHidden?", isHidden);

  return (
    <tr className={computedStyle.join(" ")}>
      <td className="px-4 py-2">
        <EditableInputField
          label={currentEntity.initiativeRoll}
          onSave={handleUpdateInitiativeRoll}
        />
      </td>
      <td className="px-4 py-2">
        <EditableInputField
          label={currentEntity.characterName}
          placeholder="Character Name"
          onSave={handleSaveName}
        />
      </td>
      <td className="px-4 py-2 flex">
        <EditableInputField
          label={currentEntity.currentHP}
          onSave={handleUpdateCurrentHP}
        />
        <div className="border-borderColor/0 px-0 py-3 m-0 w-3 leading-none text-xl border-2">
          /
        </div>
        <EditableInputField
          label={currentEntity.maxHP}
          onSave={handleUpdateMaxHP}
        />
      </td>
      <td className="px-4 py-2">
        <EditableInputField
          label={currentEntity.armorClass}
          onSave={handleUpdateArmorClass}
        />
      </td>
      <td className="px-4 py-2">
        <EditableInputField
          label={currentEntity.dexterity}
          onSave={handleUpdateDexterity}
        />
      </td>
      <td>
        <button className="btn text-sm " onClick={handleRemoveRow}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default InitiativeRow;
