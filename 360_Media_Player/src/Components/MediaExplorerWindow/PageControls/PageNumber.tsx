import { Text } from "@coconut-xr/koestlich";
import { useSelector } from "react-redux";

function PageNumber() {

    let pageNumber: any = useSelector((state: any) => state.directory.pageNumber);

    return (
        <Text fontSize={26} color="white" fontFamily="bold">
            {pageNumber.toString()}
        </Text>
    )
}

export default PageNumber;