import { useState } from "react";
import InitiativeRow, { InitiativeRowEntity } from "./InitiativeRow";
import useInitiativeList from "../hooks/useInitiativeList";

const InitativeTable = () => {
  const initialTurn = -1;
  const initialRound = 1;
  const [turn, setTurn] = useState(initialTurn);
  const [round, setRound] = useState(initialRound);

  const [initiativeOrder, setInitiativeOrder] = useInitiativeList();

  // TODO: Eventually replace this with a random id generator or guid
  // FIXME: This won't always get the last element of the list
  const [lastKnownId, setLastKnownId] = useState(initiativeOrder.length + 1);

  const handleUpdateRow = (initiativeEntity: InitiativeRowEntity): void => {
    if (!initiativeOrder) {
      return;
    }
    const characterIndex: number = initiativeOrder.findIndex(
      (item) => item.id === initiativeEntity.id,
    );

    if (characterIndex) {
      initiativeOrder[characterIndex] = initiativeEntity;
    }

    setInitiativeOrder(initiativeOrder);
  };

  const handleSort = () => {
    console.log("initiative order for sort", initiativeOrder);

    const newInitiativeOrder: InitiativeRowEntity[] = initiativeOrder.sort(
      (a, b) => {
        if (b.initiativeRoll === a.initiativeRoll) {
          return b.dexterity - a.dexterity;
        }
        return b.initiativeRoll - a.initiativeRoll;
      },
    );

    console.log("initiative order after sort", newInitiativeOrder);

    setInitiativeOrder([...newInitiativeOrder]);
  };

  const handleClear = () => {
    setInitiativeOrder([]);
    setLastKnownId(0);
  };

  const handleNextTurn = () => {
    setTurn(turn + 1);

    if (turn === initiativeOrder.length - 1) {
      setRound(round + 1);
      setTurn(0);
    }
  };

  const handleReset = () => {
    setTurn(initialTurn);
    setRound(initialRound);
  };

  const handleAddInitiativeOrder = () => {
    const newId = lastKnownId + 1;
    setInitiativeOrder([
      ...initiativeOrder,
      {
        id: `${newId}`,
        initiativeRoll: 0,
        characterName: "",
        currentHP: 0,
        maxHP: 0,
        armorClass: 0,
        conditions: [""], // FIXME: Has to be empty string otherwise hide logic doesn't update
        dexterity: 0,
      },
    ]);

    setLastKnownId(newId);
  };

  const handleRemoveRow = (entityId: string) => {
    if (!initiativeOrder || !entityId) {
      return;
    }

    const characterIndex: number = initiativeOrder.findIndex(
      (item) => item.id === entityId,
    );

    const newInitiativeOrder = [...initiativeOrder];
    newInitiativeOrder.splice(characterIndex, 1);
    console.log("newInitiativeOrder", newInitiativeOrder);

    setInitiativeOrder(newInitiativeOrder);
  };

  return (
    <div className="container">
      <div className="container mx-auto rounded-xl overflow-hidden">
        <table className="table-fixed w-full text-textColor">
          <thead>
            <tr className="bg-headerColor">
              <th className="px-4 py-2 text-left w-1/12">Initative</th>
              <th className="px-4 py-2 text-left w-1/2">Name</th>
              <th className="px-4 py-2 text-left w-1/12">HP</th>
              <th className="px-4 py-2 text-left w-1/12">AC</th>
              <th className="px-4 py-2 text-left w-1/12">Dex</th>
              <th className="px-4 py-2 text-left w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            {!initiativeOrder.length ? (
              <tr className="bg-primary">
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2" colSpan={5}>
                  <div className="editable border-transparent">
                    Please add characters
                  </div>
                </td>
              </tr>
            ) : (
              initiativeOrder.map((item, index) => (
                <InitiativeRow
                  key={item.id}
                  initiativeEntity={item}
                  currentTurn={turn}
                  index={index}
                  updateRow={handleUpdateRow}
                  removeRow={handleRemoveRow}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="container mx-auto py-4 flex justify-between">
        <div className="flex space-x-4">
          <button tabIndex={-1} className="btn" onClick={handleNextTurn}>
            {turn < 0 ? `Start` : `Next`}
          </button>
          <button tabIndex={-1} className="btn" onClick={handleSort}>
            Sort
          </button>
          <button tabIndex={-1} className="btn" onClick={handleClear}>
            Clear
          </button>
        </div>
        <div className="flex space-x-4">
          <p className="py-2 px-4 font-macondo text-xl">Round {round}</p>
          <button
            tabIndex={-1}
            className="btn"
            onClick={handleReset}
            disabled={turn < 0}
          >
            Reset
          </button>
          <button
            tabIndex={-1}
            className="btn disabled:opacity-50"
            onClick={handleAddInitiativeOrder}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitativeTable;
