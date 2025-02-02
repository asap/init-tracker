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

  const setTabIndex = (_index: number) => index * 10 + _index;

  const updateEntity = (entity: InitiativeRowEntity) => {
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
    removeRow(currentEntity.id);
  };

  return (
    <tr className={computedStyle.join(" ")}>
      <td className="px-4 py-2">
        <EditableInputField
          label={currentEntity.initiativeRoll}
          onSave={handleUpdateInitiativeRoll}
          validation={"number"}
          tabIndex={setTabIndex(1)}
        />
      </td>
      <td className="px-4 py-2">
        <EditableInputField
          label={currentEntity.characterName}
          placeholder="Character Name"
          onSave={handleSaveName}
          tabIndex={setTabIndex(2)}
        />
      </td>
      <td className="px-4 py-2 flex">
        <EditableInputField
          label={currentEntity.currentHP}
          onSave={handleUpdateCurrentHP}
          validation={"number"}
          tabIndex={setTabIndex(3)}
        />
        <div className="border-borderColor/0 px-0 py-3 m-0 w-3 leading-none text-xl border-2">
          /
        </div>
        <EditableInputField
          label={currentEntity.maxHP}
          onSave={handleUpdateMaxHP}
          validation={"number"}
          tabIndex={setTabIndex(4)}
        />
      </td>
      <td className="px-4 py-2">
        <EditableInputField
          label={currentEntity.armorClass}
          onSave={handleUpdateArmorClass}
          validation={"number"}
          tabIndex={setTabIndex(5)}
        />
      </td>
      <td className="px-4 py-2">
        <EditableInputField
          label={currentEntity.dexterity}
          onSave={handleUpdateDexterity}
          validation={"number"}
          tabIndex={setTabIndex(6)}
        />
      </td>
      <td>
        <button
          tabIndex={-1}
          className="btn text-sm "
          onClick={handleRemoveRow}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default InitiativeRow;
