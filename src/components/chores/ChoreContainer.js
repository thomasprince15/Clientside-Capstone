import { useState } from "react"
import { ChoreList } from "./ChoreList"
import { ChoreSearch } from "./ChoreSearch"

export const ChoreContainer = () => {
    const [searchTerms, setSearchTerms] = useState()

    return <>
        <ChoreSearch setterFunction={ setSearchTerms} />
        <ChoreList searchTermState={searchTerms} />
    </>
}