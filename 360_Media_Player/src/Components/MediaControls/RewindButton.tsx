import { Rewind } from "@coconut-xr/lucide-koestlich";
import IconButton from "../IconButton.tsx";
import { useDispatch, useSelector } from "react-redux";
import { loadPreviousItem } from "../../Utilities/MediaUtility.tsx";

function RewindButton() {
  const currentItemName = useSelector((state: any) => state.mediaSlice.currentItemName);
  const currentTree = useSelector((state: any) => state.directory.currentTree);
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => loadPreviousItem(dispatch, currentTree, currentItemName)}>
      <Rewind height={16} width={16} color="white" depth={0} />
    </IconButton>
  )
}

export default RewindButton;