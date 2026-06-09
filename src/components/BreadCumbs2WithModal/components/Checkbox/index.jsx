import { InputCheckbox, LabelCheck } from "./style";
import check from "../../../../assets/check.png";

export function Checkbox({ ischecked }) {
  return (
    <>
      <InputCheckbox
        type="checkbox"
        name="checkbox"
        defaultChecked={ischecked}
        value="value"
        hidden
      />
      {ischecked ? (
        <LabelCheck ischecked>
          <div className="checkContainer">
            {ischecked && <img src={check} alt="" />}
          </div>
        </LabelCheck>
      ) : (
        <LabelCheck>
          <div className="checkContainer">
            {ischecked && <img src={check} alt="" />}
          </div>
        </LabelCheck>
      )}
    </>
  );
}
