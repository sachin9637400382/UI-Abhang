"use client";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

const ShowMore = ({ text }: { text: string }) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <>
            {
                text.length <= 500 ?

                    <Typography color="text.secondary" variant="h5" dangerouslySetInnerHTML={{ __html: text }}></Typography>
                    :
                    <> <Typography color="text.secondary" variant="h5" dangerouslySetInnerHTML={{ __html: showMore ? text : text.substring(0, 500) }}></Typography>
                        <Button onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'बंद करा ' : 'अजून दाखवा'}
                        </Button>
                    </>
            }
        </>
    )

}
export default ShowMore;