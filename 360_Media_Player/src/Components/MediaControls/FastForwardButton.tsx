import { FastForward } from "@coconut-xr/lucide-koestlich";
import IconButton from "../IconButton.tsx";
import { useDispatch, useSelector } from "react-redux";
import { loadNextItem } from "../../Utilities/MediaUtility.tsx";

function FastForwardButton() {
    const currentItemName = useSelector((state: any) => state.mediaSlice.currentItemName);
    const currentTree = useSelector((state: any) => state.directory.currentTree);
    const dispatch = useDispatch();

    return (
        <IconButton onClick={() => loadNextItem(dispatch, currentTree, currentItemName)}>
            <FastForward height={16} width={16} color="white" depth={0} />
        </IconButton>
    )
}

export default FastForwardButton;
