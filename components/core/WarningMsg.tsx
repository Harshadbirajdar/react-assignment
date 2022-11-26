import useDialogStore from "../../store/dialog";
import Button from "./Button";
import MyDialog from "./MyDailog";

interface WarningMsg {
  title: string;
  msg: string;
  fn: () => void;
}
const WarningMsg = ({ title, msg, fn }: WarningMsg) => {
  const { isWarningOpen, setWarningOpen } = useDialogStore();
  return (
    <MyDialog
      closeModal={() => {
        setWarningOpen(false);
      }}
      isOpen={isWarningOpen}
      title={title}
    >
      <div>
        <h3 className="text-lg mb-8 font-medium">{msg}</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => {
              setWarningOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button className="bg-red-500 hover:bg-red-600" onClick={fn}>
            Delete
          </Button>
        </div>
      </div>
    </MyDialog>
  );
};

export default WarningMsg;
