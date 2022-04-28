import { useRouter } from "next/router";
import React from "react";
import { Block, Text } from "vcc-ui";

function LearnDetail() {
    const router = useRouter();
    const learnId = router.query.learnId;
    return (
        <Block extend={{ textAlign: "center" , margin : '4 rem'}} as='h1'>
            <Text  subStyle="emphasis"> Volvo {learnId}</Text>
        </Block>
    );
}

export default LearnDetail;
